import Order from "../models/Order.js";
import mongoose from "mongoose";
import { responder } from "./../utils/utils.js";

const postOrders = async (req, res) => {
  const { products, deliveryAddress, phone, paymentMode } = req.body;

  if (!products || !deliveryAddress || !phone || !paymentMode) {
    return responder(
      res,
      false,
      `products, totalBill, deliveryAddress, phone, paymentMode are required`,
      null,
      400
    );
  }

  let totalBill = 0;

  products.forEach((product) => {
    totalBill += product.price * product.quantity;
  });

  try {
    const newOrder = new Order({
      userId: req.user.id,
      products,
      totalBill,
      deliveryAddress,
      phone,
      paymentMode,
    });

    const savedOrder = await newOrder.save();

    return responder(res, true, "Order placed successfully", savedOrder, 201);
  } catch (error) {
    return responder(res, false, error.message, null, 400);
  }
};

const putOrders = async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  let order;

  try {
    order = await Order.findById(id);

    if (!order) {
      return responder(res, false, "Order not found", null, 404);
    }
  } catch (error) {
    return responder(res, false, error.message, null, 400);
  }

  // user can only update his own order
  if (user.role=="user" && order.userId!=user.id) {
    return responder(
      res,
      false,
      "You are not authorized to update this order",
      null,
      401
    );
  }

  // user can only cancel the order if it is not delivered
  if (user.role=="user") {
    if (order.status == "delivered") {
      return responder(
        res,
        false,
        "Order has already been delivered",
        null,
        400
      );
    }

    if (req.body.status == "cancelled") {
      order.status = "cancelled";
    }
  }

  if (req.body.phone) {
    order.phone = req.body.phone;
  }

  if (req.body.deliveryAddress) {
    order.deliveryAddress = req.body.deliveryAddress;
  }

  if (user.role == "admin") {
    order.status = req.body.status;
    order.timeline = req.body.timeline;
  }

  await order.save();

  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { status: req.body.status, timeline: req.body.timeline },
    { new: true, runValidators: true }
  );
  

  return responder(res, true, "Order updated successfully", updatedOrder, 200);
};

const getOrderById = async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  console.log("User from JWT:", user);
  console.log("Order ID requested:", id);

  let order;

  try {
    order = await Order.findById(id)
      .populate("userId", "name email")
      .populate(
        "products.productId",
        "-shortDescription -features -image -category -tags -__v -createdAt -updatedAt"
      )
      .populate("paymentId", "-__v -createdAt -updatedAt");

    if (!order) {
      console.log("Order not found in database");
      return responder(res, false, "Order not found", null, 404);
    }

    console.log("Order userId:", order.userId);
    console.log("User.id:", user.id);
    console.log("User Role:", user.role);
  } catch (error) {
    return responder(res, false, error.message, null, 400);
  }

  // Convert both IDs to strings before comparing
  if (!order.userId.equals(user.id) && user.role !== "admin") {
    console.log("Unauthorized access: User does not match Order userId");
    return responder(
      res,
      false,
      "You are not authorized to view this order",
      null,
      401
    );
  }

  return responder(res, true, "Order fetched successfully", order, 200);
};


const getOrdersByUserId = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (user.role != "admin" && user.id != id) {
    return responder(
      res,
      false,
      "You are not authorized to view this orders",
      null,
      401
    );
  }

  const orders = await Order.find({ userId: id })
    .sort({ createdAt: -1 })
    .populate("userId", "name email")
    .populate(
      "products.productId",
      "-shortDescription -features -image -category -tags -__v -createdAt -updatedAt"
    )
    .populate("paymentId", "-__v -createdAt -updatedAt");

  return responder(res, true, "Orders fetched successfully", orders, 200);
};

export { getOrderById, getOrdersByUserId, postOrders, putOrders };
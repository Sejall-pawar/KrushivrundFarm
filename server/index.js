import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
dotenv.config();

import {
  getOrderById,
  getOrdersByUserId,
  postOrders,
  putOrders,
} from "./controllers/Order.js";
import { postPayments } from "./controllers/payment.js";
import { getProducts, postProducts } from "./controllers/product.js";
import { postLogin, postSignup } from "./controllers/user.js";
import {
  checkRoleMiddleware,
  jwtVerifyMiddleware,
} from "./middlewares/auth.js";

import { responder } from "./utils/utils.js";

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  if (conn) {
    console.log(`MongoDB connected successfully`);
  }
};

app.get("/health", (req, res) => {
  return responder(res, true, "Server is running");
});

// Auth
app.post("/signup", postSignup);
app.post("/login", postLogin);

// Product
app.post("/products", jwtVerifyMiddleware, checkRoleMiddleware, postProducts);
app.get("/products", getProducts);

// Orders
app.post("/orders", jwtVerifyMiddleware, postOrders);
app.put("/orders/:id", jwtVerifyMiddleware, putOrders);
app.get("/orders/:id", jwtVerifyMiddleware, getOrderById);
app.get("/orders/user/:id", jwtVerifyMiddleware, getOrdersByUserId);

// Payments
app.post("/payments", postPayments);

app.use("*", (req, res) => {
  return responder(res, false, "API endpoint doesn't exist", null, 404);
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
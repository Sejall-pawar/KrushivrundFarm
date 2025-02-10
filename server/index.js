import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());

//Connect to MongoDB

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URL);

    if (conn) {
        console.log(`MongoDB connected successfully`);
    }
};

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Server is running",
    })
});

app.get("*", (req, res) => {
    res.status({
        success: false,
        message: "API endpoint doesn't exits"
})
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})
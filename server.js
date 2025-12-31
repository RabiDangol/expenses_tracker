// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

// const express= require('express')
// const cors = require('cors')
// const morgan= require('morgan')
// const dotenv= require('dotenv')
// const colors= require('colors')
// const connectDb = require('./config/connectDb').default
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
import connectDb from "./config/connectDb.js";
import userRoutes from "./routes/userRoute.js";
import transectionRoutes from "./routes/transectionRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

//config dot env
dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("connectDb:", connectDb);
//database
connectDb();
//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes
//user routes
// app.use('/api/v1/users',require('./routes/userRoute.js'));
app.use("/api/v1/users", userRoutes);
//transections routes

// app.use('/api/v1/transection', require("./routes/transectionRoutes.js"));
app.use("/api/v1/transection", transectionRoutes);

//admin routes
app.use("/api/v1/admin", adminRoutes);

//port
const PORT = process.env.PORT || 5000;

//listing server
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

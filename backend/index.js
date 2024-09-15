import express from "express";
import dotenv from "dotenv";
/**
 * 1. CREATE an app
 * 2. LISTEN / RUN that app into a server with port:3000
 */

/**
 * dotenv.config() setup
 * DATABASE setup
 * ROUTE setup
 */

// LOCAL IMPORTS: requires .js extension as type is 'module'
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";

// 'dotenv': Environment Variables Initialization
dotenv.config();
const PORT = process.env.PORT || 5000;

// App on Express Server Initializtion
const app = express();

// Base URL '/'
app.get("/", (req, res) => {
  res.send("hello world");
});

// Authentication routes in URL: /api/auth

app.use("/api/auth", authRoutes);

// Listening the app on Server PORT: 300
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port:${PORT}`);
});

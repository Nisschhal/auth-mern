import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
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

// use cors
app.use(cors({ orgin: "http://localhost:5173", credentials: true }));
// Use Middleware express.json() to parse the incoming json data: req.body
app.use(express.json());

// Use middlware to use incoming cookies
app.use(cookieParser());

// Authentication routes in URL: /api/auth
app.get("/", (req, res) => res.send("working"));
app.use("/api/auth", authRoutes);

// Listening the app on Server PORT: 300
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port:${PORT}`);
});

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

import { connectDB } from "./db/connectDB.js";

dotenv.config();

const app = express();
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  connectDB();
  console.log(`Server running at port:3000`);
});

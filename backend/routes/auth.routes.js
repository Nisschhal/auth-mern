import express from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
} from "../../controllers/auth.controllers.js";

// Router Initialization from 'express.Router()'
const router = express.Router();

// SIGN UP ROUTE: '/signup'
router.post("/signup", signup);

// LOGIN ROUTE: '/login'
router.post("/login", login);

// LOGOUT ROUTE: '/logout'
router.post("/logout", logout);

// VERIFY EMAIL: '/verify-email
router.post("/verify-email", verifyEmail);
export default router;

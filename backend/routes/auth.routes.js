import express from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
  forgetPassword,
  resetPassword,
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

// FORGET PASSWORD: '/forget-password'
router.post("/forget-password", forgetPassword);

// RESET PASSWORD: '/reset-password'
router.post("/reset-password/:token", resetPassword);
export default router;

import express from "express";
import { login, logout, signup } from "../../controllers/auth.controllers.js";

// Router Initialization from 'express.Router()'
const router = express.Router();

// SIGN UP ROUTE: '/signup'
router.get("/signup", signup);

// LOGIN ROUTE: '/login'
router.get("/login", login);

// LOGOUT ROUTE: '/logout'
router.get("/logout", logout);

export default router;

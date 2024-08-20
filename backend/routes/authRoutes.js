import express from "express";
import { Login, Logout, Register } from "../controllers/authController.js";
const router = express.Router();

router.post("/register", Register);

router.post("/login", Login);

router.get("/logout", Logout);

export default router;

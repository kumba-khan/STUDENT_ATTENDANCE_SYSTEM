import express from "express";
import { login, logout, updatePassword } from "../controllers/authController.js";
import { authenticate, authorizeParticularUser } from "../middleware/auth.middleware.js";
const router = express.Router();

//Handle Login form submission
router.post("/login", login);

//logout
router.get("/logout", logout);

router.put("/:id", authenticate, authorizeParticularUser, updatePassword);

export default router;
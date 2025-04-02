import { Router } from "express";
const router = Router();
import { register, login, logout, getProfile } from "../controllers/user.controllers.js";

// these methods are available in Controllers

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", getProfile);

export default router;
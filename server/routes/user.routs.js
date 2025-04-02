const { Routes } = "express";
const router = Routes();
import { register } from "../controllers/user.controllers";
import { login } from "../controllers/user.controllers";
import { logout } from "../controllers/user.controllers";
import { getProfile } from "../controllers/user.controllers";

// these methods are available in Controllers

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("me", getProfile);

export default router;

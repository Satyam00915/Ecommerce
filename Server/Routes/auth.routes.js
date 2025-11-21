import { Router } from "express";
import {
  Login,
  Logout,
  Register,
} from "../Controllers/Auth/auth.controller.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const authRouter = Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.get("/logout", Logout);
authRouter.get("/checkAuth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated User",
    userInfo: user,
  });
});

export default authRouter;

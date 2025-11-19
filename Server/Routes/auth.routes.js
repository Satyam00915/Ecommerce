import { Router } from "express";
import { Register } from "../Controllers/Auth/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", Register);
// authRouter.post("/login");

export default authRouter;

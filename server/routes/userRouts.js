import { Router } from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controller/userController.js";
import { protect } from "../middleware/auth.js";
const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", protect, getUser);

export default userRouter;

import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { textMessageController } from "../controller/messageController.js";

const messageRouter = Router();

messageRouter.post("/text", protect, textMessageController);

export default messageRouter;

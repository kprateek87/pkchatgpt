import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { textMessageController } from "../controller/messageController.js";

const messageRouter = Router();

messageRouter.post("/:chatId", protect, textMessageController); // Dynamic route for sending messages to specific chat

export default messageRouter;

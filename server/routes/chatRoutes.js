import { Router } from "express";
import { protect } from "../middleware/auth.js";
import {
  createChat,
  deleteChat,
  getAllChats,
  getChatById,
} from "../controller/chatController.js";

const chatRouter = Router();
chatRouter.get("/create", protect, createChat);
chatRouter.get("/get", protect, getAllChats);
// chatRouter.get("/:chatId", protect, getChatById);
// chatRouter.delete("/:chatId", protect, deleteChat); 

export default chatRouter;

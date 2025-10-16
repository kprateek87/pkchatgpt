import { Router } from "express";
import { protect } from "../middleware/auth.js";
import {
  createChat,
  deleteChat,
  getAllChats,
  getChatById,
} from "../controller/chatController.js";

const chatRouter = Router();
chatRouter.post("/create", protect, createChat);
chatRouter.get("/get", protect, getAllChats);
chatRouter.get("/:chatId", protect, getChatById); // Dynamic route for individual chat
chatRouter.delete("/:chatId", protect, deleteChat); // Dynamic route for deleting specific chat

export default chatRouter;

import { Router } from "express";
import { protect } from "../middleware/auth.js";
import {
  createChat,
  deleteChat,
  getAllChats,
} from "../controller/chatController.js";
const chatRouter = Router();

chatRouter.post("/create", protect, createChat);
chatRouter.get("/get", protect, getAllChats);
chatRouter.delete("/delete", protect, deleteChat);

export default chatRouter;

import Chat from "../models/Chat.js";

export const createChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const chatData = {
      userId,
      messages: [],
      name: "New Chat",
      userName: req.user.name,
    };
    await Chat.create(chatData);
    res.json({ success: true, message: "Chat Created" });
  } catch (e) {
    return res.json({ success: false, message: e.message });
  }
};

export const getAllChats = async (req, res) => {
  try {
    const userId = req.user._id;
    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });
    res.json({ success: true, chats });
  } catch (e) {
    return res.json({ success: false, message: e.message });
  }
};

export const getChatById = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId } = req.params;
    const chat = await Chat.findOne({ _id: chatId, userId });

    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "Chat not found" });
    }

    res.json({ success: true, chat });
  } catch (e) {
    return res.json({ success: false, message: e.message });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId } = req.params; // Get chatId from URL params
    const chat = await Chat.findOneAndDelete({ _id: chatId, userId });

    if (!chat) {
      return res.status(404).json({ success: false, message: "Chat not found" });
    }

    res.json({ success: true, message: "Chat Deleted" });
  } catch (e) {
    return res.json({ success: false, message: e.message });
  }
};

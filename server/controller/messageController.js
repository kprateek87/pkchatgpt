import openai from "../config/openai.js";
import Chat from "../models/Chat.js";
import User from "../models/User.js";

export const textMessageController = async (req, res) => {
  try {
    const userId = req.user._id;
    if (req.user.credits < 2)
      return res.json({
        success: false,
        mesage: "You don't have enough  credits to use this feature",
      });
    const { chatId, prompt } = req.body;
    const chat = await Chat.findOne({ userId, _id: chatId });
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
    });
    const { choices } = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    const reply = { ...choices[0].message, timestamp: Date.now() };
    res.json({ success: true, reply });
    chat.message.push(reply);
    await chat.save();
    await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });
  } catch (e) {
    res.json({ success: false, mesage: e.mesage });
  }
};

console.log(response.choices[0].message);

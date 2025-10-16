import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.json({ success: false, message: "User Already Exists" });
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);
    res.json({ success: true, token });
  } catch (e) {
    return res.json({ success: false, message: e.message });
  }
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      const isMatch = await bcrypt.compare(password, userExists.password);
      if (isMatch) {
        const token = generateToken(userExists._id);
        return res.json({ success: true, token });
      }
    }
    res.json({ success: false, message: "invalid email or password " });
  } catch (e) {}
};
export const getUser = async (req, res) => {
  try {
    const user = req.user;
    return res.json({ success: true, user });
  } catch (e) {
    return res.json({ success: false, message: e.message });
  }
};

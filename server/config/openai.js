import { config } from "dotenv";
import { OpenAI } from "openai";
config();
const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});
export default openai;

import { config } from "dotenv";
import express from "express";
import connectDB from "./db.js";
import cors from "cors";
import userRouter from "./routes/userRouts.js";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
config();
const app = express();
await connectDB();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRouter);
app.use("/api/c", chatRouter);
app.use("/api/c", messageRouter);

app.get("/", (req, res) => res.send("server is live"));
app.listen(PORT, () => console.log("server is running on", PORT));

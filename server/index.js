import { config } from "dotenv";
import express from "express";
import connectDB from "./db.js";
import cors from "cors";
import userRouter from "./routes/userRouts.js";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import creditsRouter from "./routes/creditsRoutes.js";
import { stripeWebhooks } from "./controller/webhooks.js";
config();
const app = express();
await connectDB();
const PORT = process.env.PORT || 5001;
app.post('api/stripe',express.raw({type:'application/json'}),stripeWebhooks)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRouter);
app.use("/api/c", chatRouter);
app.use("/api/c/:chatId/messages", messageRouter);
app.use("/api/credit", creditsRouter);

app.get("/", (req, res) => res.send("server is live"));
app.listen(PORT, () => console.log("server is running on", PORT));

import { Router } from "express";
import { protect } from "../middleware/auth.js";
import { getPlans, purchasePlan } from "../controller/creditController.js";

const creditsRouter = Router();

creditsRouter.get("/plan", protect,getPlans );
creditsRouter.post("/purchase", protect,purchasePlan );

export default creditsRouter;

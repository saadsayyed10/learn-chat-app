import { Router } from "express";
import * as controllers from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/signUp", controllers.signUp);

export default authRoutes;

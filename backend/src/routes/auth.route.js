import { Router } from "express";
import * as controllers from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/signUp", controllers.signUp);
authRoutes.post("/login", controllers.login);
authRoutes.post("/logout", controllers.logout);

export default authRoutes;

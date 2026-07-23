import { Router } from "express";
import * as controllers from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const authRoutes = Router();

authRoutes.post("/signUp", controllers.signUp);
authRoutes.post("/login", controllers.login);
authRoutes.post("/logout", controllers.logout);

authRoutes.put("/update-profile", protectRoute, controllers.updateProfile);

export default authRoutes;

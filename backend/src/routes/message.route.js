import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
} from "../controllers/message.controller.js";

const messageRoutes = Router();

messageRoutes.get("/users", protectRoute, getUsersForSidebar);
messageRoutes.get("/:id", protectRoute, getMessages);

export default messageRoutes;

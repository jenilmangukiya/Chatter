import { Router } from "express";
import { getUserChatsList } from "../controllers/chat.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, getUserChatsList);

export default router;

import { Router } from "express";
import { getChat, getUserChatsList } from "../controllers/chat.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, getUserChatsList);

router.route("/:chatId").get(verifyJWT, getChat);

export default router;

import { Router } from "express";
import {
  clearChatData,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, getMessages).post(verifyJWT, sendMessage);

router.route("/clearChatData/:chatId").delete(verifyJWT, clearChatData);

export default router;

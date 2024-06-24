import { Router } from "express";
import {
  createGroup,
  getChat,
  getUserChatsList,
} from "../controllers/chat.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, getUserChatsList);

router.route("/:chatId").get(verifyJWT, getChat);

router.route("/createGroup").post(verifyJWT, createGroup);

export default router;

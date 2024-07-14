import { Router } from "express";
import {
  createGroup,
  deleteChat,
  deleteChatMember,
  getChat,
  getUserChatsList,
} from "../controllers/chat.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, getUserChatsList);

router.route("/:chatId").get(verifyJWT, getChat).delete(verifyJWT, deleteChat);

router.route("/createGroup").post(verifyJWT, createGroup);

router.route("/:chatId/:memberId").delete(verifyJWT, deleteChatMember);

export default router;

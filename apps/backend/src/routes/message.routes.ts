import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, getMessages).post(verifyJWT, sendMessage);

export default router;

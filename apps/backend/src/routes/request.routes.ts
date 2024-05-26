import { Router } from "express";
import { sendFriendRequest } from "../controllers/request.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT);

router.route("/").post(verifyJWT, sendFriendRequest);

export default router;

import { Router } from "express";
import {
  getRequests,
  sendFriendRequest,
} from "../controllers/request.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, getRequests);

router.route("/").post(verifyJWT, sendFriendRequest);

export default router;

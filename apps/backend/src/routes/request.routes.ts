import { Router } from "express";
import {
  approveRequest,
  cancelFriendRequest,
  getRequests,
  sendFriendRequest,
} from "../controllers/request.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/")
  .get(verifyJWT, getRequests)
  .post(verifyJWT, sendFriendRequest);

router.route("/:requestId").delete(verifyJWT, cancelFriendRequest);

router.route("/approveRequest/:requestId").post(verifyJWT, approveRequest);

export default router;

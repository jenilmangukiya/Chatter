import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  getExploreUsers,
  getUser,
  getUsers,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateUserAvatar,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, getUsers);
router.route("/getExploreUsers").get(verifyJWT, getExploreUsers);
router.route("/current-user").get(verifyJWT, getCurrentUser);

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);

router.route("/refreshAccessToken").post(refreshAccessToken);

router.route("/changeCurrentPassword").post(verifyJWT, changeCurrentPassword);
router
  .route("/updateUserAvatar")
  .post(upload.single("avatar"), verifyJWT, updateUserAvatar);

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/:userId").get(verifyJWT, getUser);

export default router;

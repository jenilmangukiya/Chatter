import { Response } from "express";
import mongoose from "mongoose";
import { Request } from "../models/request.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { RequestExpress } from "../utils/types.js";

export const sendFriendRequest = asyncHandler(
  async (req: RequestExpress, res: Response) => {
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId))
      throw new ApiError(404, "Invalid user");

    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const doesRequestExist = await Request.findOne({
      sender: req.user._id,
      receiver: userId,
    });

    console.log("doesRequestExist", doesRequestExist);
    if (doesRequestExist) {
      throw new ApiError(400, "Request already sended");
    }

    const request = Request.create({
      sender: req.user._id,
      receiver: userId,
    });

    if (!request) {
      throw new ApiError(500, "Failed to send request");
    }

    res
      .status(201)
      .json(new ApiResponse(201, request, "Request sent successfully"));
  }
);

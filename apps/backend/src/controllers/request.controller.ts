import { Response } from "express";
import mongoose, { PipelineStage } from "mongoose";
import { Request } from "../models/request.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { RequestExpress } from "../utils/types.js";

export const getRequests = asyncHandler(
  async (req: RequestExpress, res: Response) => {
    const pipeline: PipelineStage[] = [];

    if (req.query?.type === "received") {
      pipeline.push({
        $match: {
          receiver: req.user._id,
        },
      });
    } else {
      pipeline.push({
        $match: {
          sender: req.user._id,
        },
      });
    }

    pipeline.push(
      {
        $lookup: {
          from: "users",
          localField: req.query?.type == "received" ? "sender" : "receiver",
          foreignField: "_id",
          as: "user_details",
        },
      },
      {
        $unwind: "$user_details",
      },
      {
        $project: {
          user_details: 1,
        },
      },
      {
        $addFields: {
          requestId: "$_id",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ requestId: "$requestId" }, "$user_details"],
          },
        },
      },
      {
        $project: {
          refreshToken: 0,
          password: 0,
          __v: 0,
        },
      }
    );

    const request = await Request.aggregate(pipeline);

    res.status(200).json(new ApiResponse(200, request));
  }
);

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

export const cancelFriendRequest = asyncHandler(
  async (req: RequestExpress, res: Response) => {
    const { requestId } = req.params;

    // check if the requestId Id is in correct format
    if (!mongoose.Types.ObjectId.isValid(requestId))
      throw new ApiError(404, "Invalid Request");

    const isRequestExist: any = await Request.find({
      $and: [
        {
          _id: requestId,
        },
        {
          $or: [
            {
              sender: req.user._id,
            },
            {
              receiver: req.user._id,
            },
          ],
        },
      ],
    });

    if (!isRequestExist || isRequestExist.length <= 0) {
      throw new ApiError(401, "Unauthorized");
    }

    const request = await Request.findByIdAndDelete(requestId);

    if (!request) {
      throw new ApiError(404, "Request not found");
    }

    res.status(204).json(new ApiResponse(204, {}));
  }
);

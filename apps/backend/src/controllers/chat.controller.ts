import { Response } from "express";
import { PipelineStage } from "mongoose";
import { Chat } from "../models/chat.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { RequestExpress } from "../utils/types.js";

export const getUserChatsList = asyncHandler(
  async (req: RequestExpress, res: Response) => {
    const pipeline: PipelineStage[] = [];

    pipeline.push(
      {
        $lookup: {
          from: "chatmembers",
          localField: "_id",
          foreignField: "chat",
          as: "users",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user_data",
              },
            },
            {
              $unwind: "$user_data",
            },
            {
              $replaceRoot: {
                newRoot: "$user_data",
              },
            },
          ],
        },
      },
      {
        $match: {
          users: {
            $elemMatch: {
              _id: req.user._id,
            },
          },
        },
      }
    );

    const request = await Chat.aggregate(pipeline);

    res.status(200).json(new ApiResponse(200, request));
  }
);

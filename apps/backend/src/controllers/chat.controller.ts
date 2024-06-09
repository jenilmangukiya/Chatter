import { Response } from "express";
import { ObjectId } from "mongodb";
import mongoose, { PipelineStage } from "mongoose";
import { Chat } from "../models/chat.model.js";
import { ApiError } from "../utils/ApiError.js";
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

export const getChat = asyncHandler(
  async (req: RequestExpress, res: Response) => {
    const { chatId } = req.params;
    console.log("chatId", chatId);

    if (!mongoose.Types.ObjectId.isValid(chatId))
      throw new ApiError(404, "Invalid chatId");

    const chat = await Chat.aggregate([
      {
        $match: {
          _id: new ObjectId(chatId),
        },
      },
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
            {
              $project: {
                _id: 1,
                email: 1,
                fullName: 1,
                avatar: 1,
              },
            },
          ],
        },
      },
    ]);

    if (!chat?.[0]) throw new ApiError(404, "Chat not found");

    res.status(200).json(new ApiResponse(200, chat[0]));
  }
);

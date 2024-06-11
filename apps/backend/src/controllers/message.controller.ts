import { Response } from "express";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { ChatMember } from "../models/chatMember.model.js";
import { Message } from "../models/message.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { RequestExpress } from "../utils/types.js";
import { QueryParams } from "./types.js";

export const sendMessage = asyncHandler(
  async (req: RequestExpress, res: Response) => {
    const { content, chatId, type } = req.body;

    if (!mongoose.Types.ObjectId.isValid(chatId))
      throw new ApiError(404, "Invalid Chat");

    if (!content || !chatId || !type) {
      throw new ApiError(400, "Bad request!, please pass all required fields");
    }

    if (!["message", "image"].includes(type.toLowerCase())) {
      throw new ApiError(200, "Invalid chat type");
    }

    const isValidUser = await ChatMember.findOne({
      user: req.user._id,
      chat: chatId,
    });

    if (!isValidUser) {
      throw new ApiError(401, "Unauthorized request");
    }

    const message = await Message.create({
      chat: chatId,
      content,
      type,
      sender: req.user._id,
    });

    if (!message) {
      throw new ApiError(201, "Something went wrong!, please try again");
    }

    res.status(200).json(new ApiResponse(201, message));
  }
);

export const getMessages = asyncHandler(
  async (req: RequestExpress, res: Response) => {
    const {
      page = 1,
      limit = 10,
      query,
      sortBy,
      sortType = "desc",
    } = req.query as QueryParams;
    const chatId: any = req.query?.chatId || "";

    const aggregation: any = [];

    if (!chatId) {
      throw new ApiError(
        400,
        "The required parameter 'chatID' is missing. Please provide a valid 'chatID' and try again."
      );
    }

    if (chatId) {
      aggregation.push({
        $match: {
          chat: new ObjectId(chatId.toString()),
        },
      });
    }

    aggregation.push(
      {
        $lookup: {
          from: "users",
          localField: "sender",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $addFields: {
          username: "$user.fullName",
          avatar: "$user.avatar",
        },
      },
      {
        $project: {
          user: 0,
          __v: 0,
        },
      }
    );

    const sortOrder = sortType?.toLowerCase() === "desc" ? -1 : 1;
    aggregation.push({
      $sort: {
        createdAt: sortOrder,
      },
    });

    const options = {
      page: +page,
      limit: +limit,
    };

    const pipeline = Message.aggregate(aggregation);

    const userPaginated = await Message.aggregatePaginate(pipeline, options);

    res.status(200).json(new ApiResponse(200, userPaginated));
  }
);

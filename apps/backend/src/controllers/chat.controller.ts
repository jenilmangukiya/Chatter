import { Response } from "express";
import { ObjectId } from "mongodb";
import mongoose, { PipelineStage } from "mongoose";
import { Chat } from "../models/chat.model.js";
import { ChatMember } from "../models/chatMember.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { RequestExpress } from "../utils/types.js";

export const getUserChatsList = asyncHandler(
  async (req: RequestExpress, res: Response) => {
    const pipeline: PipelineStage[] = [];
    const query = req.query.query as any;

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
      },
      {
        $match: {
          $or: [
            {
              users: {
                $elemMatch: {
                  _id: {
                    $ne: req.user._id,
                  },
                  fullName: {
                    $regex: new RegExp(query, "i"),
                  },
                },
              },
              isGroupChat: false,
            },
            {
              groupTitle: {
                $regex: new RegExp(query, "i"),
              },
            },
          ],
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

export const createGroup = asyncHandler(
  async (req: RequestExpress, res: Response) => {
    const { groupTitle, members } = req.body;

    if (!groupTitle) {
      throw new ApiError(400, "groupTitle is required");
    }

    if (!members || members?.length < 3) {
      throw new ApiError(
        400,
        "Minimum 3 members are required to create an group"
      );
    }
    const uniqueMembers = [...new Set(members)];

    let multiInsertMembers: any = [];
    for (const element of uniqueMembers) {
      if (mongoose.Types.ObjectId.isValid(element as any)) {
        const doesUserExist = await User.findById(element);
        if (doesUserExist) {
          multiInsertMembers.push(doesUserExist._id);
        }
      }
    }

    if (!multiInsertMembers || multiInsertMembers.length < 3) {
      throw new ApiError(
        400,
        "Minimum 3 Valid members are required to create an group"
      );
    }

    const newGroup = await Chat.create({
      groupTitle: groupTitle,
      isGroupChat: true,
    });

    if (!newGroup) {
      throw new ApiError(500, "Something went wrong please try again!");
    }

    multiInsertMembers = multiInsertMembers.map((user: string) => {
      return {
        chat: newGroup._id,
        user: user,
      };
    });
    multiInsertMembers.push({
      chat: newGroup._id,
      user: req.user._id,
    });

    await ChatMember.insertMany(multiInsertMembers);

    res
      .status(200)
      .json(new ApiResponse(200, newGroup, "Group created Successfully"));
  }
);

export const deleteChatMember = asyncHandler(
  async (req: RequestExpress, res: Response) => {
    const { chatId, memberId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(chatId))
      throw new ApiError(404, "Invalid chatId");

    if (!mongoose.Types.ObjectId.isValid(memberId))
      throw new ApiError(404, "Invalid memberId");

    const chat = await Chat.findById(chatId);

    if (!chat) {
      throw new ApiError(404, "Invalid chatId");
    }

    const isChatMember = await ChatMember.findOne({
      chat: chatId,
      user: memberId,
    });

    if (!isChatMember) {
      throw new ApiError(404, "This user is not part of this chat");
    }

    const isIamPartOfChat = await ChatMember.findOne({
      chat: chatId,
      user: req.user._id,
    });

    if (!isIamPartOfChat) {
      throw new ApiError(401, "Not authorized to Remove User");
    }

    const isThereOnlyThreeMembers = await ChatMember.countDocuments({
      chat: chatId,
    });

    if (isThereOnlyThreeMembers <= 3) {
      throw new ApiError(
        400,
        "Can not remove the User As minimum three members are required for Group Chat"
      );
    }

    const deleted = await ChatMember.findByIdAndDelete(isChatMember._id);

    if (!deleted) {
      throw new ApiError(500, "Something when wrong please try again");
    }

    res.status(204).json(new ApiResponse(204, isThereOnlyThreeMembers));
  }
);

export const deleteChat = asyncHandler(
  async (req: RequestExpress, res: Response) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId))
      throw new ApiError(404, "Invalid userId");

    const chat: any = await Chat.aggregate([
      {
        $match: {
          isGroupChat: false,
        },
      },
      {
        $lookup: {
          from: "chatmembers",
          localField: "_id",
          foreignField: "chat",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user_data",
                pipeline: [
                  {
                    $match: {
                      $or: [
                        { _id: req.user._id },
                        { _id: new ObjectId(userId) },
                      ],
                    },
                  },
                ],
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
          as: "users",
        },
      },
      {
        $match: {
          $expr: { $gte: [{ $size: "$users" }, 2] },
        },
      },
    ]);

    if (!chat || !chat.length) {
      throw new ApiError(404, "Chat not found");
    }

    const chatId = chat[0]._id;

    const session = await mongoose.startSession();
    session.startTransaction();

    const members = await ChatMember.deleteMany(
      {
        chat: chatId,
      },
      { session: session }
    );

    if (!members?.deletedCount) {
      await session.abortTransaction();
      session.endSession();
      throw new ApiError(
        500,
        "Something went wrong while deleting members,please try again!"
      );
    }

    const message = await Message.deleteMany(
      {
        chat: chatId,
      },
      { session: session }
    );

    if (!message?.acknowledged) {
      await session.abortTransaction();
      session.endSession();
      throw new ApiError(
        500,
        "Something went wrong while deleting messages, please try again!"
      );
    }

    const chatData = await Chat.findByIdAndDelete(chatId, { session: session });

    if (!chatData) {
      await session.abortTransaction();
      session.endSession();
      throw new ApiError(
        500,
        "Something went wrong while deleting Chat, please try again!"
      );
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(204).json(new ApiResponse(204, null));
  }
);

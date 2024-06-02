import mongoose, { Types } from "mongoose";

interface IChatMember {
  chat: Types.ObjectId;
  user: Types.ObjectId;
}

const chatMemberSchema = new mongoose.Schema<IChatMember>(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const ChatMember = mongoose.model("ChatMember", chatMemberSchema);

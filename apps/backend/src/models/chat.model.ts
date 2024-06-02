import mongoose from "mongoose";

interface IChat {
  isGroupChat: boolean;
}

const chatSchema = new mongoose.Schema<IChat>(
  {
    isGroupChat: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);

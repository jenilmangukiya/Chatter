import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    isGroupChat: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);

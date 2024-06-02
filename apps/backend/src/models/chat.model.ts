import mongoose from "mongoose";

interface IChat {
  isGroupChat: boolean;
  groupTitle: string;
}

const chatSchema = new mongoose.Schema<IChat>(
  {
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    groupTitle: {
      type: String,
      default: "untitled group",
    },
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);

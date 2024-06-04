import mongoose, { Types } from "mongoose";

interface IChatMessage {
  type: "image" | "message";
  chat: Types.ObjectId;
  sender: Types.ObjectId;
  content: string;
  attachment: string;
}

const messageSchema = new mongoose.Schema<IChatMessage>(
  {
    type: {
      type: String,
      required: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: String,
    attachment: String,
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    Sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: String,
    attachment: String,
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);

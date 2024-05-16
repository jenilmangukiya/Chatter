import mongoose from "mongoose";

const groupMemberSchema = new mongoose.Schema(
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

export const GroupMember = mongoose.model("GroupMember", groupMemberSchema);

import mongoose, { Types } from "mongoose";

interface IUser {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
}

const requestSchema = new mongoose.Schema<IUser>(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Request = mongoose.model("Request", requestSchema);

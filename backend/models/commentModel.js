import mongoose from "mongoose";

export const commentSchema = mongoose.Schema(
  {
    comment: { type: String, required: true, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    replies: [
      {
        reply: { type: String, required: true, trim: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

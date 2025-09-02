import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  replies: [
    {
      reply: { type: String, required: true }, // must match frontend key
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

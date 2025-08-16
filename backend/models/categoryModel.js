import mongoose from "mongoose";

export const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);

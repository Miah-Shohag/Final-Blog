import mongoose from "mongoose";
import slugify from "slugify";
import { commentSchema } from "./commentModel.js";

// Post Schema
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: { type: String, required: true },

    // ✅ Optional image object for Cloudinary
    image: {
      url: { type: String, required: false },
      public_id: { type: String, required: false },
    },

    comments: [commentSchema], // commentSchema should have `text` field
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    tags: [],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    views: { type: Number, default: 0 },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);

// Slug generation
postSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export const Post = mongoose.model("Post", postSchema);

import { Post } from "../models/postModel.js";
import slugify from "slugify";
import User from "../models/userModel.js";
import cloudinary from "../config/cloudinary.js"; // make sure you have this

// ========== ADD POST ==========
const addPost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { title, slug, content, category, tags, status } = req.body;

    if (!title || !content || !category || !status) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required.",
      });
    }

    // ✅ Cloudinary returns path and filename
    const imageUrl = req.file.path;
    const publicId = req.file.filename;

    const newPost = new Post({
      title,
      slug: slug || slugify(title, { lower: true, strict: true }),
      content,
      image: { url: imageUrl, public_id: publicId }, // ✅ fixed
      category,
      tags,
      status: status || "draft",
      author: userId,
    });

    await newPost.save();
    await User.findByIdAndUpdate(userId, { $push: { posts: newPost._id } });

    return res.status(201).json({
      success: true,
      message: "Post added successfully!",
      post: newPost,
    });
  } catch (error) {
    next(error);
  }
};

// ========== GET ALL POSTS ==========
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("author", "username image")
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All posts retrieved successfully.",
      posts,
    });
  } catch (error) {
    next(error);
  }
};

// ========== GET USER POSTS ==========
const getPostsByUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const posts = await Post.find({ author: userId })
      .populate("category", "name")
      .populate("author", "username email");

    if (!posts.length) {
      return res.status(404).json({
        success: false,
        message: "No posts found for this user.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User posts retrieved successfully.",
      posts,
    });
  } catch (error) {
    next(error);
  }
};

// ========== GET SINGLE POST ==========
const getSinglePost = async (req, res, next) => {
  try {
    const slug = req.params.slug;

    const post = await Post.findOne({ slug })
      .populate("author", "username email image")
      .populate("category", "name")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "username image",
        },
      });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post retrieved successfully.",
      post,
    });
  } catch (error) {
    next(error);
  }
};

// ========== EDIT POST ==========
const editPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { title, slug, content, category, tags, status } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    post.title = title || post.title;
    post.slug = slug || slugify(post.title, { lower: true, strict: true });
    post.content = content || post.content;
    post.category = category || post.category;
    post.tags = tags || post.tags;
    post.status = status || post.status;

    if (req.file) {
      // ❌ Your old version replaced object with string
      // ✅ Fixed: update object { url, public_id }
      post.image = { url: req.file.path, public_id: req.file.filename };
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully.",
      post,
    });
  } catch (error) {
    next(error);
  }
};

// ========== DELETE POST ==========
const deletePost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    if (post.author.toString() !== userId && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this post.",
      });
    }

    // ✅ Remove image from Cloudinary before deleting post
    if (post.image?.public_id) {
      await cloudinary.uploader.destroy(post.image.public_id);
    }

    await Post.findByIdAndDelete(postId);

    await User.findByIdAndUpdate(post.author, {
      $pull: { posts: postId },
    });

    res.status(200).json({
      success: true,
      message: "Post deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// ✅ Like a Post
const likePost = async (req, res, next) => {
  const userId = req.user.id;
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (post.likes.includes(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "You already liked this post." });
    }

    post.likes.push(userId);
    await post.save();

    return res.status(200).json({
      success: true,
      message: "Post liked successfully",
      likesCount: post.likes.length,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ Unlike a Post
const unlikePost = async (req, res, next) => {
  const userId = req.user.id;
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (!post.likes.includes(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "You haven't liked this post yet." });
    }

    post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post unliked successfully",
      likesCount: post.likes.length,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ Add Comment
const addComment = async (req, res, next) => {
  const userId = req.user.id;
  const slug = req.params.slug;

  try {
    const { comment } = req.body;

    if (!comment || comment.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Comment cannot be empty." });
    }

    const post = await Post.findOne({ slug });
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found." });
    }

    const newComment = {
      comment,
      user: userId,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    const addedComment = post.comments[post.comments.length - 1];

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: addedComment,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ Reply to Comment
const replyToComment = async (req, res, next) => {
  try {
    const { slug, id } = req.params;
    const { reply } = req.body;

    if (!reply || reply.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Reply cannot be empty." });
    }

    const post = await Post.findOne({ slug });
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    const comment = post.comments.id(id);
    if (!comment)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });

    comment.replies.push({
      reply,
      user: req.user.id,
      createdAt: new Date(),
    });

    await post.save();

    res.status(201).json({
      success: true,
      message: "Reply added successfully",
      comment,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ Get Related Posts
const relatedPosts = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const currentPost = await Post.findOne({ slug });
    if (!currentPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const related = await Post.find({
      _id: { $ne: currentPost._id },
      $or: [
        { category: { $in: currentPost.category } },
        { tags: { $in: currentPost.tags } },
      ],
    })
      .limit(3)
      .sort({ createdAt: -1 })
      .populate("author", "username image")
      .select("title slug createdAt image author");

    return res.status(200).json({
      success: true,
      message: "Related posts retrieved successfully.",
      posts: related,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ Edit Comment
const editComment = async (req, res, next) => {
  try {
    const { slug, id } = req.params;
    const { comment } = req.body;

    if (!comment || comment.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Comment cannot be empty." });
    }

    const post = await Post.findOne({ slug });
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    const existingComment = post.comments.id(id);
    if (!existingComment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    // only author can edit their comment
    if (existingComment.user.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Not authorized to edit this comment",
        });
    }

    existingComment.comment = comment;
    existingComment.updatedAt = new Date();

    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      comment: existingComment,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ Delete Comment
const deleteComment = async (req, res, next) => {
  try {
    const { slug, id } = req.params;

    const post = await Post.findOne({ slug });
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    const comment = post.comments.id(id);
    if (!comment)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });

    // only author or post owner can delete
    if (
      comment.user.toString() !== req.user.id.toString() &&
      post.author.toString() !== req.user.id.toString()
    ) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Not authorized to delete this comment",
        });
    }

    comment.deleteOne();
    await post.save();

    res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// ✅ Edit Reply
const editReply = async (req, res, next) => {
  try {
    const { slug, commentId, replyId } = req.params;
    const { reply } = req.body;

    if (!reply || reply.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Reply cannot be empty." });
    }

    const post = await Post.findOne({ slug });
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });

    const existingReply = comment.replies.id(replyId);
    if (!existingReply)
      return res
        .status(404)
        .json({ success: false, message: "Reply not found" });

    if (existingReply.user.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized to edit this reply" });
    }

    existingReply.reply = reply;
    existingReply.updatedAt = new Date();

    await post.save();

    res.status(200).json({
      success: true,
      message: "Reply updated successfully",
      reply: existingReply,
    });
  } catch (error) {
    next(error);
  }
};

// ✅ Delete Reply
const deleteReply = async (req, res, next) => {
  try {
    const { slug, commentId, replyId } = req.params;

    const post = await Post.findOne({ slug });
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });

    const reply = comment.replies.id(replyId);
    if (!reply)
      return res
        .status(404)
        .json({ success: false, message: "Reply not found" });

    if (
      reply.user.toString() !== req.user.id.toString() &&
      post.author.toString() !== req.user.id.toString()
    ) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Not authorized to delete this reply",
        });
    }

    reply.deleteOne();
    await post.save();

    res
      .status(200)
      .json({ success: true, message: "Reply deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export {
  addPost,
  getPosts,
  getPostsByUser,
  getSinglePost,
  editPost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  replyToComment,
  relatedPosts,
};

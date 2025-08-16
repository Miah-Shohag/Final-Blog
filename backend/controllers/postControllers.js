import { Post } from "../models/postModel.js";
import slugify from "slugify";
import User from "../models/userModel.js";

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

    // if (!req.file) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Image is required.",
    //   });
    // }

    // const imageUrl = req.file ? req.file.path : null;

    const newPost = new Post({
      title,
      slug: slug || slugify(title, { lower: true, strict: true }),
      content,
      // image: imageUrl, // Cloudinary image URLKW
      category,
      tags,
      status: status || "draft",
      author: userId,
    });
    0;
    await newPost.save();
    await User.findByIdAndUpdate(userId, { $push: { posts: newPost._id } });

    return res.status(201).json({
      success: true,
      message: "Post added successfully!",
      post: newPost,
    });
  } catch (error) {
    next(error); // Forward to errorHandler middleware
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

    const post = await Post.find({ slug: slug })
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
      post.image = req.file.path;
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

const likePost = async (req, res, next) => {
  const userId = req.user.id;
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: "You already liked the post." });
    }

    post.likes.push(userId);
    await post.save();

    return res
      .status(200)
      .json({ message: "Post liked", likes: post.likes.length });
  } catch (error) {
    next(error);
  }
};

const unlikePost = async (req, res, next) => {
  const userId = req.user.id;
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
    await post.save();

    res.status(200).json({ message: "Post unliked", likes: post.likes.length });
  } catch (error) {
    next(error);
  }
};

const addComment = async (req, res, next) => {
  const userId = req.user.id;
  const slug = req.params.slug;

  try {
    const { comment } = req.body;

    const post = await Post.findOne({ slug });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    const newComment = {
      comment,
      user: userId,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    // Return the newly added comment (last one in array)
    const addedComment = post.comments[post.comments.length - 1];

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: addedComment,
    });
  } catch (error) {
    next(error); // Don't forget to pass the error
  }
};

// Add a reply to a comment
const replyToComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.replies.push({
      reply: req.body.reply,
      user: req.user._id,
      createdAt: new Date(),
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const relatedPosts = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const currentPost = await Post.findOne({ slug: slug });

    if (!currentPost) {
      return res.status(404).json({ success: false, message: "Post no found" });
    }

    const relatedPosts = await Post.find({
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
      message: "Related posts retrieved.",
      posts: relatedPosts,
    });
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
  relatedPosts,
  likePost,
  unlikePost,
  addComment,
  replyToComment,
};

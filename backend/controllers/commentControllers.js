import { Post } from "../models/postModel.js";

const commenetReply = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const commentId = req.params.id;
    const { reply } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status().json({
        success: false,
        message: "Post not available.",
      });
    }

    const comment = await Post.comments.find({ _id: commentId });
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found.",
      });
    }

    // Push the reply to the comment
    comment.replies.push({
      reply,
      user: userId,
    });

    await post.save();

    res.status(200).json({
      success: true,
      message: "Reply added successfully.",
      comment,
    });
  } catch (error) {
    next(error);
  }
};

import { Post } from "../models/postModel.js";

const addComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required.",
      });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    post.comments.push({
      comment,
      user: userId,
      replies: [],
    });

    await post.save();

    res.status(201).json({
      success: true,
      message: "Comment added successfully.",
      comments: post.comments,
    });
  } catch (error) {
    next(error);
  }
};

export { addComment, commenetReply };

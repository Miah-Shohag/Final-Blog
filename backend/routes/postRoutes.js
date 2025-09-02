import { Router } from "express";
import {
  addComment,
  addPost,
  deletePost,
  editPost,
  getPosts,
  getSinglePost,
  relatedPosts,
  replyToComment,
} from "../controllers/postControllers.js";
import { Protected } from "../middlewares/protected.js";
import { multerErrorHandler, upload } from "../middlewares/upload.js";

const postRouter = Router();

postRouter.post(
  "/create-post",
  Protected,
  upload.single("image"),
  multerErrorHandler,
  addPost
);
postRouter.get("", getPosts);
postRouter.get("/:slug", getSinglePost);

postRouter.put(
  "/edit-post/:id",
  Protected,
  upload.single("image"),
  multerErrorHandler,
  editPost
);
postRouter.delete("/:id", Protected, deletePost);
postRouter.get("/:slug/related", relatedPosts);
postRouter.post("/:slug/comment", Protected, addComment);
postRouter.post("/:slug/comment/:id/reply", Protected, replyToComment);
export default postRouter;

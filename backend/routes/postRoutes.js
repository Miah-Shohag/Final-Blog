import { Router } from "express";
import {
  addPost,
  deletePost,
  editPost,
  getPosts,
  getSinglePost,
} from "../controllers/postControllers.js";
import { Protected } from "../middlewares/protected.js";
import { multerErrorHandler, upload } from "../middlewares/uploadImage.js";

const postRouter = Router();

postRouter.post("/create-post", Protected, addPost);
postRouter.get("", Protected, getPosts);
postRouter.get("/:slug", Protected, getSinglePost);

postRouter.put(
  "/edit-post/:id",
  Protected,
  upload.single("image"),
  multerErrorHandler,
  editPost
);
postRouter.delete("/:id", Protected, deletePost);

export default postRouter;

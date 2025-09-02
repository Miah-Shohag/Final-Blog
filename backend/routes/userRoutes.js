import { Router } from "express";
import {
  getSingleUser,
  login,
  logOut,
  register,
  updateImage,
} from "../controllers/userControllers.js";
import { Protected } from "../middlewares/protected.js";
import { multerErrorHandler, upload } from "../middlewares/upload.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/me", Protected, getSingleUser);
userRouter.put(
  "/upload-avatar",
  Protected,
  upload.single("image"),
  multerErrorHandler,
  updateImage
);
userRouter.post("/logout", Protected, logOut);

export default userRouter;

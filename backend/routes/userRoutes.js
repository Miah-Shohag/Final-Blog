import { Router } from "express";
import {
  getSingleUser,
  login,
  logOut,
  register,
} from "../controllers/userControllers.js";
import { Protected } from "../middlewares/protected.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/me", Protected, getSingleUser);
userRouter.post("/logout", Protected, logOut);

export default userRouter;

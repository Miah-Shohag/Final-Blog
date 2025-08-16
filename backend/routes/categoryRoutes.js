import { Router } from "express";
import { Protected } from "../middlewares/protected.js";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategoriesById,
  updateCategory,
} from "../controllers/categoryControllers.js";

const categoryRouter = Router();

categoryRouter.post("/add-category", Protected, addCategory);
categoryRouter.get("", getAllCategories);
categoryRouter.get("/single-category/:id", Protected, getCategoriesById);
categoryRouter.put("/:id", Protected, updateCategory);
categoryRouter.delete("/:id", Protected, deleteCategory);

export default categoryRouter;

import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  axios.defaults.baseURL = "http://localhost:3000";

  const [categories, setCategories] = useState([]);
  const [singleCat, setSingleCat] = useState(null);

  // ✅ Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/categories", { withCredentials: true });
      setCategories(res.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch categories."
      );
    }
  };
  // ✅ Fetch all categories
  const fetchCategoriesById = async (id) => {
    try {
      const res = await axios.get(`/api/categories/single-category/${id}`, {
        withCredentials: true,
      });
      console.log(res.data);
      setSingleCat(res.data.category);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch categories."
      );
    }
  };

  // ✅ Add category
  const addCategory = async (formData) => {
    try {
      const res = await axios.post("/api/categories/add-category", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      toast.success(res.data.success || "Category added successfully");
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Category not created.");
    }
  };

  // ✅ Update category
  const updateCategory = async (id, updatedData) => {
    console.log(id);
    try {
      const res = await axios.put(`/api/categories/${id}`, updatedData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      toast.success(res.data.success || "Category updated successfully");
      fetchCategories();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update category."
      );
    }
  };

  // ✅ Delete category
  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/categories/${id}`, {
        withCredentials: true,
      });

      toast.success(res.data.success || "Category deleted successfully");
      fetchCategories();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete category."
      );
    }
  };

  // ✅ Auto-fetch when provider mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        axios,
        categories,
        fetchCategories,
        fetchCategoriesById,
        addCategory,
        updateCategory,
        deleteCategory,
        singleCat,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

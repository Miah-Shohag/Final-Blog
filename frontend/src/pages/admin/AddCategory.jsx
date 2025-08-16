import React, { useContext, useState } from "react";
import GlobalButton from "../../components/GlobalButton";
import InputField from "../../components/InputField";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../hooks/CategoryContext";

const AddCategory = () => {
  const { addCategory } = useContext(CategoryContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addCategory(formData);
      setFormData({ name: "", description: "" });
    } catch (err) {
      // Error already handled in context, optional logging
      console.error("Add category failed in UI:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-[80%] mx-auto bg-white dark:bg-dark-primary shadow-md rounded-lg">
      <div className="flex justify-between items-center gap-5">
        <h2 className="text-xl font-semibold">Add New Category</h2>
        <Link
          to="/dashboard/categories"
          className="bg-gradient-to-r from-fuchsia-500 to-violet-700 px-4 py-2 text-white text-xs font-semibold rounded-lg shadow-lg shadow-secondary/30 my-3 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
        >
          All Categories
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <InputField
            label="Category Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter category name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Description (optional)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-slate-300 dark:border-gray-600 px-4 py-2 text-sm dark:text-gray-300 text-black placeholder:text-slate-400 focus:ring-1 focus:ring-secondary focus:outline-none focus:border-0 rounded-md"
            rows="3"
            placeholder="Add some details"
          />
        </div>

        <GlobalButton
          type="submit"
          title={loading ? "Submitting..." : "Add Category"}
          disabled={loading}
          customClass="w-fit"
        />
      </form>
    </div>
  );
};

export default AddCategory;

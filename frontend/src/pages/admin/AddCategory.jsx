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
      console.error("Add category failed in UI:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-[90%] md:max-w-[70%] mx-auto bg-white dark:bg-dark-primary shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Add New Category
        </h2>
        <Link
          to="/dashboard/categories"
          className="bg-gradient-to-r from-fuchsia-500 to-violet-700 px-4 py-2 text-white text-xs font-semibold rounded-lg shadow-lg shadow-secondary/30 hover:scale-105 transition-transform duration-300"
        >
          All Categories
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <InputField
          label="Category Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter category name"
        />

        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description (optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-slate-300 dark:border-gray-600 px-4 py-2 text-sm dark:text-gray-300 text-black placeholder:text-slate-400 focus:ring-1 focus:ring-secondary focus:outline-none focus:border-0 rounded-md resize-none"
            rows="4"
            placeholder="Add some details"
          />
        </div>

        <GlobalButton
          type="submit"
          title={loading ? "Submitting..." : "Add Category"}
          disabled={loading}
          customClass="w-fit px-5 py-2"
        />
      </form>
    </div>
  );
};

export default AddCategory;

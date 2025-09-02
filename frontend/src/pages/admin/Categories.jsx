import React, { useState, useEffect, useContext, useCallback } from "react";
import toast from "react-hot-toast";
import { ImCancelCircle } from "react-icons/im";
import { CategoryContext } from "../../hooks/CategoryContext";

const Categories = () => {
  const [editCategory, setEditCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showSingleCat, setShowSingleCat] = useState(false);
  const [singleCatLoading, setSingleCatLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  const {
    fetchCategories,
    fetchCategoriesById,
    categories,
    updateCategory,
    deleteCategory,
    singleCat,
  } = useContext(CategoryContext);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (categories) {
      setFilteredCategories(
        categories.filter(
          (cat) =>
            cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cat.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, categories]);

  const handleEscClose = useCallback((e) => {
    if (e.key === "Escape") {
      setEditCategory(null);
      setCategoryToDelete(null);
      setShowSingleCat(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleEscClose);
    return () => {
      window.removeEventListener("keydown", handleEscClose);
    };
  }, [handleEscClose]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = (category) => {
    setEditCategory(category);
    setFormData({ name: category.name, description: category.description });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateCategory(editCategory._id, formData);
      toast.success("Category updated successfully");
      setEditCategory(null);
      setFormData({ name: "", description: "" });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteCategory(id);
      toast.success("Category deleted successfully");
      setCategoryToDelete(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const singleCatLink = async (id) => {
    setSingleCatLoading(true);
    await fetchCategoriesById(id);
    setSingleCatLoading(false);
    setShowSingleCat(true);
  };

  return (
    <div className="p-6 dark:bg-dark-primary min-h-screen">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or description..."
          className="w-full md:w-1/3 px-4 py-2 border rounded-md text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-dark-secondary dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-secondary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md bg-white dark:bg-dark-secondary">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 dark:bg-dark-primary text-gray-700 dark:text-gray-300 uppercase text-xs">
            <tr>
              <th className="px-4 py-2 text-left">S/N</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Author</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories?.map((cat, index) => (
              <tr
                key={cat._id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-primary transition"
              >
                <td className="px-4 py-3 text-sm font-medium text-secondary">
                  {index + 1}
                </td>
                <td
                  onClick={() => singleCatLink(cat._id)}
                  className="px-4 py-3 text-sm font-semibold cursor-pointer text-blue-600 hover:underline"
                >
                  {cat.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200">
                  {cat.description.length > 30
                    ? cat.description.substring(0, 30) + "..."
                    : cat.description}
                </td>
                <td className="px-4 py-3 text-xs text-green-700 font-medium">
                  {cat.user?.username || "—"}
                </td>
                <td className="px-4 py-3 text-sm  text-gray-900 dark:text-gray-200">
                  {new Date(cat.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 flex gap-2 justify-end">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="px-3 py-1 text-blue-600 bg-blue-200 hover:bg-blue-300 text-xs font-medium rounded-full transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setCategoryToDelete(cat)}
                    className="px-3 py-1 text-red-600 bg-red-200 hover:bg-red-300 text-xs font-medium rounded-full transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredCategories.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-gray-500 dark:text-gray-300"
                >
                  No matching categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals remain same as previous version */}
      {/* Delete Modal */}
      {categoryToDelete && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-secondary p-6 rounded-lg shadow-lg w-full max-w-md">
            <span className="flex justify-center items-center mb-2">
              <ImCancelCircle size={28} className="text-red-600" />
            </span>
            <h2 className="text-center text-xl font-bold text-gray-800 dark:text-gray-200">
              Are you sure?
            </h2>
            <p className="text-xs text-center my-3 text-gray-600 dark:text-gray-300">
              This will permanently delete the category. This action cannot be
              undone.
            </p>
            <div className="flex gap-4 justify-center mt-5">
              <button
                onClick={() => setCategoryToDelete(null)}
                className="px-3 py-1 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-black dark:text-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(categoryToDelete._id)}
                disabled={loading}
                className={`px-3 py-1 text-sm font-medium bg-red-600 text-white rounded-lg ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Single Category Modal */}
      {showSingleCat && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-secondary p-5 rounded-lg shadow-lg relative w-full max-w-md">
            <button
              type="button"
              onClick={() => setShowSingleCat(false)}
              className="absolute top-2 right-3 text-2xl font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Category Details
            </h2>
            {singleCatLoading ? (
              <p className="text-center text-gray-500 dark:text-gray-300">
                Loading...
              </p>
            ) : singleCat ? (
              <div className="space-y-2 text-gray-700 dark:text-gray-200">
                <p>
                  <strong>Name:</strong> {singleCat.name}
                </p>
                <p>
                  <strong>Description:</strong> {singleCat.description}
                </p>
                <p>
                  <strong>Author:</strong> {singleCat.user?.username || "—"}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(singleCat.createdAt).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <p className="text-center text-red-500">Category not found.</p>
            )}
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {editCategory && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleUpdate}
            className="bg-white dark:bg-dark-secondary p-6 rounded-lg shadow-lg w-full max-w-lg relative"
          >
            <button
              type="button"
              onClick={() => setEditCategory(null)}
              className="absolute top-2 right-3 text-2xl font-bold text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Edit Category
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border dark:border-gray-600 rounded-md text-gray-800 dark:text-gray-200 bg-white dark:bg-dark-primary"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border dark:border-gray-600 rounded-md text-gray-800 dark:text-gray-200 bg-white dark:bg-dark-primary"
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded-md text-white bg-secondary hover:bg-secondary-dark transition ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Updating..." : "Update Category"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Categories;

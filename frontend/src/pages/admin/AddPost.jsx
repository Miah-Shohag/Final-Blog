import React, { useContext, useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import GlobalButton from "../../components/GlobalButton";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { PostContext } from "../../hooks/PostContext";
import { CategoryContext } from "../../hooks/CategoryContext";

const AddPost = () => {
  const editor = useRef(null);
  const [loading, setLoading] = useState(false);
  const { addPost } = useContext(PostContext);
  const { fetchCategories, categories } = useContext(CategoryContext);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    tags: "",
    status: "draft",
    content: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: generatedSlug,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addPost(formData);
      toast.success("Post added successfully!");

      // Reset form
      setFormData({
        title: "",
        slug: "",
        category: "",
        tags: "",
        status: "draft",
        content: "",
        image: null,
      });
      setImagePreview(null);
    } catch (error) {
      toast.error("Failed to add post");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 rounded-xl shadow bg-white dark:bg-dark-primary mt-6 transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Add New Post
        </h2>
        <Link
          to="/dashboard/posts"
          className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          All Posts
        </Link>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        encType="multipart/form-data"
      >
        {/* Title */}
        <InputField
          label="Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter post title"
        />

        {/* Slug */}
        <InputField
          label="Slug"
          type="text"
          name="slug"
          readOnly
          value={formData.slug}
        />
        <p className="text-right text-xs font-medium mt-1 text-gray-500 dark:text-gray-400">
          Slug will be generated from title
        </p>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-700 dark:text-gray-200 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 dark:file:bg-blue-900 dark:file:text-blue-300"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 w-48 h-32 object-cover border rounded-lg"
            />
          )}
        </div>

        {/* Content Editor */}
        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
            Content
          </label>
          <JoditEditor
            ref={editor}
            value={formData.content}
            onChange={(newContent) =>
              setFormData((prev) => ({ ...prev, content: newContent }))
            }
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg bg-white dark:bg-dark-secondary dark:border-gray-700 dark:text-gray-200"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <InputField
          label="Tags"
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="e.g. react, css, nodejs"
        />

        {/* Status */}
        <SelectField
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            { value: "draft", label: "Draft" },
            { value: "pending", label: "Pending" },
            { value: "published", label: "Published" },
          ]}
        />

        {/* Submit */}
        <GlobalButton
          type="submit"
          title={loading ? "Submitting..." : "Add Post"}
        />
      </form>
    </div>
  );
};

export default AddPost;

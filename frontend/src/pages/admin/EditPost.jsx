import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PostContext } from "../../hooks/PostContext";
import { CategoryContext } from "../../hooks/CategoryContext";
import JoditEditor from "jodit-react";

const EditPost = () => {
  const editor = useRef(null);
  const { slug } = useParams();
  const { singlePost, fetchSinglePost, handleUpdatePost } =
    useContext(PostContext);
  const { fetchCategories, categories } = useContext(CategoryContext);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    tags: [],
    status: "draft",
    content: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchSinglePost(slug);
  }, [slug]);

  useEffect(() => {
    if (singlePost) {
      setFormData({
        title: singlePost.title || "",
        slug: singlePost.slug || "",
        category: singlePost.category || "",
        tags: singlePost.tags || [],
        status: singlePost.status || "draft",
        content: singlePost.content || "",
        image: null,
      });
      setImagePreview(singlePost.image ? `/uploads/${singlePost.image}` : null);
    }
  }, [singlePost]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setFormData((prev) => ({ ...prev, title: value, slug: generatedSlug }));
    } else if (name === "tags") {
      setFormData((prev) => ({
        ...prev,
        tags: value.split(",").map((t) => t.trim()),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdatePost(singlePost._id, formData);
  };

  if (!singlePost)
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        Loading post...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 rounded-lg shadow mt-6 bg-white dark:bg-dark-primary">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Edit Post
        </h2>
        <Link
          to="/dashboard/posts"
          className="px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-violet-700 text-white rounded-md text-sm font-semibold shadow hover:scale-105 transition-all"
        >
          All Posts
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border dark:border-gray-600 rounded-md bg-white dark:bg-dark-secondary text-gray-800 dark:text-gray-200 focus:ring-1 focus:ring-secondary focus:outline-none"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Slug
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            readOnly
            className="w-full p-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-not-allowed"
          />
          <p className="text-right text-xs mt-1 text-gray-500 dark:text-gray-400">
            Slug will be generated from title
          </p>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Content
          </label>
          <JoditEditor
            ref={editor}
            value={formData.content}
            tabIndex={1}
            onChange={(newContent) =>
              setFormData((prev) => ({ ...prev, content: newContent }))
            }
            config={{
              readonly: false,
              height: 300,
              placeholder: "Start typing...",
              theme: "dark", // matches dark mode
            }}
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border dark:border-gray-600 rounded-md bg-white dark:bg-dark-secondary text-gray-800 dark:text-gray-200"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 max-h-60 w-full object-cover rounded-md border dark:border-gray-600"
            />
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border dark:border-gray-600 rounded-md bg-white dark:bg-dark-secondary text-gray-800 dark:text-gray-200 focus:ring-1 focus:ring-secondary focus:outline-none"
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
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags.join(", ")}
            onChange={handleChange}
            className="w-full p-2 border dark:border-gray-600 rounded-md bg-white dark:bg-dark-secondary text-gray-800 dark:text-gray-200 focus:ring-1 focus:ring-secondary focus:outline-none"
            placeholder="e.g. react, nodejs, css"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border dark:border-gray-600 rounded-md bg-white dark:bg-dark-secondary text-gray-800 dark:text-gray-200 focus:ring-1 focus:ring-secondary focus:outline-none"
          >
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-secondary hover:bg-secondary-dark text-white font-medium rounded-md transition-all"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;

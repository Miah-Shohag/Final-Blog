import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PostContext } from "../../hooks/PostContext";
import JoditEditor from "jodit-react";
import { CategoryContext } from "../../hooks/CategoryContext";

const EditPost = () => {
  const editor = useRef(null);
  const { slug } = useParams();
  const { singlePost, fetchSinglePost, handleUpdatePost } =
    useContext(PostContext);

  const { fetchCategories, categories } = useContext(CategoryContext);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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
    fetchSinglePost(slug);
  }, [slug]);

  // Update local form data when singlePost changes
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
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: generatedSlug,
      }));
    } else if (name === "tags") {
      setFormData((prev) => ({
        ...prev,
        tags: value.split(",").map((tag) => tag.trim()),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setFormData((prev) => ({ ...prev, image: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdatePost(singlePost._id, formData);
  };

  if (!singlePost) return <div>Loading...</div>;

  return (
    <div className="max-w-[80%] mx-auto p-6 rounded-lg shadow mt-6 bg-white dark:bg-dark-primary">
      <div className="flex items-center gap-3 justify-between">
        <h2 className="text-2xl font-semibold">Edit Post</h2>
        <Link
          to="/dashboard/posts"
          className="btn my-3 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
        >
          All Posts
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            readOnly
            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
          />
          <p className="text-right text-xs font-medium mt-1">
            Slug will be generated from title
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Content</label>
          <JoditEditor
            ref={editor}
            value={formData.content}
            tabIndex={1}
            onChange={(newContent) =>
              setFormData((prev) => ({ ...prev, content: newContent }))
            }
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 max-h-60 object-cover rounded"
            />
          )}
        </div>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags.join(", ")}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="e.g. react, css, nodejs"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="published">Published</option>
          </select>
        </div>
        <button type="submit" className="btn w-full">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;

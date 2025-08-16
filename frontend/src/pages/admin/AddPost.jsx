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

    // if (!formData.image) {
    //   toast.error("Image is required");
    //   return;
    // }

    try {
      await addPost(formData);
      console.log(formData);
      // Reset form if needed
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[80%] mx-auto p-6 rounded-lg shadow mt-6 bg-white dark:bg-dark-primary">
      <div className="flex items-center gap-3 justify-between">
        <h2 className="text-2xl font-semibold">Add New Post</h2>
        <Link
          to="/dashboard/posts"
          className="btn my-3 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
        >
          All Posts
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <InputField
          label="Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter post title"
        />

        <InputField
          label="Slug"
          type="text"
          name="slug"
          readOnly
          value={formData.slug}
        />
        <p className="text-right text-xs font-medium mt-1">
          Slug will be generated from title
        </p>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-1">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleImageChange}
            className="block"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-48 h-32 object-cover border rounded"
            />
          )}
        </div>

        {/* Content Editor */}
        <div>
          <label className="block font-medium mb-1">Content</label>
          <JoditEditor
            ref={editor}
            value={formData.content}
            onChange={(newContent) =>
              setFormData((prev) => ({ ...prev, content: newContent }))
            }
          />
        </div>

        {/* Category */}
        <div className="flex gap-3 items-center">
          <div className="flex-1">
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
          </div>
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

        <GlobalButton
          type="submit"
          title={loading ? "Submitting..." : "Add Post"}
        />
      </form>
    </div>
  );
};

export default AddPost;

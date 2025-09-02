import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ImCancelCircle } from "react-icons/im";

const getStatusColor = {
  draft: "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
  pending:
    "bg-purple-200 text-purple-600 dark:bg-purple-700 dark:text-purple-300",
  published:
    "bg-green-200 text-green-600 dark:bg-green-700 dark:text-green-300",
};

const truncateText = (text, length = 50) =>
  text?.length > length ? text.substring(0, length) + "..." : text;

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [deleteToPost, setDeleteToPost] = useState(null);

  // Get all posts
  const getAllPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/posts", {
        withCredentials: true,
      });
      setPosts(res.data.posts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  // Filtered posts
  const filteredPosts = posts.filter((post) => {
    const matchesTitle = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || post.status === filterStatus;
    return matchesTitle && matchesStatus;
  });

  // Delete Post
  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      const res = await axios.delete(`http://localhost:8000/api/posts/${id}`, {
        withCredentials: true,
      });
      setPosts((prev) => prev.filter((post) => post._id !== id));
      toast.success(res.data.message || "Post deleted successfully.");
      setDeleteToPost(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400 text-lg">
        Loading posts...
      </div>
    );
  }

  return (
    <div className="px-4 py-6 bg-white dark:bg-dark-primary rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        All Posts
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 my-5">
        <input
          className="border border-slate-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-black dark:text-gray-200 placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:ring-1 focus:ring-secondary focus:outline-none rounded-md w-full sm:w-1/3"
          type="search"
          name="searchTerm"
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border border-slate-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-black dark:text-gray-200 focus:ring-1 focus:ring-secondary focus:outline-none rounded-md w-full sm:w-1/4"
          name="filterStatus"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-dark-secondary text-gray-700 dark:text-gray-300 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Content</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Author</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Created</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  {posts.length === 0
                    ? "No posts available."
                    : "No posts match your filters."}
                </td>
              </tr>
            ) : (
              filteredPosts.map((post) => (
                <tr
                  key={post._id}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-secondary transition"
                >
                  <td className="px-3 py-4 font-medium  dark:text-gray-200">
                    {truncateText(post.title, 30)}
                  </td>
                  <td className="px-3 py-4 text-gray-700 dark:text-gray-300">
                    {truncateText(post.content, 60)}
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {post.category?.map((cat, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-medium px-3 py-1 rounded-full"
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-4 text-gray-700 dark:text-gray-300">
                    {post?.author?.username || "Unknown"}
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 capitalize rounded-full text-xs font-medium ${
                        getStatusColor[post.status]
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-gray-600 dark:text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="flex px-2 py-3 gap-2 items-center justify-center">
                    <button className="text-blue-600 bg-blue-100 dark:text-blue-300 dark:bg-blue-900 rounded-full px-3 py-1 font-medium text-xs">
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteToPost(post)}
                      className="text-red-600 bg-red-100 dark:text-red-300 dark:bg-red-900 rounded-full px-3 py-1 font-medium text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteToPost && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-dark-secondary p-6 rounded-lg shadow-xl w-full max-w-md relative">
            <span className="flex justify-center items-center mb-2">
              <ImCancelCircle size={28} className="text-red-600" />
            </span>
            <span className="text-center text-xl block font-bold text-gray-900 dark:text-gray-200">
              Are you sure?
            </span>
            <span className="text-xs block text-center my-3 text-gray-600 dark:text-gray-400">
              This action cannot be undone.
            </span>
            <div className="text-right flex gap-5 justify-center items-center mt-5">
              <button
                onClick={() => setDeleteToPost(null)}
                className="px-3 py-1 text-sm font-medium capitalize bg-gray-200 dark:bg-gray-600 dark:text-gray-200 text-black rounded-lg"
              >
                Cancel
              </button>
              <button
                disabled={isDeleting}
                onClick={() => handleDelete(deleteToPost._id)}
                className={`px-3 py-1 text-sm font-medium capitalize bg-red-600 text-white rounded-lg ${
                  isDeleting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPosts;

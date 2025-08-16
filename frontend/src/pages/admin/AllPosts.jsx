import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ImCancelCircle } from "react-icons/im";

const getStatusColor = {
  draft: "bg-gray-200 text-gray-600",
  pending: "bg-purple-200 text-purple-600",
  published: "bg-green-200 text-green-600",
};
const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [deleteToPost, setDeleteToPost] = useState(null);

  // Search and Filter
  const filteredPosts = posts.filter((post) => {
    const matchesTitle = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || post.status === filterStatus;

    return matchesTitle && matchesStatus;
  });

  // Get all posts
  const getAllPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/posts", {
        withCredentials: true,
      });
      setPosts(res.data.posts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        Loading posts...
      </div>
    );
  }

  // Delete Post
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(`http://localhost:8000/api/posts/${id}`, {
        withCredentials: true,
      });
      setPosts((prev) => prev.filter((post) => post._id !== id));
      toast.success(res.data.message || "Post deleted successfully.");
      getAllPosts();
      setLoading(false);
      setDeleteToPost(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="overflow-x-auto px-4 py-6 dark:bg-dark-primary rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">All Posts</h2>

      <div className="filterSearch flex gap-5 my-5">
        <input
          className="border border-slate-300 px-4 py-2 text-sm font-medium text-black placeholder:text-slate-400 focus:ring-1 focus:ring-secondary focus:outline-none focus:border-0 rounded-md"
          type="search"
          name="searchTerm"
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border border-slate-300 px-4 py-2 text-sm font-medium text-black placeholder:text-slate-400 focus:ring-1 focus:ring-secondary focus:outline-none focus:border-0 rounded-md"
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

      <table className="min-w-full text-sm text-left shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 dark:bg-dark-secondary text-gray-700 dark:text-gray-400 uppercase text-xs">
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
        <tbody className="">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <tr
                key={post._id}
                className="border-b dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-dark-secondary transition py-4 min-h-10"
              >
                <td className="px-3 py-4 font-medium">
                  {post.title.substring(0, 30)}...
                </td>
                <td className="px-3 py-4 font-medium">
                  {post.content.substring(0, 60)}...
                </td>
                <td className="px-3 py-4">
                  <div className="flex gap-1">
                    {post.category?.map((cat, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="px-3 py-4">
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
                <td className="px-3 py-4">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="flex px-2 py-3 gap-1 items-center justify-center">
                  <button className="text-blue-600 bg-blue-200 rounded-full px-3 py-1 font-medium text-xs ">
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteToPost(post)}
                    className="text-red-600 bg-red-200 rounded-full px-3 py-1 font-medium text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-6 py-4 text-center text-gray-500" colSpan="5">
                No posts available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {deleteToPost && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
            <span className="flex justify-center items-center mb-2">
              <ImCancelCircle size={28} className="text-red-600" />
            </span>
            <span className="text-center text-xl block font-bold">
              Are you sure?
            </span>
            <span className="text-xs block text-center my-3">
              Are you sure you want to delete the task from the record? This
              process cannot be undone.
            </span>
            <div className="text-right flex gap-5 justify-center items-center mt-5">
              <button
                onClick={() => setDeleteToPost(null)}
                className="px-3 py-1 text-sm font-medium capitalize bg-gray-200 text-black rounded-lg"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={() => handleDelete(deleteToPost._id)}
                className={`px-3 py-1 text-sm font-medium capitalize bg-red-600 text-white rounded-lg ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPosts;

import React, { useState, useEffect, useContext } from "react";
import { ImCancelCircle } from "react-icons/im";
import { PostContext } from "../../hooks/PostContext";
import { Link } from "react-router-dom";

const getStatusColor = {
  draft: "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
  pending:
    "bg-purple-200 text-purple-600 dark:bg-purple-700 dark:text-purple-200",
  published:
    "bg-green-200 text-green-600 dark:bg-green-700 dark:text-green-200",
};

const PostTable = () => {
  const { posts, fetchPosts, handlePostDelete } = useContext(PostContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteToPost, setDeleteToPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts?.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || post.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await handlePostDelete(id);
      setLoading(false);
      setDeleteToPost(null);
    } catch (error) {
      setDeleteToPost(null);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-primary rounded-xl shadow p-5 w-full">
      {/* Search + Filter + Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="flex flex-col sm:flex-row gap-3 w-1/2">
          <input
            type="text"
            placeholder="Search by title or content..."
            className="flex-1 border px-4 py-2 rounded-md text-sm bg-white dark:bg-dark-secondary dark:text-gray-300"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            className="w-full sm:w-48 border px-4 py-2 rounded-md text-sm bg-white dark:bg-dark-secondary dark:text-gray-300"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <Link to="/dashboard/create-post" className="text-sm w-full sm:w-auto">
          <button className="w-full sm:w-auto px-4 py-2 btn text-white rounded-md cursor-pointer hover:bg-secondary-dark transition-colors">
            Add New Post
          </button>
        </Link>
      </div>

      {/* Table */}
      {posts.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No posts found</p>
      )}
      {posts && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 dark:bg-dark-secondary text-gray-700 dark:text-gray-300 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Content</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPosts.map((post) => (
                <tr
                  key={post._id}
                  className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-dark-secondary transition"
                >
                  <td className="px-2 py-3">
                    <div className="w-12 h-12 overflow-hidden rounded-md">
                      <img
                        src={post.image}
                        className="w-full h-full object-cover"
                        alt="No image"
                      />
                    </div>
                  </td>
                  <td className="px-3 py-3 font-medium dark:text-gray-200">
                    {post.title.substring(0, 30)}...
                  </td>
                  <td className="px-3 py-3 font-medium dark:text-gray-300">
                    {post.content.substring(0, 60)}...
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
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-1">
                      {post.category?.map((cat, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200 text-xs font-medium px-3 py-1 rounded-full"
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 py-3 capitalize text-secondary font-medium">
                    {post?.author?.username || "Unknown"}
                  </td>
                  <td className="px-3 py-3 dark:text-gray-300">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-2 py-4">
                    <Link
                      to={`/dashboard/edit-post/${post.slug}`}
                      className="text-blue-600 bg-blue-200 dark:bg-blue-800 dark:text-blue-200 rounded-full px-3 py-1 font-medium text-xs mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => setDeleteToPost(post)}
                      className="text-red-600 bg-red-200 dark:bg-red-800 dark:text-red-200 rounded-full px-3 py-1 font-medium text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedPosts.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-5 text-gray-400 dark:text-gray-500"
                  >
                    No matching posts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center mt-4 gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm bg-gray-100 dark:bg-dark-secondary rounded disabled:opacity-50 dark:text-gray-300"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 text-sm rounded ${
              currentPage === i + 1
                ? "bg-secondary text-white"
                : "bg-gray-100 text-black dark:bg-dark-secondary dark:text-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm bg-gray-100 dark:bg-dark-secondary rounded disabled:opacity-50 dark:text-gray-300"
        >
          Next
        </button>
      </div>

      {/* Delete Modal */}
      {deleteToPost && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-dark-primary p-6 rounded-lg shadow-xl w-full max-w-md relative">
            <span className="flex justify-center items-center mb-2">
              <ImCancelCircle size={28} className="text-red-600" />
            </span>
            <span className="text-center text-xl block font-bold dark:text-gray-200">
              Are you sure?
            </span>
            <span className="text-xs block text-center my-3 dark:text-gray-400">
              Are you sure you want to delete this post? This process cannot be
              undone.
            </span>
            <div className="flex gap-5 justify-center items-center mt-5">
              <button
                onClick={() => setDeleteToPost(null)}
                className="px-3 py-1 text-sm font-medium capitalize bg-gray-200 text-black dark:bg-gray-700 dark:text-gray-200 rounded-lg"
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

export default PostTable;

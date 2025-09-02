import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiFileText, FiCheckCircle, FiClock, FiEdit } from "react-icons/fi";
import Card from "../../components/Card";
import { UserContext } from "../../hooks/UserContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPostsById = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/posts/me", {
        withCredentials: true,
      });
      setPosts(res.data.posts || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/posts", {
        withCredentials: true,
      });
      setAllPosts(res.data.posts || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/users", {
        withCredentials: true,
      });
      setUsers(res.data.users || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostsById();
    getUsers();
    getAllPosts();
  }, []);

  // stats for users
  const total = posts.length;
  const published = posts.filter((p) => p.status === "published").length;
  const pending = posts.filter((p) => p.status === "pending").length;
  const draft = posts.filter((p) => p.status === "draft").length;

  // stats for admin
  const admintotal = allPosts.length;
  const adminpublished = allPosts.filter(
    (p) => p.status === "published"
  ).length;
  const adminpending = allPosts.filter((p) => p.status === "pending").length;
  const admindraft = allPosts.filter((p) => p.status === "draft").length;

  return (
    <div className="p-4 md:p-6 space-y-6 h-full bg-gray-50 dark:bg-dark-primary transition-colors">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <Card
          label="Total Posts"
          count={user.role === "admin" ? admintotal : total}
          icon={<FiFileText />}
          color="from-green-800 to-green-200"
        />
        <Card
          label="Pending"
          count={user.role === "admin" ? adminpending : pending}
          icon={<FiClock />}
          color="from-yellow-600 to-yellow-300"
        />
        <Card
          label="Draft"
          count={user.role === "admin" ? admindraft : draft}
          icon={<FiEdit />}
          color="from-gray-600 to-gray-300"
        />
        <Card
          label="Published"
          count={user.role === "admin" ? adminpublished : published}
          icon={<FiCheckCircle />}
          color="from-blue-700 to-blue-300"
        />
      </div>

      {/* Dashboard Tables */}
      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-10">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Users Table (Admin only) */}
          {user.role === "admin" && (
            <div className="lg:col-span-2 bg-white dark:bg-dark-secondary p-5 rounded-xl shadow-xl overflow-x-auto">
              <h4 className="font-medium mb-5 text-base text-gray-700 dark:text-gray-300">
                Recent Users
              </h4>
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-200 dark:bg-dark-tertiary text-gray-700 dark:text-gray-400 uppercase font-bold text-xs">
                  <tr>
                    <th className="px-3 py-2">S/N</th>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center py-4 text-gray-500 dark:text-gray-400"
                      >
                        No users available
                      </td>
                    </tr>
                  ) : (
                    users.map((user, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-tertiary text-xs font-medium transition"
                      >
                        <td className="px-3 py-2">{index + 1}</td>
                        <td className="px-3 py-2">{user.username}</td>
                        <td className="px-3 py-2">{user.email}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Posts Table */}
          <div className="lg:col-span-3 bg-white dark:bg-dark-secondary p-5 rounded-xl shadow-xl overflow-x-auto">
            <h4 className="font-medium mb-5 text-base text-gray-700 dark:text-gray-300">
              Recent Posts
            </h4>
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-200 dark:bg-dark-tertiary text-gray-700 dark:text-gray-400 uppercase font-bold text-xs">
                <tr>
                  <th className="px-3 py-2">S/N</th>
                  <th className="px-3 py-2">Title</th>
                  <th className="px-3 py-2">Category</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(user.role === "admin" ? allPosts : posts).length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-4 text-gray-500 dark:text-gray-400"
                    >
                      No posts available
                    </td>
                  </tr>
                ) : (
                  (user.role === "admin" ? allPosts : posts).map(
                    (post, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-tertiary text-xs font-medium transition"
                      >
                        <td className="px-3 py-2">{index + 1}</td>
                        <td className="px-3 py-2">
                          {post.title?.slice(0, 20)}...
                        </td>
                        <td className="px-3 py-2 space-x-1">
                          {post.category?.map((cat, i) => (
                            <span
                              key={i}
                              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2 py-1 rounded-full"
                            >
                              {cat.name}
                            </span>
                          ))}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              post.status === "published"
                                ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-200"
                                : post.status === "pending"
                                ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-200"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                            }`}
                          >
                            {post.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 space-x-2">
                          <button className="bg-blue-200 dark:bg-blue-800 hover:bg-blue-300 dark:hover:bg-blue-700 text-blue-600 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium transition">
                            Edit
                          </button>
                          <button className="bg-red-200 dark:bg-red-800 hover:bg-red-300 dark:hover:bg-red-700 text-red-600 dark:text-red-200 px-3 py-1 rounded-full text-xs font-medium transition">
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

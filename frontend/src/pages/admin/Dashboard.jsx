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

  const total = posts.length;
  const published = posts.filter((p) => p.status === "published").length;
  const pending = posts.filter((p) => p.status === "pending").length;
  const draft = posts.filter((p) => p.status === "draft").length;

  const admintotal = allPosts.length;
  const adminpublished = allPosts.filter(
    (p) => p.status === "published"
  ).length;
  const adminpending = allPosts.filter((p) => p.status === "pending").length;
  const admindraft = allPosts.filter((p) => p.status === "draft").length;

  return (
    <div className="p-6 space-y-6 h-svh">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
        <div className="text-center text-gray-500 py-10">Loading...</div>
      ) : (
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Users Table */}
          {user.role === "admin" && (
            <div className="lg:col-span-2 col-span-5 bg-white p-5 rounded-xl shadow-xl overflow-x-auto dark:bg-dark-primary">
              <h4 className="font-medium mb-5 text-base dark:text-gray-400">
                Recent Users
              </h4>
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-200 dark:bg-dark-secondary text-gray-700 dark:text-gray-400 uppercase font-bold text-xs">
                  <tr>
                    <th className="px-3 py-2">S/N</th>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-secondary text-xs font-medium transition"
                    >
                      <td className="px-3 py-2">{index + 1}</td>
                      <td className="px-3 py-2">{user.username}</td>
                      <td className="px-3 py-2">{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* Posts Table */}
          {user.role === "admin" ? (
            <div className="lg:col-span-3 col-span-5 bg-white p-5 rounded-xl shadow-xl overflow-x-auto dark:bg-dark-primary">
              <h4 className="font-medium mb-5 text-base dark:text-gray-400">
                Recent Posts
              </h4>
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-200 dark:bg-dark-secondary text-gray-700 dark:text-gray-400 uppercase font-bold text-xs">
                  <tr>
                    <th className="px-3 py-2">S/N</th>
                    <th className="px-3 py-2">Title</th>
                    <th className="px-3 py-2">Category</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allPosts.map((post, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-secondary text-xs font-medium transition"
                    >
                      <td className="px-3 py-2">{index + 1}</td>
                      <td className="px-3 py-2">
                        {post.title.slice(0, 15)}...
                      </td>
                      <td className="px-3 py-2">
                        {post.category?.map((cat, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            post.status === "published"
                              ? "bg-green-100 text-green-600"
                              : post.status === "pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <button className="bg-blue-200 hover:bg-blue-300 text-blue-600 px-3 py-1 rounded-full text-xs font-medium transition">
                          Edit
                        </button>
                        <button className="bg-red-200 hover:bg-red-300 text-red-600 px-3 py-1 rounded-full text-xs font-medium transition ml-2">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="lg:col-span-3 col-span-5 bg-white p-5 rounded-xl shadow-xl overflow-x-auto">
              <h4 className="font-medium mb-5 text-base">Recent Posts</h4>
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-200 text-gray-700 uppercase font-bold text-xs">
                  <tr>
                    <th className="px-3 py-2">S/N</th>
                    <th className="px-3 py-2">Title</th>
                    <th className="px-3 py-2">Category</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.length === 0 && (
                    <h3 className="font-medium text-md text-center my-5 w-full">
                      No posts available
                    </h3>
                  )}
                  {posts.map((post, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-300 hover:bg-gray-50 text-xs font-medium transition"
                    >
                      <td className="px-3 py-2">{index + 1}</td>
                      <td className="px-3 py-2">{post.title}</td>
                      <td className="px-3 py-2">
                        {post.category?.map((cat, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            post.status === "published"
                              ? "bg-green-100 text-green-600"
                              : post.status === "pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="px-3 py-2">
                        <button className="bg-blue-200 hover:bg-blue-300 text-blue-600 px-3 py-1 rounded-full text-xs font-medium transition">
                          Edit
                        </button>
                        <button className="text-red-600 bg-red-200 rounded-full hover:bg-red-300  px-3 py-1 text-xs font-medium transition ml-2">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

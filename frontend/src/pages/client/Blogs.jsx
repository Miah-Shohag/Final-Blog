import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../hooks/PostContext";
import PostCard from "../../components/client/PostCard";

const Blogs = () => {
  const { posts, fetchPosts } = useContext(PostContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Filter posts by search term
  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset page on search
  }, [posts, searchTerm]);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <section className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
        Blog Posts
      </h1>

      {/* Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      {/* Posts Grid */}
      {currentPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <PostCard key={post._id} post={post} size="small" />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center">
          No posts found.
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-3 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-4 py-2 rounded-full ${
                num === currentPage
                  ? "bg-secondary text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-secondary hover:text-white transition"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default Blogs;

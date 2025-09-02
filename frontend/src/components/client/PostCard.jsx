import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import moment from "moment";
import postImage from "../../assets/demo.jpg";

const PostCard = ({ post, size }) => {
  const categoryName = Array.isArray(post?.category)
    ? post.category[0]?.name
    : post?.category?.name || post?.category || "General";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative overflow-hidden bg-gray-50 dark:bg-dark-primary rounded-lg shadow-lg transition-all duration-500 hover:shadow-2xl border border-gray-300 dark:border-gray-900 ${
        size === "big" ? "flex  gap-6" : "flex flex-col"
      }`}
    >
      {/* Image Section */}
      <div className={`relative w-full max-h-[230px] object-cover`}>
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-full object-cover "
          src={post?.image?.url || postImage}
          alt={post?.title || "Post Image"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent "></div>

        {/* Category Badge */}
        <span
          className={`absolute top-4 left-4 px-4 py-1 text-xs sm:text-sm rounded-full text-white bg-secondary`}
        >
          {Array.isArray(post?.category)
            ? post.category.map((cat) => cat.name).join(", ")
            : categoryName}
        </span>
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between p-5 w-full">
        <Link to={`/blogs/${post?.slug}`}>
          <h2 className="text-md lg:text-2xl font-bold text-gray-800 dark:text-gray-100">
            {post?.title || "Untitled Post"}
          </h2>
        </Link>

        <p
          className="mt-3 text-gray-700 dark:text-gray-400 text-sm sm:text-base leading-relaxed line-clamp-3 hidden lg:block"
          dangerouslySetInnerHTML={{
            __html:
              post?.content?.slice(0, 90).concat("...") ||
              "No description available.",
          }}
        />

        {/* Meta Data */}
        <div className="mt-3 text-gray-600 text-xs lg:text-xs flex flex-wrap items-center gap-2">
          <span>{post?.author?.username || "Unknown Author"}</span>
          <span>•</span>
          <span>
            {post?.createdAt
              ? moment(post.createdAt).format("MMMM D, YYYY")
              : "Unknown Date"}
          </span>
          <span>•</span>
          <span>{moment(post.createdAt).fromNow() || "N/A"}</span>
        </div>

        {/* Read More Button aligned right */}
        <div className="mt-3 flex justify-end">
          <Link
            to={`/blogs/${post.slug}`}
            className="text-sm text-secondary font-semibold px-4 py-2 "
          >
            Read More →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;

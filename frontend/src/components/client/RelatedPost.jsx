import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const RelatedPost = ({
  image,
  avatar,
  author,
  date,
  title,
  excerpt,
  category,
  link,
  slug,
}) => {
  return (
    <motion.div
      className="group relative bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      whileHover={{ y: -5 }}
    >
      {/* Post Image */}
      <div className="h-48 sm:h-56 md:h-40 lg:h-48 overflow-hidden rounded-t-xl">
        <motion.img
          src={image?.url}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Post Content */}
      <div className="p-4 flex flex-col gap-2">
        {/* Category Badge */}
        {category && (
          <span className="text-xs font-semibold text-white bg-secondary px-2 py-1 rounded-full inline-block">
            {Array.isArray(category)
              ? category.map((c) => c.name).join(", ")
              : category}
          </span>
        )}

        {/* Title */}
        <Link
          to={`/blogs/${slug}`}
          className="hover:text-secondary transition-colors"
        >
          <h2 className="text-sm sm:text-base md:text-lg font-bold line-clamp-2">
            {title}
          </h2>
        </Link>

        {/* Meta */}

        {/* Excerpt */}
        {excerpt && (
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {excerpt}
          </p>
        )}

        {/* Read More */}
        <Link
          to={link}
          className="mt-2 text-sm font-medium text-secondary hover:underline self-start"
        >
          Read More →
        </Link>
      </div>
    </motion.div>
  );
};

export default RelatedPost;

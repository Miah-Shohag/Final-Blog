import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({
  image,
  avatar,
  author,
  date,
  title,
  excerpt,
  category,
  link,
}) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-[#1E2939]">
      <div className="h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5 flex flex-col gap-3">
        <span className="text-xs bg-secondary/10 text-secondary px-3 py-1 rounded-full w-max font-medium uppercase tracking-wide">
          {category}
        </span>

        <Link to={link} className="hover:text-secondary transition-colors">
          <h2 className="text-lg md:text-xl font-bold leading-snug line-clamp-2">
            {title}
          </h2>
        </Link>

        <p className="text-sm text-gray-600 line-clamp-3">{excerpt}</p>

        <div className="flex items-center gap-3 mt-4">
          <img
            src={avatar}
            alt={author}
            className="w-10 h-10 rounded-full object-cover border-2 border-secondary"
          />
          <div className="text-xs">
            <p className="font-semibold capitalize">{author}</p>
            <p className="text-gray-500">{date}</p>
          </div>
        </div>

        <Link
          to={link}
          className="text-sm font-medium text-secondary hover:underline mt-2"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;

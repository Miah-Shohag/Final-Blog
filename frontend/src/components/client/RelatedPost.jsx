import React from "react";
import { Link } from "react-router-dom";

const RelatedPost = ({
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
    <div className="group relative">
      <div className="h-45 overflow-hidden rounded-lg mb-5">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Link to={link} className="hover:text-secondary transition-colors">
          <h2 className="text-sm md:text-lg font-bold leading-snug line-clamp-2">
            {title}
          </h2>
        </Link>
        <span className="text-xs font-medium text-gray-500">
          22 December 2024
        </span>
        <p className="text-sm text-gray-600 line-clamp-3">{excerpt}</p>

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

export default RelatedPost;

import React from "react";
import Search from "./Search";
import Categories from "./Categories";

const Sidebar = ({ categories = [], recentPosts = [], tags = [] }) => {
  return (
    <aside className="flex flex-col gap-5">
      {/* Search */}
      <Search />

      {/* Categories */}
      <Categories />

      {/* Tags */}
      <div>
        <h3 className="text-sm lg:text-lg font-semibold mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-sm bg-gray-200 px-2 py-1 rounded cursor-pointer hover:bg-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="">
        <h3 className="text-sm lg:text-lg font-semibold mb-2">Newsletter</h3>
        <input
          type="email"
          placeholder="Your email"
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Subscribe
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

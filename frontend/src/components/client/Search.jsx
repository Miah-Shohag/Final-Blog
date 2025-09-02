import React from "react";

const Search = () => {
  return (
    <div className="bg-gray-50 dark:bg-dark-primary p-5 rounded w-full">
      <h3 className="lg:text-md font-semibold text-gray-900 dark:text-gray-400 mb-5">
        Search
      </h3>
      <input
        type="text"
        placeholder="Search posts..."
        className="w-full text-sm text-black  dark:text-gray-300 p-2 border border-gray-300 dark:border-gray-800 rounded placeholder:text-gray-600"
      />
    </div>
  );
};

export default Search;

import React from "react";
import { Link } from "react-router-dom";
import postImage from "../../assets/post1.jpg";
import postImage2 from "../../assets/post2.jpg";
const Categories = () => {
  return (
    <div className="bg-gray-50 dark:bg-dark-primary p-5 rounded w-full">
      <h3 className=" lg:text-md font-semibold text-gray-900 dark:text-gray-400 mb-5">
        Most Popular
      </h3>
      <ul className="flex flex-col gap-3">
        <li className="flex gap-5 md:gap-3 border-b border-gray-400 dark:border-gray-900 pb-5">
          <div className="catImage w-30 md:w-30 object-cover">
            <img className="w-full h-full rounded-md" src={postImage} alt="" />
          </div>
          <div className="flex flex-col gap-2">
            <Link
              className="text-md md:text-[10px] lg:text-sm text-gray-900 dark:text-gray-300"
              to=""
            >
              Boost Your Productivity with These Tips
            </Link>
            <span className="text-[10px] text-gray-600 ">
              September 02, 2025
            </span>{" "}
          </div>
        </li>
        <li className="flex gap-5 md:gap-3 border-b border-gray-300 dark:border-gray-900 pb-5">
          <div className="catImage w-30 md:w-30 object-cover">
            <img className="w-full h-full rounded-md" src={postImage2} alt="" />
          </div>
          <div className="flex flex-col gap-2">
            <Link
              className="text-md md:text-[10px] lg:text-sm text-gray-900 dark:text-gray-400"
              to=""
            >
              Boost Your Productivity with These Tips
            </Link>
            <span className="text-[10px] text-gray-600 ">
              September 02, 2025
            </span>{" "}
          </div>
        </li>
        <li className="flex gap-5 md:gap-3 border-b border-gray-300 dark:border-gray-900 pb-5">
          <div className="catImage w-30 md:w-30 object-cover">
            <img className="w-full h-full rounded-md" src={postImage} alt="" />
          </div>
          <div className="flex flex-col gap-2">
            <Link
              className="text-md md:text-[10px] lg:text-sm text-gray-900 dark:text-gray-400"
              to=""
            >
              Boost Your Productivity with These Tips
            </Link>
            <span className="text-[10px] text-gray-600 ">
              September 02, 2025
            </span>{" "}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Categories;

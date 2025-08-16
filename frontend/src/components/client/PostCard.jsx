import React from "react";
import { Link } from "react-router-dom";
import postImage from "../../assets/demo.jpg";
const PostCard = () => {
  return (
    <div>
      <div className="post-image relative">
        <img src={postImage} alt="" />
        <span className="category absolute top-5 left-5 bg-[#cf01a3] px-2 py-1 text-xs font-medium text-white">
          Fashion
        </span>
      </div>
      <div className="post-meta"></div>
      <div className="post-content">
        <h2 className="post-title font-medium text-xl hover:text-violet-700">
          <Link to="">Lorem ipsum dolor sit amet.</Link>
        </h2>
        <p className="post-details">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, error
          quae sequi distinctio, fuga beatae dicta, quam nisi doloremque saepe
          fugiat minima ipsam eligendi. Praesentium earum recusandae ad esse
          iusto saepe dolorem cum at accusantium totam, possimus quibusdam
          laborum error quasi voluptates vel magni vero expedita quia. Sequi,
          officiis consequuntur?
        </p>
      </div>
    </div>
  );
};

export default PostCard;

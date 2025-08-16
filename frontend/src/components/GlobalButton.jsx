import React from "react";

const GlobalButton = ({ type, title, customClass }) => {
  return (
    <button
      type={type}
      className={`${customClass} btn hover:scale-102 transition-all duration-300 ease-in-out cursor-pointer`}
    >
      {title}
    </button>
  );
};

export default GlobalButton;

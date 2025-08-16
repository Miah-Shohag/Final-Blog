import React, { useState } from "react";

const Card = ({ label, color, count, icon }) => {
  const [loading, setLoading] = useState(false);
  return (
    <div
      key={label}
      className={`flex items-center gap-4 px-6 py-8 bg-gradient-to-r ${color} rounded-xl shadow transition-transform hover:-translate-y-1 text-white`}
    >
      <div className="p-3 bg-white rounded-full text-2xl text-gray-700">
        {icon}
      </div>
      <div>
        <p className="text-xl text-white font-bold">{label}</p>
        {loading ? (
          <div className="h-8 w-16 bg-gray-200 rounded-md animate-pulse" />
        ) : (
          <p className="text-2xl font-bold text-gray-100">{count}</p>
        )}
      </div>
    </div>
  );
};

export default Card;

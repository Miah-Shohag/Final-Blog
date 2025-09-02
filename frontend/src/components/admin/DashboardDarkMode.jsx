import React, { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const DashboardDarkMode = () => {
  const [isDashboardDark, setIsDashboardDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDashboardDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDashboardDark]);

  return (
    <button
      onClick={() => setIsDashboardDark(!isDashboardDark)}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
    >
      {isDashboardDark ? (
        <FiSun size={18} className="text-secondary" />
      ) : (
        <FiMoon className="text-secondary" size={18} />
      )}
    </button>
  );
};

export default DashboardDarkMode;

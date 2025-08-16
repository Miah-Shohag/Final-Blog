import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import DarkMode from "../admin/DashboardDarkMode";

const navItems = [
  { name: "Home", path: "" },
  { name: "Blogs", path: "/blogs" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];
const Navbar = () => {
  const [isDark, setIsDark] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div className="bg-[#F5F8FB] shadow-md dark:bg-gray-900">
      <nav className="max-w-7xl container mx-auto w-full flex justify-between items-center gap-5 h-20 px-5">
        <div className="navbar-left">
          <div className="nav-logo">
            <Link to="" className="font-semibold text-md text-secondary">
              Blog
            </Link>
          </div>
        </div>
        <div className="navbar-right">
          <ul className="flex items-center space-x-5">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  className={({ isActive }) =>
                    `text-md font-medium text-gray-600 hover:text-gray-800 transition-colors duration-300 ease-in-out ${
                      isActive ? "text-secondary font-semibold" : ""
                    }`
                  }
                  to={item.path}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}

            <DarkMode />

            <Link
              to={isAuthenticated ? "/dashboard" : "/auth"}
              className="btn px-5 py-1.5 text-white text-sm font-medium rounded-full shadow-lg shadow-secondary/40 hover:scale-103 transition duration-300 ease-in-out"
            >
              {isAuthenticated ? "Dashboard" : "Login"}
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

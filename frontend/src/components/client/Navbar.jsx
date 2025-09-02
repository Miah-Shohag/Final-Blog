import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import DarkMode from "../admin/DashboardDarkMode";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../../assets/logo.svg";

const navItems = [
  { name: "Home", path: "" },
  { name: "Blogs", path: "/blogs" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [navSticky, setNavSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavSticky(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`w-full transition-all duration-300 `}>
      <nav className="max-w-7xl container mx-auto w-full flex justify-between items-center h-20 px-5 relative">
        {/* Logo */}
        <div className="font-semibold text-md text-secondary">
          <Link to="" className="flex gap-1 items-center">
            <img src={logo} className="w-6 text-secondary" alt="Site logo" />
            <h3 className="flex flex-col">
              <span className="font-extrabold text-lg">BlogPedia</span>
              <span className="text-xs bg-secondary text-white px-1 py-0.5 w-fit">
                by Shohag
              </span>
            </h3>
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-5">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                className={({ isActive }) =>
                  `text-lg font-bold text-gray-600 hover:text-secondary transition-colors duration-300 ease-in-out ${
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
            className="bg-[#7F27FF] text-white px-5 py-1.5 rounded-md"
          >
            {isAuthenticated ? "Dashboard" : "Login"}
          </Link>
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <DarkMode />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl ml-3 focus:outline-none"
          >
            {mobileMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-[#F5F8FB] dark:bg-gray-900 shadow-md flex flex-col items-center py-4 md:hidden z-40">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                className={({ isActive }) =>
                  `w-full text-center py-2 text-md font-medium text-gray-600 hover:text-gray-800 transition-colors duration-300 ${
                    isActive ? "text-secondary font-semibold" : ""
                  }`
                }
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            <Link
              to={isAuthenticated ? "/dashboard" : "/auth"}
              className=""
              onClick={() => setMobileMenuOpen(false)}
            >
              {isAuthenticated ? "Dashboard" : "Login"}
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

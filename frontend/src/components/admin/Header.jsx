import React, { useContext, useEffect, useRef, useState } from "react";
import { LuBell, LuMenu, LuMessageSquare } from "react-icons/lu";
import { ThemeContext } from "../../hooks/ThemeContext";
import DarkMode from "./DashboardDarkMode";

const Header = () => {
  const { setIsOpenMenu } = useContext(ThemeContext);
  const dropdownRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(null); // 'notification' | 'message' | null

  const toggleDropdown = (type) => {
    setOpenDropdown((prev) => (prev === type ? null : type));
  };

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white p-5 sticky top-0 z-20 flex justify-between items-center shadow-sm dark:bg-dark-primary">
      {/* Left: Menu Button */}
      <div className="flex gap-5 items-center">
        <button
          onClick={() => setIsOpenMenu((prev) => !prev)}
          className="bg-slate-100 dark:bg-dark-secondary p-2 rounded-full transition"
          aria-label="Toggle sidebar menu"
        >
          <LuMenu size={18} className="text-violet-700" />
        </button>
        <DarkMode />
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        {/* Notification */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("notification")}
            aria-haspopup="true"
            aria-expanded={openDropdown === "notification"}
            className="p-2 bg-slate-100 dark:bg-dark-secondary rounded-full transition relative"
          >
            <LuBell size={18} className="text-violet-700" />
            <span className="flex size-3 absolute -top-1 -right-1">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-secondary"></span>
            </span>
          </button>

          {openDropdown === "notification" && (
            <div
              className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-secondary 
                border border-gray-200 dark:border-gray-700 rounded-lg shadow-md 
                p-3 z-50 animate-in fade-in-0 zoom-in-95"
            >
              <p className="text-sm font-semibold mb-2 dark:text-gray-200">
                Notifications
              </p>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>🔔 New comment on your post</li>
                <li>📌 Weekly update available</li>
                <li>✅ Task completed</li>
              </ul>
            </div>
          )}
        </div>

        {/* Message */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("message")}
            aria-haspopup="true"
            aria-expanded={openDropdown === "message"}
            className="p-2 bg-slate-100 dark:bg-dark-secondary rounded-full transition relative"
          >
            <LuMessageSquare size={18} className="text-violet-700" />
            <span className="flex size-3 absolute -top-1 -right-1">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-secondary"></span>
            </span>
          </button>

          {openDropdown === "message" && (
            <div
              className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-secondary 
                border border-gray-200 dark:border-gray-700 rounded-lg shadow-md 
                p-3 z-50 animate-in fade-in-0 zoom-in-95"
            >
              <p className="text-sm font-semibold mb-2 dark:text-gray-200">
                Messages
              </p>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>💬 John: "Hey, are you available?"</li>
                <li>💬 Anna: "Check out this update."</li>
                <li>💬 Admin: "System maintenance tonight."</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

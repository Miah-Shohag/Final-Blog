import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  FiGrid,
  FiFileText,
  FiPlusCircle,
  FiTag,
  FiUser,
  FiMessageCircle,
  FiBell,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { UserContext } from "../../hooks/UserContext";

const Sidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const { user } = useContext(UserContext);

  const toggleSubMenu = (name) => {
    setOpenSubMenu((prev) => (prev === name ? null : name));
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FiGrid />,
      roles: ["user", "admin"],
    },
    {
      name: "Posts",
      icon: <FiPlusCircle />,
      submenu: [
        {
          name: "Add Post",
          path: "/dashboard/create-post",
          roles: ["admin", "user"],
        },
        {
          name: "All Posts",
          path: "/dashboard/posts",
          roles: ["admin", "user"],
        },
      ],
      roles: ["user", "admin"],
    },
    {
      name: "All Posts",
      path: "/dashboard/all-posts",
      icon: <FiFileText />,
      roles: ["admin"],
    },
    {
      name: "Categories",
      icon: <FiTag />,
      submenu: [
        {
          name: "Add Category",
          path: "/dashboard/create-category",
          roles: ["admin", "user"],
        },
        {
          name: "Categories",
          path: "/dashboard/categories",
          roles: ["admin", "user"],
        },
      ],
      roles: ["user", "admin"],
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: <FiUser />,
      roles: ["user", "admin"],
    },
    {
      name: "Messages",
      path: "/dashboard/messages",
      icon: <FiMessageCircle />,
      roles: ["user", "admin"],
    },
    {
      name: "Notifications",
      path: "/dashboard/notifications",
      icon: <FiBell />,
      roles: ["user", "admin"],
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <FiSettings />,
      roles: ["user", "admin"],
    },
    {
      name: "Logout",
      path: "/dashboard/logout",
      icon: <FiLogOut />,
      roles: ["user", "admin"],
    },
  ];

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(user?.role)
  );

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded transition-colors duration-200
     dark:hover:bg-dark-secondary
     ${
       isActive
         ? "bg-[#161616] text-sm font-medium text-white"
         : "text-gray-700 dark:text-gray-300 hover:bg-gray-200"
     }`;

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 hidden lg:block p-5 text-center">
        Admin Panel
      </h2>
      <nav className="overflow-y-auto">
        <ul className="flex flex-col gap-2 mx-4">
          {filteredNavItems.map((item, index) => (
            <li key={index} className="relative font-medium text-sm">
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubMenu(item.name)}
                    aria-expanded={openSubMenu === item.name}
                    aria-controls={`${item.name}-submenu`}
                    className="relative w-full text-left px-4 py-2 dark:text-gray-100 flex items-center gap-2 rounded hover:bg-gray-100 dark:hover:bg-dark-secondary"
                  >
                    <span>{item.icon}</span>
                    <span className="">{item.name}</span>
                    <span className="absolute right-4">
                      {openSubMenu === item.name ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )}
                    </span>
                  </button>

                  {/* Submenu */}
                  <ul
                    id={`${item.name}-submenu`}
                    className={`pl-7 rounded overflow-hidden transition-all duration-300 ease-in-out ${
                      openSubMenu === item.name
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.submenu
                      .filter((sub) => sub.roles.includes(user?.role))
                      .map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <NavLink to={subItem.path} className={navLinkClasses}>
                            {subItem.name}
                          </NavLink>
                        </li>
                      ))}
                  </ul>
                </>
              ) : (
                <NavLink to={item.path} className={navLinkClasses} end>
                  <span>{item.icon}</span>
                  <span className="">{item.name}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

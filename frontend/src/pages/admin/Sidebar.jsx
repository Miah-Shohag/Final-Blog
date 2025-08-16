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

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 hidden lg:block p-5 text-center w-full">
        Admin Panel
      </h2>
      <nav className="overflow-y-auto">
        <ul className="flex flex-col gap-2 mx-5">
          {filteredNavItems.map((item, index) => (
            <li key={index} className="relative font-medium text-sm">
              <div onClick={() => item.submenu && toggleSubMenu(item.name)}>
                {item.submenu ? (
                  <button className="relative w-full text-left px-4 py-2 hover:bg-gray-100 rounded dark:hover:bg-dark-secondary flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span className="hidden lg:block">{item.name}</span>
                    <span className="absolute right-4">
                      {openSubMenu === item.name ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )}
                    </span>
                  </button>
                ) : (
                  <NavLink
                    to={item.path}
                    end="/dashboard"
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors dark:hover:bg-dark-secondary ${
                        isActive
                          ? "bg-gradient-to-r from-fuchsia-500 to-violet-700 text-sm font-medium text-white dark:bg-secondary dark:hover:bg-secondary"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 "
                      }`
                    }
                  >
                    <span>{item.icon}</span>
                    <span className=" hidden lg:block">{item.name} </span>
                  </NavLink>
                )}
              </div>

              {/* Render submenu if it's open */}
              {item.submenu && openSubMenu === item.name && (
                <ul className="pl-7 mt-2 rounded transition-all duration-200">
                  {item.submenu
                    .filter((sub) => sub.roles.includes(user?.role))
                    .map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <NavLink
                          to={subItem.path}
                          className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg transition-colors  ${
                              isActive
                                ? "bg-gradient-to-r from-fuchsia-500 to-violet-700 text-sm font-medium text-white dark:bg-secondary"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-secondary"
                            }`
                          }
                        >
                          {subItem.name}
                        </NavLink>
                      </li>
                    ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

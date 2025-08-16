import {
  MdDashboard,
  MdPostAdd,
  MdSettings,
  MdAccountCircle,
  MdNotifications,
  MdCategory,
  MdOutlineMessage,
  MdLogout,
} from "react-icons/md";

export const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard />,
    roles: ["user", "admin"],
  },
  {
    name: "Posts",
    icon: <MdCategory />,
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
    icon: <MdDashboard />,
    roles: ["admin"],
  },
  {
    name: "Categories",
    icon: <MdCategory />,
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
    icon: <MdAccountCircle />,
    roles: ["user", "admin"],
  },
  {
    name: "Messages",
    path: "/dashboard/messages",
    icon: <MdOutlineMessage />,
    roles: ["user", "admin"],
  },
  {
    name: "Notifications",
    path: "/dashboard/notifications",
    icon: <MdNotifications />,
    roles: ["user", "admin"],
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: <MdSettings />,
    roles: ["user", "admin"],
  },
  {
    name: "Logout",
    path: "/dashboard/logout",
    icon: <MdLogout />,
    roles: ["user", "admin"],
  },
];

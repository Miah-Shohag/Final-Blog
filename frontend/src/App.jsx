import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// Client Routes
import ClientLayout from "./pages/client/ClientLayout";
import Home from "./pages/client/Home";
import About from "./pages/client/About";
import Blogs from "./pages/client/Blogs";
import Contact from "./pages/client/Contact";

// Admin Routes
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AddPost from "./pages/admin/AddPost";
import Posts from "./pages/admin/Posts";
import EditPost from "./pages/admin/EditPost";
import AddCategory from "./pages/admin/AddCategory";
import Categories from "./pages/admin/Categories";
import Messages from "./pages/admin/Messages";
import Profile from "./pages/admin/Profile";
import Settings from "./pages/admin/Settings";
import Notifications from "./pages/admin/Notifications";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/admin/AuthPage";
import ProtectedRoutes from "./pages/admin/ProtectedRoutes";
import AllPosts from "./pages/admin/AllPosts";
import Logout from "./pages/admin/Logout";
import SingleBlog from "./pages/client/SingleBlog";
import PublicRoute from "./pages/admin/PublicRoute";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        {/* Public routes for guests only */}
        <Route element={<PublicRoute />}>
          <Route path="/auth" element={<AuthPage />} />
        </Route>

        {/* Client public routes */}
        <Route element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="blogs/:slug" element={<SingleBlog />} />
          <Route path="about" element={<About />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="create-post" element={<AddPost />} />
            <Route path="posts" element={<Posts />} />
            <Route path="all-posts" element={<AllPosts />} />
            <Route path="edit-post/:slug" element={<EditPost />} />
            <Route path="create-category" element={<AddCategory />} />
            <Route path="categories" element={<Categories />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="messages" element={<Messages />} />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;

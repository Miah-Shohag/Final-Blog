import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";

const ProtectedRoutes = ({ allowedRoles }) => {
  const { user, loading } = useContext(UserContext);

  // Show a loading state while user info is being fetched
  if (loading) return <div>Loading...</div>;

  // If no user or role is not allowed → redirect
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/auth" replace />;
  }

  // Otherwise → render nested routes
  return <Outlet />;
};

export default ProtectedRoutes;

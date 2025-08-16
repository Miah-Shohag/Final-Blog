import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";

const PublicRoute = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <div>Loading...</div>;

  // If logged in → redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // If not logged in → allow access
  return <Outlet />;
};

export default PublicRoute;

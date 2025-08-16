import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";

const Logout = () => {
  const [redirect, setRedirect] = useState(false);
  const { handleLogout } = useContext(UserContext);
  useEffect(() => {
    const logout = async () => {
      await handleLogout(); // make sure handleLogout is async-safe
      setRedirect(true);
    };
    logout();
  }, [handleLogout]);

  if (redirect) {
    return <Navigate to="/auth" replace />;
  }

  return <div className="p-4 text-center text-gray-600">Logging out...</div>;
};

export default Logout;

import axios from "axios";
import React, { useContext, useState, createContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

axios.defaults.baseURL = "http://localhost:3000"; // set once, outside component
axios.defaults.withCredentials = true; // always send cookies

export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const userLogin = async (formData) => {
    try {
      const res = await axios.post("/api/users/login", formData);
      toast.success(res.data.success);
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/users/logout"); // backend should clear cookie
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/auth");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setUser(res.data.user || null);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ axios, userLogin, handleLogout, user, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

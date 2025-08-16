import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/register",
        formData,
        { withCredentials: true }
      );
      toast.success("Account created successfully");
      setLoading(false);
      navigate("/auth");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Toaster position="top-center" />
      <input
        type="text"
        name="username"
        placeholder="Username"
        className="w-full border border-slate-300 px-4 py-2.5 text-sm text-black placeholder:text-slate-400 focus:ring-1 focus:ring-secondary focus:outline-none focus:border-0 rounded-sm"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full border border-slate-300 px-4 py-2.5 text-sm text-black placeholder:text-slate-400 focus:ring-1 focus:ring-secondary focus:outline-none focus:border-0 rounded-sm"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          className="w-full border border-slate-300 px-4 py-2.5 text-sm text-black placeholder:text-slate-400 focus:ring-1 focus:ring-secondary focus:outline-none focus:border-0 rounded-sm"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <span
          className="absolute right-2 top-2 cursor-pointer text-sm text-gray-500"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "Hide" : "Show"}
        </span>
      </div>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full border border-slate-300 px-4 py-2.5 text-sm text-black placeholder:text-slate-400 focus:ring-1 focus:ring-secondary focus:outline-none focus:border-0 rounded-sm"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <span
          className="absolute right-2 top-2 cursor-pointer text-sm text-gray-500"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? "Hide" : "Show"}
        </span>
      </div>
      <button className="btn text-sm font-medium text-white p-2 rounded-md cursor-pointer transition">
        {loading ? "Submitting" : "Sign up"}
      </button>
    </form>
  );
};

export default SignUp;

import React, { useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../../hooks/UserContext";

const SignIn = () => {
  const { userLogin } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await userLogin(formData); // waits until login is complete
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Toaster position="top-center" />
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
      <button
        type="submit"
        disabled={loading}
        className={`btn text-sm font-medium text-white p-2 rounded-md cursor-pointer transition ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Submitting..." : "Sign in"}
      </button>
    </form>
  );
};

export default SignIn;

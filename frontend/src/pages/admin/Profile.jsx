import React, { useState, useContext } from "react";
import Avatar from "../../assets/avatar.jpg";
import GlobalButton from "../../components/GlobalButton";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { FiUpload } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({ image: null });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(previewUrl);
    }
  };

  const updateUserImage = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      return toast.error("Please select an image first.");
    }

    const data = new FormData();
    data.append("image", formData.image);

    setLoading(true);
    try {
      const res = await axios.put(
        "http://localhost:8000/api/users/me/profile",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(res.data.message || "Avatar updated!");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[90%] mx-auto bg-white p-5 rounded-lg">
      <div className="flex gap-5">
        <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-secondary shadow group">
          <img
            src={imagePreview || user?.image || Avatar}
            alt="User avatar"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex gap-1 flex-col mt-5">
          <span className="text-md font-medium capitalize">
            {user.username}
          </span>
          <a href="" className="underline font-medium text-sm">
            {user.email}
          </a>
        </div>
      </div>

      {/* Image Upload Form */}
      <form onSubmit={updateUserImage} className="mt-5">
        <div>
          <label
            htmlFor="image"
            className="flex gap-2 items-center shadow-md w-fit px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer transition-colors duration-300 text-xs"
          >
            <span>
              <FiUpload />
            </span>
            Select avatar
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <GlobalButton
          type="submit"
          title={loading ? "Uploading..." : "Change avatar"}
          customClass="mt-3"
        />
      </form>

      {/* Password Update Form */}
      <form className="mt-16">
        {/* Current Password */}
        <div className="flex flex-col gap-1 w-full mt-3">
          <label
            className="font-medium text-sm capitalize"
            htmlFor="currentPassword"
          >
            Current Password
          </label>
          <div className="relative">
            <input
              className="w-full border border-slate-300 px-4 py-2 text-sm font-medium text-black placeholder:text-slate-400 focus:ring-1 focus:ring-secondary focus:outline-none focus:border-0 rounded-md"
              type={showPassword.current ? "text" : "password"}
              name="currentPassword"
              placeholder="Current Password"
              id="currentPassword"
            />
            <div
              className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
              onClick={() => togglePassword("current")}
            >
              {showPassword.current ? <LuEyeOff /> : <LuEye />}
            </div>
          </div>
        </div>

        {/* New Password */}
        <div className="flex flex-col gap-1 w-full mt-3">
          <label
            className="font-medium text-sm capitalize"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <div className="relative">
            <input
              className="w-full border border-slate-300 px-4 py-2 text-sm font-medium text-black placeholder:text-slate-400 focus:ring-1 focus:ring-secondary focus:outline-none focus:border-0 rounded-md"
              type={showPassword.new ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              id="newPassword"
            />
            <div
              className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
              onClick={() => togglePassword("new")}
            >
              {showPassword.new ? <LuEyeOff /> : <LuEye />}
            </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1 w-full mt-3">
          <label
            className="font-medium text-sm capitalize"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              className="w-full border border-slate-300 px-4 py-2 text-sm font-medium text-black placeholder:text-slate-400 focus:ring-1 focus:ring-secondary focus:outline-none focus:border-0 rounded-md"
              type={showPassword.confirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              id="confirmPassword"
            />
            <div
              className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
              onClick={() => togglePassword("confirm")}
            >
              {showPassword.confirm ? <LuEyeOff /> : <LuEye />}
            </div>
          </div>
        </div>

        <GlobalButton
          type="submit"
          title="Update password"
          customClass="mt-5"
        />
      </form>
    </div>
  );
};

export default Profile;

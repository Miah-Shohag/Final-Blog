import axios from "axios";
import React, { createContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const PostContext = createContext();

axios.defaults.baseURL = "http://localhost:3000";

export const PostContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [singlePost, setSinglePost] = useState(null);
  const [comments, setComments] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);

  // Add Post
  const addPost = async (formData) => {
    try {
      const res = await axios.post("/api/posts/create-post", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create post.");
    }
  };
  // Get all posts
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/posts", { withCredentials: true });
      setPosts(res.data.posts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get single post by slug
  const fetchSinglePost = async (slug) => {
    try {
      const res = await axios.get(`/api/posts/${slug}`, {
        withCredentials: true,
      });
      // store the post object directly
      setSinglePost(res.data.post[0]);
    } catch (error) {
      console.error("Failed to fetch post", error);
    }
  };

  // Update Post
  const handleUpdatePost = async (id, formData) => {
    try {
      const res = await axios.put(`/api/posts/edit-post/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      // update posts array
      setPosts((prev) =>
        prev.map((p) => (p._id === res.data.post._id ? res.data.post : p))
      );
      toast.success("Post updated successfully!");
      navigate("/dashboard/posts");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  // Delete Post
  const handlePostDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/posts/${id}`, {
        withCredentials: true,
      });
      setPosts((prev) => prev.filter((post) => post._id !== id));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  // Add Comment
  const addComment = async ({ slug, formData }) => {
    try {
      const res = await axios.post(`/api/posts/${slug}/comment`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const newComment = res.data.comment;
      setComments((prev) => [...prev, newComment]);
      toast.success(res.data.message || "Comment added");
    } catch (error) {
      toast.error("Could not add comment");
      console.error(error);
    }
  };

  // Fetch related posts
  const fetchRelatedPosts = async (slug) => {
    try {
      const res = await axios.get(`/api/posts/${slug}/related`, {
        withCredentials: true,
      });
      setRelatedPosts(res.data.posts);
    } catch (err) {
      console.error("Failed to fetch related posts", err);
    }
  };

  return (
    <PostContext.Provider
      value={{
        addPost,
        fetchPosts,
        fetchSinglePost,
        handleUpdatePost,
        addComment,
        fetchRelatedPosts,
        handlePostDelete,
        relatedPosts,
        comments,
        singlePost,
        isLoading,
        posts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

import React, { useContext, useEffect } from "react";
import { PostContext } from "../../hooks/PostContext";
import PostCard from "./PostCard";

const FeaturedPost = () => {
  const { fetchPosts, posts } = useContext(PostContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  const otherPosts = posts.slice(0);

  return (
    <div className="space-y-8">
      {/* Hero Post */}

      {/* Simple Grid for Other Posts */}
      {otherPosts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {otherPosts.map((post) => (
            <PostCard key={post._id} post={post} size="small" />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedPost;

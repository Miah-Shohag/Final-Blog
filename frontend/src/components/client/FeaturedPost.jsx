import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import postImage1 from "../../assets/post1.jpg";
import postImage2 from "../../assets/post2.jpg";

const categoryColors = {
  Tutorial: "bg-green-500",
  Tips: "bg-yellow-500",
  Inspiration: "bg-pink-500",
  Design: "bg-blue-500",
  Default: "bg-gray-500",
};

const getCategoryColor = (category) =>
  categoryColors[category] || categoryColors.Default;

const PostCard = ({ post, size }) => (
  <div
    className={`relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
      size === "big" ? "flex flex-col md:flex-row gap-5" : "flex flex-col"
    }`}
  >
    {/* Image Section */}
    <div
      className={`relative overflow-hidden rounded-xl w-full ${
        size === "big" ? "md:w-[500px] aspect-[16/9]" : "aspect-[4/3]"
      }`}
    >
      <img
        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
        src={post.image}
        alt={post.title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      <span
        className={`absolute top-4 left-4 px-4 py-1 text-xs font-semibold rounded-full text-white ${getCategoryColor(
          post.category
        )}`}
      >
        {post.category}
      </span>
    </div>

    {/* Content Section */}
    <div className="flex flex-col justify-between p-5">
      <Link to={`/blogs/${post.slug}`}>
        <h2 className="text-2xl font-bold hover:text-violet-700 transition-colors">
          {post.title}
        </h2>
      </Link>
      <p className="mt-3 text-gray-400 text-sm leading-relaxed">
        {post.excerpt}
      </p>

      {/* Meta Data */}
      <div className="mt-3 text-gray-400 text-sm flex flex-wrap items-center gap-2">
        <span>{post.author}</span>
        <span>•</span>
        <span>{post.date}</span>
        <span>•</span>
        <span>{post.readTime}</span>
      </div>

      <Link
        to={`/posts/${post.id}`}
        className="mt-5 inline-block text-sm px-5 py-2 rounded-full bg-gradient-to-r btn transition-all self-start"
      >
        Read More →
      </Link>
    </div>
  </div>
);

const FeaturedPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const demoPosts = [
        {
          id: 1,
          image: postImage2,
          category: "Tutorial",
          title: "How to create a blog website?",
          excerpt:
            "Learn how to set up and style your own blog website from scratch using React and TailwindCSS.",
          author: "Jane Doe",
          date: "Aug 10, 2025",
          readTime: "5 min read",
        },
        {
          id: 2,
          image: postImage1,
          category: "Tips",
          title: "10 Tips for Writing Better Blog Posts",
          excerpt:
            "Writing great blog posts takes more than just typing. Discover the strategies to keep readers engaged.",
          author: "John Smith",
          date: "Aug 12, 2025",
          readTime: "7 min read",
        },
        {
          id: 3,
          image: postImage1,
          category: "Inspiration",
          title: "Why Blogging is Still Relevant in 2025",
          excerpt:
            "With social media everywhere, blogging still has its unique place. Here's why it matters more than ever.",
          author: "Emily Clark",
          date: "Aug 9, 2025",
          readTime: "6 min read",
        },
        {
          id: 4,
          image: postImage2,
          category: "Tutorial",
          title: "Setting Up SEO for Your Blog",
          excerpt:
            "SEO is key to getting found online. Learn the basics of optimizing your blog posts for search engines.",
          author: "Michael Brown",
          date: "Aug 8, 2025",
          readTime: "8 min read",
        },
        {
          id: 5,
          image: postImage1,
          category: "Design",
          title: "Creating Eye-Catching Blog Graphics",
          excerpt:
            "Good visuals can make your blog posts pop. Here’s how to create graphics that get attention.",
          author: "Sarah Lee",
          date: "Aug 11, 2025",
          readTime: "4 min read",
        },
      ];
      setPosts(demoPosts);
      setLoading(false);
    }, 500);
  }, []);

  if (loading)
    return <div className="text-center text-white">Loading posts...</div>;

  const bigPosts = posts.slice(0, 2);
  const smallPosts = posts.slice(2, 5);

  return (
    <div className="space-y-10">
      {/* Big Posts */}
      <div className="featuredBigPost">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {bigPosts.map((post) => (
            <div key={post.id} className="md:col-span-6">
              <PostCard post={post} size="big" />
            </div>
          ))}
        </div>
      </div>

      {/* Small Posts */}
      <div className="featuredSmallPost">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10">
          {smallPosts.map((post) => (
            <div key={post.id} className="md:col-span-4">
              <PostCard post={post} size="small" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;

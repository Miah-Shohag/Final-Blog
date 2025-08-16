import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import avatar from "../../assets/avatar.jpg";
import demoImage from "../../assets/demo.jpg";
import { FiFacebook, FiShare, FiShare2, FiTwitter } from "react-icons/fi";
import { FaPinterest } from "react-icons/fa";
import BlogCard from "../../components/client/BlogCard";

import postImage from "../../assets/demo.jpg";
import RelatedPost from "../../components/client/RelatedPost";
import { PostContext } from "../../hooks/PostContext";

const formatted = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};

const relatedPosts = [
  {
    id: 1,
    title: "Understanding React Hooks",
    link: "/blog/react-hooks",
  },
  {
    id: 2,
    title: "Building a Blog with Tailwind CSS",
    link: "/blog/tailwind-blog",
  },
  {
    id: 3,
    title: "JavaScript Tips & Tricks for 2025",
    link: "/blog/js-tips",
  },
];

const comments = [
  {
    name: "shohag",
    message:
      "I really found a cool showcase post that hightlighted great commment section designs and always remember ten deadly sins of web design",
    image: { avatar },
  },
  {
    name: "shohag",
    message:
      "I really found a cool showcase post that hightlighted great commment section designs and always remember ten deadly sins of web design",
    image: { avatar },
  },
];

const SingleBlog = () => {
  const { slug } = useParams();
  const [formData, setFormData] = useState({
    comment: "",
  });
  const {
    fetchSinglePost,
    singlePost,
    addComment,
    relatedPosts,
    fetchRelatedPosts,
  } = useContext(PostContext);

  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await addComment({ slug, formData });
      setFormData({
        comment: "",
      });
    } catch (error) {}
  };

  useEffect(() => {
    fetchSinglePost(slug);
    fetchRelatedPosts(slug);
  }, [slug]);

  return (
    <section className="max-w-5xl mx-auto bg-gray-50 dark:bg-gray-900">
      {singlePost?.post?.map((post, index) => (
        <article
          key={index}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden"
        >
          <img
            src={post.image}
            alt="Blog Cover"
            className="w-full h-80 object-center mask-alpha"
          />

          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={post.author?.image}
                alt="Author"
                className="w-14 h-14 rounded-full object-cover border-4 border-secondary"
              />
              <div>
                <h4 className="text-sm font-semibold capitalize text-gray-700 dark:text-gray-200">
                  {post.author?.username}
                </h4>
                <p className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>

            <div
              className="prose dark:prose-invert max-w-none mb-10 text-sm"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>

            {/* Share Section */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                Share this post:
              </h3>
              <div className="flex gap-5">
                <a
                  href="#"
                  className="text-blue-600 hover:underline text-base font-medium"
                >
                  <FiFacebook />
                </a>
                <a
                  href="#"
                  className="text-sky-500 hover:underline text-base font-medium"
                >
                  <FiTwitter />
                </a>
                <a
                  href="#"
                  className="text-rose-500 hover:underline text-base font-medium"
                >
                  <FaPinterest />
                </a>
                <a
                  href="#"
                  className="text-rose-500 hover:underline text-base font-medium"
                >
                  <FiShare2 />
                </a>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-5 text-gray-800 dark:text-white">
                Leave a Comment
              </h3>
              <form className="grid gap-4" onSubmit={handleCommentSubmit}>
                <textarea
                  rows="5"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  placeholder="Write your comment..."
                  className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                ></textarea>
                <button
                  type="submit"
                  className="bg-secondary w-fit text-xs font-medium text-white px-6 py-2 rounded-full hover:bg-secondary/90 transition"
                >
                  Submit Comment
                </button>
              </form>
            </div>

            {/* Display Comments */}

            <div className="grid grid-cols-12">
              <div className="col-span-8">
                {post.comments.length > 0 && (
                  <div className="mt-10 w-fit0">
                    <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                      Comments: {post.comments.length < 10 ? "0" : ""}
                      {""}
                      {post.comments.length}
                    </h4>
                    <ul className="space-y-4 w-fit">
                      {post.comments.map((comment, index) => (
                        <li
                          key={index}
                          className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex flex-col gap-3"
                        >
                          <div className="flex gap-7">
                            <div className="min-w-10 max-w-10 h-10 border-2 border-secondary rounded-full">
                              <img
                                className="w-full h-full object-cover rounded-full"
                                src={comment.user.image}
                                alt=""
                              />
                            </div>
                            <div className="">
                              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 capitalize">
                                {comment.user.username}
                              </p>
                              <span className="text-xs text-gray-500">
                                {new Date(comment.createdAt).toLocaleString(
                                  "en-US",
                                  {
                                    weekday: "short",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  }
                                )}
                              </span>

                              <p className="text-sm mt-3 text-gray-600 dark:text-gray-300">
                                {comment.comment}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-10">
                <h3 className="text-xl font-semibold mb-5 text-gray-800 dark:text-white">
                  Related Posts
                </h3>
                <div className="grid grid-cols-12 gap-10">
                  {relatedPosts.map((relatedPost, index) => (
                    <div className="col-span-4" key={index}>
                      <RelatedPost
                        image={relatedPost.image}
                        avatar={relatedPost.author?.image}
                        author="Alex Khan"
                        date="June 28, 2025"
                        title={relatedPost.title}
                        excerpt="Redux, Context, Zustand or Jotai — what’s best for your project?"
                        category="React"
                        link={`/blog/${relatedPost.slug}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      ))}
    </section>
  );
};

export default SingleBlog;

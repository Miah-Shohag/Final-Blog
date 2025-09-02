import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiFacebook,
  FiMessageSquare,
  FiShare2,
  FiThumbsDown,
  FiThumbsUp,
  FiTwitter,
} from "react-icons/fi";
import { LuThumbsUp } from "react-icons/lu";
import { FaPinterest } from "react-icons/fa";
import RelatedPost from "../../components/client/RelatedPost";
import { PostContext } from "../../hooks/PostContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const SingleBlog = () => {
  const { slug } = useParams();
  const [formData, setFormData] = useState({ comment: "" });
  const [openReply, setOpenReply] = useState(null);
  const [replies, setReplies] = useState({});
  const commentRef = useRef();

  const {
    fetchSinglePost,
    singlePost,
    addComment,
    relatedPosts,
    fetchRelatedPosts,
    replyComment,
  } = useContext(PostContext);
  console.log(singlePost);
  useEffect(() => {
    fetchSinglePost(slug);
    fetchRelatedPosts(slug);
  }, [slug]);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 ">
      {/* Sticky Share Sidebar */}
      <div className="hidden lg:flex flex-col gap-4 items-center fixed top-1/3 left-6 z-40">
        <button className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:scale-110 transition">
          <FiFacebook className="text-blue-600" size={20} />
        </button>
        <button className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:scale-110 transition">
          <FiTwitter className="text-sky-500" size={20} />
        </button>
        <button className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:scale-110 transition">
          <FaPinterest className="text-rose-500" size={20} />
        </button>
        <button className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:scale-110 transition">
          <FiShare2 className="text-gray-700 dark:text-gray-200" size={20} />
        </button>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#F9FAFB] dark:bg-dark-primary border border-gray-200 dark:border-gray-800 shadow-lg rounded-2xl overflow-hidden"
      >
        {/* Blog Image */}
        <img
          src={singlePost?.image?.url}
          alt={singlePost?.title}
          className="w-full h-56 sm:h-72 md:h-96 object-cover"
        />

        <div className="p-4 sm:p-6 md:p-8">
          {/* Author Info */}
          <div className="flex sm:flex-row justify-between sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <img
                src={singlePost?.author?.image}
                alt="Author"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-secondary"
              />
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-200">
                  {singlePost?.author?.username}
                </h4>
                <p className="text-xs text-gray-500">
                  {dayjs(singlePost?.createdAt).format("MMMM D, YYYY")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition">
                <FiThumbsUp
                  size={18}
                  className="text-gray-700 dark:text-gray-200"
                />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition">
                <FiThumbsDown
                  size={18}
                  className="text-gray-700 dark:text-gray-200"
                />
              </button>
              <button
                onClick={() =>
                  commentRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              >
                <FiMessageSquare
                  size={18}
                  className="text-gray-700 dark:text-gray-200"
                />
              </button>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            {singlePost?.title}
          </h1>

          {/* Content */}
          <div
            className="prose dark:prose-invert max-w-none mb-10 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: singlePost?.content }}
          ></div>

          {/* Share Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-5 md:gap-10">
            <div className="tags ">
              {singlePost?.tags.map((tag) => (
                <span className="bg-gray-100 px-4 py-1 rounded-full ">
                  {tag.split(",")}
                </span>
              ))}
            </div>
            <div className="mb-10">
              <h3 className="text-base sm:text-lg font-semibold mb-3 text-gray-800 dark:text-white">
                Share this post:
              </h3>
              <div className="flex gap-4 text-xl">
                <FiFacebook className="text-blue-600 hover:scale-110 transition-transform cursor-pointer" />
                <FiTwitter className="text-sky-500 hover:scale-110 transition-transform cursor-pointer" />
                <FaPinterest className="text-rose-500 hover:scale-110 transition-transform cursor-pointer" />
                <FiShare2 className="text-gray-700 dark:text-gray-200 hover:scale-110 transition-transform cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="mt-10 space-y-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
              Comments ({singlePost?.comments?.length || 0})
            </h4>

            {/* Comment Items */}
            {singlePost?.comments?.map((comment) => (
              <motion.div
                key={comment._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-200 dark:bg-gray-900 p-4 rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={comment.user?.image}
                    alt=""
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-secondary"
                  />
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                      <h5 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                        {comment.user?.username}
                      </h5>
                      <span className="text-xs text-gray-500">
                        {dayjs(comment.createdAt).fromNow()}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {comment.comment}
                    </p>

                    {/* Reply Button & Form */}
                    <button
                      onClick={() =>
                        setOpenReply(
                          openReply === comment._id ? null : comment._id
                        )
                      }
                      className="text-xs mt-2 text-secondary hover:underline"
                    >
                      Reply
                    </button>

                    {openReply === comment._id && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          replyComment({
                            slug,
                            reply: replies[comment._id],
                            commentId: comment._id,
                          });
                          setReplies({ ...replies, [comment._id]: "" });
                        }}
                        className="mt-2 flex flex-col sm:flex-row gap-2"
                      >
                        <input
                          type="text"
                          value={replies[comment._id] || ""}
                          onChange={(e) =>
                            setReplies({
                              ...replies,
                              [comment._id]: e.target.value,
                            })
                          }
                          placeholder="Write a reply..."
                          className="flex-1 rounded-lg px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-secondary text-white rounded-lg text-sm hover:bg-secondary/90 transition"
                        >
                          Send
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Leave a Comment */}
            <form
              ref={commentRef}
              onSubmit={(e) => {
                e.preventDefault();
                addComment({ slug, formData });
                setFormData({ comment: "" });
              }}
              className="mt-6 flex flex-col gap-3"
            >
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({ comment: e.target.value })}
                placeholder="Leave a comment..."
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100 text-sm"
              />
              <button
                disabled={!formData.comment}
                className={`w-fit px-4 py-2 rounded-lg text-sm text-white ${
                  formData.comment
                    ? "bg-secondary hover:bg-secondary/90"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Submit
              </button>
            </form>
          </div>

          {/* Related Posts */}
          {relatedPosts?.length > 0 && (
            <div className="mt-12">
              <h3 className="text-lg sm:text-xl font-semibold mb-5 text-gray-800 dark:text-white">
                Related Posts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <RelatedPost key={post._id} {...post} />
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.article>
    </section>
  );
};

export default SingleBlog;

import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center px-4 transition-colors">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-colors my-10">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
          📩 Contact Me
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
          I’d love to hear from you! Whether you have a question, feedback, or
          just want to say hello, feel free to reach out. I usually respond
          within 24–48 hours.
        </p>

        {/* Contact Form */}
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="mt-1 w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Subject
            </label>
            <input
              type="text"
              placeholder="Subject"
              className="mt-1 w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Write your message here..."
              className="mt-1 w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-500 outline-none resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-secondary text-white py-3 rounded-xl hover:bg-secondary/90 transition-colors font-semibold shadow-md"
          >
            Send Message
          </button>
        </form>

        {/* Social Links */}
        <div className="mt-10 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Or connect with me on
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://twitter.com/yourhandle"
              className="text-blue-500 hover:underline"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com/yourhandle"
              className="text-pink-500 hover:underline"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com/in/yourhandle"
              className="text-blue-700 dark:text-blue-400 hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

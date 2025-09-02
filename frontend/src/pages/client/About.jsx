import React from "react";
import Timeline from "../../components/client/Timeline";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 dark:from-blue-800 dark:via-purple-900 dark:to-pink-800 text-white py-24 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <img
              src="https://via.placeholder.com/150" // replace with your real photo/logo
              alt="Shohag"
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 shadow-lg hover:scale-105 transition-transform"
            />
          </div>

          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
            BlogPedia <span className="text-yellow-300">by Shohag</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto">
            A creative journal where ideas meet words — thoughts, reflections,
            and stories shared with the world.
          </p>
        </div>

        {/* Modern background shapes */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -right-20 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* About Content */}
      <section className="max-w-4xl mx-auto -mt-16 relative z-20 px-4">
        <div className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-2xl p-10">
          {/* Intro */}
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-10 leading-relaxed">
            Welcome to <span className="font-semibold">BlogPedia</span> — a
            place where I write, reflect, and share my journey. This blog is
            more than words on a screen; it’s a way to connect, inspire, and
            spark conversations that matter.
          </p>

          {/* Sections */}
          <div className="space-y-8">
            <section className="hover:translate-x-1 transition-transform">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center">
                🌟 What You’ll Find Here
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Fresh ideas, personal insights, creative writing, and lessons
                learned from everyday life. Some posts will challenge your
                thinking, others might make you smile — all are written from the
                heart.
              </p>
            </section>

            <section className="hover:translate-x-1 transition-transform">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center">
                ✍️ Why I Started BlogPedia
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Writing has always been my way of reflecting. BlogPedia is my
                digital canvas, where I turn thoughts into words. Every post is
                a piece of my journey — shared openly with anyone who wants to
                read along.
              </p>
            </section>

            <section className="hover:translate-x-1 transition-transform">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center">
                🚀 Join the Journey
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                This is more than a blog — it’s an invitation. Share your
                thoughts, engage in conversations, and let’s explore ideas
                together. You’re not just a reader, you’re part of the story.
              </p>
            </section>
          </div>

          {/* Closing */}
          <div className="mt-12 text-center">
            <p className="text-gray-800 dark:text-gray-200 text-lg font-medium">
              Thank you for being here at{" "}
              <span className="font-bold">BlogPedia</span>. Let’s make ideas
              matter, together.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

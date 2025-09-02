import React from "react";
import FeaturedPost from "../../components/client/FeaturedPost";
import Sidebar from "../../components/client/Sidebar";

const Home = ({ featuredPosts }) => {
  return (
    <div className="grid grid-cols-12 gap-5 lg:gap-8 w-full max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      {/* Featured Post Section */}
      <section className="col-span-12 md:col-span-8">
        <FeaturedPost />
      </section>

      {/* Sidebar Section */}
      <aside className="col-span-12 md:col-span-4 lg:sticky lg:top-20 self-start">
        <Sidebar />
      </aside>
    </div>
  );
};

export default Home;

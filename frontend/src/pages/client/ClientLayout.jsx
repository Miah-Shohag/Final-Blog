import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/client/Navbar";
import Footer from "./Footer";
import Sidebar from "../../components/client/Sidebar";

const ClientLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-dark-secondary transition-colors duration-500">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white dark:bg-dark-secondary backdrop-blur-2xl">
        <Navbar />
      </header>

      {/* Main content */}
      <main className="">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-100 dark:bg-dark-primary">
        <Footer />
      </footer>
    </div>
  );
};

export default ClientLayout;

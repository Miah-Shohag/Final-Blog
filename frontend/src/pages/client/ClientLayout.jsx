import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/client/Navbar";
import Footer from "./Footer";

const ClientLayout = () => {
  return (
    <div className="dark:bg-dark-primary">
      <header>
        <Navbar />
      </header>
      <main className="max-w-7xl container mx-auto px-5 my-20">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default ClientLayout;

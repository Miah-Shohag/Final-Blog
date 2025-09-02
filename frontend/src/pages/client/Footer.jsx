import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="w-full max-w-7xl container mx-auto px-4 sm:px-6 lg:px-8 md:py-20 text-gray-500">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Logo & Description */}
          <div>
            <div className="font-semibold text-md text-secondary">
              <Link to="" className="flex gap-1 items-center">
                <img
                  src={logo}
                  className="w-6 text-secondary"
                  alt="Site logo"
                />
                <h3 className="flex flex-col">
                  <span className="font-extrabold text-lg">BlogPedia</span>
                  <span className="text-xs bg-secondary text-white px-1 py-0.5 w-fit">
                    by Shohag
                  </span>
                </h3>
              </Link>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              A modern blog platform sharing knowledge, inspiration, and ideas
              for creatives and developers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Links</h3>
            <ul className="space-y-2 text-sm">
              {["Home", "About", "Blog", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase()}`}
                    className="hover:text-blue-500 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              {["Privacy Policy", "Terms of Service", "Support"].map((res) => (
                <li key={res}>
                  <a
                    href={`/${res.toLowerCase().replace(/\s+/g, "-")}`}
                    className="hover:text-blue-500 transition-colors"
                  >
                    {res}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex items-center gap-4 mt-1 text-xl">
              <a href="#" className="hover:text-blue-600 transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-sky-400 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-pink-500 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-blue-700 transition-colors">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-300 dark:border-gray-700 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} MyBlog. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

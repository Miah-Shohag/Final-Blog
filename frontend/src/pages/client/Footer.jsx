import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary px-5 dark:bg-gray-900 text-white dark:text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto">
        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Logo & description */}
          <div>
            <h2 className="text-2xl font-extrabold text-white dark:text-white">
              MyBlog<span className="text-white-600">.</span>
            </h2>
            <p className="mt-2 text-sm">
              A modern blog platform sharing knowledge, inspiration, and ideas
              for creatives and developers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-blue-600 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-blue-600 transition">
                  About
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-blue-600 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-600 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/privacy" className="hover:text-blue-600 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-blue-600 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/support" className="hover:text-blue-600 transition">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Social media */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-600 transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-pink-500 transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-blue-700 transition">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-gray-300 dark:border-gray-700 pt-6 text-center text-sm">
          © {new Date().getFullYear()} MyBlog. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

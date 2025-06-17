"use client";

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { motion } from "motion/react";
import Link from "next/link";
import Logo from "@/shared/Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <Logo />
          <p className="mt-3 text-sm">
            Kingsland City is your ultimate destination for luxury living. Find premium properties with seamless transactions.
          </p>
        </div>

        {/* Services & Quick Links */}
        <div className="w-full mx-auto grid grid-cols-2 gap-8">
          {/* Services */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Services</h2>
            <ul className="mt-3 space-y-2">
              <li><Link href="/" className="hover:text-primary-500 transition">Buy Property</Link></li>
              <li><Link href="/" className="hover:text-primary-500 transition">Rent Property</Link></li>
              <li><Link href="/" className="hover:text-primary-500 transition">Lease Property</Link></li>
              <li><Link href="/" className="hover:text-primary-500 transition">Investments</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h2>
            <ul className="mt-3 space-y-2">
              <li><Link href="/about" className="hover:text-primary-500 transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary-500 transition">Contact</Link></li>
              <li><Link href="/" className="hover:text-primary-500 transition">FAQs</Link></li>
              <li><Link href="/" className="hover:text-primary-500 transition">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Stay Updated</h2>
          <p className="mt-3 text-sm">Subscribe to our newsletter for the latest property listings.</p>
          <form className="mt-4 flex">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full p-2 rounded-l-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring focus:ring-primary focus:outline-none"
            />
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="bg-primary-600 text-white px-4 py-2 rounded-r-lg"
            >
              Subscribe
            </motion.button>
          </form>
        </div>
      </div>

      {/* Social Media & Copyright */}
      <div className="mt-10 border-t border-gray-300 dark:border-gray-700 pt-5 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Kingsland City. All Rights Reserved.
        </p>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-3 md:mt-0">
          {[
            { icon: <FaFacebookF />, link: "https://facebook.com" },
            { icon: <FaTwitter />, link: "https://twitter.com" },
            { icon: <FaInstagram />, link: "https://instagram.com" },
            { icon: <FaLinkedinIn />, link: "https://linkedin.com" },
          ].map((social, index) => (
            <motion.a 
              key={index} 
              href={social.link} 
              target="_blank" 
              whileHover={{ scale: 1.2 }} 
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 flex items-center justify-center rounded-full dark:hover:text-white bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-4 md:px-10 py-5 bg-black bg-opacity-80 backdrop-blur-md sticky top-0 z-50 shadow-xl border-b border-gray-700">


      <h1 className="text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 bg-clip-text text-transparent hover:scale-105 transform transition duration-300 cursor-pointer">
        Amaan Sheikh
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8 font-medium text-gray-300">
        {[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Projects", path: "/projects" },
          { name: "Contact Me", path: "/contact" },
        ].map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="relative group transition text-gray-300 hover:text-white"
          >
            {link.name}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </div>

      {/* Hamburger Menu Button */}
      <button
        className="md:hidden text-gray-300 hover:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black bg-opacity-90 backdrop-blur-md border-b border-gray-700 md:hidden">
          <div className="flex flex-col space-y-4 px-4 py-6">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Projects", path: "/projects" },
              { name: "Contact Me", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-300 hover:text-white transition py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

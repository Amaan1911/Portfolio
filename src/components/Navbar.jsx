import React from "react";
import { Link } from "react-router-dom";


// Navbar Component
 export default function Navbar() {
return (
<nav className="flex justify-between items-center px-10 py-5 bg-gray-900 bg-opacity-70 sticky top-0 z-50 shadow-md">
<h1 className="text-2xl font-bold tracking-wide">Amaan Sheikh</h1>
<div className="space-x-6">
<Link to="/" className="hover:text-blue-400 transition">Home</Link>
<Link to="/about" className="hover:text-blue-400 transition">About</Link>
<Link to="/projects" className="hover:text-blue-400 transition">Projects</Link>
<Link to="/contact" className="hover:text-blue-400 transition">Contact Me</Link>
</div>
</nav>
);
}
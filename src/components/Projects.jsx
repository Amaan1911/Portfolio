import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function Projects() {
  const projectData = [
    {
      title: "AI Powered Notes App",
      description:
        "A smart note-taking app that leverages AI to summarize, organize, and search notes seamlessly. Boost productivity with intelligent suggestions and clean UI.",
      image: "/Ai_notes.jpg",
      liveLink: "https://ai-notes-front-end.vercel.app/",
    },
    {
      title: "Netflix Clone (with Firebase & Backend)",
      description:
        "A Netflix-inspired platform built with React and Firebase. Supports login, watchlist, real-time movie data, and responsive UI.",
      image: "/Netlfix.png",
      liveLink: "https://netflix-clone-vert-delta.vercel.app/",
    },
    {
      title: "E-Commerce Platform",
      description:
        "A modern MERN e-commerce app with product listings, cart, and checkout flow. Smooth and scalable shopping experience.",
      image: "/Ecom.png",
      liveLink: "https://ecom-two-pink-20.vercel.app/",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextProject = () => {
    setCurrent((prev) => (prev + 1) % projectData.length);
  };
  const prevProject = () => {
    setCurrent((prev) => (prev - 1 + projectData.length) % projectData.length);
  };

  const project = projectData[current];

  return (
    <section className="py-20 px-6 md:px-10 bg-black min-h-screen flex flex-col items-center">
     

      <div className="relative w-full max-w-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.title}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700"
          >
            <div className="h-64">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-semibold mb-3 text-white">{project.title}</h4>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <button
                onClick={() => window.open(project.liveLink, "_blank")}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white transition"
              >
                See Live
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2">
          <button
            onClick={prevProject}
            className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full shadow-md"
          >
            ◀
          </button>
          <button
            onClick={nextProject}
            className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full shadow-md"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex gap-2 mt-6">
        {projectData.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === current ? "bg-blue-500" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;

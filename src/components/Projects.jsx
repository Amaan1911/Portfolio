import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function Projects() {
  const projectData = [
    {
      title: "AI Powered Notes App",
      description: "A smart note-taking app that leverages AI to summarize, organize, and search notes seamlessly. Boost productivity with intelligent suggestions and clean UI.",
      image: "/Ai_notes.jpg",
      liveLink: "https://ai-notes-front-end.vercel.app/",
    },
    {
      title: "Netflix Clone (with Firebase & Backend)",
      description: "A Netflix-inspired platform built with React and Firebase. Supports login, watchlist, real-time movie data, and responsive UI.",
      image: "/Netlfix.png",
      liveLink: "https://netflix-clone-vert-delta.vercel.app/",
    },
    {
      title: "E-Commerce Platform",
      description: "A modern MERN e-commerce app with product listings, cart, and checkout flow. Smooth and scalable shopping experience.",
      image: "/Ecom.png",
      liveLink: "https://ecom-two-pink-20.vercel.app/",
    },
    {
      title: "Abdullah Artificial Jewels",
      description: "A frontend based Artificial jewellery shop, where user can find their desired jewel item and contact the shop owner for making an order",
      image: "/shop.png",
      liveLink: "https://shop-neon-nine.vercel.app/"
    },
    {
      title: "Real-Time Chat Application",
      description: "A chat app developed using MERN stack with Websockets(socket.io), where user can signup or login and chat with their friends",
      image: "/Chat.png",
      liveLink: "https://amaan-chat-app-fe.vercel.app/"
    }
  ];

  const [current, setCurrent] = useState(0);

  const nextProject = () => setCurrent((prev) => (prev + 1) % projectData.length);
  const prevProject = () => setCurrent((prev) => (prev - 1 + projectData.length) % projectData.length);

  const project = projectData[current];

  // Global key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevProject();
      if (e.key === "ArrowRight") nextProject();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="py-20 px-6 mt-[-50px] bg-black min-h-screen flex flex-col items-center justify-center">
      <div className="relative w-full max-w-7xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="grid md:grid-cols-[35%_65%] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800"
          >
            {/* Left: Text Description */}
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col justify-center p-8 md:p-10 bg-gray-950/70 backdrop-blur-sm"
            >
              <h4 className="text-3xl font-bold text-white mb-4 tracking-wide leading-snug">
                {project.title}
              </h4>
              <p className="text-gray-400 mb-6 text-base md:text-lg leading-relaxed">
                {project.description}
              </p>
              <button
                onClick={() => window.open(project.liveLink, "_blank")}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-6 py-3 rounded-lg text-white font-semibold shadow-md transition-transform hover:scale-105"
              >
                See Live →
              </button>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative h-80 md:h-[28rem] lg:h-[32rem]"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/40" />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2">
          <button
            onClick={prevProject}
            className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110"
          >
            ◀
          </button>
          <button
            onClick={nextProject}
            className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex gap-3 mt-8">
        {projectData.map((_, i) => (
          <span
            key={i}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              i === current ? "bg-blue-500 scale-125" : "bg-gray-600 opacity-70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;

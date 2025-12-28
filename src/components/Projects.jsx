import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

const projectData = [
  {
    title: "AI Powered Notes App",
    description: "A smart note-taking app that leverages AI to summarize, organize, and search notes seamlessly. Boost productivity with intelligent suggestions and clean UI.",
    image: "/Ai_notes.jpg",
    liveLink: "https://ai-notes-front-end.vercel.app/",
    tech: ["React", "OpenAI API", "Node.js"]
  },
  {
    title: "Netflix Clone",
    description: "A Netflix-inspired platform built with React and Firebase. Supports login, watchlist, real-time movie data, and responsive UI.",
    image: "/Netlfix.png",
    liveLink: "https://netflix-clone-vert-delta.vercel.app/",
    tech: ["React", "Firebase", "TMDB API"]
  },
  {
    title: "E-Commerce Platform",
    description: "A modern MERN e-commerce app with product listings, cart, and checkout flow. Smooth and scalable shopping experience.",
    image: "/Ecom.png",
    liveLink: "https://ecom-two-pink-20.vercel.app/",
    tech: ["MERN", "Redux", "Stripe"]
  },
  {
    title: "Abdullah Artificial Jewels",
    description: "A frontend based Artificial jewellery shop, where user can find their desired jewel item and contact the shop owner for making an order",
    image: "/shop.png",
    liveLink: "https://shop-neon-nine.vercel.app/",
    tech: ["React", "Tailwind", "Vercel"]
  },
  {
    title: "Real-Time Chat Application",
    description: "A chat app developed using MERN stack with Websockets(socket.io), where user can signup or login and chat with their friends",
    image: "/Chat.png",
    liveLink: "https://amaan-chat-app-fe.vercel.app/",
    tech: ["Socket.io", "Express", "React"]
  },
  {
    title: "Amaan-Consultancy",
    description: "A modern UI based consultancy app, where user can find their desired consultancy service and contact the consultancy owner for making an order",
    image: "/Consultancy.png",
    liveLink: "https://amaan-consultancy-modern-frontend-p.vercel.app/",
    tech: ["React", "Framer Motion", "UI/UX"]
  }
];

function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextProject = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projectData.length);
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projectData.length) % projectData.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const currentProject = projectData[currentIndex];

  return (
    <section className="relative min-h-screen py-20 px-6 overflow-hidden flex flex-col items-center justify-center">

      <div className="text-center mb-12 z-20">
        <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent tracking-tighter mb-4">
          SELECTED WORK
        </h2>
        <p className="text-gray-400 font-mono text-sm tracking-widest">
          {String(currentIndex + 1).padStart(2, '0')} / {String(projectData.length).padStart(2, '0')}
        </p>
      </div>

      <div className="relative w-full max-w-6xl mx-auto h-[500px] flex items-center justify-center perspective-[1000px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
          >
            {/* LEFT CARD - INFO (Tilted Left) */}
            <motion.div
              whileHover={{ rotateY: 5, rotateX: -5 }}
              className="w-full md:w-1/2 bg-white/5 border border-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl transform -rotate-2 md:-rotate-3 hover:rotate-0 transition-transform duration-500"
            >
              <div className="flex flex-wrap gap-2 mb-6">
                {currentProject.tech.map((t, i) => (
                  <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full uppercase tracking-wider border border-blue-500/20">
                    {t}
                  </span>
                ))}
              </div>

              <h3 className="text-4xl font-bold text-white mb-4 leading-tight">
                {currentProject.title}
              </h3>

              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                {currentProject.description}
              </p>

              <a
                href={currentProject.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-blue-400 transition-colors"
              >
                Visit Site <ExternalLink size={18} />
              </a>
            </motion.div>

            {/* RIGHT CARD - IMAGE (Tilted Right) */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-full md:w-1/2 h-full max-h-[400px] rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl transform rotate-2 md:rotate-3 hover:rotate-0 transition-transform duration-500 relative group"
            >
              <div
                style={{ backgroundImage: `url(${currentProject.image})` }}
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex gap-6 mt-16 z-20">
        <button
          onClick={prevProject}
          className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-110 transition-all active:scale-95"
        >
          <ArrowLeft size={24} />
        </button>
        <button
          onClick={nextProject}
          className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-110 transition-all active:scale-95"
        >
          <ArrowRight size={24} />
        </button>
      </div>

    </section>
  );
}

export default Projects;

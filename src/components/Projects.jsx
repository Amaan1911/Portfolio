import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Play, Pause, Github } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

const projectData = [

  {
    title: "Beeros - A modern Clothing Brand E-commerce Website",
    description: "Beeros is a modern Clothing Brand E-commerce Website build with MERN Stack. Beeros has a modern UI and a smooth user experience. Razorpay payment gateway is used for payment processing.Complete reponsive UI and smooth user experience.",
    image: "/Beeros_Img.png",
    liveLink: "https://beeros.vercel.app",
    tech: ["MERN", "Compass", "Razorpay", "passport.js"]
  },
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
  const [autoPlay, setAutoPlay] = useState(false);

  // 3D Tilt Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const nextProject = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projectData.length);
  };

  const prevProject = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projectData.length) % projectData.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") prevProject();
      if (e.key === "ArrowRight") nextProject();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % projectData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const currentProject = projectData[currentIndex];

  return (
    <section className="relative min-h-screen py-20 px-6 overflow-hidden flex flex-col items-center justify-center">

      <div className="text-center mb-12 z-20">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl mt-[10px] font-black bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent tracking-tighter mb-4"
        >
          SELECTED WORK
        </motion.h2>
        <p className="text-gray-400 font-mono text-sm tracking-widest">
          {String(currentIndex + 1).padStart(2, '0')} / {String(projectData.length).padStart(2, '0')}
        </p>
      </div>

      {/* Mobile Card */}
      <div className="md:hidden w-full max-w-sm bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl mb-6">
        <div style={{ backgroundImage: `url(${currentProject.image})` }} className="h-56 bg-cover bg-center" />
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {currentProject.tech.map((t, i) => (
              <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full uppercase tracking-wider border border-blue-500/20">
                {t}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{currentProject.title}</h3>
          <p className="text-gray-400 text-sm mb-4">{currentProject.description}</p>
          <a href={currentProject.liveLink} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-bold rounded-full hover:bg-blue-400 transition-colors text-sm">
            Visit Site <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Desktop Animated Layout with 3D Tilt */}
      <div className="relative w-full mt-[-40px] max-w-6xl mx-auto h-[550px] hidden md:flex items-center justify-center perspective-[2000px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
            className="absolute inset-0 flex items-center justify-center gap-12"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
          >
            {/* Text Content Side */}
            <div className="w-[45%] bg-black/40 border border-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl transform transition-transform duration-500 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 transform translate-z-20">
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentProject.tech.map((t, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-3 py-1 bg-white/5 text-cyan-300 text-xs font-bold rounded-full uppercase tracking-wider border border-white/10"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
                <h3 className="text-4xl font-black text-white mb-4 leading-tight">{currentProject.title}</h3>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">{currentProject.description}</p>
                <div className="flex flex-wrap gap-4">
                  <motion.a
                    href={currentProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors group/link shadow-lg shadow-white/10"
                  >
                    Visit Site <ExternalLink size={18} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </motion.a>

                </div>
              </div>
            </div>

            {/* Image Side */}
            <motion.div
              className="w-[50%] h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group cursor-pointer"
              onClick={() => window.open(currentProject.liveLink, "_blank")}
              whileHover={{ scale: 1.02 }}
              style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
              <div
                style={{ backgroundImage: `url(${currentProject.image})` }}
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              />
              {/* Reflection/Glare */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                <p className="text-white font-medium flex items-center gap-2">View Project <ArrowRight size={16} /></p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 z-20 mt-8">
        <motion.button
          onClick={prevProject}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all group"
          aria-label="Previous project"
        >
          <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
        </motion.button>

        <motion.button
          onClick={() => setAutoPlay(!autoPlay)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-4 rounded-full border transition-all ${autoPlay
            ? "bg-green-500/20 border-green-500/50 text-green-400"
            : "bg-white/5 border-white/10 text-white hover:bg-white/10"
            }`}
          aria-label={autoPlay ? "Pause auto-play" : "Start auto-play"}
        >
          {autoPlay ? <Pause size={20} /> : <Play size={20} />}
        </motion.button>

        <motion.button
          onClick={nextProject}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all group"
          aria-label="Next project"
        >
          <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>

      {/* Keyboard Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-xs text-gray-500 mt-4 text-center font-mono"
      >
        Use ← → arrow keys to navigate
      </motion.p>

      {/* Mobile Hire Me */}
      <a href="https://wa.me/qr/VYUIPCRU4S2ZF1" target="_blank" rel="noopener noreferrer"
        className="md:hidden mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-blue-400 transition-colors">
        <BsWhatsapp size={16} /> Hire Me
      </a>

    </section>
  );
}

export default Projects;

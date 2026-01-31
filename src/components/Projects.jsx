import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Play, Pause, Github, Sparkles, Zap, Code } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

/* ======================
   FLOATING CODE SNIPPETS
====================== */
const FloatingCodeSnippets = () => {
  const snippets = ['</>', '{ }', '( )', '[ ]', '=>', '...'];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {snippets.map((snippet, i) => (
        <motion.div
          key={i}
          className="absolute text-blue-400/20 font-mono text-2xl font-bold"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          {snippet}
        </motion.div>
      ))}
    </div>
  );
};

/* ======================
   ANIMATED PARTICLES
====================== */
const AnimatedParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

/* ======================
   GRADIENT ORBS
====================== */
const GradientOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent)",
          top: "10%",
          left: "10%",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent)",
          bottom: "10%",
          right: "10%",
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, -40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

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
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

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
      {/* Animated Backgrounds */}
      <GradientOrbs />
      <AnimatedParticles />
      <FloatingCodeSnippets />

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Header */}
      <div className="text-center mb-12 z-20 relative">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative inline-block"
        >
          <motion.h2
            className="text-5xl md:text-7xl mt-[10px] font-black bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent tracking-tighter mb-4 relative"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 100%",
              backgroundImage: "linear-gradient(90deg, #fff, #e5e7eb, #6b7280, #fff)",
            }}
          >
            SELECTED WORK
            
            {/* Floating Icons */}
            <motion.div
              className="absolute -right-16 top-0"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Code className="text-blue-400" size={32} />
            </motion.div>
            
            <motion.div
              className="absolute -left-16 bottom-0"
              animate={{
                y: [0, 10, 0],
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="text-purple-400" size={28} />
            </motion.div>
          </motion.h2>

          {/* Animated Underline */}
          <motion.div
            className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <motion.p
          className="text-gray-400 font-mono text-sm tracking-widest mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.span
            animate={{
              color: ["#9ca3af", "#60a5fa", "#9ca3af"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {String(currentIndex + 1).padStart(2, '0')}
          </motion.span>
          {" / "}
          {String(projectData.length).padStart(2, '0')}
        </motion.p>
      </div>

      {/* Mobile Card */}
      <motion.div
        key={`mobile-${currentIndex}`}
        initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        exit={{ opacity: 0, scale: 0.9, rotateY: -20 }}
        transition={{ duration: 0.5 }}
        className="md:hidden w-full max-w-sm bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl mb-6 relative group"
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />

        <div className="relative overflow-hidden h-56">
          <motion.div
            style={{ backgroundImage: `url(${currentProject.image})` }}
            className="h-full bg-cover bg-center"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="p-6 relative z-10">
          <div className="flex flex-wrap gap-2 mb-3">
            {currentProject.tech.map((t, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full uppercase tracking-wider border border-blue-500/20"
              >
                {t}
              </motion.span>
            ))}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{currentProject.title}</h3>
          <p className="text-gray-400 text-sm mb-4">{currentProject.description}</p>
          <motion.a
            href={currentProject.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-bold rounded-full hover:bg-blue-400 transition-colors text-sm"
          >
            Visit Site <ExternalLink size={14} />
          </motion.a>
        </div>
      </motion.div>

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
            onMouseEnter={() => setIsHovered(true)}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d"
            }}
          >
            {/* Text Content Side */}
            <motion.div
              className="w-[45%] bg-black/40 border border-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl transform transition-transform duration-500 relative overflow-hidden group"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: "linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.3), transparent)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              {/* Gradient Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  opacity: [0, 0.1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />

              <div className="relative z-10 transform translate-z-20">
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentProject.tech.map((t, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-3 py-1 bg-white/5 text-cyan-300 text-xs font-bold rounded-full uppercase tracking-wider border border-white/10 cursor-default"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>

                <motion.h3
                  className="text-4xl font-black text-white mb-4 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {currentProject.title}
                </motion.h3>

                <motion.p
                  className="text-gray-300 text-lg mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {currentProject.description}
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.a
                    href={currentProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors group/link shadow-lg shadow-white/10 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      Visit Site 
                      <motion.div
                        animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ExternalLink size={18} />
                      </motion.div>
                    </span>
                  </motion.a>
                </motion.div>
              </div>

              {/* Corner Sparkles */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    [i < 2 ? "top" : "bottom"]: "10px",
                    [i % 2 === 0 ? "left" : "right"]: "10px",
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.7, 0.3],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  <Sparkles className="text-blue-400" size={16} />
                </motion.div>
              ))}
            </motion.div>

            {/* Image Side */}
            <motion.div
              className="w-[50%] h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group cursor-pointer"
              onClick={() => window.open(currentProject.liveLink, "_blank")}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
            >
              {/* Animated Border Glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: "linear-gradient(45deg, rgba(59, 130, 246, 0.5), rgba(168, 85, 247, 0.5), rgba(236, 72, 153, 0.5))",
                  padding: "2px",
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="w-full h-full bg-black rounded-3xl" />
              </motion.div>

              {/* Dark Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"
                animate={{
                  opacity: [0.2, 0, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />

              {/* Image */}
              <motion.div
                style={{ backgroundImage: `url(${currentProject.image})` }}
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                animate={{
                  filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />

              {/* Reflection/Glare */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />

              {/* Bottom Info Bar */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20"
                initial={{ y: "100%" }}
              >
                <p className="text-white font-medium flex items-center gap-2">
                  View Project 
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ArrowRight size={16} />
                  </motion.div>
                </p>
              </motion.div>

              {/* Pulse Effect on Hover */}
              <motion.div
                className="absolute inset-0 border-2 border-blue-400 rounded-3xl opacity-0 group-hover:opacity-100"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <motion.div
        className="flex items-center justify-center gap-4 z-20 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          onClick={prevProject}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all group relative overflow-hidden"
          aria-label="Previous project"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <ArrowLeft size={24} className="relative z-10 group-hover:-translate-x-1 transition-transform" />
        </motion.button>

        <motion.button
          onClick={() => setAutoPlay(!autoPlay)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-4 rounded-full border transition-all relative overflow-hidden ${autoPlay
            ? "bg-green-500/20 border-green-500/50 text-green-400"
            : "bg-white/5 border-white/10 text-white hover:bg-white/10"
          }`}
          aria-label={autoPlay ? "Pause auto-play" : "Start auto-play"}
        >
          <motion.div
            className={`absolute inset-0 ${autoPlay ? "bg-green-500/10" : "bg-blue-500/10"}`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          {autoPlay ? <Pause size={20} className="relative z-10" /> : <Play size={20} className="relative z-10" />}
        </motion.button>

        <motion.button
          onClick={nextProject}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all group relative overflow-hidden"
          aria-label="Next project"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <ArrowRight size={24} className="relative z-10 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>

      {/* Keyboard Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-xs text-gray-500 mt-4 text-center font-mono relative"
      >
        <motion.span
          animate={{
            color: ["#6b7280", "#3b82f6", "#6b7280"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          Use ← → arrow keys to navigate
        </motion.span>
      </motion.p>

      {/* Mobile Hire Me */}
      <motion.a
        href="https://wa.me/qr/VYUIPCRU4S2ZF1"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="md:hidden mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-blue-400 transition-colors relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400"
          initial={{ x: "-100%" }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
        <span className="relative z-10 flex items-center gap-2">
          <BsWhatsapp size={16} /> Hire Me
        </span>
      </motion.a>
    </section>
  );
}

export default Projects;
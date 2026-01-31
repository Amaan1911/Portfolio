import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiFirebase,
  SiAmazonwebservices,
  SiCplusplus
} from "react-icons/si";

/* ======================
   ANIMATED PARTICLES
====================== */
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 15
  }));

  return (
    <div className="absolute inset-0 overflow-hidden z-[2] pointer-events-none">
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
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
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
   LIGHTNING FLASH
====================== */
const LightningFlash = () => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const schedule = () => {
      const delay = 3500 + Math.random() * 5000;
      setTimeout(() => setKey(k => k + 1), delay);
    };
    schedule();
    const interval = setInterval(schedule, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key={key}
      className="absolute inset-0 bg-white/20 z-[4] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.35, 0] }}
      transition={{ duration: 0.18 }}
    />
  );
};

/* ======================
   MULTI BRANCH LIGHTNING
====================== */
const LightningOverlay = () => {
  const [key, setKey] = useState(0);
  const x = Math.random() * 60 + 20;

  useEffect(() => {
    const schedule = () => {
      const delay = 3500 + Math.random() * 5000;
      setTimeout(() => setKey(k => k + 1), delay);
    };
    schedule();
    const interval = setInterval(schedule, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.svg
      key={key}
      className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.35 }}
    >
      <path
        d={`M${x} 0 L${x - 2} 25 L${x + 4} 40 L${x - 6} 60 L${x + 3} 80 L${x} 100`}
        stroke="url(#grad)"
        strokeWidth="1.2"
        fill="none"
        filter="url(#glow)"
      />
      <path
        d={`M${x + 4} 40 L${x + 14} 55`}
        stroke="url(#grad)"
        strokeWidth="0.6"
        fill="none"
        filter="url(#glow)"
      />
      <path
        d={`M${x - 3} 60 L${x - 14} 75`}
        stroke="url(#grad)"
        strokeWidth="0.5"
        fill="none"
        filter="url(#glow)"
      />

      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </motion.svg>
  );
};

/* ======================
   ANIMATED TECH ICONS
====================== */
const TechOrbit = () => {
  const icons = [
    { Icon: SiReact, color: "#61DAFB", angle: 0 },
    { Icon: SiNodedotjs, color: "#339933", angle: 40 },
    { Icon: SiMongodb, color: "#47A248", angle: 80 },
    { Icon: SiExpress, color: "#FFFFFF", angle: 120 },
    { Icon: SiJavascript, color: "#F7DF1E", angle: 160 },
    { Icon: SiTypescript, color: "#3178C6", angle: 200 },
    { Icon: SiTailwindcss, color: "#06B6D4", angle: 240 },
    { Icon: SiFirebase, color: "#FFCA28", angle: 280 },
    { Icon: SiAmazonwebservices, color: "#FF9900", angle: 320 },
  ];

  return (
    <div className="absolute inset-0 z-[3] pointer-events-none">
      {icons.map(({ Icon, color, angle }, index) => {
        const radius = 45;
        const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
        const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0, 1.2, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: index * 0.8,
              ease: "easeInOut",
            }}
          >
            <Icon size={32} style={{ color }} />
          </motion.div>
        );
      })}
    </div>
  );
};

/* ======================
   MAIN COMPONENT
====================== */
function AnimatedHome() {
  const navigate = useNavigate();
  const [typingText, setTypingText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const buttonRef = useRef(null);

  const texts = ["modern", "accessible", "scalable"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    let timeout;

    if (!isDeleting && typingText === currentText) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typingText === "") {
      setIsDeleting(false);
      setCurrentTextIndex((p) => (p + 1) % texts.length);
    } else {
      timeout = setTimeout(() => {
        setTypingText(
          isDeleting
            ? currentText.substring(0, typingText.length - 1)
            : currentText.substring(0, typingText.length + 1)
        );
      }, isDeleting ? 50 : 100);
    }

    return () => clearTimeout(timeout);
  }, [typingText, isDeleting, currentTextIndex]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(p => !p), 530);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.2);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[110vh] px-4 overflow-hidden pt-32 sm:pt-40 pb-20">

      {/* Animated Background Gradient */}
      <motion.div 
        className="absolute inset-0 z-[0]"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3), transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.3), transparent 50%)",
            "radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.3), transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3), transparent 50%)",
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Electric Aura */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.2),transparent_60%)] z-[1]"
        animate={{
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Tech Icons Orbit */}
      <TechOrbit />

      {/* Thunder Effects */}
      <LightningFlash />
      <LightningOverlay />

      {/* Camera Shake */}
      <motion.div
        className="absolute inset-0 z-[6] pointer-events-none"
        animate={{ x: [0, -2, 2, 0], y: [0, 1, -1, 0] }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          repeatDelay: 6 + Math.random() * 6
        }}
      />

      {/* ================= MAIN CONTENT ================= */}
      <div className="text-center z-10 max-w-5xl mx-auto">

        <motion.h1 
          className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter mb-8 
          bg-gradient-to-b from-white via-white to-gray-500 
          bg-clip-text text-transparent 
          drop-shadow-[0_0_60px_rgba(59,130,246,0.45)]"
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
          }}
          transition={{
            duration: 1,
            ease: "easeOut"
          }}
        >
          <motion.span
            animate={{ 
              textShadow: [
                "0 0 20px rgba(59,130,246,0.3)",
                "0 0 60px rgba(59,130,246,0.6)",
                "0 0 20px rgba(59,130,246,0.3)",
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            AMAAN
          </motion.span>{" "}
          <motion.span 
            className="sm:ml-4"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(147,51,234,0.3)",
                "0 0 60px rgba(147,51,234,0.6)",
                "0 0 20px rgba(147,51,234,0.3)",
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
          >
            SHEIKH
          </motion.span>
        </motion.h1>

        <motion.p 
          className="text-xl sm:text-2xl text-white max-w-2xl mx-auto mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          MERN Stack developer crafting{" "}
          <span className="font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {typingText}
          </span>
          <span className={`ml-1 ${showCursor ? "opacity-100" : "opacity-0"}`}>|</span>{" "}
          web experiences.
        </motion.p>

        <motion.p 
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Building the future, one line of code at a time.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <motion.button
            ref={buttonRef}
            onClick={() => navigate("/projects")}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:shadow-[0_0_50px_rgba(59,130,246,0.9)] transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: "200% 100%",
                backgroundImage: "linear-gradient(90deg, currentColor 0%, currentColor 50%, #3b82f6 50%, currentColor 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              View My Work
            </motion.span>
          </motion.button>

          <motion.button
            onClick={() => navigate("/contact")}
            className="px-8 py-4 rounded-full border-2 border-white/20 text-white hover:bg-white/10 transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              borderColor: "rgba(255,255,255,0.5)",
              boxShadow: "0 0 20px rgba(59,130,246,0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: [0, 1, 0],
            y: [0, 10, 0]
          }}
          transition={{
            delay: 1.5,
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ChevronDown className="text-white/50" size={32} />
        </motion.div>
      </div>
    </section>
  );
}

export default AnimatedHome;
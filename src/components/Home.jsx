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
      {/* Main bolt */}
      <path
        d={`M${x} 0 L${x - 2} 25 L${x + 4} 40 L${x - 6} 60 L${x + 3} 80 L${x} 100`}
        stroke="url(#grad)"
        strokeWidth="1.2"
        fill="none"
        filter="url(#glow)"
      />

      {/* Branch */}
      <path
        d={`M${x + 4} 40 L${x + 14} 55`}
        stroke="url(#grad)"
        strokeWidth="0.6"
        fill="none"
        filter="url(#glow)"
      />

      {/* Branch */}
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

function Home() {
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

      {/* Electric Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.2),transparent_60%)] z-[1] animate-pulse" />

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

        <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter mb-8 
        bg-gradient-to-b from-white via-white to-gray-500 
        bg-clip-text text-transparent 
        drop-shadow-[0_0_60px_rgba(59,130,246,0.45)]">
          AMAAN <span className="sm:ml-4">SHEIKH</span>
        </h1>

        <p className="text-xl sm:text-2xl text-white max-w-2xl mx-auto mb-4">
          MERN Stack developer crafting{" "}
          <span className="font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {typingText}
          </span>
          <span className={`ml-1 ${showCursor ? "opacity-100" : "opacity-0"}`}>|</span>{" "}
          web experiences.
        </p>

        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
          Building the future, one line of code at a time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            ref={buttonRef}
            onClick={() => navigate("/projects")}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:shadow-[0_0_50px_rgba(59,130,246,0.9)]"
          >
            View My Work
          </motion.button>

          <motion.button
            onClick={() => navigate("/contact")}
            className="px-8 py-4 rounded-full border-2 border-white/20 text-white hover:bg-white/10"
          >
            Contact Me
          </motion.button>
        </div>
      </div>
    </section>
  );
}

export default Home;

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiFirebase,
  SiAmazonwebservices,
  SiCplusplus


} from "react-icons/si";

function Home() {
  const navigate = useNavigate();
  const [typingText, setTypingText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const buttonRef = useRef(null);

  const texts = ["modern", "accessible", "scalable"];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Magnetic button effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  // Typing effect
  useEffect(() => {
    const currentText = texts[currentTextIndex];
    let timeout;

    if (!isDeleting && typingText === currentText) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typingText === "") {
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    } else {
      timeout = setTimeout(() => {
        setTypingText(isDeleting
          ? currentText.substring(0, typingText.length - 1)
          : currentText.substring(0, typingText.length + 1)
        );
      }, isDeleting ? 50 : 100);
    }

    return () => clearTimeout(timeout);
  }, [typingText, isDeleting, currentTextIndex]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((prev) => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  // Magnetic button handler
  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    x.set(distanceX * 0.2);
    y.set(distanceY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const techStack = [
    { icon: SiReact, color: "#61DAFB", name: "React" },
    { icon: SiNodedotjs, color: "#339933", name: "Node.js" },
    { icon: SiMongodb, color: "#47A248", name: "MongoDB" },
    { icon: SiExpress, color: "#ffffff", name: "Express" },
    { icon: SiJavascript, color: "#F7DF1E", name: "JavaScript" },
    { icon: SiTypescript, color: "#3178C6", name: "TypeScript" },
    { icon: SiTailwindcss, color: "#06B6D4", name: "Tailwind CSS" },
    { icon: SiFirebase, color: "#f73c1bff", name: "Firebase" },
    { icon: SiAmazonwebservices, color: "#d2e638ff", name: "AWS" },
    { icon: SiCplusplus, color: "#6c73eeff", name: "C++" },
  ];

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[110vh] px-4 overflow-hidden pt-32 sm:pt-40 pb-20">
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        >
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors">
            Scroll
          </span>
          <ChevronDown className="text-gray-400 group-hover:text-white transition-colors" size={20} />
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center z-10 max-w-5xl mx-auto"
      >
        {/* Status Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-12 hover:border-white/20 transition-colors"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-sm font-mono tracking-widest text-gray-300 uppercase">Available for work</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          variants={itemVariants}
          className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter mb-8 bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent"
        >
          AMAAN
          <br className="sm:hidden" />
          <span className="sm:ml-4">SHEIKH</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl text-white max-w-2xl mx-auto leading-relaxed mb-4 min-h-[3rem]"
        >
          MERN Stack developer crafting{" "}
          <span className="inline-block text-left">
  <span className="font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
    {typingText}
  </span>
  <span
    className={`inline-block w-1 h-6 bg-cyan-400 ml-1 ${
      showCursor ? "opacity-100" : "opacity-0"
    } transition-opacity`}
  >
    |
  </span>
</span>

          web experiences.
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12"
        >
          Building the future, one line of code at a time.
        </motion.p>

        {/* Buttons with Magnetic Effect */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <motion.button
            ref={buttonRef}
            onClick={() => navigate("/projects")}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative px-8 py-4 rounded-full bg-white text-black font-bold text-lg overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
          >
            <span className="relative z-10 block">View My Work</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-active:opacity-100"
              initial={false}
            />
          </motion.button>

          <motion.button
            onClick={() => navigate("/contact")}
            whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-4 rounded-full border-2 border-white/20 hover:bg-white/10 text-white font-medium text-lg transition-all backdrop-blur-sm group overflow-hidden"
          >
            <span className="relative z-10">Contact Me</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={false}
            />
          </motion.button>
        </motion.div>

        {/* Tech Stack with Tooltips and Magnetic Effect */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-6">
          <span className="text-sm font-mono text-gray-500 uppercase tracking-[0.2em]">Technology Stack</span>
          <div className="flex flex-wrap justify-center gap-6">
            {techStack.map((Tech, i) => (
              <motion.div
                key={i}
                className="group relative"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300 relative z-10"
                >
                  <Tech.icon size={32} style={{ color: Tech.color }} />
                </motion.div>
                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  whileHover={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/90 border border-white/20 rounded-lg text-xs font-medium text-white whitespace-nowrap pointer-events-none z-20 backdrop-blur-md"
                >
                  {Tech.name}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black border-l border-t border-white/20 rotate-45"></div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </motion.div>

    </section>
  );
}

export default Home;

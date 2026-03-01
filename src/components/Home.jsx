import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

/* ── Typing hook ─────────────────────────────────────────── */
function useTypingEffect(words) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () =>
          setText(
            deleting
              ? word.slice(0, text.length - 1)
              : word.slice(0, text.length + 1)
          ),
        deleting ? 45 : 95
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIdx, words]);

  return text;
}

/* ── Subtle dot-grid background ─────────────────────────── */
const DotGrid = () => (
  <div
    className="absolute inset-0 pointer-events-none z-0"
    style={{
      backgroundImage:
        "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
      backgroundSize: "36px 36px",
    }}
  />
);

/* ── Ambient glow orbs ───────────────────────────────────── */
const AmbientOrbs = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    {/* Top-left */}
    <motion.div
      className="absolute w-[700px] h-[700px] rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)",
        top: "-20%", left: "-15%",
      }}
      animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Bottom-right */}
    <motion.div
      className="absolute w-[600px] h-[600px] rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(129,140,248,0.09) 0%, transparent 70%)",
        bottom: "-10%", right: "-10%",
      }}
      animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
    />
  </div>
);

/* ── Stagger animation variants ──────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Magnetic Button ─────────────────────────────────────── */
function MagneticButton({ children, onClick, className }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 350, damping: 30 });
  const sy = useSpring(my, { stiffness: 350, damping: 30 });

  const handleMove = useCallback((e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  }, [mx, my]);

  const handleLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/* ── Hero Component ──────────────────────────────────────── */
export default function AnimatedHome() {
  const navigate = useNavigate();
  const typingText = useTypingEffect(["modern", "accessible", "scalable", "performant"]);
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 550);
    return () => clearInterval(id);
  }, []);

  // Subtle mouse parallax on the whole section
  const sectionRef = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 80, damping: 30 });
  const spy = useSpring(py, { stiffness: 80, damping: 30 });
  const moveX = useTransform(spx, [-0.5, 0.5], [-8, 8]);
  const moveY = useTransform(spy, [-0.5, 0.5], [-6, 6]);

  const handleParallax = useCallback((e) => {
    if (!sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }, [px, py]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleParallax}
      className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden pt-24 pb-16"
    >
      <DotGrid />
      <AmbientOrbs />

      {/* Content with parallax */}
      <motion.div
        style={{ x: moveX, y: moveY }}
        className="relative z-10 w-full max-w-4xl mx-auto text-center"
      >
        <motion.div variants={container} initial="hidden" animate="show">

          {/* Eyebrow badge */}
          <motion.div variants={item} className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Available for Work
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={item}
            className="font-display text-[clamp(3.5rem,10vw,7.5rem)] font-bold leading-[0.92] tracking-tight mb-6"
          >
            <span className="block text-white">Amaan</span>
            <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
              Sheikh
            </span>
          </motion.h1>

          {/* Subtitle with typing effect */}
          <motion.p
            variants={item}
            className="text-lg sm:text-xl text-white/55 max-w-xl mx-auto mb-3 leading-relaxed"
          >
            MERN Stack developer crafting{" "}
            <span className="text-white/90 font-medium">
              {typingText}
              <span
                className={`inline-block w-[2px] h-[1em] bg-indigo-400 ml-0.5 align-middle transition-opacity duration-75 ${showCursor ? "opacity-100" : "opacity-0"
                  }`}
              />
            </span>{" "}
            web experiences.
          </motion.p>

          <motion.p
            variants={item}
            className="text-sm text-white/30 mb-10 tracking-wide"
          >
            Building the future, one line at a time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            {/* Primary — magnetic */}
            <MagneticButton
              onClick={() => navigate("/projects")}
              className="group flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-indigo-100 transition-colors duration-200 shadow-lg shadow-black/20"
            >
              View My Work
              <ArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform duration-200"
              />
            </MagneticButton>

            {/* Secondary */}
            <motion.button
              onClick={() => navigate("/contact")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3.5 rounded-full border border-white/[0.12] text-white/70 text-sm font-medium hover:border-white/25 hover:text-white hover:bg-white/[0.04] transition-all duration-200"
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <motion.span
            className="text-[10px] text-white/25 tracking-[0.2em] uppercase"
          >
            Scroll
          </motion.span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} className="text-white/20" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
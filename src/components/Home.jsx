import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  SiReact, SiNodedotjs, SiMongodb, SiExpress,
  SiJavascript, SiTypescript, SiTailwindcss,
  SiFirebase, SiDocker, SiGit,
} from "react-icons/si";

/* -- Typing hook -- */
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
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? 40 : 80
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIdx, words]);

  return text;
}

/* -- Char-by-char reveal -- */
const CharReveal = ({ text, className, delay = 0 }) => (
  <span className={className}>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.5,
          delay: delay + i * 0.03,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="inline-block"
        style={{ whiteSpace: char === " " ? "pre" : undefined }}
      >
        {char}
      </motion.span>
    ))}
  </span>
);

/* -- Magnetic button -- */
function MagneticButton({ children, onClick, className }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 350, damping: 30 });
  const sy = useSpring(my, { stiffness: 350, damping: 30 });

  const handleMove = useCallback((e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  }, [mx, my]);

  const handleLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

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

/* -- Tech marquee items -- */
const techItems = [
  { Icon: SiReact, label: "React", color: "#61DAFB" },
  { Icon: SiNodedotjs, label: "Node.js", color: "#4CAF50" },
  { Icon: SiMongodb, label: "MongoDB", color: "#47A248" },
  { Icon: SiExpress, label: "Express", color: "#ffffff" },
  { Icon: SiJavascript, label: "JavaScript", color: "#F7DF1E" },
  { Icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { Icon: SiTailwindcss, label: "Tailwind", color: "#06B6D4" },
  { Icon: SiFirebase, label: "Firebase", color: "#FFCA28" },
  { Icon: SiDocker, label: "Docker", color: "#2496ED" },
  { Icon: SiGit, label: "Git", color: "#F05032" },
];

const MarqueeStrip = () => (
  <div className="w-full overflow-hidden py-8 border-y border-white/[0.04]">
    <div className="marquee-track">
      {[...techItems, ...techItems].map(({ Icon, label, color }, i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-8 text-white/30 hover:text-white/70 transition-colors duration-300 whitespace-nowrap"
        >
          <Icon size={20} style={{ color }} className="opacity-60" />
          <span className="text-sm font-medium tracking-wide">{label}</span>
          <span className="text-white/10 mx-4">/</span>
        </div>
      ))}
    </div>
  </div>
);

/* -- Floating badge -- */
const FloatingBadge = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  </motion.div>
);

/* -- Hero -- */
export default function Home() {
  const navigate = useNavigate();
  const typingText = useTypingEffect(["modern", "accessible", "scalable", "performant"]);
  const [showCursor, setShowCursor] = useState(true);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);

  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 550);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={sectionRef}>
      {/* HERO SECTION */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden"
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl mx-auto text-center">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-medium bg-white/[0.04] text-white/50 border border-white/[0.08] backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for freelance & full-time
            </span>
          </motion.div>

          {/* Main heading */}
          <div className="mb-6">
            <h1 className="font-display font-bold leading-[0.9] tracking-tight">
              <CharReveal
                text="Amaan"
                className="block text-[clamp(4rem,12vw,9rem)] text-white"
                delay={0.4}
              />
              <CharReveal
                text="Sheikh"
                className="block text-[clamp(4rem,12vw,9rem)] bg-gradient-to-r from-amber-400 via-rose-400 to-teal-400 bg-clip-text text-white  
                "
                delay={0.7}
              />
            </h1>
          </div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="mb-4"
          >
            <p className="text-lg sm:text-xl text-white/40 max-w-lg mx-auto leading-relaxed">
              MERN Stack developer crafting{" "}
              <span className="text-white/80 font-medium">
                {typingText}
                <span
                  className={`inline-block w-[2px] h-[1em] bg-amber-500 ml-0.5 align-middle transition-opacity duration-75 ${
                    showCursor ? "opacity-100" : "opacity-0"
                  }`}
                />
              </span>{" "}
              web experiences.
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="text-xs font-mono text-white/20 tracking-[0.25em] uppercase mb-12"
          >
            Code. Create. Ship.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton
              onClick={() => navigate("/projects")}
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-sm font-semibold hover:bg-amber-100 transition-all duration-300 shadow-2xl shadow-white/10"
            >
              View My Work
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </MagneticButton>

            <MagneticButton
              onClick={() => navigate("/contact")}
              className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/[0.1] text-white/60 text-sm font-medium hover:border-white/25 hover:text-white hover:bg-white/[0.03] transition-all duration-300"
            >
              Get in Touch
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
            </MagneticButton>
          </motion.div>
        </div>

        {/* Floating elements */}
        <FloatingBadge
          className="absolute top-[18%] left-[8%] hidden lg:block"
          delay={2}
        >
          <div className="glass rounded-2xl px-4 py-3 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-600/20 flex items-center justify-center">
              <SiReact size={16} className="text-[#61DAFB]" />
            </div>
            <div>
              <div className="text-[10px] text-white/30">Favorite</div>
              <div className="text-xs text-white/70 font-medium">React</div>
            </div>
          </div>
        </FloatingBadge>

        <FloatingBadge
          className="absolute top-[22%] right-[10%] hidden lg:block"
          delay={2.5}
        >
          <div className="glass rounded-2xl px-4 py-3 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
              <SiNodedotjs size={16} className="text-[#4CAF50]" />
            </div>
            <div>
              <div className="text-[10px] text-white/30">Backend</div>
              <div className="text-xs text-white/70 font-medium">Node.js</div>
            </div>
          </div>
        </FloatingBadge>

        <FloatingBadge
          className="absolute bottom-[20%] left-[12%] hidden lg:block"
          delay={3}
        >
          <div className="glass rounded-2xl px-4 py-3">
            <div className="text-[10px] text-white/30 font-mono">projects</div>
            <div className="text-lg font-display font-bold text-white">15+</div>
          </div>
        </FloatingBadge>

        <FloatingBadge
          className="absolute bottom-[25%] right-[8%] hidden lg:block"
          delay={3.3}
        >
          <div className="glass rounded-2xl px-4 py-3">
            <div className="text-[10px] text-white/30 font-mono">experience</div>
            <div className="text-lg font-display font-bold text-white">1+ yr</div>
          </div>
        </FloatingBadge>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <span className="text-[10px] font-mono text-white/20 tracking-[0.3em] uppercase">
            Scroll
          </span>
          <motion.div
            className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>
      </motion.section>

      {/* MARQUEE */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <MarqueeStrip />
      </motion.div>

      {/* BRIEF ABOUT STRIP */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-3xl md:text-5xl font-bold text-white/80 leading-snug"
          >
            I design and build{" "}
            <span className="bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">digital products</span> that
            are fast, accessible, and a joy to use.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8"
          >
            <button
              onClick={() => navigate("/about")}
              className="group inline-flex items-center gap-2 text-sm font-medium text-white/40 hover:text-white transition-colors duration-300"
            >
              More about me
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300 text-amber-500" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

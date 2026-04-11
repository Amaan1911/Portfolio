import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, ArrowUpRight, ArrowDown } from "lucide-react";
import { SiReact, SiNodedotjs, SiMongodb, SiExpress, SiJavascript, SiTypescript, SiTailwindcss, SiFirebase, SiDocker, SiGit } from "react-icons/si";

function useTypingEffect(words) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wordIdx]; let timeout;
    if (!deleting && text === word) timeout = setTimeout(() => setDeleting(true), 2200);
    else if (deleting && text === "") { setDeleting(false); setWordIdx((i) => (i + 1) % words.length); }
    else timeout = setTimeout(() => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)), deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIdx, words]);
  return text;
}

function MagneticButton({ children, onClick, className, dataCursor }) {
  const ref = useRef(null);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 350, damping: 30 }); const sy = useSpring(my, { stiffness: 350, damping: 30 });
  const handleMove = useCallback((e) => { if (!ref.current) return; const r = ref.current.getBoundingClientRect(); mx.set((e.clientX - (r.left + r.width / 2)) * 0.25); my.set((e.clientY - (r.top + r.height / 2)) * 0.25); }, [mx, my]);
  const handleLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);
  return (
    <motion.button ref={ref} onClick={onClick} onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }} whileTap={{ scale: 0.96 }} className={className} data-cursor={dataCursor}>{children}</motion.button>
  );
}

function WordReveal({ text, className, highlight = [] }) {
  const ref = useRef(null); const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <span ref={ref} className={className}>
      {text.split(" ").map((word, i) => {
        const isH = highlight.includes(word.replace(/[^a-zA-Z]/g, ""));
        return (
          <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
            <motion.span className={`inline-block ${isH ? "text-transparent bg-clip-text bg-gradient-to-r from-[#7c4dff] via-[#00c9a7] to-[#ff6b35]" : ""}`}
              initial={{ y: "100%", opacity: 0 }} animate={isInView ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}>{word}</motion.span>
          </span>
        );
      })}
    </span>
  );
}

const CharReveal = ({ text, className, delay = 0, stroke = false }) => (
  <span className={className}>
    {text.split("").map((char, i) => (
      <motion.span key={i} initial={{ opacity: 0, y: 60, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: delay + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
        className={`inline-block ${stroke ? "text-stroke" : ""}`} style={{ whiteSpace: char === " " ? "pre" : undefined }}>{char}</motion.span>
    ))}
  </span>
);

const techItems = [
  { Icon: SiReact, label: "React", color: "#61DAFB" }, { Icon: SiNodedotjs, label: "Node.js", color: "#4CAF50" },
  { Icon: SiMongodb, label: "MongoDB", color: "#47A248" }, { Icon: SiExpress, label: "Express", color: "#333" },
  { Icon: SiJavascript, label: "JavaScript", color: "#F7DF1E" }, { Icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { Icon: SiTailwindcss, label: "Tailwind", color: "#06B6D4" }, { Icon: SiFirebase, label: "Firebase", color: "#FFCA28" },
  { Icon: SiDocker, label: "Docker", color: "#2496ED" }, { Icon: SiGit, label: "Git", color: "#F05032" },
];

const MarqueeStrip = () => (
  <div className="w-full overflow-hidden py-8 border-y border-[#7c4dff]/[0.06]">
    <div className="marquee-track">
      {[...techItems, ...techItems].map(({ Icon, label, color }, i) => (
        <div key={i} className="flex items-center gap-3 px-8 text-[#1a1a2e]/25 hover:text-[#1a1a2e]/60 transition-colors duration-300 whitespace-nowrap">
          <Icon size={20} style={{ color }} className="opacity-60 hover:opacity-100 transition-opacity duration-300" />
          <span className="text-sm font-medium tracking-wide">{label}</span>
          <span className="text-[#7c4dff]/15 mx-4">✦</span>
        </div>
      ))}
    </div>
  </div>
);

const featuredProjects = [
  { title: "Beeros", subtitle: "Clothing Brand E-commerce", image: "/Beeros_Img.png", tech: ["MERN", "Razorpay", "Passport.js"], color: "#7c4dff" },
  { title: "AI Notes", subtitle: "Intelligent Note-Taking", image: "/Ai_notes.jpg", tech: ["React", "OpenAI API", "Node.js"], color: "#00c9a7" },
  { title: "Netflix Clone", subtitle: "Streaming Platform", image: "/Netlfix.png", tech: ["React", "Firebase", "TMDB API"], color: "#ff6b35" },
];

function HorizontalProjects() {
  const containerRef = useRef(null); const navigate = useNavigate();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Moving the row left by its entire width, but returning 1 screen-width back so the last item is in full view
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "calc(-100% + 100vw)"]);

  return (
    <section ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="absolute top-28 left-6 md:left-10 z-10 w-full flex justify-between pr-12 md:pr-20 pointer-events-none">
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#7c4dff] tracking-[0.2em] uppercase">
            <span className="w-8 h-px bg-[#7c4dff]/60" /> Featured Work
          </motion.span>
        </div>
        <motion.div style={{ x }} className="flex gap-8 px-6 md:px-10 w-max">
          {featuredProjects.map((project, i) => (
            <motion.div key={project.title} className="relative flex-shrink-0 w-[85vw] md:w-[65vw] h-[70vh] rounded-3xl overflow-hidden group"
              data-cursor="View" onClick={() => navigate("/projects")} whileHover={{ scale: 0.98 }} transition={{ duration: 0.4 }}>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${project.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/30 to-transparent" />
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: `inset 0 0 0 2px ${project.color}40, 0 0 80px ${project.color}15` }} />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <span className="text-7xl md:text-9xl font-display font-bold text-white/[0.05] absolute top-6 right-8">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-[10px] font-medium text-white/50 bg-white/[0.1] border border-white/[0.15] backdrop-blur-sm">{t}</span>
                  ))}
                </div>
                <h3 className="font-display text-3xl md:text-5xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-white/50">{project.subtitle}</p>
                <motion.div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View Project <ArrowRight size={14} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const typingText = useTypingEffect(["modern", "accessible", "scalable", "performant"]);
  const [showCursor, setShowCursor] = useState(true);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.92]);
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, 80]);

  useEffect(() => { const id = setInterval(() => setShowCursor((v) => !v), 550); return () => clearInterval(id); }, []);

  return (
    <div ref={sectionRef}>
      <motion.section style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden">
        <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="flex justify-center mb-10">
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-medium bg-[#7c4dff]/[0.06] text-[#1a1a2e]/50 border border-[#7c4dff]/[0.1] backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00c9a7] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00c9a7]" />
              </span>
              Available for freelance & full-time
            </span>
          </motion.div>

          <div className="mb-6">
            <h1 className="font-display font-extrabold leading-[0.85] tracking-tighter">
              <CharReveal text="AMAAN" className="block text-[clamp(4.5rem,14vw,11rem)] text-[#1a1a2e]" delay={0.5} />
              <CharReveal text="SHEIKH" className="block text-[clamp(4.5rem,14vw,11rem)]" delay={0.9} stroke={true} />
            </h1>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.7 }} className="mb-4">
            <p className="text-lg sm:text-xl text-[#1a1a2e]/40 max-w-lg mx-auto leading-relaxed">
              Full-Stack Developer crafting{" "}
              <span className="text-[#1a1a2e]/80 font-medium">{typingText}
                <span className={`inline-block w-[2px] h-[1em] bg-[#7c4dff] ml-0.5 align-middle transition-opacity duration-75 ${showCursor ? "opacity-100" : "opacity-0"}`} />
              </span>{" "}web experiences.
            </p>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.6 }}
            className="text-xs font-mono text-[#1a1a2e]/15 tracking-[0.3em] uppercase mb-14">Code. Create. Ship.</motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton onClick={() => navigate("/projects")}
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[#7c4dff] text-white text-sm font-semibold hover:bg-[#6a3de8] transition-all duration-300 shadow-2xl shadow-[#7c4dff]/20"
              dataCursor="View">
              View My Work <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </MagneticButton>
            <MagneticButton onClick={() => navigate("/contact")}
              className="group flex items-center gap-3 px-8 py-4 rounded-full border border-[#1a1a2e]/[0.1] text-[#1a1a2e]/50 text-sm font-medium hover:border-[#7c4dff]/30 hover:text-[#1a1a2e] hover:bg-[#7c4dff]/[0.04] transition-all duration-300">
              Get in Touch <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8, duration: 0.8 }}>
          <span className="text-[10px] font-mono text-[#1a1a2e]/15 tracking-[0.3em] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown size={14} className="text-[#7c4dff]/40" />
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}><MarqueeStrip /></motion.div>

      <section className="relative py-32 md:py-40 px-6">
        <div className="max-w-5xl mx-auto">
          <WordReveal text="I design and build digital products that are fast, accessible, and a joy to use."
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-[#1a1a2e]/60 leading-snug block"
            highlight={["fast,", "accessible,", "joy"]} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.6 }} className="mt-10">
            <button onClick={() => navigate("/about")} className="group inline-flex items-center gap-2 text-sm font-medium text-[#1a1a2e]/35 hover:text-[#1a1a2e] transition-colors duration-300">
              More about me <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300 text-[#7c4dff]" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* <HorizontalProjects /> */}


    </div>
  );
}

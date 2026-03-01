import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

/* ── Project data (unchanged content) ───────────────────── */
const projects = [
  {
    title: "Beeros — Clothing Brand E-commerce",
    short: "Modern e-commerce with MERN stack.",
    description:
      "A full-featured clothing brand store built with the MERN stack. Razorpay payment gateway, responsive UI, and smooth user experience.",
    image: "/Beeros_Img.png",
    link: "https://beeros.in",
    tech: ["MERN", "Razorpay", "Passport.js", "MongoDB"],
  },
  {
    title: "AI-Powered Notes App",
    short: "Intelligent note-taking with OpenAI.",
    description:
      "Smart note-taking app that uses AI to summarize, organize, and search notes. Boost productivity with intelligent suggestions and a clean UI.",
    image: "/Ai_notes.jpg",
    link: "https://ai-notes-front-end.vercel.app/",
    tech: ["React", "OpenAI API", "Node.js"],
  },
  {
    title: "Netflix Clone",
    short: "React + Firebase streaming platform.",
    description:
      "Netflix-inspired platform with login, watchlist, real-time TMDB movie data, and a fully responsive UI.",
    image: "/Netlfix.png",
    link: "https://netflix-clone-vert-delta.vercel.app/",
    tech: ["React", "Firebase", "TMDB API"],
  },
  {
    title: "E-Commerce Platform",
    short: "MERN shopping experience with Stripe.",
    description:
      "Modern e-commerce app with product listings, cart, and checkout flow. Smooth and scalable shopping experience.",
    image: "/Ecom.png",
    link: "https://ecom-two-pink-20.vercel.app/",
    tech: ["MERN", "Redux", "Stripe"],
  },
  {
    title: "Abdullah Artificial Jewels",
    short: "Frontend jewellery shop.",
    description:
      "Frontend-based jewellery shop where users can browse items and contact the owner to place orders.",
    image: "/shop.png",
    link: "https://shop-neon-nine.vercel.app/",
    tech: ["React", "Tailwind", "Vercel"],
  },
  {
    title: "Real-Time Chat App",
    short: "Socket.io powered messaging.",
    description:
      "Chat application built with MERN and Socket.io. Users can sign up, log in, and chat with friends in real time.",
    image: "/Chat.png",
    link: "https://amaan-chat-app-fe.vercel.app/",
    tech: ["Socket.io", "Express", "React"],
  },
  {
    title: "Amaan Consultancy",
    short: "Modern consultancy landing page.",
    description:
      "Modern consultancy site where users can explore services and reach out via a contact form.",
    image: "/Consultancy.png",
    link: "https://amaan-consultancy-modern-frontend-p.vercel.app/",
    tech: ["React", "Framer Motion", "UI/UX"],
  },
];

/* ── SectionLabel ────────────────────────────────────────── */
const SectionLabel = ({ text }) => (
  <span className="inline-flex items-center gap-2 text-xs font-medium text-indigo-400 tracking-[0.18em] uppercase mb-4">
    <span className="w-5 h-px bg-indigo-400/60" />
    {text}
  </span>
);

/* ── Slide variants ──────────────────────────────────────── */
const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ── Projects ────────────────────────────────────────────── */
export default function Projects() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [autoPlay, setAutoPlay] = useState(false);

  const project = projects[index];

  const next = useCallback(() => {
    setDir(1);
    setIndex((i) => (i + 1) % projects.length);
  }, []);

  const prev = useCallback(() => {
    setDir(-1);
    setIndex((i) => (i - 1 + projects.length) % projects.length);
  }, []);

  const goTo = useCallback((i) => {
    setDir(i > index ? 1 : -1);
    setIndex(i);
  }, [index]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [autoPlay, next]);

  return (
    <section className="relative min-h-screen pt-28 pb-20 px-6 overflow-hidden">

      {/* Ambient bg */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-indigo-600/[0.05] blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-violet-600/[0.04] blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <SectionLabel text="Selected Work" />
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight">
            Things I've <span className="text-white/35">Built</span>
          </h1>
        </motion.div>

        {/* Counter */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs text-white/25 font-mono tracking-widest">
            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>

          {/* Auto-play toggle */}
          <button
            onClick={() => setAutoPlay((v) => !v)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors duration-200 ${autoPlay
                ? "bg-indigo-500/15 border-indigo-500/30 text-indigo-300"
                : "border-white/[0.08] text-white/30 hover:text-white/50"
              }`}
          >
            {autoPlay ? "⏸ Auto" : "⏵ Auto"}
          </button>
        </div>

        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={index}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid md:grid-cols-5 gap-0 glass-strong rounded-3xl overflow-hidden"
            >
              {/* Image */}
              <div className="md:col-span-3 relative h-64 md:h-auto overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.image})` }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0a14]/80 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14]/60 via-transparent to-transparent md:hidden" />

                {/* Visit overlay */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-end p-5"
                  aria-label={`Visit ${project.title}`}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <ExternalLink size={14} /> Visit Site
                  </motion.span>
                </a>
              </div>

              {/* Content */}
              <div className="md:col-span-2 flex flex-col justify-between p-7 md:p-10">
                <div>
                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/15 tracking-wide"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
                    {project.title}
                  </h2>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
                  >
                    View project
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-0.5 transition-transform duration-200 text-indigo-400"
                    />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">

          {/* Dot indicators */}
          <div className="flex items-center gap-1.5">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${i === index
                    ? "w-5 h-1.5 bg-indigo-400"
                    : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                  }`}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="p-3 rounded-full glass border border-white/[0.07] text-white/60 hover:text-white hover:border-white/15 transition-colors duration-200"
              aria-label="Previous project"
            >
              <ArrowLeft size={18} />
            </motion.button>
            <motion.button
              onClick={next}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="p-3 rounded-full glass border border-white/[0.07] text-white/60 hover:text-white hover:border-white/15 transition-colors duration-200"
              aria-label="Next project"
            >
              <ArrowRight size={18} />
            </motion.button>
          </div>
        </div>

        <p className="text-[11px] text-white/20 text-right mt-3 font-mono tracking-wider">
          ← → arrow keys to navigate
        </p>
      </div>
    </section>
  );
}
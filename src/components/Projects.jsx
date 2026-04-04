import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";

/* -- Project data -- */
const projects = [
  {
    title: "Beeros",
    subtitle: "Clothing Brand E-commerce",
    description:
      "A full-featured clothing brand store built with the MERN stack. Razorpay payment gateway, responsive UI, and smooth user experience.",
    image: "/Beeros_Img.png",
    link: "https://beeros.in",
    tech: ["MERN", "Razorpay", "Passport.js", "MongoDB"],
    color: "#6366f1",
  },
  {
    title: "AI Notes",
    subtitle: "Intelligent Note-Taking",
    description:
      "Smart note-taking app that uses AI to summarize, organize, and search notes. Boost productivity with intelligent suggestions and a clean UI.",
    image: "/Ai_notes.jpg",
    link: "https://ai-notes-front-end.vercel.app/",
    tech: ["React", "OpenAI API", "Node.js"],
    color: "#8b5cf6",
  },
  {
    title: "Netflix Clone",
    subtitle: "Streaming Platform",
    description:
      "Netflix-inspired platform with login, watchlist, real-time TMDB movie data, and a fully responsive UI.",
    image: "/Netlfix.png",
    link: "https://netflix-clone-vert-delta.vercel.app/",
    tech: ["React", "Firebase", "TMDB API"],
    color: "#ef4444",
  },
  {
    title: "E-Commerce",
    subtitle: "Shopping Platform",
    description:
      "Modern e-commerce app with product listings, cart, and checkout flow. Smooth and scalable shopping experience.",
    image: "/Ecom.png",
    link: "https://ecom-two-pink-20.vercel.app/",
    tech: ["MERN", "Redux", "Stripe"],
    color: "#10b981",
  },
  {
    title: "Abdullah Jewels",
    subtitle: "Jewellery Shop",
    description:
      "Frontend-based jewellery shop where users can browse items and contact the owner to place orders.",
    image: "/shop.png",
    link: "https://shop-neon-nine.vercel.app/",
    tech: ["React", "Tailwind", "Vercel"],
    color: "#f59e0b",
  },
  {
    title: "Chat App",
    subtitle: "Real-Time Messaging",
    description:
      "Chat application built with MERN and Socket.io. Users can sign up, log in, and chat with friends in real time.",
    image: "/Chat.png",
    link: "https://amaan-chat-app-fe.vercel.app/",
    tech: ["Socket.io", "Express", "React"],
    color: "#06b6d4",
  },
  {
    title: "Consultancy",
    subtitle: "Modern Landing Page",
    description:
      "Modern consultancy site where users can explore services and reach out via a contact form.",
    image: "/Consultancy.png",
    link: "https://amaan-consultancy-modern-frontend-p.vercel.app/",
    tech: ["React", "Framer Motion", "UI/UX"],
    color: "#ec4899",
  },
];

/* -- Project Card -- */
const ProjectCard = ({ project, index, onSelect }) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const handleMouse = useCallback((e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width);
    mouseY.set((e.clientY - r.top) / r.height);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouse}
      onClick={() => onSelect(project)}
      className="group relative rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 cursor-pointer bento-item"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.image})` }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-[#0a0908]/30 to-transparent" />

        {/* Number */}
        <div className="absolute top-4 left-4">
          <span className="text-xs font-mono text-white/25 tracking-wider">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Arrow */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <ArrowUpRight size={14} className="text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-full text-[10px] font-medium text-white/40 bg-white/[0.04] border border-white/[0.06]"
            >
              {t}
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-xs text-white/35">{project.subtitle}</p>
      </div>

      {/* Bottom accent line */}
      <div
        className="h-[2px] w-0 group-hover:w-full transition-all duration-500"
        style={{ background: project.color }}
      />
    </motion.div>
  );
};

/* -- Modal -- */
const ProjectModal = ({ project, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
    onClick={onClose}
  >
    {/* Backdrop */}
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

    {/* Card */}
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onClick={(e) => e.stopPropagation()}
      className="relative z-10 w-full max-w-3xl glass-strong rounded-3xl overflow-hidden"
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/60 hover:text-white transition-colors"
      >
        <X size={16} />
      </button>

      {/* Image */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-8 -mt-12 relative z-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full text-xs font-medium bg-amber-600/10 text-amber-400 border border-amber-600/20"
            >
              {t}
            </span>
          ))}
        </div>

        <h2 className="font-display text-3xl font-bold text-white mb-2">{project.title}</h2>
        <p className="text-sm text-white/40 mb-4">{project.subtitle}</p>
        <p className="text-white/50 text-sm leading-relaxed mb-6">{project.description}</p>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-amber-100 transition-colors duration-200 shadow-lg shadow-black/20"
        >
          Visit Site
          <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </a>
      </div>
    </motion.div>
  </motion.div>
);

/* -- Projects Page -- */
export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="relative min-h-screen pt-28 pb-20 px-6 md:px-12 overflow-hidden">

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 text-xs font-mono text-amber-500 tracking-[0.2em] uppercase mb-5">
            <span className="w-8 h-px bg-amber-500/60" />
            Selected Work
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-[0.95]">
            Things I've<br />
            <span className="text-white/25">built.</span>
          </h1>
        </motion.div>

        {/* Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs font-mono text-white/20 tracking-wider mb-12"
        >
          {String(projects.length).padStart(2, "0")} projects
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onSelect={setSelected}
            />
          ))}
        </div>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-[11px] font-mono text-white/15 text-center mt-10 tracking-wider"
        >
          click a project to see details
        </motion.p>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

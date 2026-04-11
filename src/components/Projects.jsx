import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";

const projects = [
  { title: "Beeros", subtitle: "Clothing Brand E-commerce", description: "A full-featured clothing brand store built with the MERN stack. Razorpay payment gateway, responsive UI, and smooth user experience.", image: "/Beeros_Img.png", link: "https://beeros.in", tech: ["MERN", "Razorpay", "Passport.js", "MongoDB"], color: "#7c4dff" },
  { title: "AI Notes", subtitle: "Intelligent Note-Taking", description: "Smart note-taking app that uses AI to summarize, organize, and search notes. Boost productivity with intelligent suggestions and a clean UI.", image: "/Ai_notes.jpg", link: "https://ai-notes-front-end.vercel.app/", tech: ["React", "OpenAI API", "Node.js"], color: "#00c9a7" },
  { title: "Netflix Clone", subtitle: "Streaming Platform", description: "Netflix-inspired platform with login, watchlist, real-time TMDB movie data, and a fully responsive UI.", image: "/Netlfix.png", link: "https://netflix-clone-vert-delta.vercel.app/", tech: ["React", "Firebase", "TMDB API"], color: "#ff6b35" },
  { title: "E-Commerce", subtitle: "Shopping Platform", description: "Modern e-commerce app with product listings, cart, and checkout flow. Smooth and scalable shopping experience.", image: "/Ecom.png", link: "https://ecom-two-pink-20.vercel.app/", tech: ["MERN", "Redux", "Stripe"], color: "#a78bfa" },
  { title: "Abdullah Jewels", subtitle: "Jewellery Shop", description: "Frontend-based jewellery shop where users can browse items and contact the owner to place orders.", image: "/shop.png", link: "https://shop-neon-nine.vercel.app/", tech: ["React", "Tailwind", "Vercel"], color: "#06b6d4" },
  { title: "Chat App", subtitle: "Real-Time Messaging", description: "Chat application built with MERN and Socket.io. Users can sign up, log in, and chat with friends in real time.", image: "/Chat.png", link: "https://amaan-chat-app-fe.vercel.app/", tech: ["Socket.io", "Express", "React"], color: "#f472b6" },
  { title: "Consultancy", subtitle: "Modern Landing Page", description: "Modern consultancy site where users can explore services and reach out via a contact form.", image: "/Consultancy.png", link: "https://amaan-consultancy-modern-frontend-p.vercel.app/", tech: ["React", "Framer Motion", "UI/UX"], color: "#fbbf24" },
];

const ProjectCard = ({ project, index, onSelect }) => {
  const isEven = index % 2 === 0;
  return (
    <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${!isEven ? "lg:direction-rtl" : ""}`}>
      <div className={`relative rounded-2xl overflow-hidden group cursor-pointer ${!isEven ? "lg:order-2" : ""}`}
        onClick={() => onSelect(project)} data-cursor="View">
        <div className="aspect-[16/10] relative overflow-hidden rounded-2xl shadow-lg shadow-[#1a1a2e]/[0.06]">
          <motion.div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }}
            whileHover={{ scale: 1.05 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[#1a1a2e]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <div className="flex items-center gap-2 text-sm font-medium text-white"><span>View Project</span><ArrowUpRight size={16} /></div>
          </div>
        </div>
        <div className="absolute -bottom-px left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />
      </div>
      <div className={`py-4 ${!isEven ? "lg:order-1 lg:text-right" : ""}`}>
        <span className="text-6xl md:text-8xl font-display font-bold text-[#1a1a2e]/[0.04] block mb-[-1.5rem] md:mb-[-2.5rem]">{String(index + 1).padStart(2, "0")}</span>
        <div className={`flex flex-wrap gap-1.5 mb-4 ${!isEven ? "lg:justify-end" : ""}`}>
          {project.tech.slice(0, 3).map((t) => (<span key={t} className="px-2.5 py-0.5 rounded-full text-[10px] font-medium text-[#1a1a2e]/40 bg-[#1a1a2e]/[0.03] border border-[#1a1a2e]/[0.06]">{t}</span>))}
        </div>
        <h3 className="font-display text-2xl md:text-4xl font-bold text-[#1a1a2e] mb-2 cursor-pointer hover:text-[#7c4dff] transition-colors duration-300" onClick={() => onSelect(project)}>{project.title}</h3>
        <p className="text-sm text-[#1a1a2e]/35 mb-4">{project.subtitle}</p>
        <p className="text-sm text-[#1a1a2e]/30 leading-relaxed max-w-md mb-6">{project.description}</p>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-sm font-medium text-[#7c4dff] hover:text-[#00c9a7] transition-colors duration-300" data-cursor="Open">
          Visit Site <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </a>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8" onClick={onClose}>
    <div className="absolute inset-0 bg-[#1a1a2e]/30 backdrop-blur-md" />
    <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} onClick={(e) => e.stopPropagation()}
      className="relative z-10 w-full max-w-3xl glass-strong rounded-3xl overflow-hidden shadow-2xl">
      <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#1a1a2e]/10 backdrop-blur-sm border border-[#1a1a2e]/10 text-[#1a1a2e]/40 hover:text-[#1a1a2e] transition-colors"><X size={16} /></button>
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>
      <div className="p-8 -mt-12 relative z-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (<span key={t} className="px-3 py-1 rounded-full text-xs font-medium bg-[#7c4dff]/8 text-[#7c4dff] border border-[#7c4dff]/15">{t}</span>))}
        </div>
        <h2 className="font-display text-3xl font-bold text-[#1a1a2e] mb-2">{project.title}</h2>
        <p className="text-sm text-[#1a1a2e]/40 mb-4">{project.subtitle}</p>
        <p className="text-[#1a1a2e]/45 text-sm leading-relaxed mb-6">{project.description}</p>
        <a href={project.link} target="_blank" rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7c4dff] text-white text-sm font-semibold hover:bg-[#6a3de8] transition-colors duration-200 shadow-lg shadow-[#7c4dff]/20">
          Visit Site <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </a>
      </div>
    </motion.div>
  </motion.div>
);

export default function Projects() {
  const [selected, setSelected] = useState(null);
  return (
    <section className="relative min-h-screen pt-28 pb-20 px-6 md:px-12 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-4">
          <span className="inline-flex items-center gap-2 text-xs font-mono text-[#7c4dff] tracking-[0.2em] uppercase mb-5"><span className="w-8 h-px bg-[#7c4dff]/60" /> Selected Work</span>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-[#1a1a2e] leading-[0.95]">Things I've<br /><span className="text-stroke">built.</span></h1>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-xs font-mono text-[#1a1a2e]/15 tracking-wider mb-16">{String(projects.length).padStart(2, "0")} projects</motion.p>
        <div className="space-y-24 md:space-y-32">
          {projects.map((project, i) => (<ProjectCard key={project.title} project={project} index={i} onSelect={setSelected} />))}
        </div>
      </div>
      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  );
}

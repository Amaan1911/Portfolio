import { motion, useMotionValue, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, MapPin, Briefcase, GraduationCap, Heart } from "lucide-react";
import { useCallback, useRef, useState, useEffect } from "react";
import { SiReact, SiNodedotjs, SiMongodb, SiExpress, SiJavascript, SiTypescript, SiTailwindcss, SiFirebase, SiAmazonwebservices, SiDocker } from "react-icons/si";

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function AnimatedCounter({ value, label }) {
  const ref = useRef(null); const isInView = useInView(ref, { once: true }); const [count, setCount] = useState(0); const numericValue = parseInt(value);
  useEffect(() => {
    if (!isInView) return; const end = numericValue; const duration = 1500; const startTime = Date.now();
    const timer = setInterval(() => { const elapsed = Date.now() - startTime; const progress = Math.min(elapsed / duration, 1); setCount(Math.floor((1 - Math.pow(1 - progress, 4)) * end)); if (progress >= 1) clearInterval(timer); }, 16);
    return () => clearInterval(timer);
  }, [isInView, numericValue]);
  return (<div ref={ref} className="text-center"><div className="text-4xl md:text-5xl font-display font-bold text-[#1a1a2e] mb-1">{count}<span className="text-[#7c4dff]">+</span></div><div className="text-xs font-mono text-[#1a1a2e]/25 tracking-wider uppercase">{label}</div></div>);
}

const SpotlightCard = ({ children, className = "" }) => {
  const ref = useRef(null); const mouseX = useMotionValue(0); const mouseY = useMotionValue(0);
  const handleMouse = useCallback((e) => { if (!ref.current) return; const r = ref.current.getBoundingClientRect(); mouseX.set(e.clientX - r.left); mouseY.set(e.clientY - r.top); }, [mouseX, mouseY]);
  return (<motion.div ref={ref} onMouseMove={handleMouse} className={`spotlight-card glass-card rounded-2xl bento-item ${className}`} style={{ "--mouse-x": mouseX, "--mouse-y": mouseY }}>{children}</motion.div>);
};

const techStack = [
  { Icon: SiReact, label: "React", color: "#61DAFB" }, { Icon: SiNodedotjs, label: "Node.js", color: "#4CAF50" },
  { Icon: SiMongodb, label: "MongoDB", color: "#47A248" }, { Icon: SiExpress, label: "Express", color: "#333" },
  { Icon: SiJavascript, label: "JavaScript", color: "#F7DF1E" }, { Icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { Icon: SiTailwindcss, label: "Tailwind", color: "#06B6D4" }, { Icon: SiFirebase, label: "Firebase", color: "#FFCA28" },
  { Icon: SiAmazonwebservices, label: "AWS", color: "#FF9900" }, { Icon: SiDocker, label: "Docker", color: "#2496ED" },
];

const stats = [{ value: "15", label: "Projects" }, { value: "1", label: "Year Exp." }, { value: "10", label: "Technologies" }];

export default function About() {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen pt-28 pb-24 px-6 md:px-12 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="mb-16">
          <motion.span variants={fadeUp} className="inline-flex items-center gap-2 text-xs font-mono text-[#7c4dff] tracking-[0.2em] uppercase mb-5">
            <span className="w-8 h-px bg-[#7c4dff]/60" /> About
          </motion.span>
          <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-7xl font-bold text-[#1a1a2e] leading-[0.95] mb-5">
            Building things<br /><span className="text-stroke">that matter.</span>
          </motion.h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="md:col-span-2 md:row-span-2">
            <SpotlightCard className="h-full p-8 flex flex-col">
              <div className="flex items-start gap-6 mb-6">
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#7c4dff]/20 via-[#00c9a7]/15 to-transparent blur-lg" />
                  <img src="/Amaan_Passport_Size.jpeg" alt="Amaan Sheikh" loading="lazy" className="relative w-20 h-20 rounded-full object-cover border-2 border-[#7c4dff]/15" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#1a1a2e] mb-1">Amaan Sheikh</h2>
                  <p className="text-sm text-[#1a1a2e]/35 flex items-center gap-1.5"><MapPin size={12} /> India</p>
                </div>
              </div>
              <div className="space-y-4 text-[#1a1a2e]/50 text-[0.95rem] leading-relaxed flex-1">
                <p>I'm a <span className="text-[#1a1a2e] font-medium">Software Developer</span> experienced in building modern web applications using the <span className="text-[#7c4dff] font-medium">MERN stack</span>. I enjoy solving real-world problems and turning ideas into clean, maintainable code.</p>
                <p>My focus is on scalable frontend and backend development, API integration, and creating interfaces that are fast, accessible, and easy to use.</p>
                <p>I'm continuously learning, improving my system design skills, and aiming to grow as a production-ready engineer.</p>
              </div>
              <motion.button onClick={() => navigate("/contact")} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-2 px-6 py-3 mt-6 rounded-full bg-[#7c4dff] text-white text-sm font-semibold hover:bg-[#6a3de8] transition-colors duration-200 shadow-lg shadow-[#7c4dff]/20 w-fit">
                Let's Talk <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </motion.button>
            </SpotlightCard>
          </motion.div>

          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}>
              <SpotlightCard className="p-6 h-full flex flex-col items-center justify-center"><AnimatedCounter value={s.value} label={s.label} /></SpotlightCard>
            </motion.div>
          ))}

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <SpotlightCard className="p-6 h-full"><Briefcase size={20} className="text-[#7c4dff] mb-3" /><h3 className="text-sm font-semibold text-[#1a1a2e] mb-2">What I Do</h3><p className="text-xs text-[#1a1a2e]/40 leading-relaxed">Full-stack web development, REST APIs, cloud deployment, and building products people love.</p></SpotlightCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="md:col-span-2">
            <SpotlightCard className="p-6 h-full">
              <span className="text-xs font-mono text-[#7c4dff] tracking-[0.2em] uppercase mb-4 block">Tech Stack</span>
              <div className="flex flex-wrap gap-2">
                {techStack.map(({ Icon, label, color }) => (
                  <motion.div key={label} whileHover={{ y: -3, transition: { duration: 0.15 } }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#1a1a2e]/[0.02] border border-[#1a1a2e]/[0.06] text-sm text-[#1a1a2e]/50 hover:text-[#1a1a2e] hover:border-[#7c4dff]/20 hover:bg-[#7c4dff]/[0.04] transition-all duration-200">
                    <Icon size={14} style={{ color }} className="opacity-70" /><span className="font-medium text-xs">{label}</span>
                  </motion.div>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.35 }}>
            <SpotlightCard className="p-6 h-full"><GraduationCap size={20} className="text-[#00c9a7] mb-3" /><h3 className="text-sm font-semibold text-[#1a1a2e] mb-2">Education</h3><p className="text-xs text-[#1a1a2e]/40 leading-relaxed">Constantly learning through building, reading, and contributing to projects.</p></SpotlightCard>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
            <SpotlightCard className="p-6 h-full"><Heart size={20} className="text-[#ff6b35] mb-3" /><h3 className="text-sm font-semibold text-[#1a1a2e] mb-2">Passions</h3><p className="text-xs text-[#1a1a2e]/40 leading-relaxed">Clean architecture, great UX, open source, and turning coffee into code.</p></SpotlightCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.45 }} className="md:col-span-4">
            <SpotlightCard className="p-8 md:p-12 text-center">
              <p className="font-display text-2xl md:text-3xl font-bold text-[#1a1a2e]/50 leading-snug max-w-2xl mx-auto">"The best way to predict the future is to <span className="gradient-text">build</span> it."</p>
              <p className="text-xs font-mono text-[#1a1a2e]/15 mt-4 tracking-wider">- Alan Kay</p>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

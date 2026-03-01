import { motion } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  SiReact, SiNodedotjs, SiMongodb, SiExpress,
  SiJavascript, SiTypescript, SiTailwindcss,
  SiFirebase, SiAmazonwebservices, SiDocker,
} from "react-icons/si";

/* ── Animation variants ──────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/* ── Stat card ───────────────────────────────────────────── */
const StatCard = ({ value, suffix, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    viewport={{ once: true }}
    className="p-5 rounded-2xl glass border border-white/[0.06] text-center"
  >
    <div className="text-3xl font-display font-bold text-white mb-1">
      {value}{suffix}
    </div>
    <div className="text-xs text-white/40 tracking-wide">{label}</div>
  </motion.div>
);

/* ── Tech stack pills ────────────────────────────────────── */
const techStack = [
  { Icon: SiReact, label: "React", color: "#61DAFB" },
  { Icon: SiNodedotjs, label: "Node.js", color: "#4CAF50" },
  { Icon: SiMongodb, label: "MongoDB", color: "#47A248" },
  { Icon: SiExpress, label: "Express", color: "#ffffff" },
  { Icon: SiJavascript, label: "JavaScript", color: "#F7DF1E" },
  { Icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { Icon: SiTailwindcss, label: "Tailwind", color: "#06B6D4" },
  { Icon: SiFirebase, label: "Firebase", color: "#FFCA28" },
  { Icon: SiAmazonwebservices, label: "AWS", color: "#FF9900" },
  { Icon: SiDocker, label: "Docker", color: "#2496ED" },
];

/* ── SectionLabel ────────────────────────────────────────── */
const SectionLabel = ({ text }) => (
  <span className="inline-flex items-center gap-2 text-xs font-medium text-indigo-400 tracking-[0.18em] uppercase mb-4">
    <span className="w-5 h-px bg-indigo-400/60" />
    {text}
  </span>
);

/* ── About Page ──────────────────────────────────────────── */
export default function About() {
  const navigate = useNavigate();
  const ref = useRef(null);

  const stats = [
    { value: "15", suffix: "+", label: "Projects Built" },
    { value: "1", suffix: "+", label: "Year Experience" },
    { value: "10", suffix: "+", label: "Technologies" },
    { value: "500", suffix: "+", label: "Cups of Coffee" },
  ];

  return (
    <section className="relative min-h-screen pt-28 pb-24 px-6 md:px-16 overflow-hidden">

      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-indigo-600/[0.06] blur-[100px]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-20"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel text="About Me" />
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-4"
          >
            Building products<br />
            <span className="text-white/40">people love to use.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-white/50 text-lg max-w-xl leading-relaxed"
          >
            Software developer focused on reliable, scalable, and user-centered
            web applications.
          </motion.p>
        </motion.div>

        {/* ── Bio + Photo ── */}
        <div className="grid md:grid-cols-2 gap-14 items-start mb-20">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-indigo-500/30 via-violet-500/20 to-transparent blur-xl" />
              <img
                src="/Amaan_Passport_Size.jpeg"
                alt="Amaan Sheikh"
                loading="lazy"
                className="relative w-52 h-52 md:w-64 md:h-64 rounded-full object-cover border border-white/[0.08] shadow-2xl"
              />
              {/* Subtle ring */}
              <div className="absolute inset-0 rounded-full border border-indigo-400/20" />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-5 text-white/60 leading-relaxed text-[0.97rem]"
          >
            <motion.p variants={fadeUp}>
              I'm a{" "}
              <span className="text-white font-medium">Software Developer</span>{" "}
              experienced in building modern web applications using the{" "}
              <span className="text-indigo-300">MERN stack</span>. I enjoy
              solving real-world problems and turning ideas into clean,
              maintainable code.
            </motion.p>

            <motion.p variants={fadeUp}>
              My focus is on scalable frontend and backend development, API
              integration, and creating interfaces that are fast, accessible,
              and easy to use.
            </motion.p>

            <motion.p variants={fadeUp}>
              I'm continuously learning, improving my system design skills, and
              aiming to grow as a production-ready engineer.
            </motion.p>

            <motion.div variants={fadeUp} className="pt-2">
              <motion.button
                onClick={() => navigate("/contact")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500/90 hover:bg-indigo-400 text-white text-sm font-medium transition-colors duration-200 shadow-lg shadow-indigo-500/25"
              >
                Let's Talk
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform duration-200"
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Stats ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <SectionLabel text="By the numbers" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {stats.map((s, i) => (
              <StatCard key={s.label} {...s} delay={i * 0.08} />
            ))}
          </div>
        </motion.div>

        {/* ── Tech Stack ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionLabel text="Tech I work with" />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.05 } } }}
            className="flex flex-wrap gap-2.5 mt-2"
          >
            {techStack.map(({ Icon, label, color }) => (
              <motion.div
                key={label}
                variants={{
                  hidden: { opacity: 0, scale: 0.85 },
                  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
                }}
                whileHover={{ y: -2, transition: { duration: 0.15 } }}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass border border-white/[0.06] text-sm text-white/70 hover:text-white hover:border-white/10 transition-colors cursor-default"
              >
                <Icon size={15} style={{ color }} />
                <span className="font-medium">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Code, Database, Rocket, Coffee } from "lucide-react";

/* ======================
   STAT CARD
====================== */
const StatCard = ({ icon: Icon, value, suffix, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    whileHover={{ y: -4 }}
    className="p-6 rounded-xl bg-white/5 border border-white/10 text-center transition"
  >
    <Icon className="text-blue-400 mb-3 mx-auto" size={26} />
    <div className="text-3xl font-bold text-white">
      {value}
      {suffix}
    </div>
    <div className="text-sm text-gray-400 mt-1">{label}</div>
  </motion.div>
);

/* ======================
   SKILL BAR
====================== */
const SkillBar = ({ name, level, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="space-y-2"
  >
    <div className="flex justify-between text-sm">
      <span className="text-white font-medium">{name}</span>
      <span className="text-gray-400">{level}%</span>
    </div>

    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="h-full bg-blue-500 rounded-full"
      />
    </div>
  </motion.div>
);

/* ======================
   MAIN COMPONENT
====================== */
export default function About() {
  const navigate = useNavigate();
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true });

  const [counts, setCounts] = useState({
    projects: 0,
    experience: 0,
    technologies: 0,
    coffee: 0,
  });

  useEffect(() => {
    if (!isInView) return;

    const targets = {
      projects: 15,
      experience: 1,
      technologies: 10,
      coffee: 500,
    };

    Object.keys(targets).forEach((key) => {
      let current = 0;
      const step = targets[key] / 40;

      const timer = setInterval(() => {
        current += step;
        if (current >= targets[key]) {
          current = targets[key];
          clearInterval(timer);
        }
        setCounts((prev) => ({ ...prev, [key]: Math.floor(current) }));
      }, 30);
    });
  }, [isInView]);

  return (
    <section className="relative py-24 px-6 md:px-16 bg-gradient-to-b from-[#0b0f1a] to-[#05070d] text-white overflow-hidden">

      {/* Subtle animated background */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_60%)]"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-6xl mx-auto space-y-20">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About Me</h1>
          <p className="text-gray-400 text-lg">
            Software Developer focused on building reliable, scalable, and
            user-focused web applications.
          </p>
        </motion.div>

        {/* ABOUT CONTENT */}
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <motion.img
            src="/Amaan_Passport_Size.jpeg"
            alt="Amaan Sheikh"
            className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover mx-auto border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            viewport={{ once: true }}
          />

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4 text-gray-300"
          >
            <p>
              I’m a{" "}
              <span className="text-blue-400 font-medium">
                Software Developer
              </span>{" "}
              experienced in building modern web applications using the MERN
              stack. I enjoy solving real-world problems and turning ideas into
              clean, maintainable code.
            </p>

            <p>
              My focus is on scalable frontend and backend development, API
              integration, and creating interfaces that are fast, accessible,
              and easy to use.
            </p>

            <p>
              I’m continuously learning, improving my system design skills, and
              aiming to grow as a production-ready engineer.
            </p>

            <motion.button
              onClick={() => navigate("/contact")}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition"
            >
              Let’s Connect <Rocket size={18} />
            </motion.button>
          </motion.div>
        </div>

        {/* STATS */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard icon={Code} value={counts.projects} suffix="+" label="Projects" delay={0.1} />
          <StatCard icon={Rocket} value={counts.experience} suffix="+" label="Years Experience" delay={0.2} />
          <StatCard icon={Database} value={counts.technologies} suffix="+" label="Technologies" delay={0.3} />
          <StatCard icon={Coffee} value={counts.coffee} suffix="+" label="Cups of Coffee" delay={0.4} />
        </div>

        {/* SKILLS */}
        <div className="max-w-3xl mx-auto space-y-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-6"
          >
            Skills
          </motion.h2>

          <SkillBar name="Frontend Development (React, JavaScript)" level={90} delay={0.1} />
          <SkillBar name="Backend Development (Node, Express)" level={85} delay={0.2} />
          <SkillBar name="Database Design (MongoDB)" level={80} delay={0.3} />
          <SkillBar name="UI & UX Fundamentals" level={75} delay={0.4} />
        </div>
      </div>
    </section>
  );
}

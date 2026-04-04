import { motion } from "framer-motion";
import {
  Box, Code2, Cpu, Globe, Headphones,
  BookOpen, Coffee, Terminal, Layers, Database, ArrowRight, Zap
} from "lucide-react";

/* -- Animation variants -- */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

/* -- WhatIamDoingNow -- */
const WhatIamDoingNow = () => (
  <section className="relative min-h-screen pt-28 pb-20 px-6 md:px-12 overflow-hidden">

    <div className="relative z-10 max-w-5xl mx-auto">

      {/* Header */}
      <motion.div initial="hidden" animate="show" variants={stagger} className="mb-16">
        <motion.span variants={fadeUp} className="inline-flex items-center gap-2 text-xs font-mono text-amber-500 tracking-[0.2em] uppercase mb-5">
          <span className="w-8 h-px bg-amber-500/60" />
          Current Focus
        </motion.span>
        <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-7xl font-bold text-white leading-[0.95] mb-5">
          What I'm doing<br /><span className="text-white/25">right now.</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="text-white/35 text-base leading-relaxed">
          What's occupying my mind, screen, and time.
        </motion.p>
      </motion.div>

      <motion.div initial="hidden" animate="show" variants={stagger} className="space-y-5">

        {/* Main feature card */}
        <motion.div variants={fadeUp}>
          <div className="glass-strong rounded-2xl p-8 relative overflow-hidden bento-item">
            <div className="absolute top-4 right-4 opacity-[0.03] pointer-events-none">
              <Box size={180} />
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center relative z-10">
              <div className="p-4 rounded-2xl bg-amber-600/10 border border-amber-600/10 flex-shrink-0">
                <Box size={32} className="text-amber-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center flex-wrap gap-2.5 mb-3">
                  <h2 className="font-display text-xl font-bold text-white">Mastering Docker</h2>
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium text-amber-400 bg-amber-600/10 border border-amber-600/15">
                    <Zap size={10} />
                    In Progress
                  </span>
                </div>
                <p className="text-white/40 text-sm leading-relaxed mb-4 max-w-xl">
                  Diving deep into containerization, reproducible environments, and orchestrating
                  microservices. Building efficient images and understanding the full Docker ecosystem.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Containers", "Images", "Compose", "Volumes", "Networks"].map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono text-white/35 bg-white/[0.03] rounded-lg border border-white/[0.05]">
                      <Terminal size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Portfolio */}
          <div className="glass-strong rounded-2xl p-6 bento-item">
            <div className="flex items-center gap-2.5 mb-3">
              <Code2 size={16} className="text-amber-500" />
              <h3 className="text-sm font-semibold text-white">This Portfolio</h3>
            </div>
            <p className="text-xs text-white/35 leading-relaxed mb-4">
              Refining UX/UI, adding fluid animations, and ensuring a premium feel across all devices.
            </p>
            <div className="flex items-center gap-1.5 text-amber-500 text-xs font-mono">
              <Globe size={11} /> Live
              <ArrowRight size={10} className="ml-1" />
            </div>
          </div>

          {/* Stack */}
          <div className="glass-strong rounded-2xl p-6 bento-item">
            <div className="flex items-center gap-2.5 mb-3">
              <Layers size={16} className="text-amber-500" />
              <h3 className="text-sm font-semibold text-white">Stack Focus</h3>
            </div>
            <ul className="space-y-2.5">
              {[
                { name: "React 19", icon: Globe },
                { name: "Tailwind v4", icon: Layers },
                { name: "Framer Motion", icon: Cpu },
                { name: "MongoDB", icon: Database },
              ].map(({ name, icon: Icon }) => (
                <li key={name} className="flex items-center justify-between text-xs text-white/35 group hover:text-white/60 transition-colors duration-300">
                  <span className="flex items-center gap-2">
                    <Icon size={11} className="text-white/20" />
                    {name}
                  </span>
                  <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 text-amber-500 transition-opacity duration-300" />
                </li>
              ))}
            </ul>
          </div>

          {/* Vibe */}
          <div className="glass-strong rounded-2xl p-6 bento-item">
            <div className="flex items-center gap-2.5 mb-3">
              <Coffee size={16} className="text-amber-500" />
              <h3 className="text-sm font-semibold text-white">Current Vibe</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <Headphones size={12} className="text-white/15 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-mono text-white/20">Listening to</p>
                  <p className="text-xs text-white/50 font-medium">Lo-Fi Coding Beats</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <BookOpen size={12} className="text-white/15 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-mono text-white/20">Reading</p>
                  <p className="text-xs text-white/50 font-medium">Clean Architecture</p>
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default WhatIamDoingNow;

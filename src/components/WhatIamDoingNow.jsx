import { motion } from "framer-motion";
import {
    Box, Code2, Cpu, Globe, Headphones,
    BookOpen, Coffee, Terminal, Layers, Database, ArrowRight
} from "lucide-react";

/* ── SectionLabel ────────────────────────────────────────── */
const SectionLabel = ({ text }) => (
    <span className="inline-flex items-center gap-2 text-xs font-medium text-indigo-400 tracking-[0.18em] uppercase mb-4">
        <span className="w-5 h-px bg-indigo-400/60" />
        {text}
    </span>
);

/* ── Animation variants ──────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

/* ── Card wrapper ────────────────────────────────────────── */
const GlassCard = ({ children, className = "" }) => (
    <div className={`glass-strong rounded-2xl p-6 ${className}`}>
        {children}
    </div>
);

/* ── WhatIamDoingNow ─────────────────────────────────────── */
const WhatIamDoingNow = () => (
    <section className="relative min-h-screen pt-28 pb-20 px-6 md:px-16 overflow-hidden">

        {/* Ambient */}
        <div className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-indigo-600/[0.06] blur-[90px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">

            {/* Header */}
            <motion.div initial="hidden" animate="show" variants={stagger} className="mb-14">
                <motion.div variants={fadeUp}><SectionLabel text="Current Focus" /></motion.div>
                <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
                    What I'm doing<br /><span className="text-white/35">right now.</span>
                </motion.h1>
                <motion.p variants={fadeUp} className="text-white/45 text-base leading-relaxed">
                    What's occupying my mind, screen, and time.
                </motion.p>
            </motion.div>

            <motion.div initial="hidden" animate="show" variants={stagger} className="space-y-6">

                {/* Main feature card — Docker */}
                <motion.div variants={fadeUp}>
                    <GlassCard className="relative overflow-hidden">
                        {/* Subtle icon watermark */}
                        <div className="absolute top-4 right-4 opacity-[0.04] pointer-events-none">
                            <Box size={160} />
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center relative z-10">
                            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/15 flex-shrink-0">
                                <Box size={36} className="text-indigo-400" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center flex-wrap gap-2 mb-2">
                                    <h2 className="font-display text-xl font-bold text-white">Mastering Docker</h2>
                                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 animate-pulse">
                                        In Progress
                                    </span>
                                </div>
                                <p className="text-white/50 text-sm leading-relaxed mb-4 max-w-xl">
                                    Diving deep into containerization, reproducible environments, and orchestrating
                                    microservices. Building efficient images and understanding the full Docker ecosystem.
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                    {["Containers", "Images", "Compose", "Volumes", "Networks"].map((tag) => (
                                        <span key={tag} className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-white/50 bg-white/[0.04] rounded-lg border border-white/[0.06]">
                                            <Terminal size={11} />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Secondary grid */}
                <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* Building this portfolio */}
                    <GlassCard>
                        <div className="flex items-center gap-2.5 mb-3">
                            <Code2 size={16} className="text-indigo-400" />
                            <h3 className="text-sm font-semibold text-white">This Portfolio</h3>
                        </div>
                        <p className="text-xs text-white/40 leading-relaxed mb-4">
                            Refining UX/UI, adding fluid animations, and ensuring a premium feel across all devices.
                        </p>
                        <div className="flex items-center gap-1.5 text-indigo-400 text-xs font-medium mt-auto">
                            <Globe size={12} /> Live
                            <ArrowRight size={11} className="ml-1" />
                        </div>
                    </GlassCard>

                    {/* Stack focus */}
                    <GlassCard>
                        <div className="flex items-center gap-2.5 mb-3">
                            <Layers size={16} className="text-indigo-400" />
                            <h3 className="text-sm font-semibold text-white">Stack Focus</h3>
                        </div>
                        <ul className="space-y-2.5">
                            {[
                                { name: "React 19", icon: Globe },
                                { name: "Tailwind v4", icon: Layers },
                                { name: "Framer Motion", icon: Cpu },
                                { name: "MongoDB", icon: Database },
                            ].map(({ name, icon: Icon }) => (
                                <li key={name} className="flex items-center justify-between text-xs text-white/40 group hover:text-white/70 transition-colors">
                                    <span className="flex items-center gap-2">
                                        <Icon size={11} />
                                        {name}
                                    </span>
                                    <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 text-indigo-400 transition-opacity" />
                                </li>
                            ))}
                        </ul>
                    </GlassCard>

                    {/* Current vibe */}
                    <GlassCard>
                        <div className="flex items-center gap-2.5 mb-3">
                            <Coffee size={16} className="text-indigo-400" />
                            <h3 className="text-sm font-semibold text-white">Current Vibe</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-start gap-2.5">
                                <Headphones size={13} className="text-white/20 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-[11px] text-white/25">Listening to</p>
                                    <p className="text-xs text-white/60 font-medium">Lo-Fi Coding Beats</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-2.5">
                                <BookOpen size={13} className="text-white/20 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-[11px] text-white/25">Reading</p>
                                    <p className="text-xs text-white/60 font-medium">Clean Architecture</p>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                </motion.div>
            </motion.div>
        </div>
    </section>
);

export default WhatIamDoingNow;
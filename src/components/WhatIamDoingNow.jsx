import React from "react";
import { motion } from "framer-motion";
import {
    Box,
    Code2,
    Cpu,
    Globe,
    Headphones,
    BookOpen,
    Coffee,
    Terminal,
    Layers,
    Database,
    ArrowRight
} from "lucide-react";

const WhatIamDoingNow = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="relative min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-12"
            >
                {/* Header Section */}
                <motion.div variants={fadeIn} className="text-center space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 tracking-tight">
                        Now
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
                        What's currently occupying my mind, screen, and time.
                    </p>
                    <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full" />
                </motion.div>

                {/* Main Focus: Docker */}
                <motion.div variants={fadeIn} className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Box size={200} />
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
                            <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                                <Box size={48} className="text-blue-400" />
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-2xl font-bold text-white">Mastering Docker</h2>
                                    <span className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-500/10 rounded-full border border-blue-500/20 animate-pulse">
                                        In Progress
                                    </span>
                                </div>
                                <p className="text-gray-300 leading-relaxed max-w-2xl">
                                    Diving deep into containerization, creating reproducible environments, and orchestrating microservices. Building efficient images and understanding the complete Docker ecosystem.
                                </p>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {["Containers", "Images", "Compose", "Volumes", "Networks"].map((tag) => (
                                        <span key={tag} className="flex items-center gap-1.5 px-3 py-1 text-sm text-cyan-300 bg-cyan-900/20 rounded-lg border border-cyan-500/20">
                                            <Terminal size={14} />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Grid Layout for Secondary Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Project Card */}
                    <motion.div variants={fadeIn} className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                        <div className="relative h-full bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:bg-white/5 transition duration-300 flex flex-col">
                            <div className="flex items-center gap-3 mb-4">
                                <Code2 className="text-purple-400" size={24} />
                                <h3 className="text-xl font-semibold text-white">Building This Portfolio</h3>
                            </div>
                            <p className="text-gray-400 mb-4 flex-grow">
                                Refining the UX/UI, adding fluid animations, and ensuring a premium feel across all devices.
                            </p>
                            <div className="mt-auto pt-4 border-t border-white/5 flex gap-4 text-gray-500">
                                <Globe size={18} className="hover:text-purple-400 transition-colors cursor-pointer" />
                                <Layers size={18} className="hover:text-purple-400 transition-colors cursor-pointer" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Learning Stack Card */}
                    <motion.div variants={fadeIn} className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                        <div className="relative h-full bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:bg-white/5 transition duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <Database className="text-emerald-400" size={24} />
                                <h3 className="text-xl font-semibold text-white">Stack Focus</h3>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    { name: "React 19", icon: <Globe size={16} /> },
                                    { name: "Tailwind v4", icon: <Layers size={16} /> },
                                    { name: "Framer Motion", icon: <Cpu size={16} /> }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center justify-between text-gray-300 group/item hover:text-white transition-colors">
                                        <span className="flex items-center gap-2">
                                            {item.icon}
                                            {item.name}
                                        </span>
                                        <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 text-emerald-400" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Reading/Vibe Card */}
                    <motion.div variants={fadeIn} className="group relative md:col-span-2 lg:col-span-1">
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                        <div className="relative h-full bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hover:bg-white/5 transition duration-300">
                            <div className="flex items-center gap-3 mb-4">
                                <Coffee className="text-amber-400" size={24} />
                                <h3 className="text-xl font-semibold text-white">Current Vibe</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Headphones className="text-gray-500 mt-1" size={16} />
                                    <div>
                                        <p className="text-sm text-gray-400">Listening to</p>
                                        <p className="text-white font-medium">Lo-Fi Coding Beats</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <BookOpen className="text-gray-500 mt-1" size={16} />
                                    <div>
                                        <p className="text-sm text-gray-400">Reading</p>
                                        <p className="text-white font-medium">Clean Architecture</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </motion.div>
        </div>
    );
};

export default WhatIamDoingNow;
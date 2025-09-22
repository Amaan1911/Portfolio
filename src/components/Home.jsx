import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiHtml5,
  SiCss3,
  SiJavascript,
} from "react-icons/si";

function Home() {
  const navigate = useNavigate();

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-black">
      
      {/* Dark translucent card for readable content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-20 rounded-3xl bg-gradient-to-br from-black/60 via-zinc-900/50 to-black/50 backdrop-blur-lg border border-white/6 shadow-2xl">
        <motion.h1
          className="text-center text-5xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-indigo-400 to-fuchsia-400"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Hi, I’m <span className="text-white">Amaan Sheikh</span> 👋
        </motion.h1>

        <motion.p
          className="mt-6 text-center text-gray-300 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.8 }}
        >
          MERN Stack developer crafting modern, accessible, and scalable web experiences —
          React frontends, Node/Express APIs, and MongoDB data layers.
        </motion.p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            onClick={() => navigate("/projects")}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-[1.04] transition-transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            🚀 View My Work
          </motion.button>

          <motion.button
            onClick={() => navigate("/contact")}
            className="px-6 py-2 rounded-2xl border border-white/10 text-white/90 backdrop-blur-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            ✉️ Hire Me
          </motion.button>
        </div>

        {/* Tech icons row */}
        <motion.div
          className="mt-10 flex items-center justify-center gap-6 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.8 }}
        >
          {[SiReact, SiNodedotjs, SiExpress, SiMongodb, SiJavascript, SiHtml5, SiCss3].map((Icon, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-1 text-gray-200"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 14 }}
              style={{ minWidth: 56 }}
            >
              <div className="p-3 rounded-full bg-white/6 shadow-md">
                <Icon size={28} className="text-white" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Subtle moving grid overlay for motion (decorative) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 1.2 }}
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "40px 40px, 40px 40px",
          mixBlendMode: "overlay",
        }}
      />
    </section>
  );
}

export default Home;

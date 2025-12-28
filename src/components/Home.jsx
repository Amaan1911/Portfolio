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
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";

function Home() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const techStack = [
    { icon: SiReact, color: "#61DAFB" },
    { icon: SiNodedotjs, color: "#339933" },
    { icon: SiMongodb, color: "#47A248" },
    { icon: SiExpress, color: "#ffffff" },
    { icon: SiJavascript, color: "#F7DF1E" },
    { icon: SiTypescript, color: "#3178C6" },
    { icon: SiTailwindcss, color: "#06B6D4" },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[110vh] px-4 overflow-hidden pt-32 sm:pt-40 pb-20">

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center z-10 max-w-5xl mx-auto"
      >
        {/* Status Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-12"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-sm font-mono tracking-widest text-gray-300 uppercase">Available for work</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          variants={itemVariants}
          className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter mb-8 bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent"
        >
          AMAAN
          <br className="sm:hidden" />
          <span className="sm:ml-4">SHEIKH</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          MERN Stack developer crafting <span className="text-white font-medium">modern</span>, <span className="text-white font-medium">accessible</span>, and <span className="text-white font-medium">scalable</span> web experiences.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <button
            onClick={() => navigate("/projects")}
            className="group relative px-8 py-4 rounded-full bg-white text-black font-bold text-lg overflow-hidden transition-transform hover:scale-105"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 text-white font-medium text-lg transition-all hover:scale-105"
          >
            Contact Me
          </button>
        </motion.div>

        {/* Tech Stack - Magnetic Effect Mockup */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-6">
          <span className="text-sm font-mono text-gray-500 uppercase tracking-[0.2em]">Technology Stack</span>
          <div className="flex flex-wrap justify-center gap-6">
            {techStack.map((Tech, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10, scale: 1.1 }}
                className="p-4 rounded-2xl bg-white/5 border border-white/5  lg-[20px] backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-colors"
              >
                <Tech.icon size={32} style={{ color: Tech.color }} />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </motion.div>

    </section>
  );
}

export default Home;

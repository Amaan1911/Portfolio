import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Code, Database, Rocket, Coffee } from "lucide-react";

function About() {
  const navigate = useNavigate();
  const statsRef = useRef(null);
  const skillsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });
  const skillsInView = useInView(skillsRef, { once: true, margin: "-50px" });

  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const stats = [
    { icon: Code, value: 15, suffix: "+", label: "Projects Completed", color: "from-blue-500 to-cyan-500" },
    { icon: Rocket, value: 1, suffix: "+", label: "Years Experience", color: "from-purple-500 to-pink-500" },
    { icon: Database, value: 10, suffix: "+", label: "Technologies", color: "from-green-500 to-emerald-500" },
    { icon: Coffee, value: 500, suffix: "+", label: "Cups of Coffee", color: "from-orange-500 to-red-500" },
  ];

  const skills = [
    { name: "Frontend Development", level: 90, color: "bg-blue-500" },
    { name: "Backend Development", level: 85, color: "bg-purple-500" },
    { name: "Database Design", level: 80, color: "bg-green-500" },
    { name: "UI/UX Design", level: 75, color: "bg-pink-500" },
  ];

  useEffect(() => {
    if (isInView) {
      stats.forEach((stat, index) => {
        const targetValue = stat.value;
        const duration = 2000;
        const steps = 60;
        const increment = targetValue / steps;
        let current = 0;
        let stepCount = 0;

        const timer = setInterval(() => {
          stepCount++;
          current += increment;
          if (stepCount >= steps || current >= targetValue) {
            current = targetValue;
            clearInterval(timer);
          }
          setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[index] = Math.floor(current);
            return newCounts;
          });
        }, duration / steps);
      });
    }
  }, [isInView]);

  return (
    <section className="py-20 px-6 md:px-16 mt-20 min-h-screen flex items-center relative z-10">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Main About Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex justify-center group"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative"
            >
              <img
                src="/Amaan_Passport_Size.jpeg"
                alt="Amaan Sheikh"
                className="w-56 h-56 md:w-80 md:h-80 rounded-full object-cover shadow-2xl border-4 border-white/20 relative z-10"
              />
              {/* Animated Rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-blue-500/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-purple-500/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              {/* Vignette Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/30 via-purple-500/20 to-transparent blur-3xl group-hover:blur-[60px] transition-all duration-500"></div>
            </motion.div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6 text-center md:text-left"
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4"
            >
              About Me
            </motion.h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              I'm a <span className="text-blue-400 font-semibold">MERN stack web developer</span>
              {" "}passionate about crafting modern, user-friendly applications.
              I love building interactive solutions that solve real-world problems,
              while continuously learning and adapting to new technologies.
            </p>
            <p className="text-gray-400 text-base leading-relaxed">
              When I'm not coding, you'll find me exploring new frameworks, contributing to open-source projects,
              or sipping coffee while brainstorming the next big idea. I believe in writing clean, maintainable code
              and creating experiences that users love.
            </p>
            <motion.button
              onClick={() => navigate("/contact")}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl shadow-lg font-medium transition-all text-white overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Let's Connect <Rocket className="group-hover:translate-x-1 transition-transform" size={20} />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              />
            </motion.button>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const displayValue = isInView ? (index === 3 ? Math.floor((counts[index] || 0) / 10) * 10 : (counts[index] || 0)) : 0;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all group overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <Icon className={`text-4xl mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                <div className="relative z-10">
                  <div className="text-4xl font-black text-white mb-2">
                    {displayValue}{stat.suffix}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Skills Section */}
        <motion.div
          ref={skillsRef}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Skills & Expertise
          </h3>
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-gray-400 text-sm">{skill.level}%</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className={`h-full ${skill.color} rounded-full relative overflow-hidden`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/30"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;

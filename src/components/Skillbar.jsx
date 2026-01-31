const SkillBar = ({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="space-y-3 group"
    >
      <div className="flex justify-between items-center">
        <motion.span
          className="text-white font-semibold text-lg"
          animate={{
            x: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {skill.name}
        </motion.span>
        <div className="flex items-center gap-2">
          <motion.span
            className="text-gray-400 text-sm font-medium"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            {skill.level}%
          </motion.span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
            skill.level >= 90 ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
            skill.level >= 80 ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
            'bg-purple-500/10 text-purple-400 border border-purple-500/20'
          }`}>
            {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Advanced' : 'Proficient'}
          </span>
        </div>
      </div>

      <div className="h-2.5 bg-white/5 rounded-full overflow-hidden relative backdrop-blur-sm border border-white/5">
        {/* Progress Fill */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`h-full ${skill.color} rounded-full relative overflow-hidden`}
        >
          {/* Glossy effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
          
          {/* Subtle shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: isHovered ? ["-100%", "200%"] : "-100%" }}
            transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Progress indicator dot */}
        <motion.div
          initial={{ left: 0, opacity: 0 }}
          whileInView={{ left: `${skill.level}%`, opacity: 1 }}
          transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
        >
          <div className={`w-3 h-3 rounded-full ${skill.color} shadow-lg ring-2 ring-white/10`} />
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ======================
   PROFESSIONAL SKILLS SECTION - EDITED VERSION
====================== */
<motion.div
  ref={skillsRef}
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="space-y-12"
>
  {/* Professional Header */}
  <div className="text-center space-y-4">
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm mb-2"
    >
      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
      <span className="text-sm font-medium text-gray-300 tracking-wide">CORE COMPETENCIES</span>
    </motion.div>

    <motion.h3
      className="text-4xl md:text-5xl font-bold text-white tracking-tight"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      Skills & Expertise
    </motion.h3>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="text-gray-400 text-base max-w-2xl mx-auto"
    >
      Continuously evolving technical expertise to deliver exceptional results
    </motion.p>

    {/* Decorative line */}
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: "80px" }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true }}
      className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto rounded-full"
    />
  </div>

  {/* Skills List */}
  <div className="space-y-6 max-w-4xl mx-auto">
    {skills.map((skill, index) => (
      <SkillBar key={index} skill={skill} index={index} />
    ))}
  </div>

</motion.div>

export default SkillBar;

import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, ExternalLink, MapPin, Calendar } from "lucide-react";
import { useRef } from "react";

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const experiences = [
  { role: "Frontend Engineer", company: "PropSoch", location: "Bengaluru, Karnataka", period: "Mar 2026 - Present", current: true, description: "Building and optimizing frontend systems for a proptech platform. Working on intelligent calculators, discovery filters, and scalable UI components.", tech: ["React", "Next.js", "TypeScript", "Tailwind"], color: "#00c9a7" },
  { role: "Freelance Developer", company: "Fstone Technologies", location: "Remote", period: "Dec 2025", link: "https://www.fstonetechnologies.com", description: "Built fstonetechnologies.com from scratch. Full design and development of the company website as a freelance project.", tech: ["React", "Full Stack", "UI/UX"], color: "#7c4dff" },
  { role: "MERN Stack Developer", company: "Brainey Sensie", location: "Remote", period: "Nov 2024 - Nov 2025", description: "Full-stack development using the MERN stack. Built features, APIs, and maintained production applications over a year-long engagement.", tech: ["MongoDB", "Express", "React", "Node.js"], color: "#ff6b35" },
  { role: "Freelance React Full Stack Developer", company: "Stackerbee Technologies", location: "Remote", period: "Nov 2024 - Dec 2024", description: "Short-term freelance engagement building React-based full-stack features for the company's product.", tech: ["React", "Node.js", "Full Stack"], color: "#a78bfa" },
  { role: "Full Stack Intern", company: "Yhills", location: "Noida", period: "2024", description: "Hands-on internship covering full-stack web development. Built projects using modern frameworks and learned production workflows.", tech: ["MERN", "JavaScript", "Git"], color: "#06b6d4" },
];

export default function Experience() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start center", "end center"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative min-h-screen pt-28 pb-20 px-6 md:px-12 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div initial="hidden" animate="show" variants={stagger} className="mb-16">
          <motion.span variants={fadeUp} className="inline-flex items-center gap-2 text-xs font-mono text-[#7c4dff] tracking-[0.2em] uppercase mb-5"><span className="w-8 h-px bg-[#7c4dff]/60" /> Experience</motion.span>
          <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-7xl font-bold text-[#1a1a2e] leading-[0.95] mb-5">Where I've<br /><span className="text-stroke">worked.</span></motion.h1>
          <motion.p variants={fadeUp} className="text-[#1a1a2e]/35 text-base leading-relaxed max-w-lg">From internships to production roles — building real products at every step.</motion.p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          <div className="absolute left-[19px] md:left-8 top-0 bottom-0 w-px bg-[#1a1a2e]/[0.06]" />
          <motion.div className="absolute left-[19px] md:left-8 top-0 w-px timeline-line" style={{ height: lineHeight }} />
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div key={exp.company + exp.role} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }} className="relative pl-14 md:pl-20">
                <div className="absolute left-[13px] md:left-[26px] top-6 z-10">
                  <div className="w-3 h-3 rounded-full ring-4 ring-[#f6f5ff]" style={{ backgroundColor: exp.color }} />
                  {exp.current && <span className="absolute inset-0 rounded-full animate-ping opacity-40" style={{ backgroundColor: exp.color }} />}
                </div>
                <div className={`glass-card rounded-2xl p-6 md:p-8 bento-item ${exp.current ? "ring-1" : ""}`} style={exp.current ? { ringColor: `${exp.color}25` } : {}}>
                  {exp.current && <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ boxShadow: `0 0 40px ${exp.color}08, inset 0 0 0 1px ${exp.color}15` }} />}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4 relative">
                    <div>
                      <div className="flex items-center flex-wrap gap-2.5 mb-1">
                        <h3 className="text-lg font-display font-bold text-[#1a1a2e]">{exp.role}</h3>
                        {exp.current && <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border" style={{ color: exp.color, backgroundColor: `${exp.color}08`, borderColor: `${exp.color}15` }}>Current</span>}
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span style={{ color: exp.color }} className="font-medium">{exp.company}</span>
                        {exp.link && <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-[#1a1a2e]/25 hover:text-[#7c4dff] transition-colors"><ExternalLink size={12} /></a>}
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-1">
                      <span className="flex items-center gap-1.5 text-xs font-mono text-[#1a1a2e]/30"><Calendar size={11} />{exp.period}</span>
                      <span className="flex items-center gap-1.5 text-xs text-[#1a1a2e]/20"><MapPin size={11} />{exp.location}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#1a1a2e]/40 leading-relaxed mb-4 relative">{exp.description}</p>
                  <div className="flex flex-wrap gap-1.5 relative">
                    {exp.tech.map((t) => (<span key={t} className="px-2.5 py-0.5 rounded-full text-[10px] font-medium text-[#1a1a2e]/35 bg-[#1a1a2e]/[0.03] border border-[#1a1a2e]/[0.06]">{t}</span>))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

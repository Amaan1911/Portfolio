import { motion } from "framer-motion";
import { Briefcase, ExternalLink, MapPin, Calendar } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const experiences = [
  {
    role: "Frontend Engineer",
    company: "PropSoch",
    location: "Bengaluru, Karnataka",
    period: "Mar 2026 - Present",
    current: true,
    description: "Building and optimizing frontend systems for a proptech platform. Working on intelligent calculators, discovery filters, and scalable UI components.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    role: "Freelance Developer",
    company: "Fstone Technologies",
    location: "Remote",
    period: "Dec 2025",
    link: "https://www.fstonetechnologies.com",
    description: "Built fstonetechnologies.com from scratch. Full design and development of the company website as a freelance project.",
    tech: ["React", "Full Stack", "UI/UX"],
  },
  {
    role: "MERN Stack Developer",
    company: "Brainey Sensie",
    location: "Remote",
    period: "Nov 2024 - Nov 2025",
    description: "Full-stack development using the MERN stack. Built features, APIs, and maintained production applications over a year-long engagement.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    role: "Freelance React Full Stack Developer",
    company: "Stackerbee Technologies",
    location: "Remote",
    period: "Nov 2024 - Dec 2024",
    description: "Short-term freelance engagement building React-based full-stack features for the company's product.",
    tech: ["React", "Node.js", "Full Stack"],
  },
  {
    role: "Full Stack Intern",
    company: "Yhills",
    location: "Noida",
    period: "2024",
    description: "Hands-on internship covering full-stack web development. Built projects using modern frameworks and learned production workflows.",
    tech: ["MERN", "JavaScript", "Git"],
  },
];

export default function Experience() {
  return (
    <section className="relative min-h-screen pt-28 pb-20 px-6 md:px-12 overflow-hidden">

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <motion.div initial="hidden" animate="show" variants={stagger} className="mb-16">
          <motion.span variants={fadeUp} className="inline-flex items-center gap-2 text-xs font-mono text-amber-500 tracking-[0.2em] uppercase mb-5">
            <span className="w-8 h-px bg-amber-500/60" />
            Experience
          </motion.span>
          <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-7xl font-bold text-white leading-[0.95] mb-5">
            Where I've<br /><span className="text-white/25">worked.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/35 text-base leading-relaxed max-w-lg">
            From internships to production roles — building real products at every step.
          </motion.p>
        </motion.div>

        {/* Experience cards */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] md:left-8 top-0 bottom-0 w-px bg-white/[0.06]" />

          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company + exp.role}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-14 md:pl-20"
              >
                {/* Dot */}
                <div className="absolute left-[15px] md:left-[28px] top-6 z-10">
                  <div className={`w-[9px] h-[9px] rounded-full ring-4 ring-[#0a0908] ${
                    exp.current ? "bg-emerald-500" : "bg-amber-500"
                  }`} />
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-40" />
                  )}
                </div>

                {/* Card */}
                <div className="glass-strong rounded-2xl p-6 md:p-8 bento-item">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <h3 className="text-lg font-display font-bold text-white">{exp.role}</h3>
                        {exp.current && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/15">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-amber-400 font-medium">{exp.company}</span>
                        {exp.link && (
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/25 hover:text-amber-500 transition-colors"
                          >
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-1">
                      <span className="flex items-center gap-1.5 text-xs font-mono text-white/30">
                        <Calendar size={11} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-white/20">
                        <MapPin size={11} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-white/40 leading-relaxed mb-4">{exp.description}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-medium text-white/35 bg-white/[0.03] border border-white/[0.05]"
                      >
                        {t}
                      </span>
                    ))}
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

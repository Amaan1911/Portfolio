import { motion } from "framer-motion";
import { GraduationCap, School, Award, BookOpen } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const educationData = [
  {
    icon: GraduationCap,
    title: "BCA (Bachelor of Computer Applications)",
    institution: "IGNOU University",
    period: "2022 - 2026",
    type: "Graduation",
  },
  {
    icon: BookOpen,
    title: "Full Stack Development Diploma",
    institution: "Yhills, Noida",
    period: "2024",
    type: "Diploma Course",
  },
  {
    icon: BookOpen,
    title: "MERN Stack Development Course",
    institution: "Acciojob, Noida",
    period: "Dec 2024 - Aug 2025",
    description: "Weekends Batch",
    type: "Professional Course",
  },
  {
    icon: Award,
    title: "C++ Certification",
    institution: "Smart Computer, Nangloi, Delhi",
    period: "Completed",
    type: "Certification",
  },
  {
    icon: School,
    title: "School Pass Out",
    institution: "Senior Secondary",
    period: "2022",
    type: "Schooling",
  },
];

export default function Education() {
  return (
    <section className="relative min-h-screen pt-28 pb-20 px-6 md:px-12 overflow-hidden">

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <motion.div initial="hidden" animate="show" variants={stagger} className="mb-16">
          <motion.span variants={fadeUp} className="inline-flex items-center gap-2 text-xs font-mono text-amber-500 tracking-[0.2em] uppercase mb-5">
            <span className="w-8 h-px bg-amber-500/60" />
            Education
          </motion.span>
          <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-7xl font-bold text-white leading-[0.95] mb-5">
            Learning<br /><span className="text-white/25">journey.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/35 text-base leading-relaxed max-w-lg">
            A mix of formal education, professional courses, and hands-on learning.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-white/[0.06]" />

          <div className="space-y-8">
            {educationData.map((item, i) => {
              const Icon = item.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-[15px] md:left-1/2 md:-translate-x-1/2 top-2 z-10">
                    <div className="w-[9px] h-[9px] rounded-full bg-amber-500 ring-4 ring-[#0a0908]" />
                  </div>

                  {/* Spacer for mobile */}
                  <div className="w-10 flex-shrink-0 md:hidden" />

                  {/* Card */}
                  <div className={`flex-1 md:w-[calc(50%-40px)] ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                    <div className="glass-strong rounded-2xl p-6 bento-item">
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 rounded-xl bg-amber-600/10 border border-amber-600/10 flex-shrink-0">
                          <Icon size={18} className="text-amber-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-mono text-amber-500/70 tracking-wider uppercase">{item.type}</span>
                          <h3 className="text-base font-semibold text-white mt-1 mb-1">{item.title}</h3>
                          <p className="text-sm text-white/40">{item.institution}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs font-mono text-white/25">{item.period}</span>
                            {item.description && (
                              <>
                                <span className="text-white/10">|</span>
                                <span className="text-xs text-white/25">{item.description}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Empty side for desktop */}
                  <div className="hidden md:block flex-1 md:w-[calc(50%-40px)]" />
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

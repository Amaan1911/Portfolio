import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, School, Award, BookOpen } from "lucide-react";
import { useRef } from "react";

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const educationData = [
  { icon: GraduationCap, title: "BCA (Bachelor of Computer Applications)", institution: "IGNOU University", period: "2022 - 2026", type: "Graduation", color: "#7c4dff" },
  { icon: BookOpen, title: "Full Stack Development Diploma", institution: "Yhills, Noida", period: "2024", type: "Diploma Course", color: "#00c9a7" },
  { icon: BookOpen, title: "MERN Stack Development Course", institution: "Acciojob, Noida", period: "Dec 2024 - Aug 2025", description: "Weekends Batch", type: "Professional Course", color: "#ff6b35" },
  { icon: Award, title: "C++ Certification", institution: "Smart Computer, Nangloi, Delhi", period: "Completed", type: "Certification", color: "#a78bfa" },
  { icon: School, title: "School Pass Out", institution: "Senior Secondary", period: "2022", type: "Schooling", color: "#06b6d4" },
];

function TimelineDot({ color, isActive }) {
  return (<div className="relative"><div className="w-3 h-3 rounded-full ring-4 ring-[#f6f5ff]" style={{ backgroundColor: color }} />{isActive && <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: color }} />}</div>);
}

export default function Education() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start center", "end center"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative min-h-screen pt-28 pb-20 px-6 md:px-12 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div initial="hidden" animate="show" variants={stagger} className="mb-16">
          <motion.span variants={fadeUp} className="inline-flex items-center gap-2 text-xs font-mono text-[#7c4dff] tracking-[0.2em] uppercase mb-5"><span className="w-8 h-px bg-[#7c4dff]/60" /> Education</motion.span>
          <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-7xl font-bold text-[#1a1a2e] leading-[0.95] mb-5">Learning<br /><span className="text-stroke">journey.</span></motion.h1>
          <motion.p variants={fadeUp} className="text-[#1a1a2e]/35 text-base leading-relaxed max-w-lg">A mix of formal education, professional courses, and hands-on learning.</motion.p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          <div className="absolute left-[19px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-[#1a1a2e]/[0.06]" />
          <motion.div className="absolute left-[19px] md:left-1/2 md:-translate-x-px top-0 w-px timeline-line" style={{ height: lineHeight }} />
          <div className="space-y-8">
            {educationData.map((item, i) => {
              const Icon = item.icon; const isLeft = i % 2 === 0;
              return (
                <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="absolute left-[13px] md:left-1/2 md:-translate-x-1/2 top-2 z-10"><TimelineDot color={item.color} isActive={i === 0} /></div>
                  <div className="w-10 flex-shrink-0 md:hidden" />
                  <div className={`flex-1 md:w-[calc(50%-40px)] ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                    <div className="glass-card rounded-2xl p-6 bento-item">
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 rounded-xl flex-shrink-0 border" style={{ backgroundColor: `${item.color}08`, borderColor: `${item.color}15` }}>
                          <Icon size={18} style={{ color: item.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: `${item.color}` }}>{item.type}</span>
                          <h3 className="text-base font-semibold text-[#1a1a2e] mt-1 mb-1">{item.title}</h3>
                          <p className="text-sm text-[#1a1a2e]/40">{item.institution}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs font-mono text-[#1a1a2e]/25">{item.period}</span>
                            {item.description && (<><span className="text-[#1a1a2e]/10">|</span><span className="text-xs text-[#1a1a2e]/25">{item.description}</span></>)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

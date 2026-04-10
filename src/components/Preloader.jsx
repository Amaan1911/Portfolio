import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let frame;
    let start = null;
    const duration = 1800;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * 100));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setTimeout(() => setDone(true), 400);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (done) {
      const timer = setTimeout(() => onComplete?.(), 800);
      return () => clearTimeout(timer);
    }
  }, [done, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-[400px] h-[400px] rounded-full opacity-20"
              style={{ top: "20%", left: "30%", background: "radial-gradient(circle, #c4b5fd, transparent 70%)", filter: "blur(80px)" }} />
            <div className="absolute w-[300px] h-[300px] rounded-full opacity-15"
              style={{ bottom: "20%", right: "25%", background: "radial-gradient(circle, #99f6e4, transparent 70%)", filter: "blur(80px)" }} />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-2xl font-bold text-[#1a1a2e] tracking-tight">
              AS<span className="text-[#7c4dff]">.</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }} className="preloader-counter">
              {count}
            </motion.div>

            <div className="w-48 h-[2px] bg-[#1a1a2e]/5 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #7c4dff, #00c9a7)", width: `${count}%` }}
                transition={{ duration: 0.1 }} />
            </div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="text-xs font-mono text-[#1a1a2e]/25 tracking-[0.3em] uppercase">
              Loading experience
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function ScrollProgress() {
  const [rawProgress, setRawProgress] = useState(0);
  const progress = useSpring(rawProgress, { stiffness: 300, damping: 40 });

  useEffect(() => {
    const update = () => {
      const { scrollY } = window;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setRawProgress(scrollable > 0 ? scrollY / scrollable : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-teal-400 origin-left"
        style={{ scaleX: progress }}
      />
    </div>
  );
}

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollableHeight = documentHeight - windowHeight;
      const progress = (scrollTop / scrollableHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress(); // Initial calculation

    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-[100] origin-left"
      style={{ scaleX: scrollProgress / 100 }}
      initial={{ scaleX: 0 }}
    />
  );
}



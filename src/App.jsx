import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatIamDoingNow from "./components/WhatIamDoingNow";
import Education from "./components/Education";
import Experience from "./components/Experience";
import { ScrollProgress } from "./components/ScrollProgress";
import { CustomCursor } from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import Background3D from "./components/Background3D";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

function PageTransition({ children }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
        <motion.div initial={{ scaleY: 1 }} animate={{ scaleY: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[60] origin-top"
          style={{ background: "linear-gradient(135deg, rgba(124,77,255,0.8), rgba(246,245,255,0.8))", backdropFilter: "blur(20px)" }} />
        <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 0 }} exit={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[60] origin-bottom"
          style={{ background: "linear-gradient(135deg, rgba(246,245,255,0.8), rgba(124,77,255,0.8))", backdropFilter: "blur(20px)" }} />
        <motion.div initial={{ y: 20 }} animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [loading, setLoading] = useState(() => !sessionStorage.getItem("preloader_shown"));

  const handlePreloaderComplete = useCallback(() => {
    sessionStorage.setItem("preloader_shown", "1");
    setLoading(false);
  }, []);

  useEffect(() => { 
    // Lenis Smooth Scroll Configuration
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: "vertical", 
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    document.documentElement.style.scrollBehavior = "auto"; 
    return () => { 
      lenis.destroy(); 
      document.documentElement.style.scrollBehavior = "auto"; 
    }; 
  }, []);

  return (
    <div className="grain relative min-h-screen text-[#1a1a2e] overflow-hidden bg-[#f6f5ff] selection:bg-[#7c4dff]/15 selection:text-[#1a1a2e]">
      <AnimatePresence>{loading && <Preloader onComplete={handlePreloaderComplete} />}</AnimatePresence>
      <Background3D />
      
      {/* Global Extreme Glass Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-white/40 backdrop-blur-[40px] border-none" />

      <CustomCursor />
      <ScrollProgress />
      <div className="relative z-10 flex flex-col min-h-screen">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/education" element={<PageTransition><Education /></PageTransition>} />
            <Route path="/experience" element={<PageTransition><Experience /></PageTransition>} />
            <Route path="/now" element={<PageTransition><WhatIamDoingNow /></PageTransition>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

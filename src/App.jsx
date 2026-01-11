import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { LiquidEffectAnimation } from "./components/LiquidEffectAnimation";
import ModernFogBackground from "./components/ModernFogBackground";
import { ScrollProgress } from "./components/ScrollProgress";
import { CustomCursor } from "./components/CustomCursor";
import { Snow } from "./components/Snow";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function PageTransition({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [isSnowing, setIsSnowing] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  const toggleSnow = () => {
    setIsSnowing(!isSnowing);
  };

  return (
    <>
      {/* Snow Effect */}
      {isSnowing && <Snow />}

      {/* Toggle Snow Button */}
      <button
        onClick={toggleSnow}
        className="fixed bottom-6 right-6 z-[60] px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 backdrop-blur-sm border border-cyan-400/50 rounded-full text-white font-medium transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 hover:scale-105 active:scale-95"
        aria-label="Toggle snow effect"
      >
        {isSnowing ? "Stop Snow" : "Want Snow?"}
      </button>

      <div className="relative min-h-screen text-white overflow-hidden bg-black selection:bg-cyan-500 selection:text-black">
        <CustomCursor />
        <ScrollProgress />
        <LiquidEffectAnimation />
        {/* <ModernFogBackground /> */}

        {/* Overlay */}
        <div className="fixed inset-0 z-[1] pointer-events-none">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <ScrollToTop />
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}

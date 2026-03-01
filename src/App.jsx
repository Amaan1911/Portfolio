import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatIamDoingNow from "./components/WhatIamDoingNow";
import { ScrollProgress } from "./components/ScrollProgress";
import { CustomCursor } from "./components/CustomCursor";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Scroll to top on route change ──────────────────────── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

/* ── Clean fade page transition ─────────────────────────── */
function PageTransition({ children }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/* ── App ─────────────────────────────────────────────────── */
export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = "auto"; };
  }, []);

  return (
    /* Grain noise layer is handled by the .grain class */
    <div className="grain relative min-h-screen text-white overflow-hidden bg-[#080810] selection:bg-indigo-500/30 selection:text-white">
      <CustomCursor />
      <ScrollProgress />

      {/* Ambient top glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
      >
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-indigo-600/[0.07] blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <ScrollToTop />
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/"        element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about"   element={<PageTransition><About /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/now"     element={<PageTransition><WhatIamDoingNow /></PageTransition>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}

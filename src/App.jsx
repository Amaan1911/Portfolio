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
import { useEffect, lazy, Suspense } from "react";
const Background3D = lazy(() => import("./components/Background3D"));
import { motion, AnimatePresence } from "framer-motion";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function PageTransition({ children }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = "auto"; };
  }, []);

  return (
    <div className="grain relative min-h-screen text-white overflow-hidden bg-[#0a0908] selection:bg-amber-600/30 selection:text-white">
      <Suspense fallback={null}><Background3D /></Suspense>
      <CustomCursor />
      <ScrollProgress />

      <div className="relative z-10 flex flex-col min-h-screen">
        <ScrollToTop />
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/"        element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about"   element={<PageTransition><About /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/education" element={<PageTransition><Education /></PageTransition>} />
            <Route path="/experience" element={<PageTransition><Experience /></PageTransition>} />
            <Route path="/now"     element={<PageTransition><WhatIamDoingNow /></PageTransition>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </div>
  );
}

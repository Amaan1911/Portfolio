import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Work", path: "/projects" },
  { name: "Edu", path: "/education" },
  { name: "Exp", path: "/experience" },
  { name: "Contact", path: "/contact" },
  { name: "Now", path: "/now" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4"
    >
      <motion.div
        animate={{
          boxShadow: scrolled
            ? "0 4px 40px rgba(0,0,0,0.5)"
            : "0 0px 0px rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.5 }}
        className={`
          relative flex items-center justify-between
          px-5 py-2.5 rounded-full
          transition-all duration-700 w-full max-w-3xl
          ${scrolled
            ? "bg-[#0a0908]/85 backdrop-blur-2xl border border-white/[0.06]"
            : "bg-white/[0.02] backdrop-blur-sm border border-white/[0.03]"
          }
        `}
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-base font-display font-bold tracking-tight text-white hover:text-amber-400 transition-colors duration-300"
        >
          AS<span className="text-amber-500">.</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-0.5">
          {links.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`
                  relative px-3.5 py-1.5 rounded-full text-[13px] font-medium
                  transition-colors duration-300
                  ${active ? "text-white" : "text-white/35 hover:text-white/80"}
                `}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.07]"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <a
          href="https://wa.me/qr/VYUIPCRU4S2ZF1"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-black text-[13px] font-semibold hover:bg-amber-100 transition-colors duration-300 shadow-lg shadow-black/10"
        >
          Hire Me
        </a>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/[0.05]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.span>
          </AnimatePresence>
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-14 left-0 right-0 mx-auto w-full glass-strong rounded-2xl overflow-hidden p-3 md:hidden"
            >
              {links.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <Link
                    to={link.path}
                    className={`
                      block px-4 py-2.5 rounded-xl text-sm font-medium
                      transition-colors duration-200
                      ${location.pathname === link.path
                        ? "bg-amber-600/10 text-amber-400"
                        : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-2 pt-2 border-t border-white/[0.04]">
                <a
                  href="https://wa.me/qr/VYUIPCRU4S2ZF1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center px-4 py-2.5 rounded-xl bg-white text-black text-sm font-semibold"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}

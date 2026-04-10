import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Work", path: "/projects" },
  { name: "Education", path: "/education" },
  { name: "Experience", path: "/experience" },
  { name: "Contact", path: "/contact" },
  { name: "Now", path: "/now" },
];

const socialLinks = [
  { href: "https://github.com/Amaan1911", label: "GitHub" },
  { href: "https://www.linkedin.com/in/amaan-sheikh-3b25a2317/", label: "LinkedIn" },
  { href: "https://mail.google.com/mail/?view=cm&fs=1&to=amaansheikhbrothers@gmail.com", label: "Email" },
  { href: "https://wa.me/qr/VYUIPCRU4S2ZF1", label: "WhatsApp" },
];

const MenuIcon = ({ isOpen }) => (
  <div className="relative w-6 h-4 flex flex-col justify-between">
    <motion.span animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="block w-full h-[1.5px] bg-[#1a1a2e] origin-center" />
    <motion.span animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.2 }} className="block w-full h-[1.5px] bg-[#1a1a2e] origin-left" />
    <motion.span animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="block w-full h-[1.5px] bg-[#1a1a2e] origin-center" />
  </div>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);
  useEffect(() => { document.body.style.overflow = isOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [isOpen]);

  return (
    <>
      <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10">
        <div className={`flex items-center justify-between py-4 transition-all duration-700 ${scrolled ? "border-b border-[#1a1a2e]/[0.06]" : "border-b border-transparent"}`}
          style={{ background: scrolled ? "rgba(246, 245, 255, 0.85)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none" }}>

          <Link to="/" className="text-lg font-display font-bold tracking-tight text-[#1a1a2e] hover:text-[#7c4dff] transition-colors duration-300 relative z-50">
            AS<span className="text-[#7c4dff]">.</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.slice(0, 5).map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link key={link.name} to={link.path}
                  className={`relative px-4 py-1.5 text-[13px] font-medium transition-colors duration-300 ${active ? "text-[#1a1a2e]" : "text-[#1a1a2e]/35 hover:text-[#1a1a2e]/70"}`}>
                  <span className="relative z-10">{link.name}</span>
                  {active && (
                    <motion.span layoutId="nav-underline" className="absolute bottom-0 left-2 right-2 h-[1.5px] bg-[#7c4dff]"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }} />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4 relative z-50">
            <a href="https://wa.me/qr/VYUIPCRU4S2ZF1" target="_blank" rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 bg-[#7c4dff] text-white hover:bg-[#6a3de8] shadow-lg shadow-[#7c4dff]/20">
              Let's Talk
            </a>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-[#1a1a2e]/[0.04] transition-colors" aria-label="Toggle menu">
              <MenuIcon isOpen={isOpen} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="menu-overlay">
            <div className="h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-5xl mx-auto">
              <nav className="space-y-2 md:space-y-3 mb-12">
                {links.map((link, i) => {
                  const active = location.pathname === link.path;
                  return (
                    <motion.div key={link.name} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                      <Link to={link.path} className={`menu-overlay-link flex items-center gap-4 ${active ? "active" : ""}`}>
                        <span className="text-xs font-mono text-[#1a1a2e]/10 w-6">{String(i + 1).padStart(2, "0")}</span>
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }} className="border-t border-[#1a1a2e]/[0.06] pt-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <p className="text-sm text-[#1a1a2e]/25 font-mono">amaansheikhbrothers@gmail.com</p>
                  <div className="flex items-center gap-4">
                    {socialLinks.map(({ href, label }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                        className="text-xs font-medium text-[#1a1a2e]/20 hover:text-[#7c4dff] transition-colors duration-300 uppercase tracking-wider">{label}</a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

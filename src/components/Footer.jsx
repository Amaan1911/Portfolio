import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Home", to: "/" }, { label: "Work", to: "/projects" }, { label: "About", to: "/about" },
  { label: "Education", to: "/education" }, { label: "Experience", to: "/experience" }, { label: "Contact", to: "/contact" }, { label: "Now", to: "/now" },
];
const socialLinks = [
  { href: "https://github.com/Amaan1911", Icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/amaan-sheikh-3b25a2317/", Icon: Linkedin, label: "LinkedIn" },
  { href: "https://mail.google.com/mail/?view=cm&fs=1&to=amaansheikhbrothers@gmail.com", Icon: Mail, label: "Email" },
  { href: "https://wa.me/qr/VYUIPCRU4S2ZF1", Icon: BsWhatsapp, label: "WhatsApp" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative z-10 border-t border-[#1a1a2e]/[0.06]">
      <div className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] select-none">
            <span className="text-[#1a1a2e]">Let's build something</span><br /><span className="text-shimmer">amazing together.</span>
          </motion.h2>
        </div>
      </div>
      <div className="border-t border-[#1a1a2e]/[0.06] py-10 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="space-y-4">
            <p className="font-display text-xl font-bold text-[#1a1a2e]">AS<span className="text-[#7c4dff]">.</span></p>
            <p className="text-[#1a1a2e]/25 text-sm max-w-xs leading-relaxed">Crafting digital experiences with code and creativity.</p>
            <div className="flex items-center gap-2">
              {socialLinks.map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="p-2 rounded-full border border-[#1a1a2e]/[0.06] text-[#1a1a2e]/25 hover:text-[#7c4dff] hover:border-[#7c4dff]/20 transition-all duration-300"><Icon size={14} /></a>
              ))}
            </div>
          </div>
          <div>
            <h5 className="text-[10px] font-mono text-[#1a1a2e]/15 uppercase tracking-[0.2em] mb-4">Pages</h5>
            <ul className="space-y-2.5">{navLinks.map(({ label, to }) => (<li key={label}><Link to={to} className="text-sm text-[#1a1a2e]/30 hover:text-[#7c4dff] transition-colors duration-300">{label}</Link></li>))}</ul>
          </div>
          <div className="flex flex-col items-end gap-4">
            <button onClick={scrollToTop} className="group p-3 rounded-full border border-[#1a1a2e]/[0.06] text-[#1a1a2e]/25 hover:text-[#7c4dff] hover:border-[#7c4dff]/20 transition-all duration-300" aria-label="Back to top" data-cursor="Top">
              <ArrowUp size={16} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
            <span className="text-[10px] font-mono text-[#1a1a2e]/12 tracking-wider">Back to top</span>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-[#1a1a2e]/[0.04] flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-[#1a1a2e]/12 tracking-wider">
          <p>&copy; {new Date().getFullYear()} Amaan Sheikh</p>
          <p>Designed & built with <span className="text-[#7c4dff]">♡</span></p>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Education", to: "/education" },
  { label: "Experience", to: "/experience" },
  { label: "Contact", to: "/contact" },
  { label: "Now", to: "/now" },
];

const socialLinks = [
  { href: "https://github.com/Amaan1911", Icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/amaan-sheikh-3b25a2317/", Icon: Linkedin, label: "LinkedIn" },
  { href: "https://mail.google.com/mail/?view=cm&fs=1&to=amaansheikhbrothers@gmail.com", Icon: Mail, label: "Email" },
  { href: "https://wa.me/qr/VYUIPCRU4S2ZF1", Icon: BsWhatsapp, label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.04]">

      {/* Big CTA strip */}
      <div className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] select-none"
          >
            Let's build something<br />amazing together.
          </motion.h2>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-white/[0.04] py-10 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">

          {/* Brand */}
          <div className="space-y-4">
            <p className="font-display text-xl font-bold text-white">
              AS<span className="text-amber-500">.</span>
            </p>
            <p className="text-white/25 text-sm max-w-xs leading-relaxed">
              Crafting digital experiences with code and creativity.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-full border border-white/[0.05] text-white/25 hover:text-white hover:border-white/15 transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h5 className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em] mb-4">Pages</h5>
            <ul className="space-y-2.5">
              {navLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-white/30 hover:text-white/70 transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/[0.03] flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-white/15 tracking-wider">
          <p>&copy; {new Date().getFullYear()} Amaan Sheikh</p>
          <p>Designed & built with care</p>
        </div>
      </div>
    </footer>
  );
}

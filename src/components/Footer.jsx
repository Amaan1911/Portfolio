import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

const navLinks = [
    { label: "Home", to: "/" },
    { label: "Work", to: "/projects" },
    { label: "About", to: "/about" },
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
        <footer className="relative z-10 border-t border-white/[0.05] py-12 px-6 md:px-16">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">

                {/* Brand */}
                <div className="space-y-4">
                    <p className="font-display text-xl font-bold text-white">
                        AS<span className="text-indigo-400">.</span>
                    </p>
                    <p className="text-white/35 text-sm max-w-xs leading-relaxed">
                        Crafting digital experiences with code and creativity.
                        Based in India, working worldwide.
                    </p>
                    {/* Social icons */}
                    <div className="flex items-center gap-2">
                        {socialLinks.map(({ href, Icon, label }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="p-2 rounded-full border border-white/[0.06] text-white/30 hover:text-white hover:border-white/15 transition-all duration-200"
                            >
                                <Icon size={15} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Nav links */}
                <div>
                    <h5 className="text-xs font-medium text-white/25 uppercase tracking-widest mb-4">Pages</h5>
                    <ul className="space-y-2.5">
                        {navLinks.map(({ label, to }) => (
                            <li key={label}>
                                <Link
                                    to={to}
                                    className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

            {/* Bottom bar */}
            <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/20">
                <p>© {new Date().getFullYear()} Amaan Sheikh. All rights reserved.</p>
                <p>Designed &amp; built with care.</p>
            </div>
        </footer>
    );
}

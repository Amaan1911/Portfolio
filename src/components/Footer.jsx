import { Github, Linkedin, Mail } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

function Footer() {
    return (
        <footer className="relative z-10 bg-neutral-950 pt-20 pb-10 border-t border-white/5 overflow-hidden">

            {/* Ambient calming background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 blur-[120px] animate-pulse"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start mb-16 relative z-10">

                {/* Brand Section */}
                <div className="space-y-6">
                    <h2 className="text-3xl font-black tracking-tighter text-white">
                        AMAAN SHEIKH.
                    </h2>
                    <p className="text-gray-400 max-w-xs leading-relaxed">
                        Crafting digital experiences with code and creativity. <br />
                        Based in India, working worldwide.
                    </p>
                    <div className="flex gap-4">
                        {[
                            { href: "https://github.com/Amaan1911", icon: <Github size={20} />, label: "GitHub" },
                            { href: "https://www.linkedin.com/in/amaan-sheikh-3b25a2317/", icon: <Linkedin size={20} />, label: "LinkedIn" },
                        ].map(({ href, icon, label }, i) => (
                            <a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-300"
                                aria-label={label}
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links / Contact Grid */}
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-bold text-white mb-6">Connect</h4>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=amaansheikhbrothers@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
                                >
                                    <Mail size={16} /> Email Me
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/qr/VYUIPCRU4S2ZF1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2"
                                >
                                    <BsWhatsapp size={16} /> WhatsApp
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Menu</h4>
                        <ul className="space-y-4 text-gray-400 uppercase text-sm tracking-wider">
                            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="/projects" className="hover:text-white transition-colors">Work</a></li>
                            <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                        </ul>
                    </div>
                </div>

            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 relative z-10">
                <p>© {new Date().getFullYear()} Amaan Sheikh. All rights reserved.</p>
                <p>Designed & Built with ❤️</p>
            </div>
        </footer>
    );
}

export default Footer;

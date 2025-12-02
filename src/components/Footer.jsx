import { Github, Linkedin, Mail } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

function Footer() {
    return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-center py-8 px-4 border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
            <p className="text-gray-400 mb-4">
                © {new Date().getFullYear()} Amaan Sheikh. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6">
                {[
                    { href: "https://github.com/Amaan1911", icon: <Github size={20} />, label: "GitHub" },
                    { href: "https://www.linkedin.com/in/amaan-sheikh-3b25a2317/", icon: <Linkedin size={20} />, label: "LinkedIn" },
                    { href: "https://mail.google.com/mail/?view=cm&fs=1&to=amaansheikhbrothers@gmail.com", icon: <Mail size={20} />, label: "Email" },
                    { href: "https://wa.me/qr/VYUIPCRU4S2ZF1", icon: <BsWhatsapp size={20} />, label: "WhatsApp" },
                ].map(({ href, icon, label }) => (
                    <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                        aria-label={label}
                    >
                        {icon}
                    </a>
                ))}
            </div>
        </div>
    </footer>
    );
    }
    export default Footer;
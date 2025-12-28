import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

function Contact() {
  return (
    <section className="py-20 mt-10 px-6 md:px-12 min-h-screen flex items-center justify-center relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full max-w-4xl p-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl"
      >
        <div className="bg-black/80 backdrop-blur-xl rounded-[22px] p-10 md:p-16 text-center border border-white/10 shadow-2xl">

          <h3 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Let's Work Together
          </h3>

          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or just want to chat?
            I'm always open to new opportunities and interesting conversations.
          </p>


          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {[
              {
                href: "https://mail.google.com/mail/?view=cm&fs=1&to=amaansheikhbrothers@gmail.com",
                icon: <Mail size={28} />,
                label: "Email"
              },
              {
                href: "https://github.com/Amaan1911",
                icon: <Github size={28} />,
                label: "GitHub"
              },
              {
                href: "https://www.linkedin.com/in/amaan-sheikh-3b25a2317/",
                icon: <Linkedin size={28} />,
                label: "LinkedIn"
              },
              {
                href: "https://wa.me/qr/VYUIPCRU4S2ZF1",
                icon: <BsWhatsapp size={28} />,
                label: "WhatsApp"
              }
            ].map(({ href, icon, label }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, color: "#60a5fa" }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all text-gray-300 group-hover:text-blue-400 shadow-lg">
                  {icon}
                </div>
                <span className="text-sm font-medium text-gray-500 group-hover:text-blue-400 transition-colors">{label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;

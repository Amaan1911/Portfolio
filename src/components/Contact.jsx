import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

function Contact() {
  return (
    <section className="py-20 px-6 md:px-12 bg-black min-h-screen flex items-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto w-full text-center bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl shadow-xl p-10"
      >
        
        <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Contact Me
        </h3>

       
        <p className="text-gray-300 text-lg mb-10">
          Interested in collaborating or have an opportunity?  
          Let’s <span className="text-blue-400 font-semibold">connect!</span>
        </p>

      
        <div className="flex justify-center space-x-8">
          {[
            {
              href: "https://mail.google.com/mail/?view=cm&fs=1&to=amaansheikhbrothers@gmail.com",
              icon: <Mail size={32} />,
            },
            {
              href: "https://github.com/Amaan1911",
              icon: <Github size={32} />,
            },
            {
              href: "https://www.linkedin.com/in/amaan-sheikh-3b25a2317/",
              icon: <Linkedin size={32} />,
            },
            {
                href : "https://wa.me/qr/VYUIPCRU4S2ZF1",
                icon : <BsWhatsapp size={32} />
            }
          ].map(({ href, icon }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 6 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              {icon}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;

import { Mail, Github, Linkedin } from "lucide-react";

function Contact() {
    return (
    <section className="py-20 px-10 min-h-screen">
    <h3 className="text-3xl font-bold mb-10 text-center">Contact Me</h3>
    <div className="flex flex-col items-center space-y-6">
    <p className="text-gray-300 text-lg text-center max-w-2xl">
    Interested in collaborating or have an opportunity? Let’s connect!
    </p>
    <div className="flex space-x-6">
    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=amaansheikhbrothers@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition"><Mail size={28} /></a>
    <a href="https://github.com/Amaan1911" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition"><Github size={28} /></a>
    <a href="https://www.linkedin.com/in/amaan-sheikh-3b25a2317/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition"><Linkedin size={28} /></a>
    </div>
    </div>  
    </section>
    );

    }
    export default Contact;
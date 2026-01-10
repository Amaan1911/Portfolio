import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, Send, CheckCircle, XCircle, User, MessageSquare, Phone, Clock } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { useState, useEffect } from "react";

const FORMSPREE_ACTION = "https://formspree.io/f/xwvvewva";

function Contact() {
  const [succeeded, setSucceeded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSucceeded(false);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("message", formData.message);

      const res = await fetch(FORMSPREE_ACTION, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formDataToSend,
      });

      const data = await res.json();

      if (res.ok || data.ok || data.success) {
        setSucceeded(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        // Reset success message after 5 seconds
        setTimeout(() => setSucceeded(false), 5000);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    }

    setSubmitting(false);
  };

  // Reset form focus on success
  useEffect(() => {
    if (succeeded) {
      document.activeElement?.blur();
    }
  }, [succeeded]);

  const socialLinks = [
    { 
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=amaansheikhbrothers@gmail.com", 
      icon: <Mail size={24} />, 
      label: "Email",
      description: "amaansheikhbrothers@gmail.com",
      color: "hover:text-red-400 hover:border-red-400/50 hover:bg-red-500/10"
    },
    { 
      href: "https://github.com/Amaan1911", 
      icon: <Github size={24} />, 
      label: "GitHub",
      description: "@Amaan1911",
      color: "hover:text-gray-300 hover:border-gray-300/50 hover:bg-gray-500/10"
    },
    { 
      href: "https://www.linkedin.com/in/amaan-sheikh-3b25a2317/", 
      icon: <Linkedin size={24} />, 
      label: "LinkedIn",
      description: "Amaan Sheikh",
      color: "hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-500/10"
    },
    { 
      href: "https://wa.me/qr/VYUIPCRU4S2ZF1", 
      icon: <BsWhatsapp size={24} />, 
      label: "WhatsApp",
      description: "Quick Chat",
      color: "hover:text-green-400 hover:border-green-400/50 hover:bg-green-500/10"
    }
  ];

  return (
    <section className="py-20 mt-10 px-6 md:px-16 min-h-screen flex items-center justify-center relative z-10">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let's bring your ideas to life and create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form - Takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative group">
              {/* Animated gradient border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl opacity-20 group-hover:opacity-40 blur transition-opacity duration-300" />
              
              <div className="relative bg-black/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                    <MessageSquare className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">Send a Message</h3>
                    <p className="text-sm text-gray-400">Fill out the form below and I'll get back to you</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="relative group/input"
                    >
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <User size={16} />
                        Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="relative group/input"
                    >
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                        <Mail size={16} />
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </motion.div>
                  </div>

                  {/* Subject */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="Project Inquiry / Collaboration / Question"
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project, ideas, or how I can help you..."
                    />
                  </motion.div>

                  {/* Status Messages */}
                  <AnimatePresence mode="wait">
                    {succeeded && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/50 text-green-400 flex items-center gap-3 backdrop-blur-sm"
                      >
                        <CheckCircle size={20} className="flex-shrink-0" />
                        <span className="text-sm font-medium">
                          Message sent successfully! I'll get back to you within 24 hours.
                        </span>
                      </motion.div>
                    )}

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/50 text-red-400 flex items-center gap-3 backdrop-blur-sm"
                      >
                        <XCircle size={20} className="flex-shrink-0" />
                        <span className="text-sm font-medium">{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={submitting || succeeded}
                    whileHover={!submitting && !succeeded ? { scale: 1.02, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)" } : {}}
                    whileTap={!submitting && !succeeded ? { scale: 0.98 } : {}}
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 rounded-xl text-white font-semibold flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden group"
                  >
                    {submitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Sending Message...</span>
                      </>
                    ) : succeeded ? (
                      <>
                        <CheckCircle size={20} />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                        <span>Send Message</span>
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Sidebar - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Quick Info Card */}
            <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Clock size={20} className="text-blue-400" />
                Response Time
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                I typically respond within <span className="text-blue-400 font-semibold">24 hours</span>. For urgent matters, feel free to reach out via WhatsApp!
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-gray-400">
                  💡 Pro tip: Include project details and timeline for faster response
                </p>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl">
              <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Phone size={20} className="text-purple-400" />
                Connect With Me
              </h4>
              <div className="space-y-3">
                {socialLinks.map(({ href, icon, label, description, color }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 ${color} transition-all duration-300 group cursor-pointer`}
                  >
                    <div className="p-2.5 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white text-sm">{label}</div>
                      <div className="text-xs text-gray-400 truncate">{description}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="font-bold text-green-400 text-sm uppercase tracking-wider">Available for Work</span>
              </div>
              <p className="text-gray-300 text-xs mt-2">
                Currently accepting new projects and collaborations
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, Send, CheckCircle, XCircle, User, MessageSquare, ArrowUpRight } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { useState, useEffect } from "react";

const FORMSPREE = "https://formspree.io/f/xwvvewva";
const inputClass = "w-full px-4 py-3.5 bg-[#1a1a2e]/[0.02] border border-[#1a1a2e]/[0.08] rounded-xl text-[#1a1a2e] text-sm placeholder-[#1a1a2e]/20 outline-none focus:border-[#7c4dff]/40 focus:bg-[#7c4dff]/[0.02] focus:ring-1 focus:ring-[#7c4dff]/15 transition-all duration-300 font-sans";

const socials = [
  { href: "https://mail.google.com/mail/?view=cm&fs=1&to=amaansheikhbrothers@gmail.com", Icon: Mail, label: "Email", sub: "amaansheikhbrothers@gmail.com", hoverColor: "#ef4444" },
  { href: "https://github.com/Amaan1911", Icon: Github, label: "GitHub", sub: "@Amaan1911", hoverColor: "#1a1a2e" },
  { href: "https://www.linkedin.com/in/amaan-sheikh-3b25a2317/", Icon: Linkedin, label: "LinkedIn", sub: "Amaan Sheikh", hoverColor: "#0077b5" },
  { href: "https://wa.me/qr/VYUIPCRU4S2ZF1", Icon: BsWhatsapp, label: "WhatsApp", sub: "Quick Chat", hoverColor: "#25d366" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => { setForm((f) => ({ ...f, [e.target.name]: e.target.value })); if (error) setError(null); };
  const handleSubmit = async (e) => {
    e.preventDefault(); setSubmitting(true); setError(null);
    try {
      const fd = new FormData(); Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      const res = await fetch(FORMSPREE, { method: "POST", headers: { Accept: "application/json" }, body: fd });
      const data = await res.json();
      if (res.ok || data.ok || data.success) { setSucceeded(true); setForm({ name: "", email: "", subject: "", message: "" }); setTimeout(() => setSucceeded(false), 5000); }
      else setError(data.error || "Something went wrong. Please try again.");
    } catch { setError("Network error. Please check your connection."); }
    setSubmitting(false);
  };
  useEffect(() => { if (succeeded) document.activeElement?.blur(); }, [succeeded]);

  return (
    <section className="relative min-h-screen pt-28 pb-20 px-6 md:px-12 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-mono text-[#7c4dff] tracking-[0.2em] uppercase mb-5"><span className="w-8 h-px bg-[#7c4dff]/60" /> Contact</span>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-5"><span className="text-[#1a1a2e]">Say </span><span className="gradient-text">Hello.</span></h1>
          <p className="text-[#1a1a2e]/35 text-lg max-w-md leading-relaxed">Have a project in mind? I'd love to hear about it.</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="lg:col-span-3">
            <div className="glass-card rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl bg-[#7c4dff]/8 border border-[#7c4dff]/12"><MessageSquare size={18} className="text-[#7c4dff]" /></div>
                <div><h3 className="text-lg font-semibold text-[#1a1a2e]">Send a message</h3><p className="text-xs text-[#1a1a2e]/25 font-mono">Response within 24hrs</p></div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div><label className="flex items-center gap-1.5 text-[10px] font-mono text-[#1a1a2e]/30 mb-2 uppercase tracking-wider"><User size={10} /> Name</label><input name="name" type="text" value={form.name} onChange={handleChange} required placeholder="John Doe" className={inputClass} /></div>
                  <div><label className="flex items-center gap-1.5 text-[10px] font-mono text-[#1a1a2e]/30 mb-2 uppercase tracking-wider"><Mail size={10} /> Email</label><input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" className={inputClass} /></div>
                </div>
                <div><label className="flex items-center gap-1.5 text-[10px] font-mono text-[#1a1a2e]/30 mb-2 uppercase tracking-wider"><MessageSquare size={10} /> Subject</label><input name="subject" type="text" value={form.subject} onChange={handleChange} required placeholder="Project Inquiry" className={inputClass} /></div>
                <div><label className="flex items-center gap-1.5 text-[10px] font-mono text-[#1a1a2e]/30 mb-2 uppercase tracking-wider"><MessageSquare size={10} /> Message</label><textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell me about your project..." className={`${inputClass} resize-none`} /></div>
                <AnimatePresence mode="wait">
                  {succeeded && <motion.div key="ok" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#00c9a7]/8 border border-[#00c9a7]/15 text-[#00c9a7] text-sm"><CheckCircle size={16} /> Message sent! I'll get back to you soon.</motion.div>}
                  {error && <motion.div key="err" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/8 border border-red-500/15 text-red-500 text-sm"><XCircle size={16} /> {error}</motion.div>}
                </AnimatePresence>
                <motion.button type="submit" disabled={submitting || succeeded} whileHover={!submitting && !succeeded ? { scale: 1.01 } : {}} whileTap={!submitting && !succeeded ? { scale: 0.99 } : {}}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#7c4dff] text-white text-sm font-semibold hover:bg-[#6a3de8] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#7c4dff]/20">
                  {submitting ? <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />Sending...</> : succeeded ? <><CheckCircle size={16} /> Sent!</> : <><Send size={16} /> Send Message</>}
                </motion.button>
              </form>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="lg:col-span-2 flex flex-col gap-4">
            <div className="glass-card rounded-2xl p-6 border border-[#00c9a7]/10">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00c9a7] opacity-60" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00c9a7]" /></span>
                <span className="text-sm font-semibold text-[#00c9a7]">Available for Work</span>
              </div>
              <p className="text-xs text-[#1a1a2e]/30 leading-relaxed">Currently accepting new projects and collaborations.</p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h4 className="text-[10px] font-mono text-[#1a1a2e]/25 uppercase tracking-[0.2em] mb-4">Connect</h4>
              <div className="space-y-2">
                {socials.map(({ href, Icon, label, sub }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3 rounded-xl border border-[#1a1a2e]/[0.04] text-[#1a1a2e]/40 transition-all duration-300 hover:bg-[#7c4dff]/[0.03]" data-cursor="Open">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-[#1a1a2e]/[0.03] group-hover:bg-[#7c4dff]/[0.06] transition-colors"><Icon size={14} className="group-hover:text-[#1a1a2e] transition-colors" /></div>
                      <div><div className="text-sm font-medium text-[#1a1a2e]/55 group-hover:text-[#1a1a2e] transition-colors">{label}</div><div className="text-[10px] text-[#1a1a2e]/20 truncate max-w-[140px]">{sub}</div></div>
                    </div>
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#7c4dff]" />
                  </a>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h4 className="text-[10px] font-mono text-[#1a1a2e]/25 uppercase tracking-[0.2em] mb-3">Location</h4>
              <p className="text-sm text-[#1a1a2e]/45">India, working worldwide</p>
              <div className="mt-4 pt-4 border-t border-[#1a1a2e]/[0.04]">
                <h4 className="text-[10px] font-mono text-[#1a1a2e]/25 uppercase tracking-[0.2em] mb-3">Preferred</h4>
                <p className="text-sm text-[#1a1a2e]/45">Remote / Hybrid</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

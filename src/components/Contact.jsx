import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, Send, CheckCircle, XCircle, User, MessageSquare } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { useState, useEffect } from "react";

const FORMSPREE = "https://formspree.io/f/xwvvewva";

/* ── SectionLabel ────────────────────────────────────────── */
const SectionLabel = ({ text }) => (
  <span className="inline-flex items-center gap-2 text-xs font-medium text-indigo-400 tracking-[0.18em] uppercase mb-4">
    <span className="w-5 h-px bg-indigo-400/60" />
    {text}
  </span>
);

/* ── Input wrapper ───────────────────────────────────────── */
const Field = ({ label, icon: Icon, children }) => (
  <div>
    <label className="flex items-center gap-1.5 text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">
      <Icon size={12} />
      {label}
    </label>
    {children}
  </div>
);

const inputClass =
  "w-full px-4 py-3 bg-white/[0.04] border border-white/[0.07] rounded-xl text-white text-sm placeholder-white/20 outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-indigo-500/20 transition-all duration-200";

/* ── Social links ────────────────────────────────────────── */
const socials = [
  {
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=amaansheikhbrothers@gmail.com",
    Icon: Mail,
    label: "Email",
    sub: "amaansheikhbrothers@gmail.com",
    hoverColor: "hover:border-red-500/30 hover:text-red-300",
  },
  {
    href: "https://github.com/Amaan1911",
    Icon: Github,
    label: "GitHub",
    sub: "@Amaan1911",
    hoverColor: "hover:border-white/20 hover:text-white",
  },
  {
    href: "https://www.linkedin.com/in/amaan-sheikh-3b25a2317/",
    Icon: Linkedin,
    label: "LinkedIn",
    sub: "Amaan Sheikh",
    hoverColor: "hover:border-blue-500/30 hover:text-blue-300",
  },
  {
    href: "https://wa.me/qr/VYUIPCRU4S2ZF1",
    Icon: BsWhatsapp,
    label: "WhatsApp",
    sub: "Quick Chat",
    hoverColor: "hover:border-green-500/30 hover:text-green-300",
  },
];

/* ── Contact ─────────────────────────────────────────────── */
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      const res = await fetch(FORMSPREE, { method: "POST", headers: { Accept: "application/json" }, body: fd });
      const data = await res.json();
      if (res.ok || data.ok || data.success) {
        setSucceeded(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSucceeded(false), 5000);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    }
    setSubmitting(false);
  };

  useEffect(() => { if (succeeded) document.activeElement?.blur(); }, [succeeded]);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="relative min-h-screen pt-28 pb-20 px-6 md:px-16 overflow-hidden">

      {/* Ambient bg */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[400px] rounded-full bg-indigo-600/[0.06] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="mb-14"
        >
          <motion.div variants={fadeUp}><SectionLabel text="Contact" /></motion.div>
          <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Let's work<br /><span className="text-white/35">together.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/45 text-lg max-w-md leading-relaxed">
            Have a project in mind? I'd love to hear about it. Drop me a message and I'll get back to you.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">

          {/* ── Form (3/5) ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="glass-strong rounded-3xl p-8 md:p-10">
              {/* Card header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                  <MessageSquare size={18} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Send a message</h3>
                  <p className="text-xs text-white/35">I'll respond within 24 hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Name" icon={User}>
                    <input id="name" name="name" type="text" value={form.name}
                      onChange={handleChange} required placeholder="John Doe"
                      className={inputClass} />
                  </Field>
                  <Field label="Email" icon={Mail}>
                    <input id="email" name="email" type="email" value={form.email}
                      onChange={handleChange} required placeholder="john@example.com"
                      className={inputClass} />
                  </Field>
                </div>

                <Field label="Subject" icon={MessageSquare}>
                  <input id="subject" name="subject" type="text" value={form.subject}
                    onChange={handleChange} required
                    placeholder="Project Inquiry / Collaboration"
                    className={inputClass} />
                </Field>

                <Field label="Message" icon={MessageSquare}>
                  <textarea id="message" name="message" value={form.message}
                    onChange={handleChange} required rows={5}
                    placeholder="Tell me about your project…"
                    className={`${inputClass} resize-none`} />
                </Field>

                {/* Status messages */}
                <AnimatePresence mode="wait">
                  {succeeded && (
                    <motion.div
                      key="ok"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2.5 p-3.5 rounded-xl bg-green-500/8 border border-green-500/20 text-green-400 text-sm"
                    >
                      <CheckCircle size={16} className="flex-shrink-0" />
                      Message sent! I'll get back to you within 24 hours.
                    </motion.div>
                  )}
                  {error && (
                    <motion.div
                      key="err"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/8 border border-red-500/20 text-red-400 text-sm"
                    >
                      <XCircle size={16} className="flex-shrink-0" />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={submitting || succeeded}
                  whileHover={!submitting && !succeeded ? { scale: 1.02 } : {}}
                  whileTap={!submitting && !succeeded ? { scale: 0.98 } : {}}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-indigo-500/90 hover:bg-indigo-400 text-white text-sm font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
                >
                  {submitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending…
                    </>
                  ) : succeeded ? (
                    <><CheckCircle size={16} /> Sent!</>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* ── Sidebar (2/5) ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {/* Availability */}
            <div className="glass-strong rounded-2xl p-6 border border-green-500/15">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-sm font-semibold text-green-400">Available for Work</span>
              </div>
              <p className="text-xs text-white/35 leading-relaxed">
                Currently accepting new projects and collaborations. Response time: within 24 hours.
              </p>
            </div>

            {/* Social links */}
            <div className="glass-strong rounded-2xl p-6">
              <h4 className="text-sm font-semibold text-white/60 mb-4 uppercase tracking-wider text-xs">Connect</h4>
              <div className="space-y-2">
                {socials.map(({ href, Icon, label, sub, hoverColor }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 3 }}
                    className={`flex items-center gap-3.5 p-3 rounded-xl border border-white/[0.05] text-white/45 transition-all duration-200 ${hoverColor}`}
                  >
                    <div className="p-1.5 rounded-lg bg-white/[0.04]">
                      <Icon size={15} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white/80">{label}</div>
                      <div className="text-[11px] text-white/30 truncate max-w-[150px]">{sub}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

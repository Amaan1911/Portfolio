import { motion } from "framer-motion";


function About() {
  return (
    <section className="py-20 px-6 md:px-16 min-h-screen flex items-center relative z-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative flex justify-center"
        >
          <img
            src="/Amaan.jpg"
            alt="Amaan Sheikh"
            className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover shadow-2xl border-4 border-gray-700/50"
          />
          {/* Vignette Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/30 via-purple-500/20 to-transparent blur-3xl"></div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="space-y-6 text-center md:text-left"
        >
          <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Me
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            I'm a <span className="text-blue-400 font-semibold">MERN stack web developer</span>
            passionate about crafting modern, user-friendly applications.
            I love building interactive solutions that solve real-world problems,
            while continuously learning and adapting to new technologies.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl shadow-md font-medium transition text-white"
          >
            Let’s Connect 🚀
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default About;

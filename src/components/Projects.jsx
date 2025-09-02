import { motion } from "framer-motion";


function Projects() {
  const projectData = [
    {
      title: "AI Powered Notes App",
      description:
        "A smart note-taking app that leverages AI to summarize, organize, and search notes seamlessly. It helps users boost productivity with intelligent suggestions and clean UI for efficient learning.",
      image: "/Ai_notes.jpg",
      liveLink: "https://ai-notes-front-end.vercel.app/",
    },
    {
      title: "Netflix Clone (with Firebase & Backend)",
      description:
        "A Netflix-inspired streaming platform built with React, Firebase authentication, and backend integration. It supports user login, watchlist, and real-time movie data fetching with a responsive UI.",
      image: "/Netlfix.png",
      liveLink: "https://netflix-clone-vert-delta.vercel.app/",
    },
    {
      title: "E-Commerce Platform",
      description:
        "A modern e-commerce web app featuring product listings, cart, and checkout flow. Built with MERN stack ensuring scalability, responsiveness, and a smooth shopping experience for users.",
      image: "/Ecom.png", // placeholder for project image,
      liveLink: "https://ecom-two-pink-20.vercel.app/",
    },
  ];

  return (
    <section className="py-20 px-10 bg-gray-800 min-h-screen">
      <h3 className="text-3xl font-bold mb-10 text-center">Projects</h3>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projectData.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl overflow-hidden shadow-lg bg-gray-900 border border-gray-700 hover:shadow-2xl transition-all"
          >
            {/* Image */}
            <div className="h-40 bg-gray-700">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover block"
              />
            </div>

            <div className="p-6">
              <h4 className="text-xl font-semibold mb-3">{project.title}</h4>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md transition" onClick={() => window.open(project.liveLink, '_blank')}>
                See Live
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Projects;

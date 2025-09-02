import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    return (
    <section className="flex flex-col items-center justify-center text-center py-28 px-6">
    <motion.h2
    className="text-5xl font-extrabold mb-6"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    >
    Hi, I'm Amaan 👋
    </motion.h2>
    <p className="max-w-2xl text-gray-300 mb-8 text-lg">
    A passionate MERN Stack Developer crafting modern, user-friendly, and scalable web experiences.
    </p>
    <button onClick={() => navigate("/projects")}
    className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-lg">
    View My Work
    </button>
    </section>
    );
    }
    export default Home;
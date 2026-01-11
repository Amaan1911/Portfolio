import { motion } from "framer-motion";

export default function ModernFogBackground() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#050505]">
            {/* Deep Purple Blob */}
            <motion.div
                animate={{
                    x: [0, 30, -20, 0],
                    y: [0, -50, 20, 0],
                    scale: [1, 1.1, 0.9, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/30 rounded-full blur-[120px]"
            />

            {/* Royal Blue Blob */}
            <motion.div
                animate={{
                    x: [0, -40, 30, 0],
                    y: [0, 40, -30, 0],
                    scale: [1, 1.2, 0.8, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
                className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] bg-blue-900/20 rounded-full blur-[130px]"
            />

            {/* Cyan/Teal Accent Blob */}
            <motion.div
                animate={{
                    x: [0, 50, -50, 0],
                    y: [0, -30, 30, 0],
                    opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
                className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] bg-cyan-900/20 rounded-full blur-[100px]"
            />

            {/* Subtle Noise Texture Overlay */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-60" />
        </div>
    );
}

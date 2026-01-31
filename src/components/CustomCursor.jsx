import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trails, setTrails] = useState([]);
  const trailIdRef = useRef(0);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Much smoother spring configuration
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    let rafId;
    let lastX = -100;
    let lastY = -100;
    let lastTime = Date.now();

    const moveCursor = (e) => {
      const currentTime = Date.now();
      const timeDiff = currentTime - lastTime;
      
      // Throttle cursor updates for better performance
      if (timeDiff < 8) return; // ~120fps max
      
      lastTime = currentTime;
      
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      // Calculate velocity for spray effect
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const velocity = Math.sqrt(dx * dx + dy * dy);

      lastX = e.clientX;
      lastY = e.clientY;

      // Add trail particles based on velocity
      if (velocity > 2) {
        const numParticles = Math.min(Math.floor(velocity / 10), 3);
        
        for (let i = 0; i < numParticles; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 20;
          const id = trailIdRef.current++;
          
          setTrails(prev => [
            ...prev.slice(-20), // Keep only last 20 particles for performance
            {
              id,
              x: e.clientX + Math.cos(angle) * distance,
              y: e.clientY + Math.sin(angle) * distance,
              size: Math.random() * 4 + 2,
              opacity: Math.random() * 0.5 + 0.3,
              color: isPointer ? '#a855f7' : '#3b82f6',
            }
          ]);

          // Remove particle after animation
          setTimeout(() => {
            setTrails(prev => prev.filter(t => t.id !== id));
          }, 800);
        }
      }
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.style.cursor === "pointer" ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setTrails([]);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseEnter, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [cursorX, cursorY, isPointer]);

  // Hide on mobile/touch devices
  useEffect(() => {
    const checkDevice = () => {
      if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768) {
        setIsVisible(false);
        document.body.style.cursor = "auto";
      } else {
        document.body.style.cursor = "none";
      }
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => {
      window.removeEventListener("resize", checkDevice);
      document.body.style.cursor = "auto";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Trail Particles */}
      {trails.map((trail) => (
        <motion.div
          key={trail.id}
          className="fixed pointer-events-none z-[9998] rounded-full"
          style={{
            left: trail.x,
            top: trail.y,
            width: trail.size,
            height: trail.size,
            backgroundColor: trail.color,
          }}
          initial={{ 
            opacity: trail.opacity, 
            scale: 1,
          }}
          animate={{ 
            opacity: 0, 
            scale: 0,
            y: -20,
          }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut" 
          }}
        />
      ))}

      {/* Main Cursor - Outer Glow */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full"
          style={{
            width: 40,
            height: 40,
            background: isPointer 
              ? "radial-gradient(circle, rgba(168, 85, 247, 0.4), rgba(168, 85, 247, 0) 70%)"
              : "radial-gradient(circle, rgba(59, 130, 246, 0.4), rgba(59, 130, 246, 0) 70%)",
          }}
          animate={{
            scale: isPointer ? 1.5 : 1,
            opacity: isPointer ? 0.8 : 0.6,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border-2"
          style={{
            width: 32,
            height: 32,
            borderColor: isPointer ? "#a855f7" : "#3b82f6",
          }}
          animate={{
            scale: isPointer ? 1.5 : 1,
            opacity: isPointer ? 0.6 : 1,
            rotate: isPointer ? 180 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full"
          style={{
            width: 8,
            height: 8,
            backgroundColor: isPointer ? "#a855f7" : "#3b82f6",
            boxShadow: isPointer 
              ? "0 0 12px rgba(168, 85, 247, 0.8)" 
              : "0 0 12px rgba(59, 130, 246, 0.8)",
          }}
          animate={{
            scale: isPointer ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
      </motion.div>

      {/* Ripple effect on click */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full border-2"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: 40,
          height: 40,
          borderColor: isPointer ? "#a855f7" : "#3b82f6",
        }}
        animate={{
          scale: [1, 2],
          opacity: [0.5, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
    </>
  );
}
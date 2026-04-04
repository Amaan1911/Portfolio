import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springCfg = { damping: 22, stiffness: 380, mass: 0.4 };
  const x = useSpring(mouseX, springCfg);
  const y = useSpring(mouseY, springCfg);

  // Outer ring trails slightly behind
  const outerSpringCfg = { damping: 28, stiffness: 180, mass: 0.6 };
  const ox = useSpring(mouseX, outerSpringCfg);
  const oy = useSpring(mouseY, outerSpringCfg);

  useEffect(() => {
    let lastTime = 0;

    const move = (e) => {
      const now = Date.now();
      if (now - lastTime < 8) return; // ~120fps cap
      lastTime = now;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const over = (e) => {
      const el = e.target;
      const isClickable =
        el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        el.closest("a") ||
        el.closest("button") ||
        window.getComputedStyle(el).cursor === "pointer";
      setIsPointer(isClickable);
    };

    const leave = () => setIsVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", leave);
    document.addEventListener("mouseover", over, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseover", over);
    };
  }, [mouseX, mouseY]);

  // Disable on touch devices
  useEffect(() => {
    const check = () => {
      const isTouch =
        window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 768;
      document.body.style.cursor = isTouch ? "auto" : "none";
      if (isTouch) setIsVisible(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("resize", check);
      document.body.style.cursor = "auto";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring — trails slightly behind */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full"
        style={{
          x: ox,
          y: oy,
          translateX: "-50%",
          translateY: "-50%",
          width: isPointer ? 44 : 36,
          height: isPointer ? 44 : 36,
          border: "1.5px solid",
          borderColor: isPointer
            ? "rgba(224,122,58,0.8)"
            : "rgba(255,255,255,0.35)",
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease",
        }}
        animate={{ scale: isPointer ? 1.2 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />

      {/* Inner dot — sticks close to cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: isPointer ? 6 : 7,
          height: isPointer ? 6 : 7,
          backgroundColor: isPointer ? "#e07a3a" : "#fff",
          transition: "width 0.15s ease, height 0.15s ease, background-color 0.15s ease",
        }}
      />
    </>
  );
}
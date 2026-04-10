import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [label, setLabel] = useState("");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springCfg = { damping: 22, stiffness: 380, mass: 0.4 };
  const x = useSpring(mouseX, springCfg);
  const y = useSpring(mouseY, springCfg);
  const outerSpringCfg = { damping: 28, stiffness: 180, mass: 0.6 };
  const ox = useSpring(mouseX, outerSpringCfg);
  const oy = useSpring(mouseY, outerSpringCfg);

  useEffect(() => {
    let lastTime = 0;
    const move = (e) => { const now = Date.now(); if (now - lastTime < 8) return; lastTime = now; mouseX.set(e.clientX); mouseY.set(e.clientY); setIsVisible(true); };
    const over = (e) => {
      const el = e.target;
      const isClickable = el.tagName === "A" || el.tagName === "BUTTON" || el.closest("a") || el.closest("button") || window.getComputedStyle(el).cursor === "pointer";
      setIsPointer(isClickable);
      const labelEl = el.closest("[data-cursor]");
      setLabel(labelEl ? labelEl.getAttribute("data-cursor") : "");
    };
    const leave = () => setIsVisible(false);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", leave);
    document.addEventListener("mouseover", over, { passive: true });
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseleave", leave); document.removeEventListener("mouseover", over); };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const check = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
      document.body.style.cursor = isTouch ? "auto" : "none";
      if (isTouch) setIsVisible(false);
    };
    check(); window.addEventListener("resize", check);
    return () => { window.removeEventListener("resize", check); document.body.style.cursor = "auto"; };
  }, []);

  if (!isVisible) return null;
  const showLabel = label && isPointer;

  return (
    <>
      <motion.div className="fixed pointer-events-none z-[9998] rounded-full flex items-center justify-center"
        style={{ x: ox, y: oy, translateX: "-50%", translateY: "-50%",
          width: showLabel ? 80 : isPointer ? 44 : 36, height: showLabel ? 80 : isPointer ? 44 : 36,
          border: "1.5px solid", borderColor: isPointer ? "rgba(124,77,255,0.7)" : "rgba(26,26,46,0.15)",
          background: showLabel ? "rgba(124,77,255,0.08)" : "transparent",
          backdropFilter: showLabel ? "blur(4px)" : "none",
          transition: "width 0.3s cubic-bezier(0.22,1,0.36,1), height 0.3s cubic-bezier(0.22,1,0.36,1), border-color 0.2s ease, background 0.3s ease",
        }}>
        {showLabel && (
          <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-medium text-[#7c4dff] tracking-wider uppercase">{label}</motion.span>
        )}
      </motion.div>
      <motion.div className="fixed pointer-events-none z-[9999] rounded-full"
        style={{ x, y, translateX: "-50%", translateY: "-50%",
          width: showLabel ? 0 : isPointer ? 5 : 6, height: showLabel ? 0 : isPointer ? 5 : 6,
          backgroundColor: isPointer ? "#7c4dff" : "#1a1a2e",
          transition: "width 0.2s ease, height 0.2s ease, background-color 0.15s ease",
        }} />
    </>
  );
}
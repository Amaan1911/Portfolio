import { useEffect, useRef } from "react";

export default function PhotoOutline() {
  const ref = useRef(null);

  useEffect(() => {
    let t = 0;
    const animate = () => {
      if (ref.current) {
        const glow = 14 + Math.sin(t) * 6;
        ref.current.style.filter = `url(#edge) drop-shadow(0 0 ${glow}px rgba(0,220,255,1))`;
        t += 0.02;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
      <img
        ref={ref}
        src="/Amaan_Selfie.jpeg"
        alt=""
        className="w-[460px] opacity-70"
        style={{
          filter: "url(#edge)",
          mixBlendMode: "screen"
        }}
      />
    </div>
  );
}

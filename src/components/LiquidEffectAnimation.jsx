import { useEffect, useRef } from "react";

if (typeof window !== "undefined" && !window.__liquidApp) {
  window.__liquidApp = null;
}

const CALM_BACKGROUNDS = [
  "https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1920&q=80&fit=crop",
  "https://images.unsplash.com/photo-1558591710-4b4a1b27d2e9?w=1920&q=80&fit=crop",
  "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=1920&q=80&fit=crop",

];

export function LiquidEffectAnimation() {
  const canvasRef = useRef(null);
  const scriptRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const canvasId = canvas.id || "liquid-canvas";
    if (!canvas.id) canvas.id = canvasId;

    const script = document.createElement("script");
    script.type = "module";
    script.id = "liquid-effect-script";

    script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js';

      const backgrounds = ${JSON.stringify(CALM_BACKGROUNDS)};
      let currentIndex = 0;

      const canvas = document.getElementById('${canvasId}');
      if (canvas && !window.__liquidApp) {
        try {
          const app = LiquidBackground(canvas);
          window.__liquidApp = app;

          if (app.liquidPlane?.material) {
            app.liquidPlane.material.metalness = 0.02;
            app.liquidPlane.material.roughness = 0.85;
            app.liquidPlane.material.color?.set?.("#ffffff");
          }

          if (app.liquidPlane?.uniforms?.displacementScale) {
            app.liquidPlane.uniforms.displacementScale.value = 0.6;
          }

          if (app.liquidPlane?.uniforms?.timeScale) {
            app.liquidPlane.uniforms.timeScale.value = 0.08;
          }

          function loadNextBackground() {
            currentIndex = (currentIndex + 1) % backgrounds.length;
            app.loadImage(backgrounds[currentIndex]);
          }

          // initial
          app.loadImage(backgrounds[currentIndex]);

          // change every 10–15 seconds
          setInterval(() => {
            loadNextBackground();
          }, 10000 + Math.random() * 5000);

        } catch (error) {
          console.error('Liquid effect init error:', error);
        }
      }
    `;

    if (!document.getElementById("liquid-effect-script")) {
      document.body.appendChild(script);
      scriptRef.current = script;
    }

    return () => {
      if (window.__liquidApp) {
        try {
          window.__liquidApp.dispose?.();
          window.__liquidApp.destroy?.();
        } catch { }
        window.__liquidApp = null;
      }

      const s = document.getElementById("liquid-effect-script");
      if (s?.parentNode) s.parentNode.removeChild(s);
      scriptRef.current = null;
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <canvas ref={canvasRef} id="liquid-canvas" className="fixed inset-0 w-full h-full" />
    </div>
  );
}

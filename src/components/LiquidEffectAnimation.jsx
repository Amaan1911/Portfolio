import { useEffect, useRef } from "react";

if (typeof window !== "undefined" && !window.__liquidApp) {
  window.__liquidApp = null;
}

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

      const canvas = document.getElementById('${canvasId}');
      if (canvas && !window.__liquidApp) {
        try {
          const app = LiquidBackground(canvas);
          window.__liquidApp = app;

          // Dark minimalist background
          app.loadImage('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&q=80&fit=crop');

          if (app.liquidPlane?.material) {
            app.liquidPlane.material.metalness = 0.05;
            app.liquidPlane.material.roughness = 0.9;
            app.liquidPlane.material.color?.set?.("#0a0a0a");
          }

          if (app.liquidPlane?.uniforms?.displacementScale) {
            app.liquidPlane.uniforms.displacementScale.value = 1.2;
          }

          if (app.liquidPlane?.uniforms?.timeScale) {
            app.liquidPlane.uniforms.timeScale.value = 0.15; // slower motion
          }

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
        } catch (e) {
          console.warn("Liquid cleanup error:", e);
        }
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

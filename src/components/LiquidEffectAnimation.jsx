import { useEffect, useRef } from "react";

// Initialize global variable for cleanup
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

          // Original background image restored
          app.loadImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80&fit=crop');

          if (app.liquidPlane) {
            if (app.liquidPlane.material) {
              app.liquidPlane.material.metalness = 0.2;   // reduced shine
              app.liquidPlane.material.roughness = 0.75;  // softer reflections
            }

            if (app.liquidPlane.uniforms?.displacementScale) {
              app.liquidPlane.uniforms.displacementScale.value = 1.8; // gentler motion
            }
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
    <div
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <canvas
        ref={canvasRef}
        id="liquid-canvas"
        className="fixed inset-0 w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
}

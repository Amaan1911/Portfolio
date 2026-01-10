import { useEffect, useRef } from "react";

// Initialize global variable for cleanup
if (typeof window !== 'undefined' && !window.__liquidApp) {
  window.__liquidApp = null;
}

export function LiquidEffectAnimation() {
  const canvasRef = useRef(null);
  const scriptRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const canvasId = canvas.id || 'liquid-canvas';
    
    // Ensure canvas has the correct ID
    if (!canvas.id) {
      canvas.id = canvasId;
    }

    // Load the script dynamically
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
          
          // Load a beautiful background image from Unsplash (abstract gradient)
          app.loadImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80&fit=crop');
          
          // Configure material properties if available
          if (app.liquidPlane) {
            if (app.liquidPlane.material) {
              app.liquidPlane.material.metalness = 0.75;
              app.liquidPlane.material.roughness = 0.25;
            }
            if (app.liquidPlane.uniforms && app.liquidPlane.uniforms.displacementScale) {
              app.liquidPlane.uniforms.displacementScale.value = 5;
            }
          }
        } catch (error) {
          console.error('Error initializing liquid effect:', error);
        }
      }
    `;
    
    // Only append if script doesn't already exist
    const existingScript = document.getElementById("liquid-effect-script");
    if (!existingScript) {
      document.body.appendChild(script);
      scriptRef.current = script;
    }

    // Cleanup function
    return () => {
      // Cleanup: dispose the liquid app if it exists
      if (window.__liquidApp) {
        try {
          if (typeof window.__liquidApp.dispose === 'function') {
            window.__liquidApp.dispose();
          } else if (typeof window.__liquidApp.destroy === 'function') {
            window.__liquidApp.destroy();
          }
        } catch (error) {
          console.error('Error disposing liquid app:', error);
        }
        window.__liquidApp = null;
      }
      
      // Remove the script if it exists
      const scriptToRemove = document.getElementById("liquid-effect-script");
      if (scriptToRemove && scriptToRemove.parentNode) {
        scriptToRemove.parentNode.removeChild(scriptToRemove);
      }
      scriptRef.current = null;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 m-0 w-full h-full touch-none overflow-hidden"
      style={{ fontFamily: '"Montserrat", serif', zIndex: 0 }}
    >
      <canvas 
        ref={canvasRef} 
        id="liquid-canvas" 
        className="fixed inset-0 w-full h-full pointer-events-none" 
        style={{ display: 'block' }}
      />
    </div>
  );
}


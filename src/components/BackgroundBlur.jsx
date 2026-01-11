import { useEffect, useState } from "react";

export default function BackgroundBlur() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/Amaan_Selfie.jpeg";
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: "url('/Amaan_Selfie.jpeg')",
          filter: "blur(20px) brightness(0.6)",
          transform: "scale(1.1)" // Prevent white edges from blur
        }}
      />
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}

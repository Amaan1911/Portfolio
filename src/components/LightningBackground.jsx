import React, { useEffect, useRef } from 'react';

const LightningBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let lightning = [];
        let flashOpacity = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const createLightning = () => {
            const x = Math.random() * canvas.width;
            const y = 0;
            const segments = [];
            let currentX = x;
            let currentY = y;
            const maxSegments = 30 + Math.random() * 20;

            for (let i = 0; i < maxSegments; i++) {
                const nextX = currentX + (Math.random() - 0.5) * 100; // Increased horizontal spread
                const nextY = currentY + (Math.random() * 50) + 10;
                segments.push({ x1: currentX, y1: currentY, x2: nextX, y2: nextY });
                currentX = nextX;
                currentY = nextY;
                if (currentY > canvas.height) break;
            }

            lightning.push({ segments, opacity: 1 });
            flashOpacity = 0.15; // Screen flash opacity

            // Schedule next lightning
            setTimeout(createLightning, Math.random() * 3000 + 1000); // 1-4 seconds
        };

        // Start the first lightning
        setTimeout(createLightning, 1000);

        const draw = () => {
            // Clear canvas
            ctx.fillStyle = '#050505'; // Very dark background
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw flash
            if (flashOpacity > 0) {
                ctx.fillStyle = `rgba(255, 255, 255, ${flashOpacity})`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                flashOpacity -= 0.01;
            }

            // Draw lightning
            lightning.forEach((bolt, index) => {
                ctx.beginPath();
                bolt.segments.forEach(segment => {
                    ctx.moveTo(segment.x1, segment.y1);
                    ctx.lineTo(segment.x2, segment.y2);
                });

                // Outer glow
                ctx.shadowBlur = 15;
                ctx.shadowColor = 'rgba(100, 200, 255, 0.8)';
                ctx.strokeStyle = `rgba(200, 230, 255, ${bolt.opacity})`;
                ctx.lineWidth = 2;
                ctx.stroke();

                // Inner core
                ctx.shadowBlur = 0;
                ctx.strokeStyle = `rgba(255, 255, 255, ${bolt.opacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();

                bolt.opacity -= 0.05; // Fade out speed

                if (bolt.opacity <= 0) {
                    lightning.splice(index, 1);
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[-1] pointer-events-none"
            style={{ background: '#050505' }}
        />
    );
};

export default LightningBackground;

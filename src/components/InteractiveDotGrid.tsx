import { useEffect, useRef } from 'react';

export default function InteractiveDotGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let w = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
        let h = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
        let animationFrameId: number;

        const dots: { x: number, y: number, baseX: number, baseY: number, vx: number, vy: number }[] = [];
        const spacing = 32;
        const radius = 1.5;

        const initDots = () => {
            dots.length = 0;
            for (let x = 0; x < w; x += spacing) {
                for (let y = 0; y < h; y += spacing) {
                    dots.push({ x, y, baseX: x, baseY: y, vx: 0, vy: 0 });
                }
            }
        };

        initDots();

        const mouse = { x: -1000, y: -1000, radius: 150 };
        let isMoving = false;
        let isVisible = true;

        // Intersection Observer to completely pause canvas when scrolled away
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
                if (isVisible && !isMoving) animate();
            },
            { threshold: 0 }
        );
        observer.observe(canvas);

        const animate = () => {
            if (!isVisible) {
                isMoving = false;
                return;
            }

            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = '#c0c0c8';
            let needsUpdate = false;

            for (let i = 0; i < dots.length; i++) {
                const dot = dots[i];

                const dx = mouse.x - dot.x;
                const dy = mouse.y - dot.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Repulsion
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    const pushX = (dx / dist) * force * -5; // Push away from mouse
                    const pushY = (dy / dist) * force * -5;
                    dot.vx += pushX;
                    dot.vy += pushY;
                }

                // Return to base position (elastic effect)
                dot.vx += (dot.baseX - dot.x) * 0.08;
                dot.vy += (dot.baseY - dot.y) * 0.08;

                // Friction
                dot.vx *= 0.8;
                dot.vy *= 0.8;

                dot.x += dot.vx;
                dot.y += dot.vy;

                if (Math.abs(dot.vx) > 0.05 || Math.abs(dot.vy) > 0.05) needsUpdate = true;

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
                ctx.fill();
            }

            // Auto-pause loop when dots settle and mouse is away, saving 100% CPU
            if (needsUpdate || mouse.x > -1000) {
                animationFrameId = requestAnimationFrame(animate);
                isMoving = true;
            } else {
                isMoving = false;
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisible) return;
            const rect = canvas.getBoundingClientRect();
            // Ensure mouse is within canvas bounds before reacting
            if (e.clientY - rect.top > h || e.clientY - rect.top < 0) {
                mouse.x = -1000;
                mouse.y = -1000;
                return;
            }
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            if (!isMoving) animate(); // Wake up
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        let resizeTimeout: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                w = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
                h = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
                initDots();
                if (!isMoving) animate();
            }, 100);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        animate();

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-60 z-0 pointer-events-none"
            style={{
                WebkitMaskImage: 'linear-gradient(to bottom, white 40%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, white 40%, transparent 100%)'
            }}
            aria-hidden="true"
        />
    );
}

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";

const AppleLogo = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
    </svg>
);

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    baseOpacity: number;
    opacity: number;
    vx: number;
    vy: number;
    history: { x: number; y: number }[];
    age: number;
    maxLife: number;
}

const ParticleField = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const createParticle = (id: number, width: number, height: number): Particle => ({
            id,
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2 + 1,
            baseOpacity: Math.random() * 0.3 + 0.1,
            opacity: 0,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            history: [],
            age: Math.random() * 100,
            maxLife: Math.random() * 300 + 200 // 200-500 frames of life
        });

        const particleCount = 100;
        particlesRef.current = Array.from({ length: particleCount }, (_, i) =>
            createParticle(i, canvas.width, canvas.height)
        );

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((particle) => {
                // Lifecycle management
                particle.age++;
                if (particle.age >= particle.maxLife) {
                    // Respawn
                    const newParticle = createParticle(particle.id, canvas.width, canvas.height);
                    // Keep ID but reset props
                    Object.assign(particle, newParticle);
                    particle.age = 0; // Start fresh
                }

                // Opacity fade in/out
                const lifeRatio = particle.age / particle.maxLife;
                if (lifeRatio < 0.2) {
                    particle.opacity = particle.baseOpacity * (lifeRatio / 0.2);
                } else if (lifeRatio > 0.8) {
                    particle.opacity = particle.baseOpacity * ((1 - lifeRatio) / 0.2);
                } else {
                    particle.opacity = particle.baseOpacity;
                }

                // Update history for trails
                particle.history.push({ x: particle.x, y: particle.y });
                if (particle.history.length > 6) particle.history.shift();

                const dx = mouseRef.current.x - particle.x;
                const dy = mouseRef.current.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 450; // Increased distance

                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    particle.vx += (dx / distance) * force * 0.2; // Increased speed/force
                    particle.vy += (dy / distance) * force * 0.2;
                }

                particle.vx *= 0.96;
                particle.vy *= 0.96;

                particle.x += particle.vx;
                particle.y += particle.vy;

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Draw trail
                if (particle.history.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(particle.history[0].x, particle.history[0].y);
                    for (let i = 1; i < particle.history.length; i++) {
                        ctx.lineTo(particle.history[i].x, particle.history[i].y);
                    }
                    ctx.lineTo(particle.x, particle.y);
                    ctx.strokeStyle = `rgba(134, 134, 139, ${particle.opacity * 0.4})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(134, 134, 139, ${particle.opacity})`;
                ctx.fill();
            });

            // Draw connections between nearby particles (optional, but requested to keep "old" look + new features)
            particlesRef.current.forEach((p1, i) => {
                particlesRef.current.slice(i + 1).forEach((p2) => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        // Using lower opacity for connections based on particle life
                        const combinedOpacity = Math.min(p1.opacity, p2.opacity);
                        ctx.strokeStyle = `rgba(134, 134, 139, ${0.05 * (1 - distance / 100) * (combinedOpacity / p1.baseOpacity)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
        />
    );
};

export const Hero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
    const y = useTransform(smoothProgress, [0, 1], [0, 200]);
    const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(smoothProgress, [0, 1], [1, 0.9]);

    const scrollToStory = () => {
        document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section ref={containerRef} className="relative h-screen min-h-[700px] max-h-[900px] flex items-center justify-center overflow-hidden">
            <ParticleField />

            <motion.div
                style={{ y, opacity, scale }}
                className="relative z-10 text-center px-6 max-w-5xl mx-auto"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="liquid-glass-capsule inline-flex px-5 py-2 mb-6"
                >
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#1d1d1f]/70">
                        Designed by Apple in California
                    </span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-center mb-3"
                >
                    <AppleLogo className="w-12 h-12 md:w-14 md:h-14 text-[#1d1d1f]" />
                </motion.div>

                <div className="overflow-visible mb-2">
                    <motion.h1
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                        className="text-[70px] md:text-[110px] lg:text-[150px] font-bold tracking-[-0.04em] text-gradient leading-none"
                    >
                        Apple
                    </motion.h1>
                </div>

                <motion.h2
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                    className="text-xl md:text-3xl lg:text-4xl font-medium text-[#1d1d1f] tracking-tight mb-5"
                >
                    Think Different.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-base md:text-lg text-[#86868b] font-normal max-w-xl mx-auto leading-relaxed mb-8"
                >
                    From a garage in Los Altos to the most valuable company in the world.
                    Experience the complete story of innovation, design, and the relentless pursuit of perfection.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3"
                >
                    <motion.button
                        onClick={scrollToStory}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="glass-button-primary px-8 py-3.5 text-sm font-medium"
                    >
                        Begin the Journey
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="glass-button px-6 py-3.5 text-sm font-medium"
                    >
                        Watch Film
                    </motion.button>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    onClick={scrollToStory}
                >
                    <span className="text-[10px] text-[#86868b] font-medium tracking-[0.15em] uppercase">Scroll</span>
                    <div className="w-5 h-8 rounded-full border-[1.5px] border-[#86868b]/40 flex items-start justify-center p-1">
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1 h-2 bg-[#86868b]/50 rounded-full"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

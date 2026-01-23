import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const LiquidBackground = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();
    
    const blob1X = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const blob1Y = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const blob2X = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const blob2Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const blob3X = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const blob3Y = useTransform(scrollYProgress, [0, 1], [0, 400]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[-1] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#f6f7fb] via-[#eef1f6] to-[#ffffff]" />
            
            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                    rotate: [0, 45, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -top-[30%] -left-[20%] w-[80vw] h-[80vw] rounded-full opacity-40"
                style={{
                    x: blob1X,
                    y: blob1Y,
                    background: "radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0.08) 40%, transparent 70%)",
                    filter: "blur(80px)",
                }}
            />
            
            <motion.div
                animate={{
                    scale: [1, 1.25, 1],
                    rotate: [0, -60, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-[10%] -right-[20%] w-[70vw] h-[70vw] rounded-full opacity-30"
                style={{
                    x: blob2X,
                    y: blob2Y,
                    background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0.06) 40%, transparent 70%)",
                    filter: "blur(90px)",
                }}
            />
            
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 30, 0],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -bottom-[30%] left-[10%] w-[90vw] h-[90vw] rounded-full opacity-25"
                style={{
                    x: blob3X,
                    y: blob3Y,
                    background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.05) 40%, transparent 70%)",
                    filter: "blur(110px)",
                }}
            />

            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full opacity-20"
                style={{
                    background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 60%)",
                    filter: "blur(80px)",
                }}
            />

            <div className="grain-overlay" />
        </div>
    );
};

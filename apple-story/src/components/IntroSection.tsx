import { useRef } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";

const CountUp = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="block text-5xl md:text-6xl font-extralight text-slate-900 tabular-nums"
        >
            {value}{suffix}
        </motion.span>
    );
};

export const IntroSection = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, margin: "-25%" });
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const springConfig = { stiffness: 50, damping: 20 };
    const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
    const y = useSpring(useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [120, 0, 0, -120]), springConfig);
    const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.92, 1, 1, 0.95]);

    const phrase = "We believe in the power of technology to transform lives. Every product we create is designed with humanity at its heart.";
    const words = phrase.split(" ");

    const stats = [
        { value: "48", label: "Years of Innovation", suffix: "+" },
        { value: "2B", label: "Active Devices", suffix: "+" },
        { value: "$3T", label: "Market Value", suffix: "" },
    ];

    return (
        <section 
            ref={containerRef}
            className="min-h-screen w-full flex items-center justify-center py-32 px-6 relative overflow-hidden"
        >
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0]) }}
            >
                <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] opacity-10"
                    style={{ background: "radial-gradient(circle, rgba(15,23,42,0.08) 0%, transparent 60%)" }}
                />
            </motion.div>

            <motion.div 
                style={{ opacity, y, scale }}
                className="max-w-6xl mx-auto text-center relative"
            >
                <motion.span
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
                    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="liquid-glass-button inline-flex px-6 py-3 mb-16 text-xs tracking-[0.4em] uppercase text-slate-600"
                >
                    Our Philosophy
                </motion.span>

                <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-extralight text-slate-800 leading-[1.4] md:leading-[1.5]">
                    {words.map((word, i) => (
                        <span key={i} className="inline-block overflow-hidden mr-[0.35em]">
                            <motion.span
                                initial={{ y: "110%", opacity: 0, rotateX: -45 }}
                                animate={isInView ? { y: 0, opacity: 1, rotateX: 0 } : { y: "110%", opacity: 0, rotateX: -45 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.15 + i * 0.035,
                                    ease: [0.215, 0.61, 0.355, 1]
                                }}
                                className="inline-block origin-bottom"
                            >
                                {word}
                            </motion.span>
                        </span>
                    ))}
                </h2>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 1.2, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
                            transition={{ duration: 0.8, delay: 1.2 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="liquid-glass-card p-8 md:p-10 text-center group hover:scale-[1.02] transition-transform duration-500"
                        >
                            <CountUp value={stat.value} suffix={stat.suffix} />
                            <motion.span 
                                className="block text-xs text-slate-500 mt-4 tracking-[0.2em] uppercase font-light"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.6, delay: 1.5 + i * 0.1 }}
                            >
                                {stat.label}
                            </motion.span>
                            
                            <motion.div
                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:w-[60%] transition-all duration-700"
                            />
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 1.5, delay: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="mt-20 h-px w-full max-w-md mx-auto bg-gradient-to-r from-transparent via-slate-400/40 to-transparent"
                />
            </motion.div>
        </section>
    );
};

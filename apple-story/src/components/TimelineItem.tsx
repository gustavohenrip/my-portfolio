import { useRef } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { cn } from "../lib/utils";

interface TimelineItemProps {
    data: {
        year: string;
        title: string;
        description: string;
        image: string;
        color?: string;
    };
    index: number;
    total: number;
}

const AnimatedWord = ({ word, delay }: { word: string; delay: number }) => {
    return (
        <span className="inline-block overflow-hidden mr-[0.25em]">
            <motion.span
                initial={{ y: "100%", rotateX: -90, opacity: 0 }}
                whileInView={{ y: 0, rotateX: 0, opacity: 1 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{
                    duration: 0.9,
                    delay,
                    ease: [0.215, 0.61, 0.355, 1]
                }}
                className="inline-block origin-bottom"
            >
                {word}
            </motion.span>
        </span>
    );
};

const AnimatedChar = ({ char, delay }: { char: string; delay: number }) => {
    return (
        <motion.span
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, margin: "-5%" }}
            transition={{
                duration: 0.5,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="inline-block"
        >
            {char === " " ? "\u00A0" : char}
        </motion.span>
    );
};

export const TimelineItem = ({ data, index, total }: TimelineItemProps) => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, margin: "-15% 0px -15% 0px" });
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const { scrollYProgress: imageScrollProgress } = useScroll({
        target: imageRef,
        offset: ["start end", "end start"]
    });

    const springConfig = { stiffness: 80, damping: 25, restDelta: 0.001 };
    const imageY = useSpring(useTransform(scrollYProgress, [0, 1], [120, -120]), springConfig);
    const textY = useSpring(useTransform(scrollYProgress, [0, 1], [60, -60]), springConfig);
    const imageScale = useTransform(imageScrollProgress, [0, 0.3, 0.7, 1], [0.85, 1.02, 1.02, 0.95]);
    const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -4]);
    const parallaxImageInner = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    const isEven = index % 2 === 0;
    const words = data.title.split(" ");
    const yearChars = data.year.split("");

    return (
        <section 
            ref={containerRef}
            className="min-h-screen w-full flex items-center justify-center py-40 px-4 md:px-8 relative overflow-hidden"
        >
            <motion.div 
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.3, 0.3, 0]) }}
            >
                <div 
                    className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
                    style={{ 
                        background: `radial-gradient(circle, ${data.color || "#4299e1"} 0%, transparent 70%)`,
                        left: isEven ? "10%" : "auto",
                        right: isEven ? "auto" : "10%",
                        top: "50%",
                        transform: "translateY(-50%)"
                    }}
                />
            </motion.div>

            <div className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block">
                <motion.div 
                    className="w-full h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"
                    style={{ scaleY: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]) }}
                />
            </div>
            
            <motion.div 
                style={{ y: textY }}
                className={cn(
                    "container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl",
                    isEven ? "" : "lg:[direction:rtl]"
                )}
            >
                <div className={cn("space-y-10 z-10", isEven ? "lg:pr-16" : "lg:pl-16 lg:[direction:ltr]")}>
                    <motion.div
                        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -40 : 40 }}
                        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex items-center gap-6"
                    >
                        <div className="liquid-glass-button px-6 py-3 relative overflow-hidden group">
                            <div 
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: `linear-gradient(135deg, ${data.color}20 0%, transparent 50%)` }}
                            />
                            <span className="relative text-xl font-medium tracking-[0.3em] text-slate-800 flex">
                                {yearChars.map((char, i) => (
                                    <AnimatedChar key={i} char={char} delay={0.05 + i * 0.05} />
                                ))}
                            </span>
                        </div>
                        <motion.span 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-slate-400 text-sm font-light tracking-wider"
                        >
                            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                        </motion.span>
                    </motion.div>
                    
                    <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight text-slate-900 leading-[0.95] tracking-tight">
                        {words.map((word, i) => (
                            <AnimatedWord key={i} word={word} delay={0.15 + i * 0.1} />
                        ))}
                    </h2>

                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="text-lg md:text-xl text-slate-500 font-light leading-relaxed max-w-xl"
                    >
                        {data.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        <button 
                            data-cursor-hover
                            className="liquid-glass-button px-8 py-4 text-slate-700 text-sm font-medium tracking-widest hover:text-slate-900 hover:scale-[1.02] transition-all duration-500 flex items-center gap-3 group"
                        >
                            <span>Explore</span>
                            <motion.svg 
                                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </motion.svg>
                        </button>
                    </motion.div>
                </div>

                <motion.div 
                    ref={imageRef}
                    style={{ y: imageY, scale: imageScale, rotateY: imageRotate }}
                    className="relative group lg:[direction:ltr] perspective-1000"
                >
                    <motion.div
                        className="absolute -inset-4 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
                        style={{ background: `radial-gradient(circle, ${data.color}30 0%, transparent 70%)` }}
                    />
                    
                    <div className="liquid-glass-card p-4 md:p-5 transform-gpu relative">
                        <div className="relative overflow-hidden rounded-[28px] aspect-[4/3] bg-gradient-to-br from-white/5 to-transparent">
                            <motion.div
                                className="absolute inset-0 w-full h-[130%]"
                                style={{ y: parallaxImageInner }}
                            >
                                <motion.img 
                                    src={data.image} 
                                    alt={data.title}
                                    initial={{ scale: 1.3, opacity: 0 }}
                                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 1.3, opacity: 0 }}
                                    transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </motion.div>
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-white/10" />
                            
                            <motion.div 
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                style={{ background: `linear-gradient(135deg, ${data.color}15 0%, transparent 50%)` }}
                            />
                            
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.3)_100%)] pointer-events-none" />
                        </div>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: "60%" } : { width: 0 }}
                            transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px"
                            style={{ background: `linear-gradient(90deg, transparent 0%, ${data.color}50 50%, transparent 100%)` }}
                        />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="absolute -bottom-8 -right-4 md:-right-8 liquid-glass px-5 py-3 text-slate-500 text-xs font-medium tracking-[0.25em] uppercase"
                    >
                        {data.year}
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

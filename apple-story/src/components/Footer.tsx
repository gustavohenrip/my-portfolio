import { useRef } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";

const FooterLink = ({ children, delay }: { children: string; delay: number }) => (
    <motion.li
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: "-10%" }}
        transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
        <span 
            data-cursor-hover
            className="text-slate-500 text-sm font-light hover:text-slate-900 transition-colors duration-300 cursor-pointer relative group inline-block"
        >
            {children}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-slate-400/60 group-hover:w-full transition-all duration-300" />
        </span>
    </motion.li>
);

export const Footer = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, margin: "-5%" });
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const springConfig = { stiffness: 50, damping: 20 };
    const y = useSpring(useTransform(scrollYProgress, [0, 1], [150, 0]), springConfig);
    const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

    const milestones = ["Apple I", "Macintosh", "iPod", "iPhone", "iPad", "Apple Watch", "Vision Pro"];
    const socials = [
        { name: "Twitter", icon: "X" },
        { name: "LinkedIn", icon: "in" },
        { name: "YouTube", icon: "YT" }
    ];

    return (
        <footer 
            ref={containerRef}
            className="relative w-full py-40 px-4"
        >
            <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-slate-300/70 to-transparent"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ transformOrigin: "top" }}
            />

            <motion.div 
                style={{ y, opacity }}
                className="max-w-7xl mx-auto"
            >
                <div className="liquid-glass-card p-10 md:p-16 lg:p-20 relative overflow-hidden">
                    <motion.div
                        className="absolute inset-0 opacity-30"
                        style={{
                            background: "radial-gradient(ellipse at 30% 20%, rgba(99,102,241,0.08) 0%, transparent 50%)"
                        }}
                    />

                    <div className="relative grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
                        <div className="md:col-span-5 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                            >
                                <h3 className="text-5xl md:text-6xl font-extralight text-slate-900 tracking-tight">
                                    Apple
                                </h3>
                            </motion.div>
                            
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="text-slate-500 text-base font-light leading-[1.8] max-w-sm"
                            >
                                The story of innovation continues. From the garage to the stars, 
                                redefining what technology can be.
                            </motion.p>
                        </div>

                        <div className="md:col-span-4 space-y-6">
                            <motion.h4
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-xs tracking-[0.3em] uppercase text-slate-500 font-medium"
                            >
                                Milestones
                            </motion.h4>
                            <ul className="space-y-3">
                                {milestones.map((item, i) => (
                                    <FooterLink key={item} delay={0.25 + i * 0.05}>
                                        {item}
                                    </FooterLink>
                                ))}
                            </ul>
                        </div>

                        <div className="md:col-span-3 space-y-6">
                            <motion.h4
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-xs tracking-[0.3em] uppercase text-slate-500 font-medium"
                            >
                                Connect
                            </motion.h4>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="flex flex-wrap gap-3"
                            >
                                {socials.map((social) => (
                                    <button 
                                        key={social.name}
                                        data-cursor-hover
                                        className="liquid-glass-button w-12 h-12 flex items-center justify-center text-xs text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-105"
                                    >
                                        {social.icon}
                                    </button>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-slate-300/60 to-transparent"
                    />

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6"
                    >
                        <p className="text-slate-400 text-xs font-light text-center md:text-left">
                            This is a storytelling tribute. Apple and all product names are trademarks of Apple Inc.
                        </p>
                        <p className="text-slate-400 text-xs font-light">
                            Crafted with passion
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <div className="w-1 h-1 rounded-full bg-slate-400/60" />
            </motion.div>
        </footer>
    );
};

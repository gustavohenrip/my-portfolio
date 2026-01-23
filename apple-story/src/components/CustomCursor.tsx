import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const cursorXSpring = useSpring(cursorX, { stiffness: 500, damping: 28 });
    const cursorYSpring = useSpring(cursorY, { stiffness: 500, damping: 28 });
    
    const dotX = useMotionValue(-100);
    const dotY = useMotionValue(-100);
    const dotXSpring = useSpring(dotX, { stiffness: 1000, damping: 35 });
    const dotYSpring = useSpring(dotY, { stiffness: 1000, damping: 35 });

    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            dotX.set(e.clientX);
            dotY.set(e.clientY);
            setIsVisible(true);
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        window.addEventListener("mousemove", moveCursor);

        const interactiveElements = document.querySelectorAll("button, a, [data-cursor-hover]");
        interactiveElements.forEach(el => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            interactiveElements.forEach(el => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, [cursorX, cursorY, dotX, dotY]);

    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 60 : 40,
                        height: isHovering ? 60 : 40,
                        opacity: isVisible ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="rounded-full border border-slate-400/70"
                    style={{
                        background: isHovering 
                            ? "radial-gradient(circle, rgba(15,23,42,0.08) 0%, transparent 70%)" 
                            : "transparent"
                    }}
                />
            </motion.div>

            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    x: dotXSpring,
                    y: dotYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 8 : 6,
                        height: isHovering ? 8 : 6,
                        opacity: isVisible ? 1 : 0,
                    }}
                    transition={{ duration: 0.15 }}
                    className="rounded-full bg-slate-800"
                />
            </motion.div>
        </>
    );
};

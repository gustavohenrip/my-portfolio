import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
    { value: 3.1, suffix: "T", label: "Market Cap", prefix: "$" },
    { value: 2.3, suffix: "B+", label: "Active Devices", prefix: "" },
    { value: 180, suffix: "+", label: "Countries", prefix: "" },
    { value: 48, suffix: "", label: "Years of Innovation", prefix: "" },
];

const AnimatedNumber = ({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(current);
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isInView, value]);

    return (
        <span ref={ref}>
            {prefix}{value < 10 ? count.toFixed(1) : Math.floor(count)}{suffix}
        </span>
    );
};

export const StatsSection = () => {
    return (
        <section id="stats" className="py-24 px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#86868b] block mb-3">
                        By The Numbers
                    </span>
                    <h2 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] tracking-tight">
                        A Global Impact.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="liquid-glass p-6 md:p-8 text-center"
                        >
                            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1d1d1f] mb-2">
                                <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                            </div>
                            <span className="text-sm text-[#86868b]">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

import { motion } from "framer-motion";
import { useState } from "react";

const quotes = [
    {
        quote: "The people who are crazy enough to think they can change the world are the ones who do.",
        author: "Steve Jobs",
        role: "Co-founder, Apple",
        year: "1997"
    },
    {
        quote: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs",
        role: "Co-founder, Apple",
        year: "2001"
    },
    {
        quote: "Design is not just what it looks like and feels like. Design is how it works.",
        author: "Steve Jobs",
        role: "Co-founder, Apple",
        year: "2003"
    },
    {
        quote: "We believe that we're on the face of the Earth to make great products.",
        author: "Tim Cook",
        role: "CEO, Apple",
        year: "2012"
    },
];

export const QuotesSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-28 px-6 relative z-10 overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#86868b] block mb-3">
                        Words of Wisdom
                    </span>
                    <h2 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] tracking-tight">
                        Think Different.
                    </h2>
                </motion.div>

                <div className="relative">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="liquid-glass p-8 md:p-12 text-center min-h-[280px] flex flex-col justify-center"
                    >
                        <svg className="w-10 h-10 mx-auto mb-6 text-[#0071e3]/30" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        <p className="text-xl md:text-2xl lg:text-3xl text-[#1d1d1f] font-medium leading-relaxed mb-6 italic">
                            "{quotes[activeIndex].quote}"
                        </p>
                        <div>
                            <p className="text-base font-semibold text-[#1d1d1f]">{quotes[activeIndex].author}</p>
                            <p className="text-sm text-[#86868b]">{quotes[activeIndex].role} - {quotes[activeIndex].year}</p>
                        </div>
                    </motion.div>

                    <div className="flex justify-center gap-2 mt-6">
                        {quotes.map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === activeIndex
                                        ? 'bg-[#0071e3] w-8'
                                        : 'bg-[#86868b]/30 hover:bg-[#86868b]/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

import { useRef, useState, useCallback, useEffect, memo } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { timelineData } from "../data/timeline";

type TimelineEventType = {
    year: string;
    title: string;
    subtitle: string;
    description: string;
    details: string[];
    image: string;
    color: string;
    stats?: { label: string; value: string }[];
};

const AppleLogo = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
    </svg>
);

const StatCard = memo(({ label, value }: { label: string; value: string }) => {
    return (
        <div className="liquid-glass p-4 rounded-2xl">
            <span className="text-xs text-[#86868b] uppercase tracking-wider block mb-1">{label}</span>
            <span className="text-2xl font-semibold text-[#1d1d1f]">{value}</span>
        </div>
    );
});

const TimelineCard = memo(({ item }: { item: TimelineEventType }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-5%" });

    return (
        <article
            ref={cardRef}
            className={`flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[50vw] min-h-[85vh] flex flex-col lg:flex-row gap-6 lg:gap-10 p-6 lg:p-10 gpu-accelerated transition-opacity duration-700 ${isInView ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className={`flex-1 flex flex-col justify-center transition-transform duration-700 ${isInView ? 'translate-x-0' : '-translate-x-10'}`}>
                <div
                    className="h-1 rounded-full mb-5 transition-all duration-500"
                    style={{ backgroundColor: item.color, width: isInView ? '3rem' : '0' }}
                />

                <div
                    className="liquid-glass-capsule inline-flex px-4 py-2 mb-3 w-fit"
                    style={{ background: `${item.color}18`, borderColor: `${item.color}40` }}
                >
                    <span
                        className="text-sm font-bold tracking-widest"
                        style={{ color: item.color }}
                    >
                        {item.year}
                    </span>
                </div>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1d1d1f] mb-2 tracking-tight leading-tight">
                    {item.title}
                </h3>

                <p className="text-base md:text-lg text-[#86868b] font-medium mb-4">
                    {item.subtitle}
                </p>

                <p className="text-sm md:text-base text-[#515154] leading-relaxed mb-6 max-w-lg">
                    {item.description}
                </p>

                <div className="space-y-2 mb-6">
                    {item.details.slice(0, 4).map((detail, i) => (
                        <div key={i} className="flex items-start gap-2">
                            <div
                                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-xs md:text-sm text-[#515154]">{detail}</span>
                        </div>
                    ))}
                </div>

                {item.stats && (
                    <div className="grid grid-cols-3 gap-2">
                        {item.stats.map((stat) => (
                            <StatCard key={stat.label} label={stat.label} value={stat.value} />
                        ))}
                    </div>
                )}
            </div>

            <div className={`flex-1 flex items-center justify-center min-w-0 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-10 scale-95'}`}>
                <div className="liquid-glass p-3 w-full max-w-sm aspect-[3/4] overflow-hidden">
                    <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-[#f5f5f7]">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                        <img
                            src={item.image.startsWith('http') ? item.image : `${import.meta.env.BASE_URL}${item.image}`}
                            alt={item.title}
                            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${isInView ? 'scale-100' : 'scale-110'}`}
                            loading="lazy"
                            decoding="async"
                        />
                        <div
                            className="absolute bottom-3 left-3 z-20 liquid-glass-capsule px-3 py-1.5"
                            style={{ background: `${item.color}e0` }}
                        >
                            <span className="text-xs font-bold text-white tracking-wider">{item.year}</span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
});

const TimelineProgressBar = ({
    progressValue,
    onSeek,
    startYear,
    endYear
}: {
    progressValue: number;
    onSeek: (progress: number) => void;
    startYear: string;
    endYear: string;
}) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleInteraction = useCallback((clientX: number) => {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const newProgress = x / rect.width;
        onSeek(newProgress);
    }, [onSeek]);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        handleInteraction(e.clientX);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                handleInteraction(e.clientX);
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleInteraction]);

    return (
        <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-[#86868b] min-w-[32px]">{startYear}</span>
            <div
                ref={trackRef}
                className="relative w-[140px] h-[6px] bg-[#e5e5e5] rounded-full cursor-pointer"
                onMouseDown={handleMouseDown}
            >
                <div
                    className="absolute top-0 left-0 h-full bg-[#1d1d1f] rounded-full transition-transform duration-75"
                    style={{ transform: `scaleX(${progressValue})`, transformOrigin: 'left' }}
                />
                <div
                    className="absolute top-1/2 w-4 h-4 bg-[#1d1d1f] rounded-full -translate-y-1/2 cursor-grab active:cursor-grabbing shadow-md transition-transform hover:scale-110"
                    style={{ left: `calc(${progressValue * 100}% - 8px)` }}
                />
            </div>
            <span className="text-xs font-medium text-[#86868b] min-w-[32px]">{endYear}</span>
        </div>
    );
};

export const StorySection = () => {
    const targetRef = useRef<HTMLElement>(null);
    const [currentProgress, setCurrentProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const totalCards = timelineData.length;
    const cardWidthVW = 55;
    const totalScrollDistance = cardWidthVW * totalCards;

    const x = useTransform(
        scrollYProgress,
        [0, 1],
        ["0vw", `-${totalScrollDistance - 100}vw`]
    );

    const smoothX = useSpring(x, {
        stiffness: 120,
        damping: 30,
        mass: 0.5,
    });

    const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 35 });

    useEffect(() => {
        let lastUpdate = 0;
        const unsubscribe = scrollYProgress.on("change", (v) => {
            const now = Date.now();
            if (now - lastUpdate > 50) {
                setCurrentProgress(v);
                lastUpdate = now;
            }
        });
        return unsubscribe;
    }, [scrollYProgress]);

    const handleSeek = useCallback((newProgress: number) => {
        if (!targetRef.current) return;
        const sectionHeight = targetRef.current.offsetHeight;
        const sectionTop = targetRef.current.offsetTop;
        const targetScroll = sectionTop + (sectionHeight - window.innerHeight) * newProgress;

        window.scrollTo({
            top: targetScroll,
            behavior: 'auto'
        });
    }, []);

    const scrollToProducts = () => {
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            ref={targetRef}
            id="story"
            className="relative"
            style={{ height: `${(totalCards + 1) * 100}vh` }}
        >
            <div className="sticky top-0 h-screen flex flex-col overflow-hidden bg-gradient-to-b from-[#f5f5f7] to-[#f0f0f2]">
                <div className="flex-1 flex items-center pt-16">
                    <motion.div
                        style={{ x: smoothX }}
                        className="flex flex-nowrap items-center gpu-accelerated"
                    >
                        <div className="flex-shrink-0 w-[10vw]" />

                        {timelineData.map((item) => (
                            <TimelineCard key={item.year} item={item as TimelineEventType} />
                        ))}

                        <div className="flex-shrink-0 w-[80vw] md:w-[50vw] h-[80vh] flex items-center justify-center px-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="text-center max-w-md"
                            >
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#0071e3] to-[#6366f1] flex items-center justify-center shadow-lg shadow-blue-500/30">
                                    <AppleLogo className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-semibold text-[#1d1d1f] mb-3">
                                    The Story Continues
                                </h3>
                                <p className="text-base text-[#86868b] mb-8 leading-relaxed">
                                    From a garage in California to a $3 trillion company.
                                </p>
                                <motion.button
                                    onClick={scrollToProducts}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="glass-button-primary px-8 py-3.5 text-sm font-medium"
                                >
                                    Explore Products
                                </motion.button>
                            </motion.div>
                        </div>

                        <div className="flex-shrink-0 w-[20vw]" />
                    </motion.div>
                </div>

                <div className="absolute top-6 left-6 right-6 z-50 flex justify-between items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-start gap-3"
                    >
                        <AppleLogo className="w-6 h-6 text-[#1d1d1f] mt-0.5" />
                        <div>
                            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[#86868b] block mb-1">
                                The Complete Story
                            </span>
                            <h2 className="text-2xl md:text-3xl font-semibold text-[#1d1d1f]">
                                Apple Timeline
                            </h2>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="hidden md:block"
                    >
                        <div className="liquid-glass-capsule px-5 py-3">
                            <TimelineProgressBar
                                progressValue={currentProgress}
                                onSeek={handleSeek}
                                startYear={timelineData[0]?.year || "1976"}
                                endYear={timelineData[timelineData.length - 1]?.year || "2024"}
                            />
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-4 left-6 right-6 z-50 md:hidden">
                    <div className="liquid-glass-capsule p-3">
                        <div className="flex justify-between text-[10px] text-[#86868b] mb-1.5">
                            <span>{timelineData[0]?.year}</span>
                            <span>{timelineData[timelineData.length - 1]?.year}</span>
                        </div>
                        <div className="h-1.5 bg-[#e5e5e5] rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-[#1d1d1f] rounded-full origin-left"
                                style={{ scaleX: progress }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

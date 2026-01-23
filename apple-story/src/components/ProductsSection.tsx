import { motion } from "framer-motion";

const products = [
    {
        name: "iPhone 16 Pro",
        tagline: "The ultimate iPhone.",
        description: "Titanium. A18 Pro chip. Camera Control.",
        gradient: "from-zinc-900 to-zinc-700",
        link: "https://www.apple.com/iphone-16-pro/"
    },
    {
        name: "Vision Pro",
        tagline: "The era of spatial computing.",
        description: "Welcome to a new dimension.",
        gradient: "from-violet-500 to-purple-600",
        link: "https://www.apple.com/apple-vision-pro/"
    },
    {
        name: "MacBook Pro",
        tagline: "Mind-blowing. Head-turning.",
        description: "M4 Pro and M4 Max.",
        gradient: "from-gray-600 to-gray-800",
        link: "https://www.apple.com/macbook-pro/"
    },
    {
        name: "Apple Watch",
        tagline: "Smarter. Brighter. Mightier.",
        description: "Series 10 and Ultra 2.",
        gradient: "from-orange-500 to-red-500",
        link: "https://www.apple.com/apple-watch-ultra-2/"
    },
    {
        name: "iPad Pro",
        tagline: "Thin. Powerful. Magical.",
        description: "M4 chip. Ultra Retina XDR.",
        gradient: "from-blue-500 to-cyan-500",
        link: "https://www.apple.com/ipad-pro/"
    },
];

const AppleLogo = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
    </svg>
);

export const ProductsSection = () => {
    const openProduct = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <section id="products" className="py-28 px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <AppleLogo className="w-5 h-5 text-[#86868b]" />
                        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#86868b]">
                            Current Lineup
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight mb-3">
                        The Ecosystem.
                    </h2>
                    <p className="text-xl text-[#86868b] font-normal">Designed to work together.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-5">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.name}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            onClick={() => openProduct(product.link)}
                            className={`liquid-glass p-6 md:p-7 flex flex-col justify-between group cursor-pointer relative overflow-hidden ${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                                }`}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <h3 className="text-xl md:text-2xl font-semibold text-[#1d1d1f] mb-1.5">{product.name}</h3>
                                <p className="text-sm md:text-base text-[#86868b] mb-2">{product.tagline}</p>
                                <p className="text-xs text-[#86868b]/70">{product.description}</p>
                            </div>

                            <div className="relative z-10 flex items-center justify-between mt-4">
                                <motion.span
                                    whileHover={{ x: 3 }}
                                    className="text-sm font-medium text-[#0071e3] cursor-pointer"
                                >
                                    Learn more
                                </motion.span>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="w-10 h-10 rounded-full bg-white/60 border border-white/50 flex items-center justify-center group-hover:bg-[#1d1d1f] group-hover:border-[#1d1d1f] transition-all duration-300"
                                >
                                    <svg
                                        className="w-4 h-4 text-[#1d1d1f] group-hover:text-white transition-colors"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

import { motion } from "framer-motion";

const AppleLogo = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
    </svg>
);

export const CTASection = () => {
    return (
        <section className="py-28 px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="liquid-glass p-10 md:p-16 text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0071e3]/5 to-[#6366f1]/5" />

                    <div className="relative z-10">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#0071e3] to-[#6366f1] flex items-center justify-center shadow-lg shadow-blue-500/20"
                        >
                            <AppleLogo className="w-8 h-8 text-white" />
                        </motion.div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1d1d1f] tracking-tight mb-4">
                            Join the Story.
                        </h2>
                        <p className="text-base md:text-lg text-[#86868b] max-w-lg mx-auto mb-8 leading-relaxed">
                            Be part of the next chapter. Explore the latest innovations and discover what's possible.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <motion.a
                                href="https://www.apple.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="glass-button-primary px-8 py-4 text-sm font-medium inline-flex items-center gap-2"
                            >
                                Visit Apple.com
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </motion.a>
                            <motion.a
                                href="https://www.apple.com/careers/"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="glass-button px-8 py-4 text-sm font-medium"
                            >
                                Explore Careers
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

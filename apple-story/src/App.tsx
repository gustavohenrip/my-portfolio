import { useEffect, lazy, Suspense } from "react";
import Lenis from "lenis";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";

const StorySection = lazy(() => import("./components/StorySection").then(m => ({ default: m.StorySection })));
const StatsSection = lazy(() => import("./components/StatsSection").then(m => ({ default: m.StatsSection })));
const FeaturesSection = lazy(() => import("./components/FeaturesSection").then(m => ({ default: m.FeaturesSection })));
const QuotesSection = lazy(() => import("./components/QuotesSection").then(m => ({ default: m.QuotesSection })));
const ProductsSection = lazy(() => import("./components/ProductsSection").then(m => ({ default: m.ProductsSection })));
const CTASection = lazy(() => import("./components/CTASection").then(m => ({ default: m.CTASection })));

const LoadingFallback = () => (
    <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#0071e3] border-t-transparent rounded-full animate-spin" />
    </div>
);

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        { label: "Privacy Policy", href: "https://www.apple.com/legal/privacy/" },
        { label: "Terms of Use", href: "https://www.apple.com/legal/internet-services/terms/site.html" },
        { label: "Sales Policy", href: "https://www.apple.com/shop/help/sales_refunds" },
        { label: "Site Map", href: "https://www.apple.com/sitemap/" },
    ];

    return (
        <footer className="py-12 px-6 border-t border-black/5 bg-white/40 backdrop-blur-xl relative z-10">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <svg className="w-6 h-6 text-[#1d1d1f]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                            </svg>
                            <span className="text-base font-semibold text-[#1d1d1f]">Apple Story</span>
                        </div>
                        <p className="text-sm text-[#86868b] leading-relaxed">
                            A tribute to innovation, design, and the relentless pursuit of perfection.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-[#1d1d1f] mb-4">Quick Links</h4>
                        <div className="space-y-2">
                            {footerLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-sm text-[#86868b] hover:text-[#0071e3] transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-[#1d1d1f] mb-4">Connect</h4>
                        <div className="flex gap-3">
                            <a
                                href="https://twitter.com/Apple"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/60 border border-white/50 flex items-center justify-center text-[#86868b] hover:text-[#0071e3] hover:border-[#0071e3]/30 transition-all"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.youtube.com/apple"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/60 border border-white/50 flex items-center justify-center text-[#86868b] hover:text-[#0071e3] hover:border-[#0071e3]/30 transition-all"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.instagram.com/apple"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/60 border border-white/50 flex items-center justify-center text-[#86868b] hover:text-[#0071e3] hover:border-[#0071e3]/30 transition-all"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-[#86868b]">
                        Copyright {currentYear} Apple Inc. All rights reserved.
                    </p>
                    <p className="text-xs text-[#86868b]">
                        This is a fan-made tribute site. Not affiliated with Apple Inc. Made by Monayzera. <a href="https://monayzera.dev" target="_blank" rel="noopener noreferrer" className="hover:text-[#0071e3] transition-colors">Checkout my other works: https://monayzera.dev</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

function App() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.0,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 1.5,
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);

    return (
        <div className="relative w-full min-h-screen font-sans bg-[#f5f5f7]">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f5f5f7] via-[#f0f0f2] to-[#fafafa]" />
                <div
                    className="absolute w-[500px] h-[500px] rounded-full top-[-10%] left-[-5%]"
                    style={{
                        background: 'radial-gradient(circle, rgba(199, 210, 254, 0.4) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                    }}
                />
                <div
                    className="absolute w-[600px] h-[600px] rounded-full top-[15%] right-[-8%]"
                    style={{
                        background: 'radial-gradient(circle, rgba(221, 214, 254, 0.35) 0%, transparent 70%)',
                        filter: 'blur(70px)',
                    }}
                />
            </div>

            <Navbar />
            <main className="relative z-10 w-full">
                <Hero />
                <Suspense fallback={<LoadingFallback />}>
                    <StatsSection />
                </Suspense>
                <Suspense fallback={<LoadingFallback />}>
                    <StorySection />
                </Suspense>
                <Suspense fallback={<LoadingFallback />}>
                    <FeaturesSection />
                </Suspense>
                <Suspense fallback={<LoadingFallback />}>
                    <QuotesSection />
                </Suspense>
                <Suspense fallback={<LoadingFallback />}>
                    <ProductsSection />
                </Suspense>
                <Suspense fallback={<LoadingFallback />}>
                    <CTASection />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}

export default App;

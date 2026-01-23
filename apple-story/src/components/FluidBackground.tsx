import { useEffect, useRef } from "react";

export const FluidBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const blobs = containerRef.current?.querySelectorAll('.blob');
        if (!blobs) return;

        blobs.forEach((blob, index) => {
            const el = blob as HTMLElement;
            const duration = 20 + index * 8;
            const delay = index * -5;
            el.style.animation = `float${index} ${duration}s ease-in-out ${delay}s infinite alternate`;
        });
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f5f5f7] via-[#f0f0f2] to-[#fafafa]" />

            <div
                className="blob absolute w-[500px] h-[500px] rounded-full top-[-10%] left-[-5%] gpu-accelerated"
                style={{
                    background: 'radial-gradient(circle, rgba(199, 210, 254, 0.6) 0%, rgba(199, 210, 254, 0) 70%)',
                    filter: 'blur(80px)',
                }}
            />

            <div
                className="blob absolute w-[600px] h-[600px] rounded-full top-[15%] right-[-8%] gpu-accelerated"
                style={{
                    background: 'radial-gradient(circle, rgba(221, 214, 254, 0.5) 0%, rgba(221, 214, 254, 0) 70%)',
                    filter: 'blur(90px)',
                }}
            />

            <div
                className="blob absolute w-[700px] h-[700px] rounded-full bottom-[-15%] left-[25%] gpu-accelerated"
                style={{
                    background: 'radial-gradient(circle, rgba(224, 231, 255, 0.5) 0%, rgba(224, 231, 255, 0) 70%)',
                    filter: 'blur(100px)',
                }}
            />

            <div
                className="blob absolute w-[400px] h-[400px] rounded-full top-[45%] left-[55%] gpu-accelerated"
                style={{
                    background: 'radial-gradient(circle, rgba(252, 231, 243, 0.4) 0%, rgba(252, 231, 243, 0) 70%)',
                    filter: 'blur(70px)',
                }}
            />

            <style>{`
                @keyframes float0 {
                    0% { transform: translate3d(0, 0, 0) scale(1); }
                    100% { transform: translate3d(60px, -50px, 0) scale(1.1); }
                }
                @keyframes float1 {
                    0% { transform: translate3d(0, 0, 0) scale(1); }
                    100% { transform: translate3d(-50px, 40px, 0) scale(1.15); }
                }
                @keyframes float2 {
                    0% { transform: translate3d(0, 0, 0) scale(1); }
                    100% { transform: translate3d(30px, -30px, 0) scale(1.05); }
                }
                @keyframes float3 {
                    0% { transform: translate3d(0, 0, 0) scale(1); }
                    100% { transform: translate3d(-25px, 20px, 0) scale(1.08); }
                }
            `}</style>
        </div>
    );
};

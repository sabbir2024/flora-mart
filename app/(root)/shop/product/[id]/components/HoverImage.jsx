'use client';

import { useState, useRef } from 'react';

export default function SimpleHoverImage({
    src,
    alt = "Product image",
    zoomLevel = 2.5,
    width = 600,
    height = 600
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const containerRef = useRef(null);

    // মাউস মুভমেন্ট ট্র্যাক করা
    const handleMouseMove = (e) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();

        // মাউসের পজিশন ক্যালকুলেট করা (0% থেকে 100% এর মধ্যে)
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        // জুম লেভেল অনুযায়ী সীমাবদ্ধতা
        const maxZoom = 100;
        const limitedX = Math.min(Math.max(x, 0), maxZoom);
        const limitedY = Math.min(Math.max(y, 0), maxZoom);

        setMousePosition({ x: limitedX, y: limitedY });
    };

    // মাউস লিভ করলে রিসেট
    const handleMouseLeave = () => {
        setIsHovered(false);
        setMousePosition({ x: 50, y: 50 });
    };

    // মাউস এন্টার
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full overflow-hidden rounded-xl bg-surface-container cursor-crosshair group"
            style={{
                aspectRatio: '1/1',
                maxWidth: `${width}px`
            }}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* ইমেজ - img ট্যাগ ব্যবহার করে */}
            <img
                src={src}
                alt={alt}
                className={`
                    w-full h-full object-cover transition-transform duration-300 ease-out
                    ${isHovered ? 'scale-[2.5]' : 'scale-100'}
                `}
                style={{
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                }}
                loading="eager"
            />

            {/* জুম ইন্ডিকেটর - মিনিমালিস্ট ডিজাইন */}
            {isHovered && (
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-1 rounded-full z-10">
                    🔍 {Math.round(mousePosition.x)}%, {Math.round(mousePosition.y)}%
                </div>
            )}

            {/* হোভার ইফেক্টের জন্য ওভারলে */}
            <div className={`
                absolute inset-0 bg-black/0 transition-all duration-300
                ${isHovered ? 'bg-black/10' : ''}
            `} />
        </div>
    );
}
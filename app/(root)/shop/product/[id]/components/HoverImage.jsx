'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export default function SimpleHoverImage({
    src,
    alt = "Product image",
    zoomLevel = 2.5,
    width = 600,
    height = 600
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);
    const imageRef = useRef(null);

    // মাউস মুভমেন্ট ট্র্যাক করা
    const handleMouseMove = (e) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();

        // মাউসের পজিশন ক্যালকুলেট করা (0% থেকে 100% এর মধ্যে)
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setMousePosition({ x, y });
    };

    // মাউস লিভ করলে রিসেট
    const handleMouseLeave = () => {
        setIsHovered(false);
        setMousePosition({ x: 50, y: 50 }); // সেন্টারে রিসেট
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full overflow-hidden rounded-lg bg-gray-100 cursor-crosshair"
            style={{
                aspectRatio: '1/1',
                maxWidth: `${width}px`
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* ইমেজ */}
            <Image
                ref={imageRef}
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`
                    object-cover transition-transform duration-200 ease-out
                    ${isHovered ? 'scale-[2.5]' : 'scale-100'}
                `}
                style={{
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                }}
                priority
            />

            {/* জুম ইন্ডিকেটর - এখন কোথায় জুম হচ্ছে দেখায় */}
            {isHovered && (
                <>
                    <div
                        className="absolute w-16 h-16 border-2 border-white rounded-full pointer-events-none"
                        style={{
                            left: `${mousePosition.x}%`,
                            top: `${mousePosition.y}%`,
                            transform: 'translate(-50%, -50%)',
                            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.3)'
                        }}
                    />

                    <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded z-10">
                        🔍 {Math.round(mousePosition.x)}%, {Math.round(mousePosition.y)}%
                    </div>
                </>
            )}
        </div>
    );
}
'use client';

import { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export default function ProductImageGallery({ imageUrl = [] }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    if (!imageUrl?.length) return null;

    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Left Vertical Thumbnails (Desktop) */}
                <div className="hidden md:flex flex-col gap-3 w-24 order-2 md:order-1">
                    {imageUrl.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`
                                group relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200
                                ${selectedImage === index
                                    ? 'border-orange-500 ring-2 ring-orange-500/20'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-orange-300'
                                }
                            `}
                        >
                            <div className="aspect-square">
                                <img
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            {selectedImage === index && (
                                <div className="absolute inset-0 bg-orange-500/10"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Main Image Container */}
                <div className="flex-1 order-1 md:order-2">
                    <div className="relative bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                        {/* Main Image Area with Fixed Aspect Ratio */}
                        <div className="relative aspect-square md:aspect-4/3 lg:aspect-square">
                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                <Zoom>
                                    <img
                                        src={imageUrl[selectedImage]}
                                        alt="Product"
                                        className="max-w-full max-h-full w-auto h-auto object-contain cursor-zoom-in transition-all duration-300"
                                        onLoad={() => setIsZoomed(false)}
                                    />
                                </Zoom>
                            </div>
                        </div>

                        {/* Navigation Arrows - Only show if more than 1 image */}
                        {imageUrl.length > 1 && (
                            <>
                                <button
                                    onClick={() =>
                                        setSelectedImage((prev) =>
                                            (prev - 1 + imageUrl.length) % imageUrl.length
                                        )
                                    }
                                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:scale-110"
                                    aria-label="Previous image"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <button
                                    onClick={() =>
                                        setSelectedImage((prev) =>
                                            (prev + 1) % imageUrl.length
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:scale-110"
                                    aria-label="Next image"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}

                        {/* Image Counter Badge */}
                        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1.5 rounded-full backdrop-blur-sm font-medium">
                            {selectedImage + 1} / {imageUrl.length}
                        </div>

                        {/* Zoom Hint */}
                        <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2.5 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                            <span>Click to zoom</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Thumbnails (Horizontal Scroll) */}
            <div className="mt-4 md:hidden">
                <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                    {imageUrl.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`
                                shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200
                                ${selectedImage === index
                                    ? 'border-orange-500 shadow-lg scale-95'
                                    : 'border-gray-200 dark:border-gray-700 opacity-70 hover:opacity-100'
                                }
                            `}
                        >
                            <div className="w-20 h-20">
                                <img
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
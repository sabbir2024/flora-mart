'use client'

import { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export default function ProductImageGallery({ imageUrl = [] }) {
    const [selectedImage, setSelectedImage] = useState(0);

    if (!imageUrl?.length) return null;

    return (
        <div className="w-full max-w-7xl mx-auto p-3 md:p-5">

            <div className="flex gap-4">

                {/* 🔹 Left Vertical Thumbnails (Desktop) */}
                <div className="hidden md:flex flex-col gap-3 w-20 overflow-y-auto max-h-[500px]">
                    {imageUrl.map((img, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`
                cursor-pointer rounded-md overflow-hidden border
                ${selectedImage === index
                                    ? 'border-blue-500'
                                    : 'opacity-60 hover:opacity-100'
                                }
              `}
                        >
                            <img
                                src={img}
                                className="w-full h-20 object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* 🔹 Main Image */}
                <div className="flex-1 bg-gray-100 rounded-xl flex items-center justify-center relative">

                    <div className="w-full h-[300px] md:h-[500px] flex items-center justify-center">

                        {/* ✅ SSR Safe Zoom */}
                        <Zoom>
                            <img
                                src={imageUrl[selectedImage]}
                                alt="product"
                                className="max-h-full max-w-full object-contain cursor-zoom-in"
                            />
                        </Zoom>

                    </div>

                    {/* Navigation */}
                    <button
                        onClick={() =>
                            setSelectedImage((prev) =>
                                (prev - 1 + imageUrl.length) % imageUrl.length
                            )
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full"
                    >
                        ❮
                    </button>

                    <button
                        onClick={() =>
                            setSelectedImage((prev) =>
                                (prev + 1) % imageUrl.length
                            )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full"
                    >
                        ❯
                    </button>

                </div>
            </div>

            {/* 🔹 Mobile Thumbnails */}
            <div className="grid grid-cols-4 gap-2 mt-4 md:hidden">
                {imageUrl.map((img, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`
              cursor-pointer rounded-md overflow-hidden border
              ${selectedImage === index
                                ? 'border-blue-500'
                                : 'opacity-60'
                            }
            `}
                    >
                        <img
                            src={img}
                            className="w-full h-16 object-cover"
                        />
                    </div>
                ))}
            </div>

        </div>
    );
}
'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Card({ product }) {
    const [imgError, setImgError] = useState(false);
    const [imageSrc, setImageSrc] = useState(() => {
        const imageUrl = product.product_url || product.primaryImage || product.images?.[0];
        return imageUrl && imageUrl.trim() !== '' ? imageUrl : null;
    });

    // Calculate discount percentage
    const getDiscountPercentage = () => {
        const currentPrice = product.price?.current_price || product.basePrice || 0;
        const originalPrice = product.comparePrice || product.price?.original_price || 0;

        if (originalPrice > currentPrice && originalPrice > 0) {
            const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
            return Math.round(discount);
        }
        return 0;
    };

    // Get current price
    const getCurrentPrice = () => {
        return product.price?.current_price || product.basePrice || 0;
    };

    // Get original price (for comparison)
    const getOriginalPrice = () => {
        return product.comparePrice || product.price?.original_price || null;
    };

    // Handle image error
    const handleImageError = () => {
        setImgError(true);
        setImageSrc(null);
    };

    // রেটিং অনুযায়ী স্টার জেনারেট করার ফাংশন
    const renderRatingStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        // ফুল স্টার
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <svg key={`full-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 fill-orange-600 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }

        // হাফ স্টার
        if (hasHalfStar) {
            stars.push(
                <svg key="half" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                    <defs>
                        <linearGradient id="halfGradient">
                            <stop offset="50%" stopColor="#f97316" />
                            <stop offset="50%" stopColor="#e5e7eb" />
                        </linearGradient>
                    </defs>
                    <path fill="url(#halfGradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }

        // খালি স্টার
        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-gray-300 dark:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }

        return stars;
    };

    // রেটিং ভ্যালু নির্ধারণ (একাধিক সোর্স থেকে)
    const getRatingValue = () => {
        if (product.review_info?.average_rating) {
            return product.review_info.average_rating;
        }
        if (product.rating) {
            return product.rating;
        }
        return 0;
    };

    // রিভিউ কাউন্ট
    const getReviewCount = () => {
        if (product.review_info?.review_count) {
            return product.review_info.review_count;
        }
        if (product.review_count) {
            return product.review_count;
        }
        return 0;
    };

    const rating = getRatingValue();
    const reviewCount = getReviewCount();
    const currentPrice = getCurrentPrice();
    const originalPrice = getOriginalPrice();
    const discountPercentage = getDiscountPercentage();

    return (
        <Link href={`/shop/product/${product?._id}`} className="group cursor-pointer">
            {/* Image Container */}
            <div className="relative bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden aspect-4/5">
                {/* Discount Badge */}
                {discountPercentage > 0 && (
                    <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
                        -{discountPercentage}%
                    </div>
                )}

                {/* Preorder Badge */}
                {product.isPreorder && (
                    <div className="absolute top-2 right-2 z-10 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
                        Pre-order
                    </div>
                )}

                {imageSrc && !imgError ? (
                    <Image
                        height={200}
                        width={200}
                        src={imageSrc}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={product.productName || product.product_name || "Product image"}
                        onError={handleImageError}
                        priority={false}
                    />
                ) : (
                    // Placeholder when no image is available or image fails to load
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                        <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="mt-3 space-y-2">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-sm sm:text-base line-clamp-2 flex-1 text-gray-900 dark:text-white">
                        {product.productName || product.product_name || "Unnamed Product"}
                    </h3>
                    <div className="text-right">
                        <p className="text-orange-600 dark:text-orange-500 font-bold text-sm sm:text-base whitespace-nowrap">
                            ৳{currentPrice}
                        </p>
                        {originalPrice && originalPrice > currentPrice && (
                            <p className="text-xs text-gray-400 dark:text-gray-500 line-through">
                                ৳{originalPrice}
                            </p>
                        )}
                    </div>
                </div>

                {/* Rating Section */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                            {renderRatingStars(rating)}
                        </div>
                        {reviewCount > 0 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                ({reviewCount})
                            </span>
                        )}
                    </div>

                    {/* Stock Status */}
                    {product.quantity !== undefined && (
                        <span className={`text-xs ${product.quantity > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {product.quantity > 0 ? `In Stock (${product.quantity})` : 'Out of Stock'}
                        </span>
                    )}
                </div>

                {/* Savings info for large discount */}
                {discountPercentage >= 20 && originalPrice && (
                    <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                        Save ৳{originalPrice - currentPrice}
                    </div>
                )}
            </div>
        </Link>
    );
}
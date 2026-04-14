// components/ProductInfoTabs.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IoCall, IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5';

export default function ProductInfoTabs({ product }) {
    const [activeTab, setActiveTab] = useState('description');

    // রেটিং স্টার জেনারেট করার ফাংশন
    const renderStars = (rating) => {
        const stars = [];
        const numRating = Number(rating) || 0;
        const fullStars = Math.floor(numRating);
        const hasHalfStar = numRating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<IoStar key={`full-${i}`} className="text-orange-600 text-sm sm:text-base" />);
        }

        if (hasHalfStar) {
            stars.push(<IoStarHalf key="half" className="text-orange-600 text-sm sm:text-base" />);
        }

        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<IoStarOutline key={`empty-${i}`} className="text-gray-300 dark:text-gray-600 text-sm sm:text-base" />);
        }

        return stars;
    };

    // প্রাইস ফরম্যাট করার ফাংশন
    const formatPrice = (price) => {
        if (!price && price !== 0) return '৳0';
        return new Intl.NumberFormat('bn-BD', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price).replace('BDT', '৳');
    };

    // প্রোডাক্টের নাম পাওয়া
    const getProductName = () => {
        return product.productName || product.product_name || 'Product Name';
    };

    // প্রোডাক্টের মূল্য পাওয়া
    const getCurrentPrice = () => {
        return product.basePrice || product.price?.current_price || product.currentPrice || 0;
    };

    const getOriginalPrice = () => {
        return product.comparePrice || product.price?.original_price || product.originalPrice || null;
    };

    // ক্যাটাগরি পাওয়া
    const getCategory = () => {
        return product.category || product.categories || "Curated Collection";
    };

    // রিভিউ কাউন্ট পাওয়া
    const getReviewCount = () => {
        return product.reviewCount || product.review_count || product.review_info?.review_count || 0;
    };

    // রেটিং পাওয়া
    const getRating = () => {
        return product.rating || product.averageRating || product.review_info?.average_rating || 0;
    };

    // Process description for dark mode
    const getProcessedDescription = () => {
        const desc = product.description || '';
        if (!desc || desc === '<p><br></p>' || desc === '<p></p>') {
            return '<p class="text-gray-500 dark:text-gray-400">Product description will appear here...</p>';
        }

        // Add dark mode classes to HTML elements
        let processedDesc = desc;

        // Add dark mode classes to common HTML tags
        processedDesc = processedDesc.replace(/<p/g, '<p class="text-gray-700 dark:text-gray-300 mb-2"');
        processedDesc = processedDesc.replace(/<h1/g, '<h1 class="text-gray-900 dark:text-white font-bold text-2xl mb-3"');
        processedDesc = processedDesc.replace(/<h2/g, '<h2 class="text-gray-900 dark:text-white font-bold text-xl mb-2"');
        processedDesc = processedDesc.replace(/<h3/g, '<h3 class="text-gray-900 dark:text-white font-bold text-lg mb-2"');
        processedDesc = processedDesc.replace(/<h4/g, '<h4 class="text-gray-900 dark:text-white font-bold text-base mb-2"');
        processedDesc = processedDesc.replace(/<strong/g, '<strong class="text-gray-900 dark:text-white font-bold"');
        processedDesc = processedDesc.replace(/<b/g, '<b class="text-gray-900 dark:text-white font-bold"');
        processedDesc = processedDesc.replace(/<li/g, '<li class="text-gray-700 dark:text-gray-300"');
        processedDesc = processedDesc.replace(/<a/g, '<a class="text-orange-600 dark:text-orange-400 hover:underline"');
        processedDesc = processedDesc.replace(/<span/g, '<span class="text-gray-700 dark:text-gray-300"');
        processedDesc = processedDesc.replace(/<div/g, '<div class="text-gray-700 dark:text-gray-300"');

        return processedDesc;
    };

    return (
        <div className="card w-full bg-white/80 dark:bg-zinc-800/80 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-lg border border-white/40 dark:border-zinc-700/60 transition-all duration-300 hover:scale-[1.01] hover:shadow-3xl relative">
            <div className="card-body p-4 sm:p-6">
                {/* Floating glassmorphism accent */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-400/20 rounded-full blur-2xl z-0 pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-600/10 rounded-full blur-2xl z-0 pointer-events-none"></div>
                {/* ...existing code... */}
                {/* Category Badge */}
                <p className="text-orange-600 dark:text-orange-500 text-xs sm:text-sm font-bold tracking-wider uppercase">
                    {getCategory()}
                </p>

                {/* Product Title */}
                <h2 className="card-title text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                    {getProductName()}
                </h2>

                {/* Rating Section */}
                <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex gap-0.5">
                        {renderStars(getRating())}
                    </div>
                    <span className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                        ({getReviewCount()} Reviews)
                    </span>
                </div>

                {/* Price Section */}
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-2xl sm:text-3xl font-black text-orange-600 dark:text-orange-500">
                        {formatPrice(getCurrentPrice())}
                    </span>
                    {getOriginalPrice() && (
                        <span className="text-sm sm:text-base text-zinc-400 dark:text-zinc-500 line-through">
                            {formatPrice(getOriginalPrice())}
                        </span>
                    )}
                    {product.discount > 0 && (
                        <span className="bg-orange-600 dark:bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                            -{product.discount}%
                        </span>
                    )}
                </div>

                {/* Tabs Header */}
                <div className="flex gap-1 sm:gap-2 border-b border-zinc-200 dark:border-zinc-700 mt-4">
                    {[
                        { id: 'description', label: 'বিবরণ' },
                        { id: 'specifications', label: 'স্পেসিফিকেশন' },
                        { id: 'shipping', label: 'ডেলিভারি' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold transition-all duration-200
                                ${activeTab === tab.id
                                    ? 'text-orange-600 dark:text-orange-500 border-b-2 border-orange-600 dark:border-orange-500'
                                    : 'text-zinc-500 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-500'
                                }
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="mt-4 min-h-50">
                    {/* Description Tab */}
                    {activeTab === 'description' && (
                        <div className="space-y-4 animate-fadeIn">
                            <div className="text-sm sm:text-base leading-relaxed">
                                <div
                                    className="product-description"
                                    dangerouslySetInnerHTML={{ __html: getProcessedDescription() }}
                                />
                            </div>

                            {/* Tags */}
                            {product.tags && product.tags.length > 0 && (
                                <div className="mt-4">
                                    <div className="text-xs text-zinc-700 dark:text-zinc-300 mb-2 font-semibold">ট্যাগস:</div>
                                    <div className="flex flex-wrap gap-2">
                                        {product.tags.map((tag, i) => (
                                            <span key={i} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 dark:text-zinc-300 rounded-md text-xs text-zinc-600 dark:text-zinc-400">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Specifications Tab */}
                    {activeTab === 'specifications' && (
                        <div className="space-y-3 animate-fadeIn">
                            <div className="grid grid-cols-2 gap-4">
                                {/* SKU */}
                                <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-700">
                                    <span className="text-sm text-zinc-500 dark:text-zinc-400">SKU:</span>
                                    <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{product.sku || 'N/A'}</span>
                                </div>

                                {/* Brand */}
                                <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-700">
                                    <span className="text-sm text-zinc-500 dark:text-zinc-400">ব্র্যান্ড:</span>
                                    <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{product.brand || 'N/A'}</span>
                                </div>

                                {/* Category */}
                                <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-700">
                                    <span className="text-sm text-zinc-500 dark:text-zinc-400">ক্যাটাগরি:</span>
                                    <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{product.category || 'N/A'}</span>
                                </div>

                                {/* Quantity */}
                                <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-700">
                                    <span className="text-sm text-zinc-500 dark:text-zinc-400">স্টকে আছে:</span>
                                    <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{product.quantity || 0} পিস</span>
                                </div>

                                {/* Weight */}
                                {product.weight && (
                                    <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-700">
                                        <span className="text-sm text-zinc-500 dark:text-zinc-400">ওজন:</span>
                                        <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{product.weight} kg</span>
                                    </div>
                                )}

                                {/* Dimensions */}
                                {product.dimensions && (
                                    <div className="col-span-2 flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-700">
                                        <span className="text-sm text-zinc-500 dark:text-zinc-400">ডাইমেনশন:</span>
                                        <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                            {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} cm
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Shipping Tab */}
                    {activeTab === 'shipping' && (
                        <div className="space-y-4 animate-fadeIn">
                            <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-100 dark:border-green-800">
                                <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">🚚 ডেলিভারি তথ্য</h4>
                                <ul className="space-y-2 text-sm text-green-700 dark:text-green-400">
                                    <li>✓ ঢাকা শহরের ভিতরে ডেলিভারি চার্জ: ৬০ টাকা</li>
                                    <li>✓ ঢাকার বাইরে ডেলিভারি চার্জ: ১২০ টাকা</li>
                                    <li>✓ অর্ডার করার ২-৩ কার্যদিবসের মধ্যে ডেলিভারি</li>
                                    <li>✓ ১০০০ টাকার উপরে অর্ডার ফ্রি শিপিং</li>
                                </ul>
                            </div>
                            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-800">
                                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">🔄 রিটার্ন পলিসি</h4>
                                <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                                    <li>✓ ৭ দিনের মধ্যে পণ্য ফেরত দেওয়ার সুযোগ</li>
                                    <li>✓ পণ্য অক্ষত অবস্থায় থাকতে হবে</li>
                                    <li>✓ মূল রসিদ সহ জমা দিতে হবে</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6 relative z-10">
                    <Link
                        href={`/checkout/${product?._id}`}
                        className="flex-1"
                    >
                        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 dark:from-orange-500 dark:to-orange-600 text-white font-bold uppercase tracking-wider text-sm shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group relative overflow-hidden">
                            <span className="absolute left-0 top-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse pointer-events-none"></span>
                            <svg className="w-5 h-5 mr-2 animate-bounce group-hover:animate-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 0 0 7.48 19h9.04a2 2 0 0 0 1.83-1.3L17 13M7 13V6h13" />
                            </svg>
                            এখনই কিনুন
                        </button>
                    </Link>

                    <button className="flex-1 py-3 rounded-xl border-2 border-orange-600 dark:border-orange-500 text-orange-600 dark:text-orange-500 font-bold uppercase tracking-wider text-sm hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white transition-all duration-200 flex items-center justify-center gap-2">
                        <IoCall className="text-base" />
                        01628507832
                    </button>
                </div>

                {/* Additional Info */}
                <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
                        ✅ Free Shipping on orders over ৳1000 | 🔄 7 Days Easy Return
                    </p>
                </div>
            </div>

            {/* Animation Styles */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                
                /* Product description dark mode styles */
                .product-description p,
                .product-description span,
                .product-description div,
                .product-description li {
                    color: #374151;
                }
                
                .dark .product-description p,
                .dark .product-description span,
                .dark .product-description div,
                .dark .product-description li {
                    color: #d1d5db;
                }
                
                .dark .product-description h1,
                .dark .product-description h2,
                .dark .product-description h3,
                .dark .product-description h4,
                .dark .product-description strong,
                .dark .product-description b {
                    color: #ffffff;
                }
                
                .dark .product-description a {
                    color: #f97316;
                }
                
                .dark .product-description a:hover {
                    color: #fb923c;
                }
            `}</style>
        </div>
    );
}
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
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<IoStar key={`full-${i}`} className="text-orange-600 text-sm sm:text-base" />);
        }

        if (hasHalfStar) {
            stars.push(<IoStarHalf key="half" className="text-orange-600 text-sm sm:text-base" />);
        }

        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<IoStarOutline key={`empty-${i}`} className="text-orange-600 text-sm sm:text-base" />);
        }

        return stars;
    };

    // প্রাইস ফরম্যাট করার ফাংশন
    const formatPrice = (price) => {
        return new Intl.NumberFormat('bn-BD', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price).replace('BDT', '৳');
    };

    return (
        <div className="card w-full bg-white dark:bg-zinc-800 shadow-xl rounded-2xl overflow-hidden">
            <div className="card-body p-4 sm:p-6">
                {/* Category Badge */}
                <p className="text-orange-600 text-xs sm:text-sm font-bold tracking-wider uppercase">
                    {product.category || "Curated Collection"}
                </p>

                {/* Product Title */}
                <h2 className="card-title text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                    {product.product_name}
                </h2>

                {/* Rating Section */}
                <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex gap-0.5">
                        {renderStars(product.review_info?.average_rating || 3.5)}
                    </div>
                    <span className="text-xs sm:text-sm text-zinc-500">
                        ({product.review_info?.review_count || 0} Reviews)
                    </span>
                </div>

                {/* Price Section */}
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-2xl sm:text-3xl font-black text-orange-600">
                        ৳{product.price?.current_price || product.currentPrice || 0}
                    </span>
                    {product.price?.original_price && (
                        <span className="text-sm sm:text-base text-zinc-400 line-through">
                            ৳{product.price.original_price}
                        </span>
                    )}
                    {product.discount > 0 && (
                        <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                            -{product.discount}%
                        </span>
                    )}
                </div>

                {/* Tabs Header */}
                <div className="flex gap-1 sm:gap-2 border-b border-zinc-200 dark:border-zinc-700 mt-4">
                    {[
                        { id: 'description', label: 'বিবরণ' },
                        { id: 'features', label: 'বৈশিষ্ট্য' },
                        { id: 'usage', label: 'ব্যবহার বিধি' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold transition-all duration-200
                                ${activeTab === tab.id
                                    ? 'text-orange-600 border-b-2 border-orange-600'
                                    : 'text-zinc-500 hover:text-orange-600'
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
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                                {product.description_summary}
                            </p>
                            {product.key_features && product.key_features.length > 0 && (
                                <>
                                    <div className="divider text-xs text-zinc-400">মূল বৈশিষ্ট্য</div>
                                    <ul className="space-y-2">
                                        {product.key_features.map((feature, i) => (
                                            <li key={i} className="flex gap-2 text-sm sm:text-base">
                                                <span className="text-orange-600 font-bold">✓</span>
                                                <span className="text-zinc-700 dark:text-zinc-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    )}

                    {/* Features Tab */}
                    {activeTab === 'features' && (
                        <ul className="space-y-3 animate-fadeIn">
                            {product.detailed_features?.map((feature, i) => (
                                <li key={i} className="flex gap-2 text-sm sm:text-base">
                                    <span className="text-orange-600 text-lg">•</span>
                                    <span className="text-zinc-700 dark:text-zinc-300">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Usage Tips Tab */}
                    {activeTab === 'usage' && (
                        <ul className="space-y-3 animate-fadeIn">
                            {product.usage_tips?.map((tip, i) => (
                                <li key={i} className="flex gap-2 text-sm sm:text-base">
                                    <span className="text-orange-600 font-bold text-lg">•</span>
                                    <span className="text-zinc-700 dark:text-zinc-300">{tip}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Link
                        href={`/checkout/${product?._id}`}
                        className="flex-1"
                    >
                        <button className="w-full py-3 rounded-xl bg-linear-to-r from-orange-600 to-orange-500 text-white font-bold uppercase tracking-wider text-sm hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200">
                            এখনই কিনুন
                        </button>
                    </Link>

                    <button className="flex-1 py-3 rounded-xl border-2 border-orange-600 text-orange-600 font-bold uppercase tracking-wider text-sm hover:bg-orange-600 hover:text-white transition-all duration-200 flex items-center justify-center gap-2">
                        <IoCall className="text-base" />
                        01628507832
                    </button>
                </div>

                {/* Additional Info */}
                <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                    <p className="text-xs text-zinc-500 text-center">
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
            `}</style>
        </div>
    );
}
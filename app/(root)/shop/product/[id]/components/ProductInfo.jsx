// components/ProductInfoTabs.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProductInfoTabs({ product }) {
    const [activeTab, setActiveTab] = useState('description');
    const data = product;

    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
                {/* টাইটেল ও প্রাইস */}
                <h2 className="card-title text-2xl">{data.product_name}</h2>

                {/* ট্যাব হেডার */}
                <div className="tabs tabs-boxed mt-4">
                    <button
                        className={`tab ${activeTab === 'description' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('description')}
                    >
                        বিবরণ
                    </button>
                    <button
                        className={`tab ${activeTab === 'features' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('features')}
                    >
                        বৈশিষ্ট্য
                    </button>
                    <button
                        className={`tab ${activeTab === 'usage' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('usage')}
                    >
                        ব্যবহার বিধি
                    </button>
                </div>

                {/* ট্যাব কন্টেন্ট */}
                <div className="mt-4">
                    {activeTab === 'description' && (
                        <div className="space-y-4">
                            <p className="text-base-content/70">{data.description_summary}</p>
                            <div className="divider">মূল বৈশিষ্ট্য</div>
                            <ul className="space-y-2">
                                {data.key_features.map((f, i) => (
                                    <li key={i} className="flex gap-2">
                                        <span className="text-success">✓</span>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {activeTab === 'features' && (
                        <ul className="space-y-3">
                            {data.detailed_features.map((f, i) => (
                                <li key={i} className="text-sm">{f}</li>
                            ))}
                        </ul>
                    )}

                    {activeTab === 'usage' && (
                        <ul className="space-y-2">
                            {data.usage_tips.map((tip, i) => (
                                <li key={i} className="flex gap-2">
                                    <span className="text-primary text-lg">•</span>
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <Link href={`/checkout/${data?._id}`}> <button className="btn btn-active btn-info">এখনই কিনুন</button></Link>
            </div>

        </div>
    );
}
// components/AdminDashboard.jsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminDashboard() {
    const [searchQuery, setSearchQuery] = useState('');

    // Product data
    const products = [
        {
            id: '#PROD-8291',
            name: 'Chronos Elite VII',
            category: 'Timepieces',
            stock: 42,
            price: 1250.00,
            status: 'In Stock',
            statusColor: 'emerald',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS0Joz4nA3KpoD8q5wTLrvRV78isBRuWL3ehZVjSF-EwdADE4n7LwNRrZXT41b-dVXZXHHI_-T-5lC4fH0QUPaWHREibK-6FdOqglAeScQvAVKV5pkwCEdBwkI3LRIv8Vcmhu9S8kEUESNjhrm1rZuniVOPWIR6RguZdS6ZBhCZDMlei365wM8Cil_wo23IIvvqj24qDJAyV8Y4EMDOf9NbpxrVEvdS6ZtDuuCjC-ckOWkIkCAQmUeLz8-Kdjj8PDduRaYZ__otQ'
        },
        {
            id: '#PROD-1102',
            name: 'Aura Studio Pods',
            category: 'Audio',
            stock: 8,
            price: 299.00,
            status: 'Low Stock',
            statusColor: 'orange',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0cZayAPrS04CdtYXCWmsziOHtT5ySSSlJfwLkDKzeKUlTCL1WDe9_CwGGziJ5gr5olVyGWQbJhNNhmLHXFARCy3SCKA2bQoLKb4wX5nYdMLodr1lNDkoEujGiXHLzJ0U2ElFPTJtWCnICluLGnJdwJoo7aDd_ADvbLAX5FD6hNECU4pn_XzQwVqtxLApi4YgyxgHtmU2LTtYnB1PGEgRRLfpSSEjoFpg_m3gRQxm40WX432HM_IHMMDH-VQsbZWOGIRLRt_nZRw'
        },
        {
            id: '#PROD-4432',
            name: 'Nomad Travel Case',
            category: 'Travel',
            stock: 156,
            price: 450.00,
            status: 'In Stock',
            statusColor: 'emerald',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1SsZRGzG5f8KIwRCKIisWuJ7l-gZKXx-Kw_8QebYdSAL0XGHO9fe-CG6SmNuQf6O5NYrptZl4QnkRs3b6cpTl_WA01nknqzZnA51uABQlQ980NRqkvvXvK4_ICaA3Ln8ttOIclV7C56LBslbRrpukAae0Yhaob5fZDMUtlb5jesFdysJbxMqFjO_ZaG9BGzvLZOC2y4pCYsxBlLU9X2HMCZks3H88QvW8N3lbfLUSoQcyT8nkdTeUfgxdz4BZaQOKiR7i3Iux5A'
        }
    ];

    const getStatusColor = (statusColor) => {
        const colors = {
            emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
            orange: 'bg-orange-50 text-orange-600 border-orange-100',
        };
        return colors[statusColor] || 'bg-gray-50 text-gray-600 border-gray-100';
    };

    return (
        <main className="flex-1 p-4 md:p-6 lg:p-10 space-y-6 md:space-y-10 max-w-7xl mx-auto">
            {/* Header & Top Bar */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2 block">
                        Executive Overview
                    </span>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-on-surface">
                        Good Morning, Julian.
                    </h1>
                </div>

                {/* User Profile Card */}
                <div className="bg-surface-container-lowest p-4 rounded-2xl flex items-center gap-4 shadow-sm border border-outline-variant/10 group hover:scale-[1.02] transition-transform duration-300">
                    <div className="relative">
                        <img
                            alt="User Profile"
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh-V43BcDKnkU-xwTBMX5ter6T9vO4vXKSWRDlfbgXVPVKMrTjWmm43VvrxtRdnJwwoTFmNeuLDSaHQfuyFTxMtqDUoPhMavF6BrPNBE8eyDLr14Eiz9UhAmFu4z5ICtzPK0HmBtUNi05XJ2tsmeiK0M2MQDKxRJGpuewp2aAk7A4FjaFS-7ODxbS4KdeIEeEv4F0tN1INqhkvP3ef1ERBkEfOlykM8FvDCRqR-y9Tmm21BfaoxlKuOPV8eIAr0neEGRLgkNecpA"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-primary text-on-primary w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-white">
                            <span className="material-symbols-outlined text-[10px] sm:text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                verified
                            </span>
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold truncate">Julian Vane</h3>
                        <p className="text-xs text-on-surface-variant truncate">julian.v@minimalism.co</p>
                    </div>
                    <button className="text-[10px] font-bold uppercase tracking-widest px-2 sm:px-3 py-1.5 sm:py-2 bg-surface-container-low text-primary rounded-lg hover:bg-primary hover:text-on-primary transition-colors whitespace-nowrap">
                        Edit Profile
                    </button>
                </div>
            </header>

            {/* Analytics Bento Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {/* Stat Card 1 - Revenue */}
                <div className="bg-surface-container-low p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col justify-between group hover:bg-surface-container-lowest transition-colors duration-300">
                    <div className="flex justify-between items-start">
                        <div className="bg-primary/10 p-2 sm:p-3 rounded-xl text-primary">
                            <span className="material-symbols-outlined text-xl sm:text-2xl">payments</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+12.5%</span>
                    </div>
                    <div className="mt-6 sm:mt-8">
                        <p className="text-xs sm:text-sm text-on-surface-variant font-medium">Monthly Revenue</p>
                        <h4 className="text-2xl sm:text-3xl font-black tracking-tighter mt-1">$124,592</h4>
                    </div>
                </div>

                {/* Stat Card 2 - Orders */}
                <div className="bg-surface-container-low p-5 sm:p-6 md:p-8 rounded-2xl flex flex-col justify-between group hover:bg-surface-container-lowest transition-colors duration-300">
                    <div className="flex justify-between items-start">
                        <div className="bg-tertiary/10 p-2 sm:p-3 rounded-xl text-tertiary">
                            <span className="material-symbols-outlined text-xl sm:text-2xl">shopping_cart</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">+4.2%</span>
                    </div>
                    <div className="mt-6 sm:mt-8">
                        <p className="text-xs sm:text-sm text-on-surface-variant font-medium">Active Orders</p>
                        <h4 className="text-2xl sm:text-3xl font-black tracking-tighter mt-1">1,284</h4>
                    </div>
                </div>

                {/* Sales Performance Chart */}
                <div className="sm:col-span-2 bg-surface-container-lowest p-5 sm:p-6 md:p-8 rounded-2xl shadow-sm relative overflow-hidden group">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <h4 className="text-base sm:text-lg font-bold">Sales Performance</h4>
                            <p className="text-xs text-on-surface-variant">Real-time data synchronization</p>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-sm">download</span>
                        </button>
                    </div>

                    {/* Graph Visualization */}
                    <div className="h-24 sm:h-28 md:h-32 flex items-end gap-1 sm:gap-2 px-2">
                        {[16, 12, 28, 20, 18, 22, 24].map((height, idx) => (
                            <div
                                key={idx}
                                className={`flex-1 rounded-t-lg transition-all duration-500 group-hover:scale-y-105 ${idx === 2 ? 'bg-primary' : idx === 6 ? 'bg-tertiary/40' : 'bg-surface-container-highest'
                                    }`}
                                style={{ height: `${height * 4}px` }}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-[10px] text-on-surface-variant font-bold uppercase tracking-widest px-1">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>
            </section>

            {/* Product Table Section */}
            <section className="bg-surface-container-lowest rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight">Recent Product Updates</h3>
                        <p className="text-xs sm:text-sm text-on-surface-variant">Showing the latest inventory activity</p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="bg-surface-container-low rounded-xl px-3 sm:px-4 py-2 flex items-center gap-2 flex-1 sm:flex-initial">
                            {/* <span className="material-symbols-outlined text-on-surface-variant text-sm">search</span> */}
                            <input
                                className="bg-transparent border-none text-xs focus:ring-0 focus:outline-none placeholder:text-on-surface-variant/50 w-full sm:w-32 md:w-48"
                                placeholder="Search product..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        {/* <button className="bg-secondary-container text-on-secondary-container font-bold text-xs px-4 sm:px-5 py-2 rounded-xl hover:bg-surface-container-high transition-colors whitespace-nowrap">
                            Filter
                        </button> */}
                    </div>
                </div>

                {/* Product Table */}
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="text-[10px] uppercase tracking-[0.15em] text-on-surface-variant border-b border-surface-container">
                                <th className="pb-3 md:pb-4 font-black">Product</th>
                                <th className="pb-3 md:pb-4 font-black">Category</th>
                                <th className="pb-3 md:pb-4 font-black text-right">Stock</th>
                                <th className="pb-3 md:pb-4 font-black text-right">Price</th>
                                <th className="pb-3 md:pb-4 font-black text-center">Status</th>
                                <th className="pb-3 md:pb-4 font-black"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-container/50">
                            {products.map((product, idx) => (
                                <tr key={idx} className="group hover:bg-surface-container-low/50 transition-colors">
                                    <td className="py-3 md:py-5">
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-surface-container overflow-hidden flex-shrink-0">
                                                <img alt={product.name} className="w-full h-full object-cover" src={product.image} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs sm:text-sm font-bold truncate">{product.name}</p>
                                                <p className="text-[10px] text-on-surface-variant">ID: {product.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 md:py-5 text-xs sm:text-sm">{product.category}</td>
                                    <td className="py-3 md:py-5 text-xs sm:text-sm text-right font-medium">{product.stock}</td>
                                    <td className="py-3 md:py-5 text-xs sm:text-sm text-right font-bold">${product.price.toFixed(2)}</td>
                                    <td className="py-3 md:py-5 text-center">
                                        <span className={`text-[10px] font-bold px-2 sm:px-3 py-1 rounded-full border uppercase tracking-tighter ${getStatusColor(product.statusColor)}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="py-3 md:py-5 text-right pr-2">
                                        <button className="text-on-surface-variant hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-sm sm:text-base">edit</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 md:mt-8 flex justify-center">
                    <button className="text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2">
                        View All Products
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                </div>
            </section>

            {/* Dynamic User Section Split */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Order Tracking */}
                <div className="bg-surface-container-low p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-base sm:text-lg font-bold">Shipment Tracking</h3>
                        <span className="material-symbols-outlined text-on-surface-variant">local_shipping</span>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-surface-container-lowest p-4 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                <div>
                                    <p className="text-xs font-bold">Order #9921 - En Route</p>
                                    <p className="text-[10px] text-on-surface-variant">London, UK → New York, US</p>
                                </div>
                            </div>
                            <button className="text-[10px] font-bold text-primary uppercase tracking-wider hover:underline">
                                Track
                            </button>
                        </div>
                        <div className="bg-surface-container-lowest p-4 rounded-2xl flex items-center justify-between opacity-60">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                <div>
                                    <p className="text-xs font-bold">Order #9810 - Delivered</p>
                                    <p className="text-[10px] text-on-surface-variant">Paris, FR → Berlin, DE</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-emerald-500 text-sm">check_circle</span>
                        </div>
                    </div>
                </div>

                {/* Personalized Recommendations */}
                <div className="bg-surface-container-lowest p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-surface-container overflow-hidden relative">
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6">
                        <span className="bg-tertiary-container text-on-tertiary-container text-[10px] font-black uppercase px-2 sm:px-3 py-1 rounded-full tracking-tighter">
                            Just For You
                        </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold mb-2">Curated Collection</h3>
                    <p className="text-xs text-on-surface-variant mb-4 sm:mb-6">Based on your recent aesthetic choices.</p>
                    <div className="flex gap-3 sm:gap-4">
                        <div className="flex-1 group">
                            <div className="aspect-square bg-surface-container rounded-xl sm:rounded-2xl overflow-hidden mb-2 sm:mb-3">
                                <img
                                    alt="Linen Shirt"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh6Mz7Mwy0kxV9Ikze68SUH4viheFuVPqRePJTYFPp-Pz7xsyzNZpUmFBEB5sUJWbHQa4dMC9Q40tkHNCVpLnrMkfjYEfN8RhoYghrfVWHgZpewquHb_MWzPTUIRcSmYcLRNH8r89lDkTliYCzW6ITVepzpgtZjQ3cpJO8Sr-tdLXgjEtC5tRRHG6E3icKorlePqH9N89WXd-UzVQdW0ppjfbCtxtq8w5VXgp8OHHLxuroy_iQKxrg--H4VV69BXrNUtOF9wEDGw"
                                />
                            </div>
                            <p className="text-xs font-bold truncate">Oversized Linen Shirt</p>
                            <p className="text-[10px] text-primary font-bold">$89.00</p>
                        </div>
                        <div className="flex-1 group">
                            <div className="aspect-square bg-surface-container rounded-xl sm:rounded-2xl overflow-hidden mb-2 sm:mb-3">
                                <img
                                    alt="Accessories"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxk9UnhAsONyTxYHcowoxQAAmweTpztUWTG1GZLdEqjzjeD1QSn7mYAAsOZHRE0zeJReDlN-SOZd1b4oqDABFsGgKY_2uuwwWc6d9LPxcRZigsAGKM7_1pgD8hxf9KE1DQE8oMfUEXxpuViVW3PS15oXSYRt4Xtb-ieoWf6HL-zyBuDe9FXL-bpz22Tu5oQYJJL4wxI2djJq6K6p9ZXoHulAnfLasmtN7UGlPCvUWUoZbXw5syDGNqSzMQo1v_L7txOPnQpEUAQA"
                                />
                            </div>
                            <p className="text-xs font-bold truncate">Minimalist Silver Band</p>
                            <p className="text-[10px] text-primary font-bold">$120.00</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
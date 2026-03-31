// components/OrdersManagement.jsx
'use client';

import { useState } from 'react';

export default function OrdersManagement() {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // Orders data
    const orders = [
        {
            id: '#ORD-1023',
            customer: 'Sarah Jenkins',
            customerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJwyZTEP9SJz--edQfs0WmYO680ejiWBd86lT04Qy0L_nx9scpLqvnqRySDYTCZXE8a0Y1UEs4BWdj7x4mtfxF3Ghb8tg_9M7kcIzkidwfB1gxp1GDAinL0_8V9uriBDgBMg-YNs_0jWc_cMMv3RatLxvOgSOYbKD1JDnW5ftlzJt33WseHh_7zfSfcy8ZJ9CsmGyiZs_uEkkgAvQmn_pT7raCRv9z5MHp57aHwtBf0GS2Dv3Sxrz68Ygg4aabMy_SC9EQnY5iTg',
            date: 'Oct 24, 2023',
            status: 'delivered',
            total: 450.00,
            statusColor: 'green'
        },
        {
            id: '#ORD-1024',
            customer: 'Michael Chen',
            customerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfU8-GrwTQT7L9dkL2KVJUCgfu-sAwtzV1N3vChecmwMxDqiu-sPEGrqOl9zglAsU3DHyT0UcIBXkszIiM5KcSdP8tPSDtdsG5Gr6qM9pSLSSsCEq0WjqWnFOt9oJJFOmPVGD4du_Yw7eT1iGHiRzEJyXdSkiyLGsHFF0QMlyntLXvLNhK3Izi7wEgCGl9uwnjiLFN9VcADNPMTVXIOCZgpVDExsDt3_DRb77dqAQLwydwm_Vr9CGRIHczU92C6O7P91T1uns7aA',
            date: 'Oct 25, 2023',
            status: 'pending',
            total: 1205.50,
            statusColor: 'orange'
        },
        {
            id: '#ORD-1025',
            customer: 'Elena Rodriguez',
            customerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA73O67dZEFSkVC8wi47jwzbJ4spaUezsi0tLsJve_ky6NsYqU_gW0ZKqn_Aj999hb-zAlf1OfTTd56me51xNmiqSrtwnSDtllVhSdN7vYvAHXfhc5ZpVipQ-jv8HQjwSLFBVki7saf1gDtoOaXHdfMqcTT1eGcUY_gYLvrl_QvPOUH6BzANQGehTQd0wGdxz-utAPj2CkHPrlxYxChV3ijuKIH_cyCwh0I5KVWa5L9x6RC6WuV0Y8T1D44mPXuNX8bcx7JNL2_hQ',
            date: 'Oct 25, 2023',
            status: 'shipped',
            total: 89.99,
            statusColor: 'blue'
        },
        {
            id: '#ORD-1026',
            customer: 'James Wilson',
            customerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADLGlBMomD8kht983HagGPczGvzuR684FBfZek9mrIaL4QrKKkco3CynYVdp4YEWqaUmwGbli7Zke82gj7L7D55XTACOtxsQ2LU5jACsnAbv_hEf8Dj4jZ5K3qmWHYU5YGkHNpoyvMLTuAyWyk2OB0vI57arHvGz9zWW-v9KWIVyTsNdzIOALb8vQCP6qyuLC7Xek_p5q3O30aaJm5kT546Izniy9X2C40nJGCiN2DPeAsmvwAN8e331uyeNOnsye9DULcOr8NpA',
            date: 'Oct 26, 2023',
            status: 'cancelled',
            total: 210.00,
            statusColor: 'red'
        }
    ];

    const tabs = [
        { id: 'all', label: 'All Orders' },
        { id: 'pending', label: 'Pending' },
        { id: 'shipped', label: 'Shipped' },
        { id: 'delivered', label: 'Delivered' },
        { id: 'cancelled', label: 'Cancelled' }
    ];

    const getStatusBadge = (status, statusColor) => {
        const colors = {
            green: 'bg-green-100 text-green-700',
            orange: 'bg-orange-100 text-orange-700',
            blue: 'bg-blue-100 text-blue-700',
            red: 'bg-red-100 text-red-700'
        };

        const labels = {
            delivered: 'Delivered',
            pending: 'Pending',
            shipped: 'Shipped',
            cancelled: 'Cancelled'
        };

        return (
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${colors[statusColor]}`}>
                {labels[status]}
            </span>
        );
    };

    const filteredOrders = orders.filter(order => {
        if (activeTab !== 'all' && order.status !== activeTab) return false;
        if (searchQuery && !order.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !order.customer.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    return (
        <main className="flex-1 min-h-screen bg-surface">
            <div className="p-4 md:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header & Stats Row */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
                        <div>
                            <nav className="flex items-center gap-2 text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest mb-2">
                                <span>Commerce</span>
                                <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                                <span className="text-primary">Orders</span>
                            </nav>
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface">
                                Orders Management
                            </h2>
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                            <div className="px-4 sm:px-6 py-3 bg-surface-container-lowest rounded-2xl shadow-sm flex items-center gap-3 sm:gap-4">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <span className="material-symbols-outlined">trending_up</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                                        Today's Sales
                                    </p>
                                    <p className="text-lg sm:text-xl font-bold">$12,480.00</p>
                                </div>
                            </div>
                            <button className="px-4 sm:px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-sm">file_download</span>
                                Export CSV
                            </button>
                        </div>
                    </div>

                    {/* Filters & Table Card */}
                    <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-transparent">
                        {/* Table Header & Filter Tabs */}
                        <div className="px-4 sm:px-6 md:px-8 pt-6 md:pt-8 pb-4">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6 md:mb-8">
                                <div className="flex flex-wrap items-center gap-1 bg-surface-container-low p-1.5 rounded-2xl w-fit">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${activeTab === tab.id
                                                ? 'bg-white text-primary shadow-sm'
                                                : 'text-on-surface-variant hover:text-on-surface'
                                                }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="relative flex-1 sm:flex-initial">

                                        <input
                                            className="pl-10 pr-4 py-2.5 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary/20 text-sm w-full sm:w-64"
                                            placeholder="Search Orders..."
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-low text-on-surface-variant rounded-xl text-sm font-bold hover:bg-surface-container transition-all whitespace-nowrap">
                                        Filters
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Data Table */}
                        <div className="overflow-x-auto no-scrollbar px-4 sm:px-6 md:px-8 pb-6 md:pb-8">
                            <table className="w-full text-left border-separate border-spacing-y-3 md:border-spacing-y-4 min-w-[600px]">
                                <thead>
                                    <tr className="text-on-surface-variant/60 text-[10px] font-black uppercase tracking-[0.1em]">
                                        <th className="px-4 pb-2">Order ID</th>
                                        <th className="px-4 pb-2">Customer</th>
                                        <th className="px-4 pb-2">Date</th>
                                        <th className="px-4 pb-2">Status</th>
                                        <th className="px-4 pb-2">Total</th>
                                        <th className="px-4 pb-2 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {filteredOrders.map((order) => (
                                        <tr key={order.id} className="group hover:bg-surface-container-low/50 transition-colors">
                                            <td className="px-4 py-4 md:py-5 bg-surface-container-low/30 first:rounded-l-2xl last:rounded-r-2xl border-y border-transparent">
                                                <span className="font-bold text-on-surface">{order.id}</span>
                                            </td>
                                            <td className="px-4 py-4 md:py-5 bg-surface-container-low/30 border-y border-transparent">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        alt={order.customer}
                                                        className="w-8 h-8 rounded-full object-cover"
                                                        src={order.customerAvatar}
                                                    />
                                                    <span className="font-semibold">{order.customer}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 md:py-5 bg-surface-container-low/30 border-y border-transparent">
                                                <span className="text-on-surface-variant text-xs md:text-sm">{order.date}</span>
                                            </td>
                                            <td className="px-4 py-4 md:py-5 bg-surface-container-low/30 border-y border-transparent">
                                                {getStatusBadge(order.status, order.statusColor)}
                                            </td>
                                            <td className="px-4 py-4 md:py-5 bg-surface-container-low/30 border-y border-transparent">
                                                <span className="font-bold">${order.total.toFixed(2)}</span>
                                            </td>
                                            <td className="px-4 py-4 md:py-5 bg-surface-container-low/30 last:rounded-r-2xl border-y border-transparent text-right">
                                                <button className="text-primary font-bold text-xs md:text-sm hover:underline transition-all">
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {filteredOrders.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-on-surface-variant">No orders found</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {filteredOrders.length > 0 && (
                            <div className="px-4 sm:px-6 md:px-8 py-5 md:py-6 border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-xs font-medium text-on-surface-variant order-2 sm:order-1">
                                    Showing {filteredOrders.length} of {orders.length} orders
                                </p>
                                <div className="flex items-center gap-2 order-1 sm:order-2">

                                    <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold shadow-md text-sm md:text-base">
                                        1
                                    </button>
                                    <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-all text-sm md:text-base">
                                        2
                                    </button>
                                    <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-all text-sm md:text-base">
                                        3
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Featured Order / Details Preview Card */}
                    <div className="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 pb-8 md:pb-12">
                        <div className="lg:col-span-8 bg-gradient-to-br from-primary to-primary-container rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 lg:p-10 text-white relative overflow-hidden shadow-2xl shadow-primary/30">
                            <div className="relative z-10 max-w-lg">
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest mb-4 md:mb-6 inline-block">
                                    Order Focus
                                </span>
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3 md:mb-4 leading-tight">
                                    Fast-Track High Value Shipments
                                </h3>
                                <p className="text-white/80 font-medium mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                                    System detected 3 high-priority orders requiring immediate logistics verification to meet Next-Day Delivery SLA.
                                </p>
                                <button className="bg-white text-primary px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black hover:bg-surface transition-colors shadow-lg shadow-black/10 flex items-center gap-2 md:gap-3 text-sm md:text-base">
                                    Review Priority Queue
                                    <span className="material-symbols-outlined text-sm md:text-base">arrow_forward</span>
                                </button>
                            </div>
                            <div className="absolute -right-10 md:-right-20 -bottom-10 md:-bottom-20 opacity-20 transform rotate-12 pointer-events-none">
                                <span className="material-symbols-outlined text-[150px] md:text-[300px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    local_shipping
                                </span>
                            </div>
                        </div>

                        <div className="lg:col-span-4 flex flex-col gap-4 md:gap-6">
                            <div className="bg-surface-container-lowest rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-primary/5">
                                <h4 className="text-[10px] md:text-xs font-black text-on-surface-variant uppercase tracking-widest mb-3 md:mb-4">
                                    Total Revenue Today
                                </h4>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl md:text-3xl font-black text-on-surface">$24,942</span>
                                    <span className="text-green-500 font-bold flex items-center text-xs">
                                        <span className="material-symbols-outlined text-sm">arrow_upward</span>
                                        12.5%
                                    </span>
                                </div>
                            </div>

                            <div className="bg-surface-container-lowest rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-primary/5 flex-1">
                                <h4 className="text-[10px] md:text-xs font-black text-on-surface-variant uppercase tracking-widest mb-3 md:mb-4">
                                    Shipping Status
                                </h4>
                                <div className="space-y-3 md:space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs md:text-sm font-semibold text-on-surface-variant">In Transit</span>
                                            <span className="text-xs md:text-sm font-bold">142</span>
                                        </div>
                                        <div className="w-full h-1.5 md:h-2 bg-surface-container rounded-full overflow-hidden">
                                            <div className="h-full bg-primary rounded-full w-[65%]"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs md:text-sm font-semibold text-on-surface-variant">Warehouse</span>
                                            <span className="text-xs md:text-sm font-bold">28</span>
                                        </div>
                                        <div className="w-full h-1.5 md:h-2 bg-surface-container rounded-full overflow-hidden">
                                            <div className="h-full bg-tertiary rounded-full w-[25%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </main>
    );
}
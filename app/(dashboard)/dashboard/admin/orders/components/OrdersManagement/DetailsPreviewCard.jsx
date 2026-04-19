'use client'

export default function DetailsPreviewCard({ orders }) {
    // হাই-ভ্যালু অর্ডার (যেগুলো $500 এর বেশি)
    const highValueOrders = orders.filter(order => (order.total || 0) > 500);
    const urgentOrders = orders.filter(order => order.status === 'pending' && (order.total || 0) > 300);

    // ডেলিভারি স্ট্যাটাস
    const inTransit = orders.filter(o => o.status === 'shipped' || o.status === 'processing').length;
    const inWarehouse = orders.filter(o => o.status === 'pending').length;

    const transitPercent = orders.length > 0 ? (inTransit / orders.length) * 100 : 0;
    const warehousePercent = orders.length > 0 ? (inWarehouse / orders.length) * 100 : 0;

    return (
        <div className="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 pb-8 md:pb-12">
            {/* Priority Card */}
            <div className="lg:col-span-7 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 lg:p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/30">
                <div className="relative z-10 max-w-lg">
                    <div className="flex items-center gap-2 mb-4 md:mb-6">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest">
                            Priority Alert
                        </span>
                        {urgentOrders.length > 0 && (
                            <span className="px-3 py-1 bg-red-500/80 backdrop-blur-md rounded-full text-[10px] font-black">
                                {urgentOrders.length} Urgent
                            </span>
                        )}
                    </div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3 md:mb-4 leading-tight">
                        Fast-Track High Value Shipments
                    </h3>
                    <p className="text-white/80 font-medium mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                        System detected {highValueOrders.length} high-priority orders requiring immediate
                        logistics verification to meet Next-Day Delivery SLA.
                    </p>
                    <button className="bg-white text-indigo-600 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black hover:bg-gray-50 transition-all shadow-lg shadow-black/10 flex items-center gap-2 md:gap-3 text-sm md:text-base">
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

            {/* Stats Cards */}
            <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6">
                <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
                    <h4 className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-3 md:mb-4">
                        Total Revenue
                    </h4>
                    <div className="flex items-center justify-between">
                        <span className="text-2xl md:text-3xl font-black text-gray-900">
                            ${orders.reduce((sum, o) => sum + (o.total || 0), 0).toFixed(2)}
                        </span>
                        <span className="text-green-500 font-bold flex items-center text-xs bg-green-50 px-2 py-1 rounded-lg">
                            <span className="material-symbols-outlined text-sm">arrow_upward</span>
                            12.5%
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 flex-1">
                    <h4 className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-3 md:mb-4">
                        Shipping Status
                    </h4>
                    <div className="space-y-3 md:space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs md:text-sm font-semibold text-gray-600">In Transit</span>
                                <span className="text-xs md:text-sm font-bold text-gray-900">{inTransit}</span>
                            </div>
                            <div className="w-full h-1.5 md:h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                                    style={{ width: `${transitPercent}%` }}
                                ></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs md:text-sm font-semibold text-gray-600">Warehouse / Pending</span>
                                <span className="text-xs md:text-sm font-bold text-gray-900">{inWarehouse}</span>
                            </div>
                            <div className="w-full h-1.5 md:h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-orange-500 rounded-full transition-all duration-500"
                                    style={{ width: `${warehousePercent}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default function HeaderStatsRow({ orders }) {
    // স্ট্যাটিস্টিক্স ক্যালকুলেশন
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

    // টুডে'স অর্ডার (যেগুলো আজকের)
    const todayOrders = orders.filter(order => {
        const orderDate = new Date(order.orderDate);
        const today = new Date();
        return orderDate.toDateString() === today.toDateString();
    });
    const todayRevenue = todayOrders.reduce((sum, order) => sum + (order.total || 0), 0);

    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
            <div>
                <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    <span>Commerce</span>
                    <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                    <span className="text-indigo-600">Orders</span>
                </nav>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                    Orders Management
                </h2>
                <p className="text-gray-500 text-sm mt-2">Manage and track all your orders in one place</p>
            </div>

            <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3 sm:gap-4">
                <div className="px-4 sm:px-6 py-3 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Orders</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalOrders}</p>
                </div>

                <div className="px-4 sm:px-6 py-3 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pending</p>
                    <p className="text-xl sm:text-2xl font-bold text-orange-600">{pendingOrders}</p>
                </div>

                <div className="px-4 sm:px-6 py-3 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Delivered</p>
                    <p className="text-xl sm:text-2xl font-bold text-green-600">{deliveredOrders}</p>
                </div>

                <div className="px-4 sm:px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl shadow-lg shadow-indigo-200">
                    <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">Today's Revenue</p>
                    <p className="text-xl sm:text-2xl font-bold text-white">${todayRevenue.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}
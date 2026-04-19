'use client'

import { useState } from 'react';

export default function DataTable({ filteredOrders, getStatusBadge, onViewDetails, onStatusUpdate }) {
    const [updatingStatus, setUpdatingStatus] = useState(null);

    const handleStatusChange = async (orderId, newStatus) => {
        setUpdatingStatus(orderId);
        await onStatusUpdate(orderId, newStatus);
        setUpdatingStatus(null);
    };

    return (
        <div className="overflow-x-auto no-scrollbar px-4 sm:px-6 md:px-8 pb-6 md:pb-8">
            <table className="w-full text-left border-separate border-spacing-y-3 md:border-spacing-y-4 min-w-[800px]">
                <thead>
                    <tr className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                        <th className="px-4 pb-2">Order ID</th>
                        <th className="px-4 pb-2">Customer</th>
                        <th className="px-4 pb-2">Date</th>
                        <th className="px-4 pb-2">Product</th>
                        <th className="px-4 pb-2">Quantity</th>
                        <th className="px-4 pb-2">Status</th>
                        <th className="px-4 pb-2">Total</th>
                        <th className="px-4 pb-2 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {filteredOrders.map((order) => (
                        <tr key={order.id} className="group hover:bg-indigo-50/30 transition-all duration-200">
                            <td className="px-4 py-4 md:py-5 bg-white first:rounded-l-2xl last:rounded-r-2xl border-y border-gray-100">
                                <span className="font-bold text-gray-900 text-xs">#{order.id?.slice(-6)}</span>
                            </td>
                            <td className="px-4 py-4 md:py-5 bg-white border-y border-gray-100">
                                <div>
                                    <p className="font-semibold text-gray-900">{order.customer}</p>
                                    <p className="text-xs text-gray-400">{order.customerEmail}</p>
                                </div>
                            </td>
                            <td className="px-4 py-4 md:py-5 bg-white border-y border-gray-100">
                                <span className="text-gray-600 text-xs md:text-sm">{order.date}</span>
                            </td>
                            <td className="px-4 py-4 md:py-5 bg-white border-y border-gray-100">
                                <span className="text-gray-700 text-sm font-medium max-w-[200px] truncate block">
                                    {order.productName}
                                </span>
                            </td>
                            <td className="px-4 py-4 md:py-5 bg-white border-y border-gray-100">
                                <span className="text-gray-700">{order.quantity}</span>
                            </td>
                            <td className="px-4 py-4 md:py-5 bg-white border-y border-gray-100">
                                <div className="flex items-center gap-2">
                                    {getStatusBadge(order.status)}
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        disabled={updatingStatus === order.id}
                                        className="text-xs bg-transparent border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-400"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </td>
                            <td className="px-4 py-4 md:py-5 bg-white border-y border-gray-100">
                                <span className="font-bold text-gray-900">${order.total?.toFixed(2)}</span>
                            </td>
                            <td className="px-4 py-4 md:py-5 bg-white last:rounded-r-2xl border-y border-gray-100 text-right">
                                <button
                                    onClick={() => onViewDetails(order)}
                                    className="text-indigo-600 font-bold text-xs md:text-sm hover:text-indigo-800 transition-all flex items-center gap-1 ml-auto"
                                >
                                    View Details
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
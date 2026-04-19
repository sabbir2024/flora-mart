'use client'

import { useEffect } from 'react';

export default function OrderDetailsModal({ isOpen, onClose, order, onStatusUpdate }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !order) return null;

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-orange-100 text-orange-700 border-orange-200',
            processing: 'bg-blue-100 text-blue-700 border-blue-200',
            shipped: 'bg-purple-100 text-purple-700 border-purple-200',
            delivered: 'bg-green-100 text-green-700 border-green-200',
            cancelled: 'bg-red-100 text-red-700 border-red-200'
        };
        return colors[status] || colors.pending;
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Order Details</h3>
                            <p className="text-sm text-gray-500 mt-1">ID: #{order.id?.slice(-8)}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-xl transition-all"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Status & Quick Actions */}
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className={`px-4 py-2 rounded-xl border ${getStatusColor(order.status)}`}>
                                <span className="font-bold uppercase text-xs tracking-wider">
                                    {order.status}
                                </span>
                            </div>
                            <select
                                value={order.status}
                                onChange={(e) => {
                                    onStatusUpdate(order.id, e.target.value);
                                    onClose();
                                }}
                                className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-400"
                            >
                                <option value="pending">Mark as Pending</option>
                                <option value="processing">Mark as Processing</option>
                                <option value="shipped">Mark as Shipped</option>
                                <option value="delivered">Mark as Delivered</option>
                                <option value="cancelled">Mark as Cancelled</option>
                            </select>
                        </div>

                        {/* Customer Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-indigo-600">person</span>
                                    Customer Information
                                </h4>
                                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                                    <p><span className="text-gray-500 text-sm">Name:</span> <span className="font-medium">{order.customer}</span></p>
                                    <p><span className="text-gray-500 text-sm">Email:</span> <span className="font-medium">{order.customerEmail}</span></p>
                                    <p><span className="text-gray-500 text-sm">Phone:</span> <span className="font-medium">{order.customerPhone}</span></p>
                                </div>
                            </div>

                            {/* Delivery Info */}
                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-indigo-600">local_shipping</span>
                                    Delivery Information
                                </h4>
                                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                                    <p><span className="text-gray-500 text-sm">Division:</span> <span className="font-medium">{order.division}</span></p>
                                    <p><span className="text-gray-500 text-sm">District:</span> <span className="font-medium">{order.district}</span></p>
                                    <p><span className="text-gray-500 text-sm">Address:</span> <span className="font-medium">{order.deliveryAddress}</span></p>
                                </div>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                <span className="material-symbols-outlined text-indigo-600">shopping_bag</span>
                                Product Details
                            </h4>
                            <div className="bg-gradient-to-r from-indigo-50 to-white rounded-xl p-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <p className="text-gray-500 text-xs">Product Name</p>
                                        <p className="font-semibold text-gray-900">{order.productName}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs">Quantity</p>
                                        <p className="font-semibold text-gray-900">{order.quantity}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs">Base Price</p>
                                        <p className="font-semibold text-gray-900">${order.basePrice}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs">Delivery Charge</p>
                                        <p className="font-semibold text-gray-900">${order.deliveryCharge}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Summary */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                <span className="material-symbols-outlined text-indigo-600">payments</span>
                                Payment Summary
                            </h4>
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">${(order.total - (order.deliveryCharge || 0)).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">Delivery Charge</span>
                                    <span className="font-medium">${order.deliveryCharge?.toFixed(2) || '0.00'}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-t border-gray-200 mt-2 pt-3">
                                    <span className="font-bold text-gray-900">Total Amount</span>
                                    <span className="font-bold text-indigo-600 text-lg">${order.total?.toFixed(2)}</span>
                                </div>
                                <div className="mt-3 pt-2">
                                    <span className="text-xs text-gray-500">Payment Method: </span>
                                    <span className="text-xs font-semibold uppercase bg-gray-200 px-2 py-1 rounded">
                                        {order.paymentMethod}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
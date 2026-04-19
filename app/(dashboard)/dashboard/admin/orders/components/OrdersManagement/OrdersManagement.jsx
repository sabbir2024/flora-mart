'use client'

import { useState, useEffect } from 'react';
import DataTable from './DataTable';
import FilterTabs from './FilterTabs';
import HeaderStatsRow from './HeaderStatsRow';
import DetailsPreviewCard from './DetailsPreviewCard';
import OrderDetailsModal from './OrderDetailsModal';
import Swal from 'sweetalert2';
import { apiUrl } from '../../../../../../components/url';
import { useSession } from 'next-auth/react';

export default function OrdersManagement() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);


    // API থেকে ডাটা fetch
    useEffect(() => {
        const fetchOrders = async () => {
            if (!session) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(`${apiUrl}/orders`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${session?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                console.log('response:', response, session);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setOrders(result.data || []);
            } catch (error) {
                console.error('Error fetching orders:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to load orders. Please try again.',
                    confirmButtonColor: '#6366f1'
                });
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [session]);

    const tabs = [
        { id: 'all', label: 'All Orders' },
        { id: 'pending', label: 'Pending' },
        { id: 'processing', label: 'Processing' },
        { id: 'shipped', label: 'Shipped' },
        { id: 'delivered', label: 'Delivered' },
        { id: 'cancelled', label: 'Cancelled' }
    ];

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { color: 'bg-orange-100 text-orange-700', label: 'Pending' },
            processing: { color: 'bg-blue-100 text-blue-700', label: 'Processing' },
            shipped: { color: 'bg-purple-100 text-purple-700', label: 'Shipped' },
            delivered: { color: 'bg-green-100 text-green-700', label: 'Delivered' },
            cancelled: { color: 'bg-red-100 text-red-700', label: 'Cancelled' },
            completed: { color: 'bg-green-100 text-green-700', label: 'Completed' }
        };

        const config = statusConfig[status] || statusConfig.pending;

        return (
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${config.color}`}>
                {config.label}
            </span>
        );
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const filteredOrders = orders.filter(order => {
        if (activeTab !== 'all' && order.status !== activeTab) return false;
        if (searchQuery &&
            !order.id?.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !order.customer?.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !order.customerEmail?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    // স্ট্যাটাস আপডেট ফাংশন
    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const response = await fetch(`${apiUrl}/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${session?.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ order_status: newStatus })
            });

            if (response.ok) {
                // লোকাল স্টেট আপডেট
                setOrders(orders.map(order =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                ));

                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: `Order status changed to ${newStatus}`,
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            console.error('Error updating status:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update order status',
                confirmButtonColor: '#6366f1'
            });
        }
    };

    if (loading) {
        return (
            <main className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="flex justify-center items-center h-screen">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="material-symbols-outlined text-indigo-600 text-2xl animate-pulse">
                                local_shipping
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <>
            <main className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="p-4 md:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <HeaderStatsRow orders={orders} />

                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                            <FilterTabs
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                            />

                            <DataTable
                                filteredOrders={filteredOrders}
                                getStatusBadge={getStatusBadge}
                                onViewDetails={handleViewDetails}
                                onStatusUpdate={handleStatusUpdate}
                            />

                            {filteredOrders.length === 0 && (
                                <div className="text-center py-16">
                                    <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">
                                        inbox
                                    </span>
                                    <p className="text-gray-500 text-lg">No orders found</p>
                                    <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
                                </div>
                            )}

                            {filteredOrders.length > 0 && (
                                <div className="px-4 sm:px-6 md:px-8 py-5 md:py-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <p className="text-xs font-medium text-gray-500 order-2 sm:order-1">
                                        Showing {filteredOrders.length} of {orders.length} orders
                                    </p>
                                    <div className="flex items-center gap-2 order-1 sm:order-2">
                                        <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-indigo-600 text-white font-bold shadow-md text-sm md:text-base hover:bg-indigo-700 transition-all">
                                            1
                                        </button>
                                        <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all text-sm md:text-base">
                                            2
                                        </button>
                                        <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all text-sm md:text-base">
                                            3
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <DetailsPreviewCard orders={orders} />
                    </div>
                </div>
            </main>

            <OrderDetailsModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                order={selectedOrder}
                onStatusUpdate={handleStatusUpdate}
            />
        </>
    );
}
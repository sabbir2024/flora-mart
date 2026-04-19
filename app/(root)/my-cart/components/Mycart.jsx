// app/my-card/components/Mycard.jsx
'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { apiUrl } from '../../../components/url';
import {
    IoCheckmarkCircle,
    IoTimeOutline,
    IoRocketOutline,
    IoSendOutline,
    IoCloseCircleOutline,
    IoLocationOutline,
    IoCallOutline,
    IoMailOutline,
    IoCalendarOutline,
    IoCashOutline,
    IoCartOutline,
    IoEyeOutline,
    IoTrashOutline,
    IoArrowUpOutline,
    IoArrowDownOutline,
    IoGridOutline,
    IoListOutline
} from 'react-icons/io5';

export default function Mycard({ bookings }) {
    const router = useRouter();
    const [selectedBookings, setSelectedBookings] = useState([]);
    const [sortBy, setSortBy] = useState('newest');
    const [viewMode, setViewMode] = useState('card'); // Default to card for mobile

    const toggleSelectAll = () => {
        if (selectedBookings.length === bookings.length) {
            setSelectedBookings([]);
        } else {
            setSelectedBookings(bookings.map(b => b._id));
        }
    };

    const toggleSelect = (id) => {
        if (selectedBookings.includes(id)) {
            setSelectedBookings(selectedBookings.filter(bId => bId !== id));
        } else {
            setSelectedBookings([...selectedBookings, id]);
        }
    };

    // Check if order can be cancelled (only pending and processing orders)
    const canCancelOrder = (status) => {
        return status === 'pending' || status === 'processing';
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { icon: <IoTimeOutline />, color: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800', text: 'পেন্ডিং' },
            processing: { icon: <IoRocketOutline />, color: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800', text: 'প্রসেসিং' },
            shipped: { icon: <IoSendOutline />, color: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800', text: 'পাঠানো হয়েছে' },
            delivered: { icon: <IoCheckmarkCircle />, color: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800', text: 'ডেলিভারি সম্পন্ন' },
            cancelled: { icon: <IoCloseCircleOutline />, color: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800', text: 'বাতিল' }
        };
        const config = statusConfig[status] || { icon: null, color: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700', text: status };

        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
                {config.icon}
                <span>{config.text}</span>
            </span>
        );
    };

    const getDeliveryZone = (charge) => {
        const zones = {
            60: { name: 'ঢাকা শহর', icon: '🏙️', color: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30' },
            80: { name: 'ঢাকা মেট্রো', icon: '🚇', color: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/30' },
            100: { name: 'সিটি কর্পোরেশন', icon: '🏛️', color: 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950/30' },
            120: { name: 'নিকটবর্তী জেলা', icon: '🚌', color: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/30' },
            150: { name: 'সাধারণ জেলা', icon: '🚚', color: 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950/30' }
        };
        const zone = zones[charge] || { name: 'অন্যান্য', icon: '📍', color: 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-800' };
        return (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${zone.color}`}>
                <span>{zone.icon}</span>
                <span>{zone.name}</span>
            </span>
        );
    };

    const sortedBookings = [...bookings].sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.order_date) - new Date(a.order_date);
        if (sortBy === 'oldest') return new Date(a.order_date) - new Date(b.order_date);
        if (sortBy === 'highest') return b.total_price - a.total_price;
        if (sortBy === 'lowest') return a.total_price - b.total_price;
        return 0;
    });

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('bn-BD', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('bn-BD', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatAddress = (booking) => {
        return `${booking.delivery_address}, ${booking.area ? booking.area + ', ' : ''}${booking.district}, ${booking.division}`;
    };

    const showOrderDetails = (booking) => {
        Swal.fire({
            title: 'অর্ডারের বিস্তারিত',
            html: `
                <div class="text-left text-sm max-h-96 overflow-y-auto">
                    <div class="bg-orange-50 dark:bg-orange-950/30 p-3 rounded-lg mb-3">
                        <div class="grid grid-cols-2 gap-2">
                            <span class="font-semibold text-orange-600 dark:text-orange-400">অর্ডার আইডি:</span>
                            <span class="font-mono text-xs dark:text-gray-300">${booking._id.slice(-8)}</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-2">
                        <span class="font-semibold flex items-center gap-1"><span>👤</span> নাম:</span>
                        <span class="dark:text-gray-300">${booking.customer_name}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-2">
                        <span class="font-semibold flex items-center gap-1"><span>📞</span> ফোন:</span>
                        <span class="dark:text-gray-300">${booking.customer_phone}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-2">
                        <span class="font-semibold flex items-center gap-1"><span>📧</span> ইমেইল:</span>
                        <span class="text-xs dark:text-gray-300">${booking.customer_email}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-2">
                        <span class="font-semibold flex items-center gap-1"><span>📍</span> ঠিকানা:</span>
                        <span class="text-xs dark:text-gray-300">${formatAddress(booking)}</span>
                    </div>
                    <div class="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg my-2">
                        <div class="font-semibold text-orange-600 dark:text-orange-400 mb-1">📦 পণ্যের বিবরণ</div>
                        <div class="text-xs dark:text-gray-300">${booking.productName}</div>
                        <div class="flex justify-between mt-1 dark:text-gray-300">
                            <span>পরিমাণ: ${booking.quantity}</span>
                            <span>প্রতি পিস: ৳${booking.basePrice}</span>
                        </div>
                    </div>
                    <div class="bg-orange-50 dark:bg-orange-950/30 p-2 rounded-lg my-2">
                        <div class="flex justify-between text-sm dark:text-gray-300">
                            <span>সাবটোটাল:</span>
                            <span>৳${booking.quantity * booking.basePrice}</span>
                        </div>
                        <div class="flex justify-between text-sm dark:text-gray-300">
                            <span>ডেলিভারি চার্জ:</span>
                            <span>৳${booking.delivery_charge}</span>
                        </div>
                        <div class="border-t border-orange-200 dark:border-orange-800 my-2"></div>
                        <div class="flex justify-between font-bold text-orange-600 dark:text-orange-400">
                            <span>মোট মূল্য:</span>
                            <span>৳${booking.total_price}</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-2">
                        <span class="font-semibold dark:text-gray-300">পেমেন্ট:</span>
                        <span class="dark:text-gray-300">${booking.payment_method === 'cod' ? '💵 ক্যাশ অন ডেলিভারি' : booking.payment_method}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <span class="font-semibold dark:text-gray-300">অর্ডারের তারিখ:</span>
                        <span class="text-xs dark:text-gray-300">${formatDate(booking.order_date)}</span>
                    </div>
                </div>
            `,
            confirmButtonText: 'ঠিক আছে',
            confirmButtonColor: '#ea580c',
            width: '90%',
            background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
            color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#374151',
            customClass: {
                popup: 'rounded-2xl',
                confirmButton: 'bg-orange-600 hover:bg-orange-700 rounded-full px-6'
            }
        });
    };

    const confirmDelete = async (id) => {
        Swal.fire({
            title: 'অর্ডার বাতিল করুন?',
            text: "আপনি কি এই অর্ডারটি বাতিল করতে চান?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ea580c',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'হ্যাঁ, বাতিল করুন',
            cancelButtonText: 'না, ফিরে যান',
            background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
            color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#374151',
            customClass: {
                popup: 'rounded-2xl',
                confirmButton: 'bg-orange-600 hover:bg-orange-700 rounded-full px-6',
                cancelButton: 'rounded-full px-6'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${apiUrl}/my-cart/${id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ order_status: "cancelled" })
                    });

                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                    const data = await response.json();

                    if (data.success) {
                        Swal.fire({
                            title: 'বাতিল করা হয়েছে!',
                            text: 'আপনার অর্ডারটি বাতিল করা হয়েছে।',
                            icon: 'success',
                            confirmButtonColor: '#ea580c',
                            background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
                            color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#374151',
                            customClass: { popup: 'rounded-2xl', confirmButton: 'bg-orange-600 rounded-full px-6' }
                        });
                        router.refresh();
                    }
                } catch (error) {
                    console.error('Delete error:', error);
                    Swal.fire({
                        icon: "error",
                        title: "সমস্যা হয়েছে!",
                        text: error?.message || "নেটওয়ার্ক সমস্যা। দয়া করে আবার চেষ্টা করুন।",
                        confirmButtonColor: "#ea580c",
                        background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff',
                        color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#374151'
                    });
                }
            }
        });
    };

    if (!bookings || bookings.length === 0) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center p-4">
                <div className="text-center bg-linear-to-br from-white to-orange-50/30 dark:from-zinc-800 dark:to-orange-950/20 p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-orange-100 dark:border-orange-900/50">
                    <div className="w-20 h-20 mx-auto bg-linear-to-r from-orange-600 to-orange-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                        <IoCartOutline className="text-4xl text-white" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2">কোন অর্ডার পাওয়া যায়নি</h2>
                    <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-6">আপনার এখনও কোন অর্ডার নেই</p>
                    <button
                        className="px-6 py-3 bg-linear-to-r from-orange-600 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
                        onClick={() => router.push('/')}
                    >
                        শপিং শুরু করুন
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4 p-2 md:p-0">
            {/* Header & Controls */}
            <div className="bg-linear-to-r from-orange-600 to-orange-500 rounded-2xl p-4 md:p-6 text-white shadow-xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                            <IoCartOutline className="text-2xl" />
                            আমার অর্ডারসমূহ
                        </h2>
                        <p className="text-sm text-orange-100 mt-1">মোট {bookings.length} টি অর্ডার</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <select
                            className="select select-sm bg-white/20 border-white/30 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="newest" className="text-gray-800">সর্বশেষ</option>
                            <option value="oldest" className="text-gray-800">পুরাতন</option>
                            <option value="highest" className="text-gray-800">সর্বোচ্চ মূল্য</option>
                            <option value="lowest" className="text-gray-800">সর্বনিম্ন মূল্য</option>
                        </select>

                        {/* View Mode Toggle - Only show on desktop */}
                        <div className="hidden md:flex join bg-white/20 rounded-xl">
                            <button
                                type="button"
                                className={`join-item btn btn-sm ${viewMode === 'card' ? 'bg-white text-orange-600' : 'bg-transparent text-white'}`}
                                onClick={() => setViewMode('card')}
                            >
                                <IoGridOutline />
                            </button>
                            <button
                                type="button"
                                className={`join-item btn btn-sm ${viewMode === 'table' ? 'bg-white text-orange-600' : 'bg-transparent text-white'}`}
                                onClick={() => setViewMode('table')}
                            >
                                <IoListOutline />
                            </button>
                        </div>

                        {selectedBookings.length > 0 && (
                            <button className="btn btn-sm bg-red-500 border-0 text-white hover:bg-red-600 rounded-xl">
                                <IoTrashOutline />
                                {selectedBookings.length}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile View - Always visible on mobile, shows card layout */}
            <div className="md:hidden">
                <div className="space-y-4">
                    {sortedBookings.map((booking, index) => (
                        <div key={booking._id} className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg border border-orange-100 dark:border-orange-900/50 overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="p-4">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-sm rounded border-orange-300 checked:bg-orange-600"
                                            checked={selectedBookings.includes(booking._id)}
                                            onChange={() => toggleSelect(booking._id)}
                                        />
                                        <span className="font-bold text-orange-600 dark:text-orange-500 bg-orange-50 dark:bg-orange-950/50 px-2 py-1 rounded-lg text-sm">
                                            #{index + 1}
                                        </span>
                                    </div>
                                    {getStatusBadge(booking.order_status)}
                                </div>

                                {/* Customer Info */}
                                <div className="mb-3">
                                    <h3 className="font-semibold text-gray-800 dark:text-white">{booking.customer_name}</h3>
                                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        <span className="flex items-center gap-1"><IoCallOutline /> {booking.customer_phone}</span>
                                        <span className="flex items-center gap-1"><IoMailOutline /> {booking.customer_email}</span>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="bg-orange-50 dark:bg-orange-950/30 rounded-xl p-3 mb-3">
                                    <p className="font-medium text-gray-800 dark:text-white text-sm">{booking.productName}</p>
                                    <div className="flex justify-between items-center mt-2 text-sm">
                                        <span className="dark:text-gray-300">পরিমাণ: <span className="font-bold text-orange-600 dark:text-orange-500">{booking.quantity}</span></span>
                                        <span className="dark:text-gray-300">প্রতি পিস: ৳{booking?.basePrice}</span>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="flex justify-between items-center mb-3">
                                    <div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">ডেলিভারি: ৳{booking.delivery_charge}</span>
                                        <div className="mt-1">{getDeliveryZone(booking.delivery_charge)}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">মোট মূল্য</div>
                                        <div className="text-xl font-bold text-orange-600 dark:text-orange-500">৳{booking.total_price}</div>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-start gap-1">
                                    <IoLocationOutline className="mt-0.5 shrink-0" />
                                    <span>{formatAddress(booking)}</span>
                                </div>

                                {/* Date & Actions */}
                                <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                                        <IoCalendarOutline />
                                        {formatDate(booking.order_date)}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            className="px-3 py-1.5 text-xs font-medium text-orange-600 dark:text-orange-500 bg-orange-50 dark:bg-orange-950/30 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-950/50 transition-colors flex items-center gap-1"
                                            onClick={() => showOrderDetails(booking)}
                                        >
                                            <IoEyeOutline /> বিস্তারিত
                                        </button>
                                        {/* Cancel button - only show for pending and processing orders */}
                                        {canCancelOrder(booking.order_status) && (
                                            <button
                                                className="px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-500 bg-red-50 dark:bg-red-950/30 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors flex items-center gap-1"
                                                onClick={() => confirmDelete(booking._id)}
                                            >
                                                <IoTrashOutline /> বাতিল
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop View - Shows either card or table based on viewMode */}
            <div className="hidden md:block">
                {/* Card View for Desktop */}
                <div className={`${viewMode === 'card' ? 'block' : 'hidden'}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {sortedBookings.map((booking, index) => (
                            <div key={booking._id} className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg border border-orange-100 dark:border-orange-900/50 overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="p-4">
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-sm rounded border-orange-300 checked:bg-orange-600"
                                                checked={selectedBookings.includes(booking._id)}
                                                onChange={() => toggleSelect(booking._id)}
                                            />
                                            <span className="font-bold text-orange-600 dark:text-orange-500 bg-orange-50 dark:bg-orange-950/50 px-2 py-1 rounded-lg text-sm">
                                                #{index + 1}
                                            </span>
                                        </div>
                                        {getStatusBadge(booking.order_status)}
                                    </div>

                                    {/* Customer Info */}
                                    <div className="mb-3">
                                        <h3 className="font-semibold text-gray-800 dark:text-white">{booking.customer_name}</h3>
                                        <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            <span className="flex items-center gap-1"><IoCallOutline /> {booking.customer_phone}</span>
                                            <span className="flex items-center gap-1"><IoMailOutline /> {booking.customer_email}</span>
                                        </div>পণ্যের তথ্য
                                    </div>

                                    {/* Product Info */}
                                    <div className="bg-orange-50 dark:bg-orange-950/30 rounded-xl p-3 mb-3">
                                        <p className="font-medium text-gray-800 dark:text-white text-sm">{booking.productName}</p>
                                        <div className="flex justify-between items-center mt-2 text-sm">
                                            <span className="dark:text-gray-300">পরিমাণ: <span className="font-bold text-orange-600 dark:text-orange-500">{booking.quantity}</span></span>
                                            <span className="dark:text-gray-300">প্রতি পিস: ৳{booking.basePrice}</span>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="flex justify-between items-center mb-3">
                                        <div>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">ডেলিভারি: ৳{booking.delivery_charge}</span>
                                            <div className="mt-1">{getDeliveryZone(booking.delivery_charge)}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-500 dark:text-gray-400">মোট মূল্য</div>
                                            <div className="text-xl font-bold text-orange-600 dark:text-orange-500">৳{booking.total_price}</div>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-start gap-1">
                                        <IoLocationOutline className="mt-0.5 shrink-0" />
                                        <span>{formatAddress(booking)}</span>
                                    </div>

                                    {/* Date & Actions */}
                                    <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                                            <IoCalendarOutline />
                                            {formatDate(booking.order_date)}
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                className="px-3 py-1.5 text-xs font-medium text-orange-600 dark:text-orange-500 bg-orange-50 dark:bg-orange-950/30 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-950/50 transition-colors flex items-center gap-1"
                                                onClick={() => showOrderDetails(booking)}
                                            >
                                                <IoEyeOutline /> বিস্তারিত
                                            </button>
                                            {canCancelOrder(booking.order_status) && (
                                                <button
                                                    className="px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-500 bg-red-50 dark:bg-red-950/30 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors flex items-center gap-1"
                                                    onClick={() => confirmDelete(booking._id)}
                                                >
                                                    <IoTrashOutline /> বাতিল
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Table View for Desktop */}
                <div className={`${viewMode === 'table' ? 'block' : 'hidden'} overflow-x-auto bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-orange-100 dark:border-orange-900/50`}>
                    <table className="table table-zebra w-full">
                        <thead className="bg-linear-to-r from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20">
                            <tr className="text-gray-700 dark:text-gray-300">
                                <th className="w-8">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-sm rounded border-orange-300 checked:bg-orange-600"
                                        checked={selectedBookings.length === bookings.length}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="text-sm">ক্রমিক</th>
                                <th className="text-sm">অর্ডার বিবরণ</th>
                                <th className="text-sm">পণ্যের তথ্য</th>
                                <th className="text-sm">পরিমাণ</th>
                                <th className="text-sm">মূল্য</th>
                                <th className="text-sm hidden lg:table-cell">ডেলিভারি</th>
                                <th className="text-sm">স্ট্যাটাস</th>
                                <th className="text-sm hidden lg:table-cell">তারিখ</th>
                                <th className="text-sm">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedBookings.map((booking, index) => (
                                <tr key={booking._id} className="hover:bg-orange-50/50 dark:hover:bg-orange-950/20 transition-colors">
                                    <td>
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-sm rounded border-orange-300 checked:bg-orange-600"
                                            checked={selectedBookings.includes(booking._id)}
                                            onChange={() => toggleSelect(booking._id)}
                                        />
                                    </td>
                                    <td className="font-bold text-orange-600 dark:text-orange-500">#{index + 1}</td>
                                    <td>
                                        <div className="font-semibold text-gray-800 dark:text-white">{booking.customer_name}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><IoCallOutline /> {booking.customer_phone}</div>
                                        <div className="text-xs text-gray-400 dark:text-gray-500 hidden md:block">{booking.customer_email}</div>
                                    </td>
                                    <td>
                                        <div className="font-medium text-gray-800 dark:text-white">{booking.productName}</div>
                                        <div className="text-xs text-orange-600 dark:text-orange-500">{booking.product_price}</div>
                                    </td>
                                    <td>
                                        <span className="inline-flex items-center justify-center w-8 h-8 bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-500 rounded-full font-bold text-sm">
                                            {booking.quantity}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="font-bold text-orange-600 dark:text-orange-500">৳{booking.total_price}</div>
                                        <div className="text-xs text-gray-400 dark:text-gray-500 hidden md:block">ডেলিভারি: ৳{booking.delivery_charge}</div>
                                    </td>
                                    <td className="hidden lg:table-cell">
                                        <div className="text-sm dark:text-gray-300">{booking.district}</div>
                                        <div className="text-xs text-gray-400 dark:text-gray-500">{booking.delivery_address.substring(0, 30)}...</div>
                                        <div className="mt-1">{getDeliveryZone(booking.delivery_charge)}</div>
                                    </td>
                                    <td>{getStatusBadge(booking.order_status)}</td>
                                    <td className="hidden lg:table-cell">
                                        <div className="text-xs flex items-center gap-1 dark:text-gray-400">
                                            <IoCalendarOutline />
                                            {formatDate(booking.order_date)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex gap-1">
                                            <button
                                                className="p-2 text-orange-600 dark:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/30 rounded-lg transition-colors"
                                                title="বিস্তারিত"
                                                onClick={() => showOrderDetails(booking)}
                                            >
                                                <IoEyeOutline />
                                            </button>
                                            {canCancelOrder(booking.order_status) && (
                                                <button
                                                    className="p-2 text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                                                    title="বাতিল"
                                                    onClick={() => confirmDelete(booking._id)}
                                                >
                                                    <IoTrashOutline />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Summary */}
            <div className="bg-linear-to-r from-orange-50 to-orange-100/30 dark:from-orange-950/30 dark:to-orange-900/20 rounded-2xl p-4 border border-orange-100 dark:border-orange-900/50">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">সর্বমোট অর্ডার মূল্য</p>
                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-500">
                            ৳{bookings.reduce((sum, b) => sum + b.total_price, 0)}
                        </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1"><IoCheckmarkCircle className="text-green-500" /> সম্পন্ন: {bookings.filter(b => b.order_status === 'delivered').length}</span>
                        <span className="flex items-center gap-1"><IoTimeOutline className="text-amber-500" /> পেন্ডিং: {bookings.filter(b => b.order_status === 'pending').length}</span>
                        <span className="flex items-center gap-1"><IoRocketOutline className="text-orange-500" /> প্রসেসিং: {bookings.filter(b => b.order_status === 'processing').length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
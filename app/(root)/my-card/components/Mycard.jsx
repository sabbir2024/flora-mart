// app/my-card/components/Mycard.jsx
'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function Mycard({ bookings }) {
    const router = useRouter();
    const [selectedBookings, setSelectedBookings] = useState([]);
    const [sortBy, setSortBy] = useState('newest');
    const [viewMode, setViewMode] = useState('table'); // 'table' বা 'card'

    // সব সিলেক্ট/ডিসিলেক্ট
    const toggleSelectAll = () => {
        if (selectedBookings.length === bookings.length) {
            setSelectedBookings([]);
        } else {
            setSelectedBookings(bookings.map(b => b._id));
        }
    };

    // সিঙ্গেল সিলেক্ট/ডিসিলেক্ট
    const toggleSelect = (id) => {
        if (selectedBookings.includes(id)) {
            setSelectedBookings(selectedBookings.filter(bId => bId !== id));
        } else {
            setSelectedBookings([...selectedBookings, id]);
        }
    };

    // স্ট্যাটাস অনুযায়ী ব্যাজ কালার
    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return <span className="badge badge-warning badge-sm md:badge-md gap-1">⏳ পেন্ডিং</span>;
            case 'processing':
                return <span className="badge badge-info badge-sm md:badge-md gap-1">⚙️ প্রসেসিং</span>;
            case 'shipped':
                return <span className="badge badge-primary badge-sm md:badge-md gap-1">🚚 পাঠানো হয়েছে</span>;
            case 'delivered':
                return <span className="badge badge-success badge-sm md:badge-md gap-1">✅ ডেলিভারি সম্পন্ন</span>;
            case 'cancelled':
                return <span className="badge badge-error badge-sm md:badge-md gap-1">❌ বাতিল</span>;
            default:
                return <span className="badge badge-ghost badge-sm md:badge-md gap-1">{status}</span>;
        }
    };

    // ডেলিভারি চার্জের জোন
    const getDeliveryZone = (charge) => {
        switch (charge) {
            case 60: return 'ঢাকা শহর';
            case 80: return 'ঢাকা মেট্রো';
            case 100: return 'সিটি কর্পোরেশন';
            case 120: return 'নিকটবর্তী জেলা';
            case 150: return 'সাধারণ জেলা';
            default: return 'অন্যান্য';
        }
    };

    // ডাটা সর্ট করা
    const sortedBookings = [...bookings].sort((a, b) => {
        if (sortBy === 'newest') {
            return new Date(b.order_date) - new Date(a.order_date);
        } else if (sortBy === 'oldest') {
            return new Date(a.order_date) - new Date(b.order_date);
        } else if (sortBy === 'highest') {
            return b.total_price - a.total_price;
        } else if (sortBy === 'lowest') {
            return a.total_price - b.total_price;
        }
        return 0;
    });

    // টাকার ফরম্যাট
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('bn-BD', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0
        }).format(amount);
    };

    // ডেট ফরম্যাট
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

    // ডেলিভারি ঠিকানা ফরম্যাট
    const formatAddress = (booking) => {
        return `${booking.delivery_address}, ${booking.area ? booking.area + ', ' : ''}${booking.district}, ${booking.division} - ${booking.postal_code}`;
    };

    // অর্ডার ডিটেইলস দেখানোর ফাংশন
    const showOrderDetails = (booking) => {
        Swal.fire({
            title: 'অর্ডারের বিস্তারিত',
            html: `
                <div class="text-left text-sm max-h-96 overflow-y-auto">
                    <div class="grid grid-cols-2 gap-2 mb-2 pb-2 border-b">
                        <span class="font-semibold">অর্ডার আইডি:</span>
                        <span class="text-xs">${booking._id.slice(-8)}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-2">
                        <span class="font-semibold">নাম:</span>
                        <span>${booking.customer_name}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-2">
                        <span class="font-semibold">ফোন:</span>
                        <span>${booking.customer_phone}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-2">
                        <span class="font-semibold">ইমেইল:</span>
                        <span class="text-xs">${booking.customer_email}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-2">
                        <span class="font-semibold">ঠিকানা:</span>
                        <span class="text-xs">${formatAddress(booking)}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-2">
                        <span class="font-semibold">পণ্য:</span>
                        <span class="text-xs">${booking.product_name}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-2">
                        <span class="font-semibold">পরিমাণ:</span>
                        <span>${booking.quantity}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-2">
                        <span class="font-semibold">প্রতি পিস:</span>
                        <span>৳${booking.product_price}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-2">
                        <span class="font-semibold">ডেলিভারি:</span>
                        <span>৳${booking.delivery_charge}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-2 font-bold text-success">
                        <span>মোট মূল্য:</span>
                        <span>৳${booking.total_price}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-2">
                        <span class="font-semibold">পেমেন্ট:</span>
                        <span>${booking.payment_method === 'cod' ? 'ক্যাশ অন ডেলিভারি' : booking.payment_method}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2 mb-2">
                        <span class="font-semibold">স্ট্যাটাস:</span>
                        <span>${booking.order_status}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <span class="font-semibold">অর্ডারের তারিখ:</span>
                        <span class="text-xs">${formatDate(booking.order_date)}</span>
                    </div>
                </div>
            `,
            confirmButtonText: 'ঠিক আছে',
            confirmButtonColor: '#3085d6',
            width: '90%'
        });
    };

    // ডিলিট কনফার্মেশন
    const confirmDelete = (id) => {
        Swal.fire({
            title: 'অর্ডার বাতিল করুন?',
            text: "আপনি কি এই অর্ডারটি বাতিল করতে চান?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'হ্যাঁ, বাতিল করুন',
            cancelButtonText: 'না, ফিরে যান'
        }).then((result) => {
            if (result.isConfirmed) {
                // এখানে ডিলিট API কল হবে
                Swal.fire(
                    'বাতিল করা হয়েছে!',
                    'আপনার অর্ডারটি বাতিল করা হয়েছে।',
                    'success'
                );
            }
        });
    };

    if (!bookings || bookings.length === 0) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center p-4">
                <div className="text-center bg-base-200 p-6 md:p-10 rounded-2xl w-full max-w-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 md:h-24 w-16 md:w-24 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <h2 className="text-xl md:text-2xl font-bold mb-2">কোন বুকিং পাওয়া যায়নি</h2>
                    <p className="text-sm md:text-base text-gray-600 mb-4">আপনার এখনও কোন অর্ডার নেই</p>
                    <button className="btn btn-primary btn-sm md:btn-md" onClick={() => router.push('/')}>
                        শপিং করুন
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-3 md:space-y-4 p-2 md:p-0">
            {/* হেডার ও কন্ট্রোল */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-base-200 p-3 md:p-4 rounded-xl">
                <div>
                    <h2 className="text-lg md:text-2xl font-bold">আমার অর্ডারসমূহ</h2>
                    <p className="text-xs md:text-sm opacity-70">মোট {bookings.length} টি অর্ডার</p>
                </div>

                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <select
                        className="select select-bordered select-xs md:select-sm flex-1 sm:flex-none"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="newest">সর্বশেষ</option>
                        <option value="oldest">পুরাতন</option>
                        <option value="highest">সর্বোচ্চ মূল্য</option>
                        <option value="lowest">সর্বনিম্ন মূল্য</option>
                    </select>

                    {/* ভিউ টগল (মোবাইলে) */}
                    <div className="join md:hidden">
                        <button
                            className={`join-item btn btn-xs ${viewMode === 'card' ? 'btn-active' : ''}`}
                            onClick={() => setViewMode('card')}
                        >
                            কার্ড
                        </button>
                        <button
                            className={`join-item btn btn-xs ${viewMode === 'table' ? 'btn-active' : ''}`}
                            onClick={() => setViewMode('table')}
                        >
                            তালিকা
                        </button>
                    </div>

                    {selectedBookings.length > 0 && (
                        <button className="btn btn-error btn-xs md:btn-sm">
                            ডিলিট ({selectedBookings.length})
                        </button>
                    )}
                </div>
            </div>

            {/* মোবাইল কার্ড ভিউ */}
            <div className={`block md:hidden ${viewMode === 'card' ? 'block' : 'hidden'}`}>
                <div className="space-y-3">
                    {sortedBookings.map((booking, index) => (
                        <div key={booking._id} className="card bg-base-100 shadow-lg border">
                            <div className="card-body p-4">
                                {/* হেডার */}
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-sm"
                                            checked={selectedBookings.includes(booking._id)}
                                            onChange={() => toggleSelect(booking._id)}
                                        />
                                        <span className="font-bold text-primary">#{index + 1}</span>
                                    </div>
                                    {getStatusBadge(booking.order_status)}
                                </div>

                                {/* কাস্টমারের তথ্য */}
                                <div className="mt-2 space-y-1 text-sm">
                                    <div className="font-semibold">{booking.customer_name}</div>
                                    <div className="flex items-center gap-2 text-xs opacity-70">
                                        <span>📞 {booking.customer_phone}</span>
                                        <span>📧 {booking.customer_email}</span>
                                    </div>
                                </div>

                                {/* পণ্যের তথ্য */}
                                <div className="mt-2 bg-base-200 p-2 rounded-lg">
                                    <div className="font-medium text-sm">{booking.product_name}</div>
                                    <div className="flex justify-between items-center mt-1 text-xs">
                                        <span>পরিমাণ: <span className="font-bold">{booking.quantity}</span></span>
                                        <span>প্রতি পিস: ৳{booking.product_price}</span>
                                    </div>
                                </div>

                                {/* মূল্য */}
                                <div className="flex justify-between items-center mt-2">
                                    <div>
                                        <span className="text-xs opacity-70">ডেলিভারি: ৳{booking.delivery_charge}</span>
                                        <span className="badge badge-ghost badge-xs ml-2">
                                            {getDeliveryZone(booking.delivery_charge)}
                                        </span>
                                    </div>
                                    <div className="font-bold text-success">৳{booking.total_price}</div>
                                </div>

                                {/* ঠিকানা */}
                                <div className="text-xs opacity-70 mt-1">
                                    📍 {formatAddress(booking).substring(0, 50)}...
                                </div>

                                {/* তারিখ ও অ্যাকশন */}
                                <div className="flex justify-between items-center mt-3 pt-2 border-t">
                                    <div className="text-xs opacity-50">
                                        {formatDate(booking.order_date)}
                                    </div>
                                    <div className="flex gap-1">
                                        <button
                                            className="btn btn-ghost btn-xs"
                                            onClick={() => showOrderDetails(booking)}
                                        >
                                            বিস্তারিত
                                        </button>
                                        <button
                                            className="btn btn-ghost btn-xs text-error"
                                            onClick={() => confirmDelete(booking._id)}
                                        >
                                            বাতিল
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* টেবিল ভিউ (ডেস্কটপ + মোবাইলের জন্য) */}
            <div className={`${viewMode === 'table' ? 'block' : 'hidden md:block'} overflow-x-auto bg-base-100 rounded-xl shadow-lg`}>
                <div className="min-w-[1000px] md:min-w-full">
                    <table className="table table-zebra table-xs md:table-md">
                        {/* হেড */}
                        <thead className="bg-base-200">
                            <tr>
                                <th className="w-8">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-xs md:checkbox-sm"
                                        checked={selectedBookings.length === bookings.length}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="text-xs md:text-sm">ক্রমিক</th>
                                <th className="text-xs md:text-sm">অর্ডার বিবরণ</th>
                                <th className="text-xs md:text-sm">পণ্যের তথ্য</th>
                                <th className="text-xs md:text-sm">পরিমাণ</th>
                                <th className="text-xs md:text-sm">মূল্য</th>
                                <th className="text-xs md:text-sm hidden lg:table-cell">ডেলিভারি</th>
                                <th className="text-xs md:text-sm">স্ট্যাটাস</th>
                                <th className="text-xs md:text-sm hidden lg:table-cell">তারিখ</th>
                                <th className="text-xs md:text-sm">অ্যাকশন</th>
                            </tr>
                        </thead>

                        <tbody>
                            {sortedBookings.map((booking, index) => (
                                <tr key={booking._id} className="hover">
                                    <th>
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-xs md:checkbox-sm"
                                            checked={selectedBookings.includes(booking._id)}
                                            onChange={() => toggleSelect(booking._id)}
                                        />
                                    </th>

                                    <td className="font-bold text-xs md:text-sm">#{index + 1}</td>

                                    {/* অর্ডার বিবরণ */}
                                    <td>
                                        <div className="font-semibold text-xs md:text-sm">{booking.customer_name}</div>
                                        <div className="text-[10px] md:text-xs opacity-70">{booking.customer_phone}</div>
                                        <div className="text-[10px] opacity-50 hidden md:block">{booking.customer_email}</div>
                                    </td>

                                    {/* পণ্যের তথ্য */}
                                    <td>
                                        <div className="font-medium text-xs md:text-sm">{booking.product_name}</div>
                                        <div className="text-[10px] md:text-xs opacity-70">৳{booking.product_price}</div>
                                    </td>

                                    {/* পরিমাণ */}
                                    <td>
                                        <span className="badge badge-primary badge-xs md:badge-sm">{booking.quantity}</span>
                                    </td>

                                    {/* মূল্য */}
                                    <td>
                                        <div className="font-bold text-success text-xs md:text-sm">৳{booking.total_price}</div>
                                        <div className="text-[10px] opacity-50 hidden md:block">
                                            ডেলিভারি: ৳{booking.delivery_charge}
                                        </div>
                                    </td>

                                    {/* ডেলিভারি তথ্য (লার্জ স্ক্রিন) */}
                                    <td className="hidden lg:table-cell">
                                        <div className="text-xs">
                                            <div>{booking.district}</div>
                                            <div className="text-[10px] opacity-70">{booking.delivery_address.substring(0, 20)}...</div>
                                        </div>
                                    </td>

                                    {/* স্ট্যাটাস */}
                                    <td>
                                        {getStatusBadge(booking.order_status)}
                                    </td>

                                    {/* তারিখ (লার্জ স্ক্রিন) */}
                                    <td className="hidden lg:table-cell">
                                        <div className="text-xs">{formatDate(booking.order_date)}</div>
                                    </td>

                                    {/* অ্যাকশন */}
                                    <td>
                                        <div className="flex gap-1">
                                            <button
                                                className="btn btn-ghost btn-xs"
                                                onClick={() => showOrderDetails(booking)}
                                            >
                                                বিস্তারিত
                                            </button>
                                            <button
                                                className="btn btn-ghost btn-xs text-error"
                                                onClick={() => confirmDelete(booking._id)}
                                            >
                                                বাতিল
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* সারাংশ */}
            <div className="bg-base-200 p-3 md:p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="text-sm md:text-base">
                    <span className="font-semibold">সর্বমোট অর্ডার মূল্য: </span>
                    <span className="text-lg md:text-xl font-bold text-success">
                        ৳{bookings.reduce((sum, b) => sum + b.total_price, 0)}
                    </span>
                </div>
                <div className="text-[10px] md:text-xs opacity-70">
                    সর্বশেষ আপডেট: {new Date().toLocaleDateString('bn-BD')}
                </div>
            </div>
        </div>
    );
}
// components/Checkout.jsx
'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { apiUrl } from '../../../../components/url';
import { useRouter } from 'next/navigation';
import {
    IoPersonOutline,
    IoMailOutline,
    IoCallOutline,
    IoLocationOutline,
    IoCartOutline,
    IoPricetagOutline,
    IoCubeOutline,
    IoCashOutline,
    IoCheckmarkCircleOutline,
    IoArrowForwardOutline,
    IoHomeOutline,
    IoBusinessOutline
} from 'react-icons/io5';

export default function Checkout({ product }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        division: '',
        district: '',
        quantity: 1,
        paymentMethod: 'cod',
        productName: product?.product_name || 'Waterproof and Sweat Proof Hair Dye Color',
        productPrice: product?.price?.current_price || 750
    });

    const [selectedDivision, setSelectedDivision] = useState(null);

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value) || 1;
        setFormData(prev => ({
            ...prev,
            quantity: newQuantity < 1 ? 1 : newQuantity
        }));
    };

    const incrementQuantity = () => {
        setFormData(prev => ({
            ...prev,
            quantity: prev.quantity + 1
        }));
    };

    const decrementQuantity = () => {
        setFormData(prev => ({
            ...prev,
            quantity: prev.quantity > 1 ? prev.quantity - 1 : 1
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'division') {
            setSelectedDivision(value);
            setFormData(prev => ({
                ...prev,
                district: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const orderData = {
                customer_name: formData.name,
                customer_email: formData.email,
                customer_phone: formData.phone,
                delivery_address: formData.address,
                division: formData.division,
                district: formData.district,
                area: formData.area,
                product_id: product?._id,
                product_name: product?.product_name || formData.productName,
                quantity: formData.quantity,
                product_price: product?.price?.current_price || formData.productPrice,
                total_price: totalPrice,
                delivery_charge: deliveryCharge,
                payment_method: formData.paymentMethod,
                order_status: 'pending',
                order_date: new Date().toISOString()
            };

            if (!orderData.customer_name || !orderData.customer_phone || !orderData.delivery_address) {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "তথ্য অসম্পূর্ণ!",
                    text: "দয়া করে সকল প্রয়োজনীয় তথ্য দিন।",
                    confirmButtonText: "ঠিক আছে",
                    customClass: {
                        popup: 'rounded-2xl',
                        confirmButton: 'bg-orange-600 hover:bg-orange-700'
                    }
                });
                setIsSubmitting(false);
                return;
            }

            const response = await fetch(`${apiUrl}/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            const result = await response.json();

            if (response.ok) {
                Cookies.set("product_id", result.order_id, {
                    expires: 30,
                    path: '/',
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax'
                });

                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "অর্ডার সফলভাবে সম্পন্ন হয়েছে! 🎉",
                    html: `
                        <div class="text-left space-y-2">
                            <div class="bg-orange-50 p-3 rounded-lg">
                                <p class="text-sm">অর্ডার আইডি: <strong class="text-orange-600">${result?.order_id || 'N/A'}</strong></p>
                                <p class="text-sm">মোট মূল্য: <strong class="text-orange-600">৳${totalPrice}</strong></p>
                                <p class="text-sm">পেমেন্ট মেথড: <strong>${formData.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি' : formData.paymentMethod}</strong></p>
                            </div>
                            <p class="text-xs text-gray-500 mt-2">আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। ডেলিভারির জন্য ধন্যবাদ!</p>
                        </div>
                    `,
                    showConfirmButton: true,
                    confirmButtonText: "ঠিক আছে",
                    confirmButtonColor: "#ea580c",
                    background: "#ffffff",
                    customClass: {
                        popup: 'rounded-2xl',
                        title: 'text-xl font-bold',
                        confirmButton: 'bg-orange-600 hover:bg-orange-700 px-6 py-2 rounded-full'
                    }
                });

                setFormData({
                    ...formData,
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    division: '',
                    district: '',
                    area: '',
                    quantity: 1,
                    paymentMethod: 'cod'
                });

                router.push('/my-cart');
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "অর্ডার সম্পন্ন হয়নি!",
                    text: result?.message || "দয়া করে আবার চেষ্টা করুন",
                    confirmButtonText: "আবার চেষ্টা করুন",
                    confirmButtonColor: "#ea580c"
                });
            }
        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "সমস্যা হয়েছে!",
                text: error?.message || "নেটওয়ার্ক সমস্যা। দয়া করে আবার চেষ্টা করুন।",
                confirmButtonText: "ঠিক আছে",
                confirmButtonColor: "#ea580c"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const getDeliveryCharge = () => {
        const insideDhaka = ['Dhaka', 'ঢাকা'];
        return insideDhaka.includes(formData.district) ? 60 : 120;
    };

    const deliveryCharge = getDeliveryCharge();
    const subtotal = formData.quantity * product?.price?.current_price;
    const totalPrice = subtotal + deliveryCharge;

    const divisions = [
        {
            "id": 1,
            "name": "Dhaka",
            "bn_name": "ঢাকা",
            "icon": <IoBusinessOutline className="text-orange-500" />,
            "districts": [
                { "name": "Dhaka", "bn_name": "ঢাকা" },
                { "name": "Faridpur", "bn_name": "ফরিদপুর" },
                { "name": "Gazipur", "bn_name": "গাজীপুর" },
                { "name": "Gopalganj", "bn_name": "গোপালগঞ্জ" },
                { "name": "Kishoreganj", "bn_name": "কিশোরগঞ্জ" },
                { "name": "Madaripur", "bn_name": "মাদারীপুর" },
                { "name": "Manikganj", "bn_name": "মানিকগঞ্জ" },
                { "name": "Munshiganj", "bn_name": "মুন্সিগঞ্জ" },
                { "name": "Narayanganj", "bn_name": "নারায়ণগঞ্জ" },
                { "name": "Narsingdi", "bn_name": "নরসিংদী" },
                { "name": "Rajbari", "bn_name": "রাজবাড়ী" },
                { "name": "Shariatpur", "bn_name": "শরীয়তপুর" },
                { "name": "Tangail", "bn_name": "টাঙ্গাইল" }
            ]
        },
        {
            "id": 2,
            "name": "Chittagong",
            "bn_name": "চট্টগ্রাম",
            "icon": <IoHomeOutline className="text-orange-500" />,
            "districts": [
                { "name": "Brahmanbaria", "bn_name": "ব্রাহ্মণবাড়িয়া" },
                { "name": "Comilla", "bn_name": "কুমিল্লা" },
                { "name": "Chandpur", "bn_name": "চাঁদপুর" },
                { "name": "Lakshmipur", "bn_name": "লক্ষ্মীপুর" },
                { "name": "Noakhali", "bn_name": "নোয়াখালী" },
                { "name": "Feni", "bn_name": "ফেনী" },
                { "name": "Khagrachhari", "bn_name": "খাগড়াছড়ি" },
                { "name": "Rangamati", "bn_name": "রাঙ্গামাটি" },
                { "name": "Bandarban", "bn_name": "বান্দরবান" },
                { "name": "Chittagong", "bn_name": "চট্টগ্রাম" },
                { "name": "Cox's Bazar", "bn_name": "কক্সবাজার" }
            ]
        },
        {
            "id": 3,
            "name": "Rajshahi",
            "bn_name": "রাজশাহী",
            "icon": <IoHomeOutline className="text-orange-500" />,
            "districts": [
                { "name": "Bogra", "bn_name": "বগুড়া" },
                { "name": "Joypurhat", "bn_name": "জয়পুরহাট" },
                { "name": "Naogaon", "bn_name": "নওগাঁ" },
                { "name": "Natore", "bn_name": "নাটোর" },
                { "name": "Chapainawabganj", "bn_name": "চাঁপাইনবাবগঞ্জ" },
                { "name": "Pabna", "bn_name": "পাবনা" },
                { "name": "Rajshahi", "bn_name": "রাজশাহী" },
                { "name": "Sirajganj", "bn_name": "সিরাজগঞ্জ" }
            ]
        },
        {
            "id": 4,
            "name": "Khulna",
            "bn_name": "খুলনা",
            "icon": <IoHomeOutline className="text-orange-500" />,
            "districts": [
                { "name": "Bagerhat", "bn_name": "বাগেরহাট" },
                { "name": "Chuadanga", "bn_name": "চুয়াডাঙ্গা" },
                { "name": "Jashore", "bn_name": "যশোর" },
                { "name": "Jhenaidah", "bn_name": "ঝিনাইদহ" },
                { "name": "Khulna", "bn_name": "খুলনা" },
                { "name": "Kushtia", "bn_name": "কুষ্টিয়া" },
                { "name": "Magura", "bn_name": "মাগুরা" },
                { "name": "Meherpur", "bn_name": "মেহেরপুর" },
                { "name": "Narail", "bn_name": "নড়াইল" },
                { "name": "Satkhira", "bn_name": "সাতক্ষীরা" }
            ]
        },
        {
            "id": 5,
            "name": "Barisal",
            "bn_name": "বরিশাল",
            "icon": <IoHomeOutline className="text-orange-500" />,
            "districts": [
                { "name": "Barguna", "bn_name": "বরগুনা" },
                { "name": "Barisal", "bn_name": "বরিশাল" },
                { "name": "Bhola", "bn_name": "ভোলা" },
                { "name": "Jhalokati", "bn_name": "ঝালকাঠি" },
                { "name": "Patuakhali", "bn_name": "পটুয়াখালী" },
                { "name": "Pirojpur", "bn_name": "পিরোজপুর" }
            ]
        },
        {
            "id": 6,
            "name": "Sylhet",
            "bn_name": "সিলেট",
            "icon": <IoHomeOutline className="text-orange-500" />,
            "districts": [
                { "name": "Habiganj", "bn_name": "হবিগঞ্জ" },
                { "name": "Moulvibazar", "bn_name": "মৌলভীবাজার" },
                { "name": "Sunamganj", "bn_name": "সুনামগঞ্জ" },
                { "name": "Sylhet", "bn_name": "সিলেট" }
            ]
        },
        {
            "id": 7,
            "name": "Rangpur",
            "bn_name": "রংপুর",
            "icon": <IoHomeOutline className="text-orange-500" />,
            "districts": [
                { "name": "Dinajpur", "bn_name": "দিনাজপুর" },
                { "name": "Gaibandha", "bn_name": "গাইবান্ধা" },
                { "name": "Kurigram", "bn_name": "কুড়িগ্রাম" },
                { "name": "Lalmonirhat", "bn_name": "লালমনিরহাট" },
                { "name": "Nilphamari", "bn_name": "নীলফামারী" },
                { "name": "Panchagarh", "bn_name": "পঞ্চগড়" },
                { "name": "Rangpur", "bn_name": "রংপুর" },
                { "name": "Thakurgaon", "bn_name": "ঠাকুরগাঁও" }
            ]
        },
        {
            "id": 8,
            "name": "Mymensingh",
            "bn_name": "ময়মনসিংহ",
            "icon": <IoHomeOutline className="text-orange-500" />,
            "districts": [
                { "name": "Jamalpur", "bn_name": "জামালপুর" },
                { "name": "Mymensingh", "bn_name": "ময়মনসিংহ" },
                { "name": "Netrokona", "bn_name": "নেত্রকোণা" },
                { "name": "Sherpur", "bn_name": "শেরপুর" }
            ]
        }
    ];

    const getDistrictsForSelectedDivision = () => {
        if (!formData.division) return [];
        const division = divisions.find(d => d.name === formData.division);
        return division ? division.districts : [];
    };

    return (
        <div className="w-full mx-auto p-4 sm:p-6 bg-linear-to-br from-white to-orange-50/30 rounded-2xl shadow-2xl border border-orange-100">
            {/* Header */}
            <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-r from-orange-600 to-orange-500 text-white mb-3 shadow-lg">
                    <IoCartOutline className="text-3xl" />
                </div>
                <h3 className="font-bold text-2xl sm:text-3xl text-gray-800">
                    অর্ডার কনফার্মেশন
                </h3>
                <p className="text-gray-500 text-sm mt-1">আপনার অর্ডারটি সম্পূর্ণ করতে নিচের তথ্য পূরণ করুন</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Customer Info Section */}
                    <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-orange-100 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-orange-200">
                            <div className="w-8 h-8 rounded-full bg-linear-to-r from-orange-600 to-orange-500 flex items-center justify-center">
                                <IoPersonOutline className="text-white text-sm" />
                            </div>
                            <h4 className="font-semibold text-lg text-gray-800">প্রাপকের তথ্য</h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium flex items-center gap-1">
                                        <IoPersonOutline className="text-orange-500" />
                                        পূর্ণ নাম *
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="আপনার নাম লিখুন"
                                    className="input input-bordered rounded-xl focus:border-orange-500 focus:ring-orange-500 transition-all"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium flex items-center gap-1">
                                        <IoMailOutline className="text-orange-500" />
                                        ইমেইল *
                                    </span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="your@email.com"
                                    className="input input-bordered rounded-xl focus:border-orange-500 focus:ring-orange-500 transition-all"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium flex items-center gap-1">
                                        <IoCallOutline className="text-orange-500" />
                                        মোবাইল নম্বর *
                                    </span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="01XXXXXXXXX"
                                    className="input input-bordered rounded-xl focus:border-orange-500 focus:ring-orange-500 transition-all"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium flex items-center gap-1">
                                        <IoBusinessOutline className="text-orange-500" />
                                        বিভাগ *
                                    </span>
                                </label>
                                <select
                                    name="division"
                                    value={formData.division}
                                    onChange={handleInputChange}
                                    className="select select-bordered rounded-xl focus:border-orange-500 focus:ring-orange-500 transition-all"
                                    required
                                >
                                    <option value="">বিভাগ নির্বাচন করুন</option>
                                    {divisions.map(div => (
                                        <option key={div.id} value={div.name}>
                                            {div.bn_name} - {div.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium flex items-center gap-1">
                                        <IoLocationOutline className="text-orange-500" />
                                        জেলা *
                                    </span>
                                </label>
                                <select
                                    name="district"
                                    value={formData.district}
                                    onChange={handleInputChange}
                                    className="select select-bordered rounded-xl focus:border-orange-500 focus:ring-orange-500 transition-all"
                                    required
                                    disabled={!formData.division}
                                >
                                    <option value="">জেলা নির্বাচন করুন</option>
                                    {getDistrictsForSelectedDivision().map((district, index) => (
                                        <option key={index} value={district.name}>
                                            {district.bn_name} - {district.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium flex items-center gap-1">
                                        <IoCashOutline className="text-orange-500" />
                                        পেমেন্ট মেথড *
                                    </span>
                                </label>
                                <select
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleInputChange}
                                    className="select select-bordered rounded-xl focus:border-orange-500 focus:ring-orange-500 transition-all"
                                    required
                                >
                                    <option value="cod">💵 ক্যাশ অন ডেলিভারি</option>
                                </select>
                            </div>

                            <div className="form-control md:col-span-2">
                                <label className="label">
                                    <span className="label-text font-medium flex items-center gap-1">
                                        <IoLocationOutline className="text-orange-500" />
                                        পূর্ণ ঠিকানা *
                                    </span>
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="আপনার বিস্তারিত ঠিকানা"
                                    className="textarea textarea-bordered rounded-xl focus:border-orange-500 focus:ring-orange-500 transition-all"
                                    rows="2"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product & Price Section */}
                    <div className="space-y-6">
                        {/* Product Info */}
                        <div className="bg-linear-to-r from-orange-50 to-white p-5 rounded-2xl border border-orange-100 shadow-lg">
                            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-orange-200">
                                <div className="w-8 h-8 rounded-full bg-linear-to-r from-orange-600 to-orange-500 flex items-center justify-center">
                                    <IoCubeOutline className="text-white text-sm" />
                                </div>
                                <h4 className="font-semibold text-lg text-gray-800">প্রোডাক্টের বিবরণ</h4>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="label-text font-medium text-gray-600">প্রোডাক্টের নাম</label>
                                    <div className="bg-orange-100/50 p-3 rounded-xl mt-1 border border-orange-200">
                                        <p className="font-medium text-gray-800">{formData.productName}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="label-text font-medium text-gray-600">প্রতি পিস মূল্য</label>
                                        <div className="bg-orange-100/50 p-3 rounded-xl mt-1 border border-orange-200">
                                            <p className="font-bold text-orange-600 text-lg">৳{formData.productPrice}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="label-text font-medium text-gray-600">পরিমাণ</label>
                                        <div className="flex items-center gap-2 mt-1">
                                            <button
                                                type="button"
                                                onClick={decrementQuantity}
                                                className="w-8 h-8 rounded-full bg-orange-600 text-white hover:bg-orange-700 transition-all flex items-center justify-center font-bold"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                name="quantity"
                                                value={formData.quantity}
                                                onChange={handleQuantityChange}
                                                className="input input-bordered w-20 text-center rounded-xl focus:border-orange-500"
                                                min="1"
                                            />
                                            <button
                                                type="button"
                                                onClick={incrementQuantity}
                                                className="w-8 h-8 rounded-full bg-orange-600 text-white hover:bg-orange-700 transition-all flex items-center justify-center font-bold"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Price Calculation */}
                        <div className="bg-linear-to-r from-orange-600 to-orange-500 p-5 rounded-2xl shadow-xl text-white">
                            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-orange-300">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <IoPricetagOutline className="text-white text-sm" />
                                </div>
                                <h4 className="font-semibold text-lg">মূল্যের বিবরণ</h4>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-orange-100">সাবটোটাল ({formData.quantity} × ৳{formData.productPrice})</span>
                                    <span className="font-medium text-white">৳{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-orange-100">ডেলিভারি চার্জ</span>
                                    <span className="font-medium text-white">৳{deliveryCharge}</span>
                                </div>
                                <div className="border-t border-orange-300 my-2"></div>
                                <div className="flex justify-between font-bold text-xl">
                                    <span className="text-white">সর্বমোট</span>
                                    <span className="text-white bg-white/20 px-3 py-1 rounded-full">৳{totalPrice}</span>
                                </div>
                                {formData.division && (
                                    <p className="text-xs text-orange-100 mt-2 bg-white/10 p-2 rounded-lg">
                                        📦 {formData.division === 'Dhaka' ? 'ঢাকার ভিতর' : 'ঢাকার বাইরে'} ডেলিভারি চার্জ: ৳{deliveryCharge}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`
                            w-full py-4 rounded-xl font-bold text-lg text-white transition-all duration-300
                            flex items-center justify-center gap-2
                            ${isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-linear-to-r from-orange-600 to-orange-500 hover:shadow-2xl hover:scale-[1.02] active:scale-98'
                            }
                        `}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                প্রক্রিয়াকরণ...
                            </>
                        ) : (
                            <>
                                <IoCheckmarkCircleOutline className="text-xl" />
                                অর্ডার কনফার্ম করুন
                                <IoArrowForwardOutline className="text-xl" />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
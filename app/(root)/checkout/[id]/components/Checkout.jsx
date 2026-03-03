// components/Checkout.jsx
'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { apiUrl } from '../../../../components/url';
import { useRouter } from 'next/navigation'


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
        postalCode: '',
        quantity: 1,
        paymentMethod: 'cod',
        productName: product?.product_name || 'Waterproof and Sweat Proof Hair Dye Color',
        productPrice: product?.price?.current_price || 750
    });

    const [selectedDivision, setSelectedDivision] = useState(null);

    // কোয়ান্টিটি আপডেট
    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value) || 1;
        setFormData(prev => ({
            ...prev,
            quantity: newQuantity < 1 ? 1 : newQuantity
        }));
    };

    // কোয়ান্টিটি ইনক্রিমেন্ট
    const incrementQuantity = () => {
        setFormData(prev => ({
            ...prev,
            quantity: prev.quantity + 1
        }));
    };

    // কোয়ান্টিটি ডিক্রিমেন্ট
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

        // যখন বিভাগ পরিবর্তন হবে, তখন জেলা রিসেট করুন
        if (name === 'division') {
            setSelectedDivision(value);
            setFormData(prev => ({
                ...prev,
                district: '' // জেলা রিসেট
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
                postal_code: formData.postalCode,
                product_id: formData.productId,
                product_name: product?.product_name || formData.productName,
                quantity: formData.quantity,
                product_price: product?.price?.current_price || formData.productPrice,
                total_price: totalPrice,
                delivery_charge: deliveryCharge,
                payment_method: formData.paymentMethod,
                order_status: 'pending',
                order_date: new Date().toISOString()
            };

            // ভ্যালিডেশন চেক
            if (!orderData.customer_name || !orderData.customer_phone || !orderData.delivery_address) {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "তথ্য অসম্পূর্ণ!",
                    text: "দয়া করে সকল প্রয়োজনীয় তথ্য দিন।",
                    showConfirmButton: true,
                    confirmButtonText: "ঠিক আছে"
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
                // সফল অর্ডার
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "অর্ডার সফলভাবে সম্পন্ন হয়েছে!",
                    html: `
                    <div class="text-left">
                        <p>অর্ডার আইডি: <strong>${result?.order_id || 'N/A'}</strong></p>
                        <p>মোট মূল্য: <strong>৳${totalPrice}</strong></p>
                        <p>পেমেন্ট মেথড: <strong>${formData.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি' : formData.paymentMethod}</strong></p>
                    </div>
                `,
                    showConfirmButton: true,
                    confirmButtonText: "ঠিক আছে",
                    confirmButtonColor: "#3085d6"
                });

                // অর্ডার সফল হলে ফর্ম রিসেট
                setFormData({
                    ...formData,
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    division: '',
                    district: '',
                    area: '',
                    postalCode: '',
                    quantity: 1,
                    paymentMethod: 'cod'
                });

                // রিডাইরেক্ট বা মডাল বন্ধ করুন
                router.push('/my-card');
                // setIsModalOpen(false);

            } else {
                // এরর হ্যান্ডলিং
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "অর্ডার সম্পন্ন হয়নি!",
                    text: result?.message || "দয়া করে আবার চেষ্টা করুন",
                    showConfirmButton: true,
                    confirmButtonText: "ঠিক আছে"
                });
            }
        } catch (error) {
            console.error('Order submission error:', error);

            // নেটওয়ার্ক বা অন্যান্য এরর
            Swal.fire({
                position: "center",
                icon: "error",
                title: "সমস্যা হয়েছে!",
                text: error?.message || "নেটওয়ার্ক সমস্যা। দয়া করে আবার চেষ্টা করুন।",
                showConfirmButton: true,
                confirmButtonText: "ঠিক আছে"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // ডেলিভারি চার্জ ক্যালকুলেট (শহর অনুযায়ী)
    const getDeliveryCharge = () => {
        const insideDhaka = ['Dhaka', 'ঢাকা'];
        return insideDhaka.includes(formData.district) ? 80 : 150;
    };

    const deliveryCharge = getDeliveryCharge();
    const subtotal = formData.quantity * product?.price?.current_price;
    const totalPrice = subtotal + deliveryCharge;

    // বাংলাদেশের বিভাগ ও জেলার ডাটা
    const divisions = [
        {
            "id": 1,
            "name": "Dhaka",
            "bn_name": "ঢাকা",
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
            "districts": [
                { "name": "Jamalpur", "bn_name": "জামালপুর" },
                { "name": "Mymensingh", "bn_name": "ময়মনসিংহ" },
                { "name": "Netrokona", "bn_name": "নেত্রকোণা" },
                { "name": "Sherpur", "bn_name": "শেরপুর" }
            ]
        }
    ];

    // নির্বাচিত বিভাগের জেলাসমূহ
    const getDistrictsForSelectedDivision = () => {
        if (!formData.division) return [];
        const division = divisions.find(d => d.name === formData.division);
        return division ? division.districts : [];
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-base-100 rounded-2xl shadow-xl">
            <h3 className="font-bold text-2xl mb-6 text-center border-b pb-4">
                অর্ডার কনফার্মেশন
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* প্রোডাক্ট ইনফো */}
                <div className="bg-base-200 p-5 rounded-xl">
                    <h4 className="font-semibold mb-3 text-lg">প্রোডাক্টের বিবরণ</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="label-text font-medium">প্রোডাক্টের নাম</label>
                            <input
                                type="text"
                                value={formData.productName}
                                className="input input-bordered w-full bg-base-100/50 mt-1"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="label-text font-medium">প্রতি পিস মূল্য</label>
                            <input
                                type="text"
                                value={`৳${formData.productPrice}`}
                                className="input input-bordered w-full bg-base-100/50 mt-1"
                                readOnly
                            />
                        </div>

                        {/* কোয়ান্টিটি */}
                        <div>
                            <label className="label-text font-medium">পরিমাণ</label>
                            <div className="flex items-center gap-2 mt-1">
                                <button
                                    type="button"
                                    onClick={decrementQuantity}
                                    className="btn btn-square btn-sm btn-outline"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleQuantityChange}
                                    className="input input-bordered w-20 text-center"
                                    min="1"
                                />
                                <button
                                    type="button"
                                    onClick={incrementQuantity}
                                    className="btn btn-square btn-sm btn-outline"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ইউজার ইনফো */}
                <div className="bg-white p-5 rounded-xl border">
                    <h4 className="font-semibold mb-3 text-lg">প্রাপকের তথ্য</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">পূর্ণ নাম *</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="আপনার নাম লিখুন"
                                className="input input-bordered"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">ইমেইল *</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="your@email.com"
                                className="input input-bordered"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">মোবাইল নম্বর *</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="01XXXXXXXXX"
                                className="input input-bordered"
                                required
                            />
                        </div>

                        {/* বিভাগ সিলেক্ট */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">বিভাগ *</span>
                            </label>
                            <select
                                name="division"
                                value={formData.division}
                                onChange={handleInputChange}
                                className="select select-bordered"
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

                        {/* জেলা সিলেক্ট */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">জেলা *</span>
                            </label>
                            <select
                                name="district"
                                value={formData.district}
                                onChange={handleInputChange}
                                className="select select-bordered"
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

                        <div className="form-control md:col-span-2">
                            <label className="label">
                                <span className="label-text font-medium">পূর্ণ ঠিকানা *</span>
                            </label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="আপনার বিস্তারিত ঠিকানা"
                                className="textarea textarea-bordered"
                                rows="2"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">পোস্টাল কোড</span>
                            </label>
                            <input
                                type="text"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleInputChange}
                                placeholder="1234"
                                className="input input-bordered"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">পেমেন্ট মেথড *</span>
                            </label>
                            <select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleInputChange}
                                className="select select-bordered"
                                required
                            >
                                <option value="cod">ক্যাশ অন ডেলিভারি</option>
                                {/* <option value="bkash">বিকাশ</option>
                                <option value="nagad">নগদ</option>
                                <option value="card">ক্রেডিট/ডেবিট কার্ড</option> */}
                            </select>
                        </div>
                    </div>
                </div>

                {/* প্রাইস ক্যালকুলেশন */}
                <div className="bg-primary/5 p-5 rounded-xl border border-primary/20">
                    <h4 className="font-semibold mb-3 text-lg">মূল্যের বিবরণ</h4>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>সাবটোটাল ({formData.quantity} × ৳{formData.productPrice})</span>
                            <span className="font-medium">৳{subtotal}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>ডেলিভারি চার্জ</span>
                            <span className="font-medium">৳{deliveryCharge}</span>
                        </div>
                        <div className="divider my-1"></div>
                        <div className="flex justify-between font-bold text-xl">
                            <span>সর্বমোট</span>
                            <span className="text-primary">৳{totalPrice}</span>
                        </div>
                        {formData.division && (
                            <p className="text-xs text-base-content/70 mt-1 bg-base-200 p-2 rounded">
                                * {formData.division === 'Dhaka' ? 'ঢাকার ভিতর' : 'ঢাকার বাইরে'} ডেলিভারি চার্জ: ৳{deliveryCharge}
                            </p>
                        )}
                    </div>
                </div>

                {
                    isSubmitting ? <p>Please</p> :

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="btn btn-primary btn-block text-lg py-3"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                অর্ডার কনফার্ম করুন
                            </button>
                        </div>
                }
            </form>
        </div>
    );
}
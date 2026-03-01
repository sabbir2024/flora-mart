// components/AddtoCartForm.jsx
'use client';

import { useState } from 'react';

export default function AddtoCartForm({ product }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        quantity: 1,
        paymentMethod: 'cod',
        productName: product?.product_name || 'Waterproof and Sweat Proof Hair Dye Color',
        productPrice: product?.price?.current_price || 750
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    // কোয়ান্টিটি আপডেট (এখন পরিবর্তন করা যাবে)
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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Order submitted:', formData);
        // এখানে আপনার API কল করুন
        alert('অর্ডার সফলভাবে সম্পন্ন হয়েছে!');
        setIsModalOpen(false);
    };

    // ডেলিভারি চার্জ ক্যালকুলেট (শহর অনুযায়ী)
    const getDeliveryCharge = () => {
        const insideDhaka = ['Dhaka', 'ঢাকা'];
        return insideDhaka.includes(formData.city) ? 80 : 150;
    };

    const deliveryCharge = getDeliveryCharge();
    const subtotal = formData.quantity * formData.productPrice;
    const totalPrice = subtotal + deliveryCharge;

    return (
        <div>
            {/* Buy Now বাটন */}
            <button
                className="btn btn-active btn-info btn-lg w-full"
                onClick={() => setIsModalOpen(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                এখনই কিনুন
            </button>

            {/* মডাল ফর্ম */}
            <dialog id="cart_modal" className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
                <div className="modal-box w-11/12 max-w-2xl">
                    <h3 className="font-bold text-xl mb-4">অর্ডার কনফার্মেশন</h3>

                    <form onSubmit={handleSubmit}>
                        {/* প্রোডাক্ট ইনফো - রিডঅনলি (কোয়ান্টিটি ছাড়া) */}
                        <div className="bg-base-200 p-4 rounded-lg mb-4">
                            <h4 className="font-semibold mb-2">প্রোডাক্টের বিবরণ</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="label-text">প্রোডাক্টের নাম</label>
                                    <input
                                        type="text"
                                        name="productName"
                                        value={formData.productName}
                                        className="input input-bordered w-full bg-base-100/50"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="label-text">প্রতি পিস মূল্য</label>
                                    <input
                                        type="text"
                                        value={`৳${formData.productPrice}`}
                                        className="input input-bordered w-full bg-base-100/50"
                                        readOnly
                                    />
                                </div>

                                {/* কোয়ান্টিটি - এখন পরিবর্তনযোগ্য */}
                                <div>
                                    <label className="label-text">পরিমাণ</label>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={decrementQuantity}
                                            className="btn btn-square btn-sm"
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
                                            className="btn btn-square btn-sm"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ইউজার ইনফো */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">পূর্ণ নাম *</span>
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
                                    <span className="label-text">ইমেইল *</span>
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
                                    <span className="label-text">মোবাইল নম্বর *</span>
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

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">শহর *</span>
                                </label>
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="select select-bordered"
                                    required
                                >
                                    <option value="">শহর নির্বাচন করুন</option>
                                    <option value="Dhaka">ঢাকা</option>
                                    <option value="Chittagong">চট্টগ্রাম</option>
                                    <option value="Rajshahi">রাজশাহী</option>
                                    <option value="Khulna">খুলনা</option>
                                    <option value="Barisal">বরিশাল</option>
                                    <option value="Sylhet">সিলেট</option>
                                    <option value="Rangpur">রংপুর</option>
                                    <option value="Mymensingh">ময়মনসিংহ</option>
                                </select>
                            </div>

                            <div className="form-control md:col-span-2">
                                <label className="label">
                                    <span className="label-text">পূর্ণ ঠিকানা *</span>
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
                                    <span className="label-text">পোস্টাল কোড</span>
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
                                    <span className="label-text">পেমেন্ট মেথড *</span>
                                </label>
                                <select
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleInputChange}
                                    className="select select-bordered"
                                    required
                                >
                                    <option value="cod">ক্যাশ অন ডেলিভারি</option>
                                    <option value="bkash">বিকাশ</option>
                                    <option value="nagad">নগদ</option>
                                    <option value="card">ক্রেডিট/ডেবিট কার্ড</option>
                                </select>
                            </div>
                        </div>

                        {/* লাইভ প্রাইস ক্যালকুলেশন */}
                        <div className="bg-base-200 p-4 rounded-lg mt-4">
                            <h4 className="font-semibold mb-3">মূল্যের বিবরণ</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>সাবটোটাল ({formData.quantity} × ৳{formData.productPrice})</span>
                                    <span>৳{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>ডেলিভারি চার্জ</span>
                                    <span>৳{deliveryCharge}</span>
                                </div>
                                <div className="divider my-1"></div>
                                <div className="flex justify-between font-bold text-lg">
                                    <span>সর্বমোট</span>
                                    <span className="text-primary">৳{totalPrice}</span>
                                </div>
                                {formData.city && (
                                    <p className="text-xs text-base-content/70 mt-1">
                                        * {formData.city === 'Dhaka' ? 'ঢাকার ভিতর' : 'ঢাকার বাইরে'} ডেলিভারি চার্জ: ৳{deliveryCharge}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* ফর্ম অ্যাকশন বাটন */}
                        <div className="modal-action">
                            <button
                                type="button"
                                className="btn btn-ghost"
                                onClick={() => setIsModalOpen(false)}
                            >
                                বাতিল
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                অর্ডার কনফার্ম করুন
                            </button>
                        </div>
                    </form>
                </div>

                {/* মডাল ব্যাকড্রপ - ক্লিক করলে বন্ধ হবে */}
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => setIsModalOpen(false)}>close</button>
                </form>
            </dialog>
        </div>
    );
}
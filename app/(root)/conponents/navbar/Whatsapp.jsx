'use client'

import { useState, useEffect } from 'react';

export default function Whatsapp() {
    const [isOpen, setIsOpen] = useState(false);

    const phoneNumber = "8801628507832";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("হ্যালো! আমি আপনার ওয়েবসাইট থেকে যোগাযোগ করছি।")}`;

    // CSS inject করুন
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .custom-whatsapp-btn {
                position: fixed !important;
                bottom: 80px !important;
                right: 16px !important;
                z-index: 999999 !important;
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    return (
        <div className="custom-whatsapp-btn">
            {/* মেইন বাটন */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
                style={{
                    width: '60px',
                    height: '60px',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8"
                >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                    <path d="M8.938 8.12c-.12-.267-.245-.273-.36-.278-.095-.004-.205-.004-.315-.004-.11 0-.288.041-.439.205-.151.164-.576.563-.576 1.374 0 .811.59 1.595.672 1.705.082.11 1.161 1.773 2.812 2.487.393.17.7.271.94.347.395.123.755.106 1.04.064.317-.046.976-.398 1.114-.783.138-.384.138-.714.097-.783-.041-.07-.151-.112-.315-.196-.164-.084-.976-.482-1.127-.537-.151-.055-.262-.082-.372.082-.11.164-.426.537-.522.647-.096.11-.191.123-.355.041-.164-.082-.692-.255-1.318-.813-.487-.433-.815-.967-.91-1.13-.095-.164-.01-.253.072-.334.074-.074.164-.192.246-.288.082-.096.109-.164.164-.274.055-.11.027-.205-.014-.287-.041-.082-.372-.896-.509-1.227z" />
                </svg>
            </button>

            {/* পপআপ মেসেজ */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 mb-2 bg-white rounded-lg shadow-2xl w-80">
                    <div className="bg-green-500 text-white p-4 rounded-t-lg flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg">সাপোর্ট টিম</h3>
                            <p className="text-sm text-green-100">অনলাইন | ২৪/৭ সক্রিয়</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200 text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    <div className="p-4">
                        <div className="bg-gray-100 rounded-lg p-3 mb-4">
                            <p className="text-gray-800">
                                হ্যালো! 👋 আমি কিভাবে আপনাকে সাহায্য করতে পারি?
                            </p>
                        </div>

                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                        >
                            হোয়াটসঅ্যাপে মেসেজ পাঠান
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
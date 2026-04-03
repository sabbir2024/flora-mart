'use client'

import { useState, useEffect, useRef } from 'react';

export default function Whatsapp() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);

    const phoneNumber = "8801628507832";

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

    // পপআপ খোলা হলে অটো ফোকাস
    useEffect(() => {
        if (isOpen && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [isOpen]);

    const handleSendMessage = () => {
        if (message.trim() === '') return;

        // প্রি-ডিফাইনড মেসেজের সাথে ইউজারের মেসেজ যোগ করুন
        const fullMessage = `আমি আপনার ওয়েবসাইট থেকে যোগাযোগ করছি।\n\n${message}`;
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullMessage)}`;

        window.open(whatsappLink, '_blank');
        setMessage('');
        setIsOpen(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && message.trim() !== '') {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // কুইক রিপ্লাই বাটন
    const quickReplies = [
        { text: "পণ্যের দাম কত?", icon: "💰" },
        { text: "অর্ডার কিভাবে করব?", icon: "📦" },
        { text: "ডেলিভারি সময় কত?", icon: "🚚" },
        { text: "রিটার্ন পলিসি কি?", icon: "🔄" }
    ];

    const handleQuickReply = (replyText) => {
        setMessage(replyText);
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    };

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
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z" />
                    <path d="M8.938 8.12c-.12-.267-.245-.273-.36-.278-.095-.004-.205-.004-.315-.004-.11 0-.288.041-.439.205-.151.164-.576.563-.576 1.374 0 .811.59 1.595.672 1.705.082.11 1.161 1.773 2.812 2.487.393.17.7.271.94.347.395.123.755.106 1.04.064.317-.046.976-.398 1.114-.783.138-.384.138-.714.097-.783-.041-.07-.151-.112-.315-.196-.164-.084-.976-.482-1.127-.537-.151-.055-.262-.082-.372.082-.11.164-.426.537-.522.647-.096.11-.191.123-.355.041-.164-.082-.692-.255-1.318-.813-.487-.433-.815-.967-.91-1.13-.095-.164-.01-.253.072-.334.074-.074.164-.192.246-.288.082-.096.109-.164.164-.274.055-.11.027-.205-.014-.287-.041-.082-.372-.896-.509-1.227z" />
                </svg>
            </button>

            {/* পপআপ মেসেজ */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 mb-2 bg-white rounded-lg shadow-2xl w-96">
                    {/* হেডার */}
                    <div className="bg-green-500 text-white p-4 rounded-t-lg flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">সাপোর্ট টিম</h3>
                                <p className="text-xs text-green-100">সাধারণত ১ মিনিটের মধ্যে রিপ্লাই দেই</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200 text-2xl leading-none"
                        >
                            ×
                        </button>
                    </div>

                    {/* বডি */}
                    <div className="p-4">
                        {/* ডিফল্ট গ্রিটিং */}
                        <div className="bg-green-100 rounded-lg p-3 mb-4 max-w-[90%]">
                            <p className="text-gray-800 text-sm">
                                হ্যালো! 👋 আমি কিভাবে আপনাকে সাহায্য করতে পারি?
                            </p>
                            <span className="text-xs text-gray-500 mt-1 block">অনলাইন</span>
                        </div>

                        {/* কুইক রিপ্লাই */}
                        <div className="mb-3">
                            <p className="text-xs text-gray-500 mb-2">দ্রুত প্রশ্ন:</p>
                            <div className="flex flex-wrap gap-2">
                                {quickReplies.map((reply, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleQuickReply(reply.text)}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-full transition-colors"
                                    >
                                        {reply.icon} {reply.text}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ইনপুট এরিয়া */}
                        <div className="mb-3">
                            <textarea
                                ref={textareaRef}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="আপনার মেসেজ লিখুন... (Enter পাঠাতে, Shift+Enter নতুন লাইন)"
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 resize-none text-sm"
                            />
                        </div>

                        {/* সেন্ড বাটন */}
                        <button
                            onClick={handleSendMessage}
                            disabled={!message.trim()}
                            className={`block w-full text-white text-center py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${message.trim()
                                    ? 'bg-green-500 hover:bg-green-600 cursor-pointer transform hover:scale-[1.02]'
                                    : 'bg-gray-300 cursor-not-allowed'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                            </svg>
                            মেসেজ পাঠান
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
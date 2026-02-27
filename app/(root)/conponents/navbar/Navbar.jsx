"use client"; // scroll ইভেন্টের জন্য ক্লায়েন্ট কম্পোনেন্ট needed

import Logo from "../../../components/Logo";
import Container from "../../../components/Container";
import { CgFacebook, CgMail } from "react-icons/cg";
import { useState, useEffect } from "react";
import { FaPhone } from "react-icons/fa";

export default function Navbar() {
    const [showCall, setShowCall] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                // স্ক্রোল ডাউন করলে কল অপশন হাইড হবে
                setShowCall(false);
            } else {
                // স্ক্রোল আপ করলে কল অপশন দেখাবে
                setShowCall(true);
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Container>
            {/* টপ বার - স্ক্রোল করলে হাইড হবে */}
            <div
                className={`bg-blue-400 w-full h-auto p-2 flex justify-between transition-transform duration-300 ${showCall ? 'translate-y-0' : '-translate-y-full'
                    }`}
            >
                <h1 className="font-bold flex gap-1"> <FaPhone />
                    +880 1628-507832</h1>
                <div className="flex justify-between gap-4">
                    <CgFacebook className="w-5 h-5 rounded-full bg-amber-50 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer" />
                    <CgMail className="w-5 h-5 rounded-full bg-amber-50 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer" />
                </div>
            </div>

            {/* মেইন নেভিগেশন - LG তে স্ট্যাটিক */}
            <div className="hidden lg:block sticky top-0 z-50 bg-white shadow-md">
                <div className="navbar bg-base-100">
                    <div className="navbar-start flex">
                        <span className="btn btn-ghost text-xl"><Logo /></span>
                        <h1 className="text-info text-xl font-bold">Flora Mart</h1>
                    </div>

                    {/* নেভিগেশন মেনু - LG স্ক্রিনে স্ট্যাটিক */}
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 text-base font-medium">
                            <li><a href="/" className="hover:text-blue-600">Home</a></li>
                            <li><a href="/products" className="hover:text-blue-600">Products</a></li>
                            <li>
                                <details>
                                    <summary className="hover:text-blue-600">Categories</summary>
                                    <ul className="p-2 bg-base-100 w-40 z-50 shadow-lg">
                                        <li><a href="/categories/formal" className="hover:text-blue-600">Formal</a></li>
                                        <li><a href="/categories/casual" className="hover:text-blue-600">Casual</a></li>
                                        <li><a href="/categories/sports" className="hover:text-blue-600">Sports</a></li>
                                    </ul>
                                </details>
                            </li>
                            <li><a href="/about" className="hover:text-blue-600">About</a></li>
                            <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
                        </ul>
                    </div>

                    {/* কার্ট এবং প্রোফাইল সেকশন */}
                    <div className="navbar-end">
                        {/* সার্চ আইকন */}
                        <button className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        {/* কার্ট ড্রপডাউন */}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className="badge badge-sm indicator-item bg-blue-500 text-white">8</span>
                                </div>
                            </div>
                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content bg-base-100 z-50 mt-3 w-52 shadow-xl">
                                <div className="card-body">
                                    <span className="text-lg font-bold">8 Items</span>
                                    <span className="text-info">Subtotal: $999</span>
                                    <div className="card-actions">
                                        <button className="btn btn-primary btn-block bg-blue-500 hover:bg-blue-600 border-none">View cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* প্রোফাইল ড্রপডাউন */}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full ring-2 ring-blue-400 ring-offset-2">
                                    <img
                                        alt="Profile"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-xl">
                                <li className="menu-title">
                                    <span>My Account</span>
                                </li>
                                <li><a href="/profile" className="hover:text-blue-600">Profile <span className="badge badge-sm bg-blue-500 text-white">New</span></a></li>
                                <li><a href="/orders" className="hover:text-blue-600">Orders</a></li>
                                <li><a href="/settings" className="hover:text-blue-600">Settings</a></li>
                                <li><hr className="my-1" /></li>
                                <li><a href="/logout" className="text-red-500 hover:text-red-700">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* মোবাইল ডক - শুধু মোবাইলে দেখাবে */}
            <div className="flex lg:hidden">
                <div className="dock dock-xs bg-white shadow-lg">
                    <button className="text-gray-600 hover:text-blue-600">
                        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
                                <polyline points="1 11 12 2 23 11" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2"></polyline>
                                <path d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></path>
                                <line x1="12" y1="22" x2="12" y2="18" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></line>
                            </g>
                        </svg>
                        <span className="dock-label text-xs">Home</span>
                    </button>

                    <button className="dock-active text-blue-600">
                        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
                                <polyline points="3 14 9 14 9 17 15 17 15 14 21 14" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2"></polyline>
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></rect>
                            </g>
                        </svg>
                        <span className="dock-label text-xs">Products</span>
                    </button>

                    <button className="text-gray-600 hover:text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="dock-label text-xs">Card</span>
                    </button>

                    <button className="text-gray-600 hover:text-blue-600">
                        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g fill="currentColor">
                                <circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></circle>
                                <path d="M5.3 18c-.8 0-1.4-.7-1.2-1.5C5 13.5 8.2 11 12 11s7 2.5 7.9 5.5c.2.8-.4 1.5-1.2 1.5H5.3z" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></path>
                            </g>
                        </svg>
                        <span className="dock-label text-xs">Profile</span>
                    </button>
                </div>
            </div>
        </Container>
    );
} 
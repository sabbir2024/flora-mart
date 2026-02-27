"use client"; // scroll ইভেন্টের জন্য ক্লায়েন্ট কম্পোনেন্ট needed

import Logo from "../../../components/Logo";
import Container from "../../../components/Container";
import Mobile from "./Mobile";
import TopBar from "./TopBar";
import { useState, useEffect } from "react";

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
            <TopBar showCall={showCall} />

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
            <Mobile />
        </Container>
    );
} 
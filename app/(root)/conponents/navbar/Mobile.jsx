"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function Mobile({ user }) {
    const pathname = usePathname();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const navItems = [
        {
            href: '/',
            label: 'Home',
            icon: (
                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
                        <polyline points="1 11 12 2 23 11" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2"></polyline>
                        <path d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></path>
                        <line x1="12" y1="22" x2="12" y2="18" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></line>
                    </g>
                </svg>
            )
        },
        {
            href: '/shop',
            label: 'Shop',
            icon: (
                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
                        <polyline points="3 14 9 14 9 17 15 17 15 14 21 14" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2"></polyline>
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></rect>
                    </g>
                </svg>
            )
        },
        {
            href: '/my-cart',
            label: 'Cart',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            href: '/about',
            label: 'About',
            icon: (
                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="currentColor">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" />
                        <path d="M7 7h10v2H7zM7 11h10v2H7zM7 15h6v2H7z" fill="currentColor" />
                    </g>
                </svg>
            )
        }
    ];

    const isActive = (href) => {
        if (href === '/') {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex lg:hidden fixed bottom-0 left-0 right-0 z-50">
            <div className="dock dock-xs bg-white shadow-lg font-bold w-full">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={isActive(item.href)
                            ? "dock-active text-orange-600"
                            : "text-gray-600 hover:text-blue-600"
                        }
                    >
                        {item.icon}
                        <span className="dock-label text-xs">{item.label}</span>
                    </Link>
                ))}

                {/* প্রোফাইল ড্রপডাউন */}
                {user && (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className={`flex flex-col items-center justify-center gap-1 py-2 px-3 ${isDropdownOpen ? 'text-orange-600' : 'text-gray-600'
                                }`}
                        >
                            <div className={`w-5 h-5 rounded-full ring-2 ring-offset-1 ${isActive('/profile') || isActive('/orders') || isActive('/settings')
                                    ? 'ring-blue-600'
                                    : 'ring-blue-400'
                                }`}>
                                <img
                                    alt="Profile"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <span className="text-xs">Account</span>
                        </button>

                        {isDropdownOpen && (
                            <ul className="absolute bottom-full mb-2 right-0 menu menu-sm bg-base-100 rounded-box z-50 w-52 p-2 shadow-xl">
                                <li className="menu-title">
                                    <span>My Account</span>
                                </li>
                                <li>
                                    <Link
                                        href="/profile"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className={`hover:text-blue-600 ${isActive('/profile') ? 'text-blue-600 bg-blue-50' : ''
                                            }`}
                                    >
                                        Profile <span className="badge badge-sm bg-blue-500 text-white">New</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/orders"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className={`hover:text-blue-600 ${isActive('/orders') ? 'text-blue-600 bg-blue-50' : ''
                                            }`}
                                    >
                                        Orders
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className={`hover:text-blue-600 ${isActive('/dashboard') ? 'text-blue-600 bg-blue-50' : ''
                                            }`}
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li><hr className="my-1" /></li>
                                <li>
                                    <Link
                                        href="/logout"
                                        onClick={() => setIsDropdownOpen(false)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import Whatsapp from './Whatsapp';
import {
    HiOutlineHome,
    HiOutlineShoppingBag,
    HiOutlineShoppingCart,
    HiOutlineInformationCircle,
    HiOutlineUser
} from 'react-icons/hi';
import { signOut } from 'next-auth/react';

export default function Mobile({ session, status, isLoading, isAuthenticated }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loadingLink, setLoadingLink] = useState(null);
    const dropdownRef = useRef(null);

    const navItems = [
        {
            href: '/',
            label: 'Home',
            icon: <HiOutlineHome className="w-6 h-6 md:w-7 md:h-7" />
        },
        {
            href: '/shop',
            label: 'Shop',
            icon: <HiOutlineShoppingBag className="w-6 h-6 md:w-7 md:h-7" />
        },
        {
            href: '/my-cart',
            label: 'Cart',
            icon: <HiOutlineShoppingCart className="w-6 h-6 md:w-7 md:h-7" />
        },
        ...(!isAuthenticated ? [{
            href: '/about',
            label: 'About',
            icon: <HiOutlineInformationCircle className="w-6 h-6 md:w-7 md:h-7" />
        }] : [])
    ];

    const isActive = (href) => {
        if (href === '/') {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    // Handle navigation with loading state on label only
    const handleNavigation = (href, e) => {
        if (pathname === href) {
            e.preventDefault();
            return;
        }

        setLoadingLink(href);

        // Close dropdown if open
        if (isDropdownOpen) {
            setIsDropdownOpen(false);
        }

        // Navigate
        router.push(href);

        // Reset loading state after navigation
        setTimeout(() => {
            setLoadingLink(null);
        }, 500);
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

    // Reset loading state when pathname changes
    useEffect(() => {
        setLoadingLink(null);
    }, [pathname]);

    return (
        <>
            <Whatsapp />

            <div className="flex lg:hidden fixed bottom-0 left-0 right-0 z-50">
                <div className="flex items-center justify-around bg-white dark:bg-zinc-800 shadow-lg w-full py-1">
                    {navItems.map((item) => {
                        const isItemActive = isActive(item.href);
                        const isItemLoading = loadingLink === item.href;

                        return (
                            <button
                                key={item.href}
                                onClick={(e) => handleNavigation(item.href, e)}
                                className={`flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg transition-all ${isItemActive
                                    ? "text-orange-600 dark:text-orange-500 bg-orange-50 dark:bg-orange-950/30"
                                    : "text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                            >
                                <div className="flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <span className="text-xs font-medium">
                                    {isItemLoading ? (
                                        <span className="loading loading-infinity loading-xs text-orange-600 dark:text-orange-500"></span>
                                    ) : (
                                        item.label
                                    )}
                                </span>
                            </button>
                        );
                    })}

                    {/* প্রোফাইল ড্রপডাউন */}
                    {isLoading ? (
                        // Loading state for profile
                        <div className="flex flex-col items-center justify-center gap-1 py-2 px-3">
                            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                            <div className="w-8 h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        </div>
                    ) : isAuthenticated && (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg transition-all ${isDropdownOpen
                                    ? 'text-orange-600 dark:text-orange-500 bg-orange-50 dark:bg-orange-950/30'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <div className="w-8 h-8 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">{session?.user?.name?.charAt(0)?.toUpperCase()}</span>
                                </div>
                                <span className="text-xs font-medium">Account</span>
                            </button>

                            {isDropdownOpen && (
                                <ul className="absolute bottom-full mb-2 right-0 menu menu-sm bg-white dark:bg-zinc-800 rounded-box z-50 w-52 p-2 shadow-xl border border-gray-200 dark:border-gray-700">
                                    <li className="menu-title">
                                        <span className="text-gray-700 dark:text-gray-300">My Account</span>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => handleNavigation('/profile')}
                                            className={`w-full text-left hover:text-orange-600 dark:hover:text-orange-500 ${isActive('/profile')
                                                ? 'text-orange-600 dark:text-orange-500 bg-orange-50 dark:bg-orange-950/30'
                                                : 'text-gray-700 dark:text-gray-300'
                                                }`}
                                        >
                                            Profile
                                            <span className="badge badge-sm bg-orange-500 text-white ml-2">New</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => handleNavigation('/orders')}
                                            className={`w-full text-left hover:text-orange-600 dark:hover:text-orange-500 ${isActive('/orders')
                                                ? 'text-orange-600 dark:text-orange-500 bg-orange-50 dark:bg-orange-950/30'
                                                : 'text-gray-700 dark:text-gray-300'
                                                }`}
                                        >
                                            Orders
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => handleNavigation('/dashboard')}
                                            className={`w-full text-left hover:text-orange-600 dark:hover:text-orange-500 ${isActive('/dashboard')
                                                ? 'text-orange-600 dark:text-orange-500 bg-orange-50 dark:bg-orange-950/30'
                                                : 'text-gray-700 dark:text-gray-300'
                                                }`}
                                        >
                                            Dashboard
                                        </button>
                                    </li>
                                    <li><hr className="my-1 border-gray-200 dark:border-gray-700" /></li>
                                    <li>
                                        <button
                                            onClick={() => signOut()}
                                            className="w-full text-left text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
"use client"; // scroll ইভেন্টের জন্য ক্লায়েন্ট কম্পোনেন্ট needed

import Logo from "../../../components/Logo";
import Container from "../../../components/Container";
import Mobile from "./Mobile";
import TopBar from "./TopBar";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Whatsapp from "./Whatsapp";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
    const [showCall, setShowCall] = useState(true);
    const [loadingLink, setLoadingLink] = useState(null);
    const pathname = usePathname();
    const router = useRouter();

    const { data: session, status } = useSession();

    const isAuthenticated = status === 'authenticated';

    const user = [
        {
            email: 'dfdf',
            role: 'admin'
        }]

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

    // Reset loading state when pathname changes
    useEffect(() => {
        setLoadingLink(null);
    }, [pathname]);

    // active link check function
    const isActive = (path) => {
        if (path === '/') {
            return pathname === path;
        }
        return pathname.startsWith(path);
    };

    // Handle navigation with loading state
    const handleNavigation = (href, e) => {
        if (pathname === href) {
            e.preventDefault();
            return;
        }

        setLoadingLink(href);
        router.push(href);

        // Reset loading state after navigation
        setTimeout(() => {
            setLoadingLink(null);
        }, 500);
    };

    // active link style
    const getLinkClass = (path) => {
        return `hover:text-orange-600 transition-colors duration-200 ${isActive(path)
            ? 'text-orange-600 font-semibold border-b-2 border-orange-600'
            : 'text-gray-700 dark:text-gray-300'
            }`;
    };

    return (
        <Container>
            {/* টপ বার - স্ক্রোল করলে হাইড হবে */}
            <TopBar showCall={showCall} />

            {/* মেইন নেভিগেশন - LG তে স্ট্যাটিক */}
            <div className="hidden lg:block z-50 bg-white dark:bg-zinc-900 shadow-md">
                <Whatsapp />
                <div className="navbar  sticky top-0  bg-base-100 dark:bg-zinc-900">
                    <div className="navbar-start flex">
                        <span className="btn btn-ghost text-xl">
                            <Logo />
                        </span>
                        <Link
                            href="/"
                            onClick={(e) => handleNavigation('/', e)}
                            className="text-orange-600 text-xl font-bold hover:text-orange-700 dark:text-orange-500 transition-colors"
                        >
                            Flora Mart
                        </Link>
                    </div>

                    {/* নেভিগেশন মেনু - LG স্ক্রিনে স্ট্যাটিক */}
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 text-base font-medium">
                            <li>
                                {loadingLink === '/' ? (
                                    <span className="flex items-center gap-2 text-gray-500">
                                        <span className="loading loading-infinity loading-xs text-orange-600"></span>

                                    </span>
                                ) : (
                                    <Link
                                        href="/"
                                        onClick={(e) => handleNavigation('/', e)}
                                        className={getLinkClass('/')}
                                    >
                                        Home
                                    </Link>
                                )}
                            </li>
                            <li>
                                {loadingLink === '/shop' ? (
                                    <span className="flex items-center gap-2 text-gray-500">
                                        <span className="loading loading-infinity loading-xs text-orange-600"></span>

                                    </span>
                                ) : (
                                    <Link
                                        href="/shop"
                                        onClick={(e) => handleNavigation('/shop', e)}
                                        className={getLinkClass('/shop')}
                                    >
                                        Shop
                                    </Link>
                                )}
                            </li>
                            <li>
                                {loadingLink === '/my-cart' ? (
                                    <span className="flex items-center gap-2 text-gray-500">
                                        <span className="loading loading-infinity loading-xs text-orange-600"></span>

                                    </span>
                                ) : (
                                    <Link
                                        href="/my-cart"
                                        onClick={(e) => handleNavigation('/my-cart', e)}
                                        className={getLinkClass('/my-cart')}
                                    >
                                        Cart
                                    </Link>
                                )}
                            </li>
                            {(!isAuthenticated) &&
                                <li>
                                    {loadingLink === '/about' ? (
                                        <span className="flex items-center gap-2 text-gray-500">
                                            <span className="loading loading-infinity loading-xs text-orange-600"></span>

                                        </span>
                                    ) : (
                                        <Link
                                            href="/about"
                                            onClick={(e) => handleNavigation('/about', e)}
                                            className={getLinkClass('/about')}
                                        >
                                            About
                                        </Link>
                                    )}
                                </li>
                            }

                        </ul>
                    </div>

                    {/* কার্ট এবং প্রোফাইল সেকশন */}
                    <div className="navbar-end">
                        {/* সার্চ আইকন */}
                        {loadingLink === '/search' ? (
                            <div className="btn btn-ghost btn-circle">
                                <span className="loading loading-infinity loading-xs text-orange-600"></span>
                            </div>
                        ) : (
                            <Link
                                href="/search"
                                onClick={(e) => handleNavigation('/search', e)}
                                className={`btn btn-ghost btn-circle ${isActive('/search') ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/30' : ''
                                    }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </Link>
                        )}

                        {/* কার্ট ড্রপডাউন */}
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className="badge badge-sm indicator-item bg-orange-600 text-white">8</span>
                                </div>
                            </div>
                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content bg-base-100 dark:bg-zinc-800 z-50 mt-3 w-52 shadow-xl">
                                <div className="card-body">
                                    <span className="text-lg font-bold dark:text-white">8 Items</span>
                                    <span className="text-info dark:text-gray-300">Subtotal: $999</span>
                                    <div className="card-actions">
                                        {loadingLink === '/my-cart' ? (
                                            <div className="btn btn-primary btn-block bg-gray-400 cursor-wait">
                                                <span className="loading loading-infinity loading-xs"></span>

                                            </div>
                                        ) : (
                                            <Link
                                                href="/my-cart"
                                                onClick={(e) => handleNavigation('/my-cart', e)}
                                                className="btn btn-primary btn-block bg-orange-600 hover:bg-orange-700 border-none"
                                            >
                                                View cart
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* প্রোফাইল ড্রপডাউন */}
                        {isAuthenticated && (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">{session?.user?.name?.charAt(0)?.toUpperCase()}</span>
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-white dark:bg-zinc-800 rounded-box z-50 mt-3 w-52 p-2 shadow-xl border border-gray-200 dark:border-gray-700">
                                    <li className="menu-title">
                                        <span className="text-gray-700 dark:text-gray-300">My Account</span>
                                    </li>
                                    <li>
                                        {loadingLink === '/profile' ? (
                                            <span className="flex items-center gap-2 text-gray-500">
                                                <span className="loading loading-infinity loading-xs text-orange-600"></span>

                                            </span>
                                        ) : (
                                            <Link
                                                href="/profile"
                                                onClick={(e) => handleNavigation('/profile', e)}
                                                className={`hover:text-orange-600 ${isActive('/profile') ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/30' : ''
                                                    }`}
                                            >
                                                Profile <span className="badge badge-sm bg-orange-500 text-white">New</span>
                                            </Link>
                                        )}
                                    </li>
                                    <li>
                                        {loadingLink === '/orders' ? (
                                            <span className="flex items-center gap-2 text-gray-500">
                                                <span className="loading loading-infinity loading-xs text-orange-600"></span>

                                            </span>
                                        ) : (
                                            <Link
                                                href="/orders"
                                                onClick={(e) => handleNavigation('/orders', e)}
                                                className={`hover:text-orange-600 ${isActive('/orders') ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/30' : ''
                                                    }`}
                                            >
                                                Orders
                                            </Link>
                                        )}
                                    </li>
                                    <li>
                                        {loadingLink === '/dashboard' ? (
                                            <span className="flex items-center gap-2 text-gray-500">
                                                <span className="loading loading-infinity loading-xs text-orange-600"></span>

                                            </span>
                                        ) : (
                                            <Link
                                                href="/dashboard"
                                                onClick={(e) => handleNavigation('/dashboard', e)}
                                                className={`hover:text-orange-600 ${isActive('/dashboard') ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/30' : ''
                                                    }`}
                                            >
                                                Dashboard
                                            </Link>
                                        )}
                                    </li>
                                    <li><hr className="my-1 border-gray-200 dark:border-gray-700" /></li>
                                    <li>
                                        {loadingLink === '/logout' ? (
                                            <span className="flex items-center gap-2 text-red-500">
                                                <span className="loading loading-infinity loading-xs text-red-500"></span>

                                            </span>
                                        ) : (
                                            <span

                                                onClick={() => signOut()}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Logout
                                            </span>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* মোবাইল ডক - শুধু মোবাইলে দেখাবে */}
            <Mobile user={user} isLoading={false} isAuthenticated={isAuthenticated} />
        </Container>
    );
}
// components/Sidebar.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { data: session, status } = useSession();


    const menuItems = [
        {
            href: '/dashboard',
            label: 'Dashboard',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
            )
        },
        {
            href: '/dashboard/admin/products',
            label: 'Products',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                    <path d="M20 7h-4.5A2.5 2.5 0 0 0 13 9.5v9A2.5 2.5 0 0 0 15.5 21h4.5" />
                    <path d="M4 7h4.5A2.5 2.5 0 0 1 11 9.5v9A2.5 2.5 0 0 1 8.5 21H4" />
                    <path d="M2 7h20" />
                    <path d="M8 3v4" />
                    <path d="M16 3v4" />
                </svg>
            )
        },
        {
            href: '/dashboard/admin/orders',
            label: 'Orders',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
            )
        },
        {
            href: '/dashboard/admin/analytics',
            label: 'Analytics',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
            )
        },
        {
            href: '/dashboard/admin/settings',
            label: 'Settings',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.04.04A10 10 0 0 0 12 17.66a10 10 0 0 0 6.36-2.62l.04-.04Z" />
                    <path d="M16.5 9.4a10 10 0 0 0-9 0" />
                </svg>
            )
        }
    ];

    const isActive = (href) => {
        if (href === '/dashboard/admin/dashboard') {
            return pathname === href;
        }
        return pathname?.startsWith(href);
    };

    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>

            {/* Sidebar Container */}
            <div className={`
                flex min-h-full flex-col bg-white dark:bg-zinc-900 
                shadow-xl dark:shadow-none border-r border-gray-100 dark:border-zinc-800
                transition-all duration-300 ease-in-out
                ${isCollapsed ? 'w-20' : 'w-64'}
            `}>
                {/* Logo Section */}
                <div className="px-4 py-6 mb-4 border-b border-gray-100 dark:border-zinc-800">
                    {!isCollapsed ? (
                        <div>
                            <h2 className="text-lg font-bold text-orange-600 dark:text-orange-500">Admin Console</h2>
                            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Management Suite</p>
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <div className="w-8 h-8 bg-linear-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">A</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation Menu */}
                {session?.user?.role === 'admin' && <nav className="flex-1 px-3 py-4 space-y-1">
                    {menuItems.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                                    ${active
                                        ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800'
                                    }
                                    ${isCollapsed ? 'justify-center' : ''}
                                `}
                                title={isCollapsed ? item.label : ''}
                            >
                                <span className={`${active ? 'text-orange-500' : 'text-gray-500'} transition-colors`}>
                                    {item.icon}
                                </span>
                                {!isCollapsed && (
                                    <span className="text-sm font-medium">{item.label}</span>
                                )}
                                {active && !isCollapsed && (
                                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                )}
                            </Link>
                        );
                    })}
                </nav>}
                {session?.user?.role === 'user' && <nav>
                    <li className="text-lg font-bold text-orange-600 dark:text-orange-500 w-full mx-auto px-2">Setting</li>
                </nav>
                }
                {/* Bottom Section - Add Product Button & User Profile */}
                <div className="px-3 py-4 border-t border-gray-100 dark:border-zinc-800">
                    {/* Add Product Button */}
                    {session?.user?.role === 'admin' &&
                        <Link href={'/dashboard/admin/add-product'}>
                            <button className={`
                        w-full mb-4 bg-linear-to-r from-orange-500 to-orange-600 
                        text-white font-bold rounded-xl transition-all duration-200
                        hover:shadow-lg hover:scale-[1.02] active:scale-95
                        ${isCollapsed ? 'px-2 py-2' : 'px-4 py-2.5'}
                    `}>
                                {!isCollapsed ? (
                                    <span className="flex items-center justify-center gap-2 text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                        Add Product
                                    </span>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5 mx-auto">
                                        <path d="M12 5v14M5 12h14" />
                                    </svg>
                                )}
                            </button>
                        </Link>
                    }
                    {/* User Profile Section */}
                    <div className={`
                        flex items-center rounded-xl p-2 transition-all duration-200
                        ${isCollapsed ? 'justify-center' : 'gap-3'}
                        hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer
                    `}>
                        <div className="relative shrink-0">
                            <div className="w-8 h-8 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">{session?.user?.name?.charAt(0)?.toUpperCase()}</span>
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900"></div>
                        </div>

                        {!isCollapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate uppercase">
                                    {session?.user?.name}
                                </p>
                                <p className="text-[10px] text-gray-500 truncate uppercase">
                                    {session?.user?.role || 'User'}
                                </p>
                                <p className="text-[10px] text-gray-500 truncate ">
                                    {session?.user?.email}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Collapse Toggle Button (Optional) */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-20 w-10 h-10 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`size-3 text-gray-500 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
                    >
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
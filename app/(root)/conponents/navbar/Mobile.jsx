"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Mobile() {
    const pathname = usePathname();

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
            href: '/products',
            label: 'Products',
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
            href: '/card',
            label: 'Card',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            href: '/profile',
            label: 'Profile',
            icon: (
                <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="currentColor">
                        <circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></circle>
                        <path d="M5.3 18c-.8 0-1.4-.7-1.2-1.5C5 13.5 8.2 11 12 11s7 2.5 7.9 5.5c.2.8-.4 1.5-1.2 1.5H5.3z" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></path>
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

    return (
        <div className="flex lg:hidden">
            <div className="dock dock-xs bg-white shadow-lg">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={isActive(item.href)
                            ? "dock-active text-blue-600"
                            : "text-gray-600 hover:text-blue-600"
                        }
                    >
                        {item.icon}
                        <span className="dock-label text-xs">{item.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
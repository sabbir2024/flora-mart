'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
    IoPersonOutline,
    IoMailOutline,
    IoCreateOutline,
    IoCheckmarkCircleOutline,
    IoLogOutOutline,
    IoSettingsOutline
} from 'react-icons/io5';

export default function DashboardNav() {
    const [isHovered, setIsHovered] = useState(false);

    const defaultUser = {
        name: 'Julian Vane',
        email: 'julian.v@minimalism.co',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDh-V43BcDKnkU-xwTBMX5ter6T9vO4vXKSWRDlfbgXVPVKMrTjWmm43VvrxtRdnJwwoTFmNeuLDSaHQfuyFTxMtqDUoPhMavF6BrPNBE8eyDLr14Eiz9UhAmFu4z5ICtzPK0HmBtUNi05XJ2tsmeiK0M2MQDKxRJGpuewp2aAk7A4FjaFS-7ODxbS4KdeIEeEv4F0tN1INqhkvP3ef1ERBkEfOlykM8FvDCRqR-y9Tmm21BfaoxlKuOPV8eIAr0neEGRLgkNecpA',
        role: 'Super Admin',
        verified: true
    };

    return (
        <nav className="navbar w-full bg-base-300 bg-linear-to-r from-orange-500 to-orange-600">
            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                {/* Sidebar toggle icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
            </label>
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">FloraMart</a>
            </div>
            <div className="flex gap-2">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
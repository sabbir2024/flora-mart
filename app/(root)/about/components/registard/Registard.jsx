// components/auth/Registard.jsx
'use client';

import { useState } from 'react';
import LoginSection from '../LoginSection/LoginSection';
import SignupSection from '../SignupSection/SignupSection';

export default function Registard({ user, onLoginSuccess }) {
    const [activeTab, setActiveTab] = useState('login');

    if (user) {
        return null; // User is logged in, don't show auth section
    }

    return (
        <div id='login' className="w-full">
            <div className="flex justify-center mb-8">
                <div className="tabs tabs-box bg-gray-100 dark:bg-zinc-800 p-1 rounded-xl">
                    <button
                        id="login-tab"
                        onClick={() => setActiveTab('login')}
                        className={`tab rounded-lg px-6 py-2 font-semibold transition-all ${activeTab === 'login'
                            ? 'bg-orange-600 text-white'
                            : 'text-gray-600 dark:text-gray-400 hover:text-orange-600'
                            }`}
                    >
                        Login
                    </button>
                    <button
                        id="signup-tab"
                        onClick={() => setActiveTab('signup')}
                        className={`tab rounded-lg px-6 py-2 font-semibold transition-all ${activeTab === 'signup'
                            ? 'bg-orange-600 text-white'
                            : 'text-gray-600 dark:text-gray-400 hover:text-orange-600'
                            }`}
                    >
                        Sign Up
                    </button>
                </div>
            </div>

            {activeTab === 'login' && <LoginSection onSuccess={onLoginSuccess} />}
            {activeTab === 'signup' && <SignupSection onSuccess={onLoginSuccess} />}
        </div>
    );
}
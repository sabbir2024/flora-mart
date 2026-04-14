// components/auth/LoginSection.jsx
'use client';

import { useState } from 'react';
import { signIn } from "next-auth/react"
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function LoginSection({ onSuccess }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false
            });

            if (result.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: result.error || 'Invalid email or password. Please try again.',
                });

            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'You have successfully logged in.',
                });
                router.push('/dashboard');
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.message || 'An error occurred during login. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
        // console.log('Submitting login with:', formData);
    };

    return (
        <section id="login" className="max-w-7xl mx-auto px-4 md:px-6  font-bold grid grid-cols-1 lg:grid-cols-2  gap-10 items-center">
            <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                    Welcome Back!
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Login to manage orders, track deliveries, and access your dashboard.
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-4 rounded-xl text-sm">
                    💡 Dashboard UI depends on your role (Admin / User)
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 text-gray-900 dark:text-white font-bold p-6 md:p-10 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-6 text-orange-600 dark:text-orange-500">Secure Login</h3>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="w-full bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        required
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button
                        onClick={() => document.getElementById('signup-tab')?.click()}
                        className="text-sm text-orange-600 dark:text-orange-500 hover:underline"
                    >
                        Don't have an account? Sign up
                    </button>
                </div>
            </div>
        </section>
    );
}
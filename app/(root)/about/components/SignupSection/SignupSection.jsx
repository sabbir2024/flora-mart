// components/auth/SignupSection.jsx
'use client';

import { useState } from 'react';
import { postUser } from '../../../../actions/server/auth';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function SignupSection({ onSuccess }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            setIsLoading(false);
            return;
        }

        try {
            const result = await postUser({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            if (result._id) {
                Swal.fire({
                    icon: 'success',
                    title: 'Signup Successful',
                    text: 'Your account has been created successfully. Please login to continue.',
                })
                router.push('/about#login')
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Signup Failed',
                    text: 'Email already exists. Please try with a different email.',
                });
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Signup Failed',
                text: error.message || 'An error occurred during signup. Please try again.',
            });

        } finally {
            setIsLoading(false);
        }
        // try {
        //     const response = await fetch('/api/signup', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({
        //             name: formData.name,
        //             email: formData.email,
        //             password: formData.password
        //         })
        //     });

        //     const data = await response.json();

        //     if (response.ok) {
        //         // Auto login after signup
        //         const loginResponse = await fetch('/api/login', {
        //             method: 'POST',
        //             headers: { 'Content-Type': 'application/json' },
        //             body: JSON.stringify({
        //                 email: formData.email,
        //                 password: formData.password
        //             })
        //         });

        //         const loginData = await loginResponse.json();

        //         if (loginResponse.ok) {
        //             localStorage.setItem('user', JSON.stringify(loginData.user));
        //             onSuccess?.(loginData.user);
        //             window.location.reload();
        //         }
        //     } else {
        //         setError(data.message || 'Signup failed. Please try again.');
        //     }
        // } catch (error) {
        //     setError('Network error. Please try again.');
        // } finally {
        //     setIsLoading(false);
        // }
    };

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-6  font-bold grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                    Create Account
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Join us to start shopping and manage your orders easily.
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-4 rounded-xl text-sm">
                    🎉 Get exclusive offers, track orders, and save your favorites!
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-800 text-gray-900 dark:text-white font-bold p-6 md:p-10 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-6 text-orange-600 dark:text-orange-500">Create New Account</h3>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-white px-4 py-3 rounded-md outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        required
                    />
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
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
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
                            'Sign Up'
                        )}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <button
                        onClick={() => document.getElementById('login-tab')?.click()}
                        className="text-sm text-orange-600 dark:text-orange-500 hover:underline"
                    >
                        Already have an account? Sign in
                    </button>
                </div>
            </div>
        </section>
    );
}
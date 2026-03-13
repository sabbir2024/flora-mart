'use client'

import Swal from "sweetalert2";
import { apiUrl } from "../../../components/url";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
    const router = useRouter()
    const heandleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        const userInfo = { name, email, password }

        try {
            const result = await fetch(`${apiUrl}/user`, {
                method: 'POST',
                headers: {
                    'Accept': "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            })
            const data = await result.json();
            console.log('resulttt', data)

            if (data.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                router.push('/')
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: data.message
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
            });
        }
    }
    return (
        <form onSubmit={heandleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                    required
                />
            </div>
            {/* Email Field */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email ID
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                    required
                />
            </div>

            {/* Password Field */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                    required
                />
            </div>


            {/* Login Button */}
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Sign Up
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600 text-sm">
                Alredy have an account?{' '}
                <a href="/login" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                    log in
                </a>
            </p>
        </form>
    );
}
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { HiOutlineHome } from 'react-icons/hi'
import { IoArrowBackOutline } from 'react-icons/io5'
import { FiAlertTriangle } from 'react-icons/fi'
import { useState, useEffect } from 'react'

export default function NotFound() {
    const router = useRouter()
    const [position, setPosition] = useState({ x: 0, y: 0 })

    // Fun mouse move effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20
            const y = (e.clientY / window.innerHeight - 0.5) * 20
            setPosition({ x, y })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            </div>

            {/* Main content with parallax effect */}
            <div
                className="relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-12 max-w-2xl w-full border border-white/20"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    transition: 'transform 0.2s ease-out'
                }}
            >
                <div className="text-center">
                    {/* 3D-like error icon */}
                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-xl opacity-70 animate-pulse"></div>
                            <div className="relative bg-gradient-to-br from-red-400 to-orange-500 p-6 rounded-full shadow-2xl">
                                <FiAlertTriangle className="w-20 h-20 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Glitch effect text */}
                    <h1 className="text-9xl font-black text-white mb-4 relative">
                        404
                        <span className="absolute inset-0 text-purple-400 animate-glitch-1 opacity-70">404</span>
                        <span className="absolute inset-0 text-blue-400 animate-glitch-2 opacity-70">404</span>
                    </h1>

                    <h2 className="text-4xl font-bold text-white mb-4">
                        Lost in Space?
                    </h2>

                    <p className="text-gray-300 text-lg mb-12 max-w-md mx-auto">
                        The page you're looking for has drifted into the cosmic void.
                        Let's navigate you back to safety.
                    </p>

                    {/* Buttons with hover effects */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={() => router.back()}
                            className="group relative flex items-center gap-3 px-8 py-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 overflow-hidden w-full sm:w-auto justify-center border border-white/30"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                            <IoArrowBackOutline className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium">Go Back</span>
                        </button>

                        <Link
                            href="/"
                            className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-xl overflow-hidden w-full sm:w-auto justify-center"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                            <HiOutlineHome className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="font-medium">Back to Home</span>
                        </Link>
                    </div>

                    {/* Quick links */}
                    <div className="mt-12 flex gap-6 justify-center text-sm">
                        <Link href="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full group-hover:scale-150 transition-transform"></span>
                            Contact
                        </Link>
                        <Link href="/about" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                            <span className="w-1.5 h-1.5 bg-pink-400 rounded-full group-hover:scale-150 transition-transform"></span>
                            About
                        </Link>
                        <Link href="/blog" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:scale-150 transition-transform"></span>
                            Blog
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
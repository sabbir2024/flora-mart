// app/not-found.js
import Link from 'next/link'
import { IoArrowBackOutline } from 'react-icons/io5'
import { HiOutlineHome } from 'react-icons/hi'
import { FiAlertTriangle } from 'react-icons/fi'

export default function NotFoundPage() {
    return (
        <div style={{
            minHeight: '70vh',
            background: 'linear-gradient(135deg, #111827, #581c87, #111827)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 16px',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            {/* অ্যানিমেটেড ব্যাকগ্রাউন্ড এলিমেন্ট */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.3
            }}>
                <div style={{
                    position: 'absolute',
                    top: '25%',
                    left: '25%',
                    width: '288px',
                    height: '288px',
                    background: '#9333ea',
                    borderRadius: '50%',
                    filter: 'blur(64px)',
                    opacity: 0.7,
                    animation: 'blob 7s infinite'
                }}></div>
                <div style={{
                    position: 'absolute',
                    top: '33%',
                    right: '25%',
                    width: '278px',
                    height: '278px',
                    background: '#2563eb',
                    borderRadius: '50%',
                    filter: 'blur(64px)',
                    opacity: 0.7,
                    animation: 'blob 7s infinite',
                    animationDelay: '2s'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '25%',
                    left: '33%',
                    width: '288px',
                    height: '288px',
                    background: '#db2777',
                    borderRadius: '50%',
                    filter: 'blur(64px)',
                    opacity: 0.7,
                    animation: 'blob 7s infinite',
                    animationDelay: '4s'
                }}></div>
            </div>

            {/* মূল কন্টেন্ট */}
            <div style={{
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                padding: '48px',
                maxWidth: '672px',
                width: '100%',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center'
            }}>
                {/* এরর আইকন */}
                <div style={{
                    marginBottom: '32px',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to right, #ef4444, #f97316)',
                            borderRadius: '50%',
                            filter: 'blur(20px)',
                            opacity: 0.7,
                            animation: 'pulse 2s infinite'
                        }}></div>
                        <div style={{
                            position: 'relative',
                            background: 'linear-gradient(to bottom right, #f87171, #f97316)',
                            padding: '24px',
                            borderRadius: '50%',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
                        }}>
                            <FiAlertTriangle style={{
                                width: '80px',
                                height: '80px',
                                color: 'white'
                            }} />
                        </div>
                    </div>
                </div>

                {/* 404 টেক্সট */}
                <h1 style={{
                    fontSize: '144px',
                    fontWeight: 900,
                    color: 'white',
                    marginBottom: '16px',
                    position: 'relative',
                    textShadow: '0 0 10px rgba(255,255,255,0.5)'
                }}>
                    404
                    <span style={{
                        position: 'absolute',
                        inset: 0,
                        color: '#c084fc',
                        opacity: 0.7,
                        animation: 'glitch1 2s infinite'
                    }}>404</span>
                    <span style={{
                        position: 'absolute',
                        inset: 0,
                        color: '#60a5fa',
                        opacity: 0.7,
                        animation: 'glitch2 2s infinite'
                    }}>404</span>
                </h1>


                <p style={{
                    color: '#d1d5db',
                    fontSize: '18px',
                    marginBottom: '48px',
                    maxWidth: '448px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    The page you&apos;re looking for has drifted into the cosmic void.
                    Let&apos;s navigate you back to safety.
                </p>

                {/* বাটন */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '16px',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>


                    <Link href="/" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 24px',
                        background: 'linear-gradient(to right, #9333ea, #db2777)',
                        color: 'white',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        transform: 'scale(1)',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
                    }}>
                        <HiOutlineHome style={{ width: '20px', height: '20px' }} />
                        <span style={{ fontWeight: 500 }}>Back to Home</span>
                    </Link>
                </div>

            </div>

            {/* অ্যানিমেশন স্টাইল */}
            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 0.7; transform: scale(1); }
                    50% { opacity: 0.9; transform: scale(1.1); }
                }
                
                @keyframes glitch1 {
                    0%, 100% { transform: translate(0); }
                    20% { transform: translate(-2px, 2px); }
                    40% { transform: translate(-2px, -2px); }
                    60% { transform: translate(2px, 2px); }
                    80% { transform: translate(2px, -2px); }
                }
                
                @keyframes glitch2 {
                    0%, 100% { transform: translate(0); }
                    20% { transform: translate(2px, -2px); }
                    40% { transform: translate(2px, 2px); }
                    60% { transform: translate(-2px, -2px); }
                    80% { transform: translate(-2px, 2px); }
                }
                
                .hover-grow:hover {
                    transform: scale(1.05);
                }
            `}</style>
        </div>
    )
}
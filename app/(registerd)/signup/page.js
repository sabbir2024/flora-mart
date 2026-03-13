import Social from "../components/Social";
import SignUpForm from "./components/SignUpForm";

export default function page() {
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
                    {/* হেডার */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Fabric<spun className='text-info'>Flora</spun> Wold</h2>
                        <p className="text-gray-600">Please create to your account</p>
                    </div>


                    {/* সোশ্যাল লগইন */}
                    <Social />

                    {/* অথবা divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    {/* লগইন ফর্ম */}
                    <SignUpForm />
                </div>
            </div>

        </div>
    );
}
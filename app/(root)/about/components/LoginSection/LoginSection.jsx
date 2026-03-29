export default function LoginSection() {
    return (
        <section
            id="login"
            className="max-w-7xl mx-auto px-4 md:px-6 py-20 font-bold grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
        >

            <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    Access Your Portfolio
                </h2>

                <p className="text-gray-500 mb-6">
                    Login to manage orders and access dashboard.
                </p>

                <div className="bg-gray-100 text-black p-4 rounded-xl text-sm">
                    Dashboard UI depends on your role (Admin / User)
                </div>
            </div>

            <div className="bg-white text-black font-bold p-6 md:p-10 rounded-xl shadow">

                <h3 className="text-xl font-bold mb-6">Secure Login</h3>

                <form className="space-y-4">

                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full bg-gray-100 text-black px-4 py-3 rounded-md outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-gray-100 text-black px-4 py-3 rounded-md outline-none"
                    />

                    <button className="w-full bg-orange-600 text-white py-3 rounded-xl">
                        Sign In
                    </button>

                </form>

            </div>

        </section>
    );
}
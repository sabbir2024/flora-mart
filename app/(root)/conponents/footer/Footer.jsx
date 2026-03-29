export default function Footer() {
    return (
        <footer className="bg-zinc-100 dark:bg-zinc-900 font-bold w-full mt-auto">

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-12 py-12 md:py-16 max-w-screen-2xl mx-auto">

                {/* Brand */}
                <div className="md:col-span-1">
                    <div className="text-xl font-black text-orange-600 dark:text-orange-300 mb-4">
                        Fabric Flora
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed max-w-xs">
                        Elevating the everyday through curated design and intentional living.
                        Silence is the ultimate luxury.
                    </p>
                </div>

                {/* Discover */}
                <div className="flex flex-col gap-4">
                    <span className="text-xs uppercase tracking-widest text-orange-600 font-bold">
                        Discover
                    </span>
                    <a className="text-zinc-400 dark:text-zinc-500 hover:text-orange-500 transition-colors text-xs uppercase tracking-widest">
                        Shop All
                    </a>
                    <a className="text-zinc-400 dark:text-zinc-500 hover:text-orange-500 transition-colors text-xs uppercase tracking-widest">
                        New Arrivals
                    </a>
                    <a className="text-zinc-400 dark:text-zinc-500 hover:text-orange-500 transition-colors text-xs uppercase tracking-widest">
                        Sustainability
                    </a>
                </div>

                {/* Connect */}
                <div className="flex flex-col gap-4">
                    <span className="text-xs uppercase tracking-widest text-orange-600 font-bold">
                        Connect
                    </span>
                    <a className="text-zinc-400 dark:text-zinc-500 hover:text-orange-500 transition-colors text-xs uppercase tracking-widest">
                        Privacy Policy
                    </a>
                    <a className="text-zinc-400 dark:text-zinc-500 hover:text-orange-500 transition-colors text-xs uppercase tracking-widest">
                        Terms of Service
                    </a>
                    <a className="text-zinc-400 dark:text-zinc-500 hover:text-orange-500 transition-colors text-xs uppercase tracking-widest">
                        Contact Us
                    </a>
                </div>

                {/* Newsletter */}
                <div className="flex flex-col gap-4">
                    <span className="text-xs uppercase tracking-widest text-orange-600 font-bold">
                        Newsletter
                    </span>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Email"
                            className="bg-zinc-200 dark:bg-zinc-800 rounded-l-md px-4 py-2 w-full text-xs outline-none"
                        />
                        <button className="bg-orange-600 text-white px-4 py-2 rounded-r-md text-xs font-bold">
                            Join
                        </button>
                    </div>
                </div>

            </div>

            {/* Bottom */}
            <div className="px-4 md:px-12 py-6 border-t border-zinc-200 dark:border-zinc-800 text-center text-[10px] text-zinc-400 tracking-widest uppercase">
                © 2026 Fabric Flora. All rights reserved.
            </div>

        </footer>
    );
}
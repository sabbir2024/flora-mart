export default function page() {
    return (
        <>
            {/* Main Content Shell */}
            <main className="">

                {/* Content Canvas */}
                <div className="p-10 max-w-7xl w-full mx-auto">
                    {/* Header & Breadcrumb */}
                    <div className="mb-10">
                        <nav className="flex items-center gap-2 text-xs font-semibold tracking-wider text-on-surface-variant/60 mb-2">
                            <a className="hover:text-primary transition-colors" href="#">DASHBOARD</a>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-on-surface-variant">SETTINGS</span>
                        </nav>
                        <h2 className="text-4xl font-extrabold tracking-tighter text-on-surface">Settings</h2>
                    </div>

                    {/* Asymmetric Bento-like Content Area */}
                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* Inner Navigation Sidebar (The Shell) */}
                        <nav className="w-full lg:w-64 flex flex-col gap-2 shrink-0">
                            <button className="flex items-center justify-between px-5 py-4 bg-surface-container-lowest text-primary rounded-2xl shadow-sm group transition-all">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                                    <span className="font-bold text-sm">General</span>
                                </div>
                                <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                            </button>
                            <button className="flex items-center justify-between px-5 py-4 hover:bg-surface-container-low text-on-surface-variant rounded-2xl transition-all">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined">shield</span>
                                    <span className="font-medium text-sm">Security</span>
                                </div>
                            </button>
                            <button className="flex items-center justify-between px-5 py-4 hover:bg-surface-container-low text-on-surface-variant rounded-2xl transition-all">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined">notifications</span>
                                    <span className="font-medium text-sm">Notifications</span>
                                </div>
                            </button>
                            <button className="flex items-center justify-between px-5 py-4 hover:bg-surface-container-low text-on-surface-variant rounded-2xl transition-all">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined">group</span>
                                    <span className="font-medium text-sm">Team Members</span>
                                </div>
                            </button>
                            <button className="flex items-center justify-between px-5 py-4 hover:bg-surface-container-low text-on-surface-variant rounded-2xl transition-all">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined">payments</span>
                                    <span className="font-medium text-sm">Billing</span>
                                </div>
                            </button>
                        </nav>

                        {/* Settings Panels */}
                        <div className="flex-grow space-y-10">
                            {/* General Profile Card */}
                            <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-[0_4px_40px_rgba(0,0,0,0.02)] border border-outline-variant/10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="relative group cursor-pointer">
                                        <img className="w-24 h-24 rounded-2xl object-cover ring-4 ring-surface-container-low transition-transform group-hover:scale-105" data-alt="high-quality portrait of a smiling executive on a plain minimalist light gray background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxWM0lkj5L7zxGZJgfppLmiiCFSFtNmN0Kw_2AjcVu5QBj9paUesmK4yRojtfc69ASFNCEmQlLMVxorvSketQhnMaN30vIHLVQgIWlt6YA1gJRadYx5mH4h2s-VItepRlOTQQP9dIz8o0nF1eu6HKqd4FvfkF47Ol5m6536bcJyZz6vMS9EcELJsfP2LzXbFrD1-z3OIudyVQt8Es48EIKQbi1GDZ9twKAbm1Ia2Xzke-WhHStmalPrQrwXzpEGNjNtmNbfe9M4Q" />
                                        <div className="absolute inset-0 bg-primary/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl backdrop-blur-[2px]">
                                            <span className="material-symbols-outlined text-on-primary">photo_camera</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-on-surface">Account Details</h3>
                                        <p className="text-sm text-on-surface-variant leading-relaxed max-w-sm">Update your personal information and profile picture displayed across the platform.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold tracking-widest text-on-surface-variant/80 uppercase">Full Name</label>
                                        <input className="w-full px-5 py-3.5 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all font-medium text-on-surface" type="text" defaultValue="Alexander Solaris" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold tracking-widest text-on-surface-variant/80 uppercase">Email Address</label>
                                        <input className="w-full px-5 py-3.5 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all font-medium text-on-surface" type="email" defaultValue="alex@solariscommerce.com" />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-bold tracking-widest text-on-surface-variant/80 uppercase">Biography</label>
                                        <textarea className="w-full px-5 py-3.5 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all font-medium text-on-surface" rows={3} defaultValue="Leading the digital commerce evolution at Solaris. Passionate about minimalism and performance-driven design systems."></textarea>
                                    </div>
                                </div>
                                <div className="mt-8 pt-8 border-t border-outline-variant/10 flex justify-end">
                                    <button className="px-8 py-3 bg-primary-gradient text-on-primary rounded-xl font-bold text-sm shadow-xl shadow-primary/30 active:scale-[0.98] transition-all">Save Changes</button>
                                </div>
                            </section>

                            {/* Security & Auth Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Password Section */}
                                <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-[0_4px_40px_rgba(0,0,0,0.02)] border border-outline-variant/10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-tertiary-container flex items-center justify-center text-tertiary">
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                                        </div>
                                        <h3 className="font-bold text-lg">Change Password</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <input className="w-full px-5 py-3 bg-surface-container-low border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20" placeholder="Current Password" type="password" />
                                        <input className="w-full px-5 py-3 bg-surface-container-low border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20" placeholder="New Password" type="password" />
                                        <button className="w-full py-3 bg-surface-container-high text-on-surface font-bold text-sm rounded-xl hover:bg-surface-container-highest transition-colors">Update Password</button>
                                    </div>
                                </section>

                                {/* 2FA Section */}
                                <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-[0_4px_40px_rgba(0,0,0,0.02)] border border-outline-variant/10 flex flex-col">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>phonelink_lock</span>
                                        </div>
                                        <h3 className="font-bold text-lg">Authenticator</h3>
                                    </div>
                                    <p className="text-sm text-on-surface-variant mb-6">Add an extra layer of security to your account with two-factor authentication.</p>
                                    <div className="mt-auto flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                                        <span className="font-bold text-xs uppercase tracking-widest">Status: <span className="text-primary ml-1">OFF</span></span>
                                        <button className="w-12 h-6 bg-surface-container-highest rounded-full relative transition-colors">
                                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                                        </button>
                                    </div>
                                </section>
                            </div>

                            {/* Notification Management (Asymmetric List) */}
                            <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-[0_4px_40px_rgba(0,0,0,0.02)] border border-outline-variant/10">
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-on-surface">Notification Center</h3>
                                    <p className="text-sm text-on-surface-variant">Control how and when you want to receive system updates.</p>
                                </div>
                                <div className="space-y-px bg-outline-variant/10">
                                    {/* Notification Row */}
                                    <div className="bg-surface-container-lowest py-5 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 flex items-center justify-center bg-surface-container-low rounded-full">
                                                <span className="material-symbols-outlined text-secondary">shopping_cart</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">New Orders</p>
                                                <p className="text-xs text-on-surface-variant">Instant notification for every new transaction.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <label className="flex flex-col items-center gap-1 group cursor-pointer">
                                                <div className="w-10 h-6 bg-primary rounded-full relative">
                                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                                </div>
                                                <span className="text-[9px] font-bold text-primary">EMAIL</span>
                                            </label>
                                            <label className="flex flex-col items-center gap-1 opacity-40">
                                                <div className="w-10 h-6 bg-surface-container-highest rounded-full relative">
                                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                                </div>
                                                <span className="text-[9px] font-bold">SMS</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Notification Row */}
                                    <div className="bg-surface-container-lowest py-5 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 flex items-center justify-center bg-surface-container-low rounded-full">
                                                <span className="material-symbols-outlined text-secondary">analytics</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">Analytics Reports</p>
                                                <p className="text-xs text-on-surface-variant">Weekly summaries of store performance.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <label className="flex flex-col items-center gap-1 group cursor-pointer">
                                                <div className="w-10 h-6 bg-primary rounded-full relative">
                                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                                </div>
                                                <span className="text-[9px] font-bold text-primary">EMAIL</span>
                                            </label>
                                            <label className="flex flex-col items-center gap-1 group cursor-pointer">
                                                <div className="w-10 h-6 bg-primary rounded-full relative">
                                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                                </div>
                                                <span className="text-[9px] font-bold text-primary">PUSH</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Notification Row */}
                                    <div className="bg-surface-container-lowest py-5 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 flex items-center justify-center bg-surface-container-low rounded-full">
                                                <span className="material-symbols-outlined text-error">warning</span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">Low Stock Alerts</p>
                                                <p className="text-xs text-on-surface-variant">Critical warnings for items with less than 5 units.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <label className="flex flex-col items-center gap-1 group cursor-pointer">
                                                <div className="w-10 h-6 bg-primary rounded-full relative">
                                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                                </div>
                                                <span className="text-[9px] font-bold text-primary">PUSH</span>
                                            </label>
                                            <label className="flex flex-col items-center gap-1 group cursor-pointer">
                                                <div className="w-10 h-6 bg-primary rounded-full relative">
                                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                                </div>
                                                <span className="text-[9px] font-bold text-primary">SMS</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Team Section (Clean Grid) */}
                            <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-[0_4px_40px_rgba(0,0,0,0.02)] border border-outline-variant/10">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-on-surface">Team Access</h3>
                                        <p className="text-sm text-on-surface-variant">Manage members and their system permissions.</p>
                                    </div>
                                    <button className="px-5 py-2.5 bg-surface-container-low text-on-surface rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-surface-container-high transition-colors">
                                        <span className="material-symbols-outlined text-sm">person_add</span>
                                        Invite Member
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {/* Team Member */}
                                    <div className="p-4 bg-surface-container-low/50 rounded-2xl border border-transparent hover:border-primary/20 transition-all flex items-center gap-4">
                                        <img className="w-12 h-12 rounded-xl object-cover" data-alt="headshot of a confident young woman with a vibrant friendly expression in professional creative attire" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDXszyaiYLrFFPHI9A1fSFaH5smVTC4plLv7VKWkvFZa78Cs-Tgnb2HsUS8ftxFj2M2eacEr5gmRn0btLOK-t8SeWr2pBVUYT6x9kihtHsc44AtdcyUtbEDY61yYG2lfFUh4XRPpvkCViUwT3HqKeGFFm5ZhtxrG0JlS-6FlPcLvK46kd7ywgvyUitRVc3aYIkoK6XNJ1McNoH223DAYGh2g_LwRXYX9_kOFBL5wtFt9uq2VfNa8bEbgvI3wfv6xCWwPoSI39_bg" />
                                        <div className="overflow-hidden">
                                            <p className="font-bold text-sm truncate">Elena Vance</p>
                                            <span className="inline-block px-2 py-0.5 bg-tertiary-container text-tertiary text-[10px] font-bold rounded-full uppercase">Editor</span>
                                        </div>
                                    </div>

                                    {/* Team Member */}
                                    <div className="p-4 bg-surface-container-low/50 rounded-2xl border border-transparent hover:border-primary/20 transition-all flex items-center gap-4">
                                        <img className="w-12 h-12 rounded-xl object-cover" data-alt="portrait of a focused professional man with glasses in a minimalist tech office setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMvNSpRoo4bT-hbFyZF1g7qB1-ZsLXSh7bdss7tAsM3iFgZS9g-8CrWtHZBdDPkvLNut6XH1D4b-8yGPse4VAlcvV-vQrgkU_fa2qpCIBg5nMF78U5Lgo1uBog90v7nVS1ROLFdrFlutlBAvmfAf3ES0M6ouGCQtSPKwjS6d-N_yScgdGRUdC-VuJ7CFGyId0GmWjJB3kLpHFrodKoLQhBZMtEXSv7cDvVqcqXiN-ve-wf07nM65Ea588b6wBNVQm0ImSt_OEDjw" />
                                        <div className="overflow-hidden">
                                            <p className="font-bold text-sm truncate">Marcus Chen</p>
                                            <span className="inline-block px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded-full uppercase">Viewer</span>
                                        </div>
                                    </div>

                                    {/* Team Member */}
                                    <div className="p-4 bg-surface-container-low/50 rounded-2xl border border-transparent hover:border-primary/20 transition-all flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">JD</div>
                                        <div className="overflow-hidden">
                                            <p className="font-bold text-sm truncate">Jane Doe</p>
                                            <span className="inline-block px-2 py-0.5 bg-primary-container/20 text-primary text-[10px] font-bold rounded-full uppercase">Admin</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
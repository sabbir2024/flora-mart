export default function page() {
    return (
        <>
            {/* Main Content Canvas */}
            <main className="">


                {/* Page Canvas */}
                <div className="p-8 max-w-7xl mx-auto flex flex-col gap-10">
                    {/* Header Section */}
                    <div className="flex justify-between items-end">
                        <div>
                            <span className="text-primary font-bold tracking-[0.2em] text-[10px] uppercase block mb-2">Performance Overview</span>
                            <h1 className="text-4xl font-extrabold text-on-surface tracking-tighter leading-tight">Analytics &amp; Insights</h1>
                        </div>
                        <div className="bg-surface-container-low p-1.5 rounded-2xl flex items-center gap-1">
                            <button className="px-4 py-2 text-sm font-bold text-on-surface-variant hover:text-on-surface transition-colors">7D</button>
                            <button className="px-5 py-2 text-sm font-bold bg-white text-primary rounded-xl shadow-sm">Last 30 Days</button>
                            <button className="px-4 py-2 text-sm font-bold text-on-surface-variant hover:text-on-surface transition-colors">90D</button>
                            <div className="w-[1px] h-4 bg-outline-variant/30 mx-1"></div>
                            <button className="px-4 py-2 text-sm font-bold text-on-surface-variant flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">calendar_today</span>
                                Custom
                            </button>
                        </div>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Card 1 */}
                        <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm hover:scale-[1.02] transition-all duration-300 group">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <span className="material-symbols-outlined">payments</span>
                                </div>
                                <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                                    <span className="material-symbols-outlined text-xs mr-1">trending_up</span>
                                    12.5%
                                </span>
                            </div>
                            <p className="text-on-surface-variant text-sm font-medium mb-1">Total Revenue</p>
                            <h3 className="text-3xl font-extrabold text-on-surface tracking-tight">$124,500.00</h3>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm hover:scale-[1.02] transition-all duration-300 group">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 bg-tertiary/5 rounded-2xl flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-white transition-colors duration-300">
                                    <span className="material-symbols-outlined">shopping_basket</span>
                                </div>
                                <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                                    <span className="material-symbols-outlined text-xs mr-1">trending_up</span>
                                    4.2%
                                </span>
                            </div>
                            <p className="text-on-surface-variant text-sm font-medium mb-1">Avg. Order Value</p>
                            <h3 className="text-3xl font-extrabold text-on-surface tracking-tight">$85.20</h3>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm hover:scale-[1.02] transition-all duration-300 group">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 bg-primary-fixed/10 rounded-2xl flex items-center justify-center text-primary-fixed group-hover:bg-primary-fixed group-hover:text-on-primary-container transition-colors duration-300">
                                    <span className="material-symbols-outlined">ads_click</span>
                                </div>
                                <span className="flex items-center text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg">
                                    <span className="material-symbols-outlined text-xs mr-1">trending_down</span>
                                    0.8%
                                </span>
                            </div>
                            <p className="text-on-surface-variant text-sm font-medium mb-1">Conversion Rate</p>
                            <h3 className="text-3xl font-extrabold text-on-surface tracking-tight">3.4%</h3>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm hover:scale-[1.02] transition-all duration-300 group">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 bg-secondary/5 rounded-2xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                                    <span className="material-symbols-outlined">person_pin_circle</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-xs font-bold text-on-surface-variant">Live</span>
                                </div>
                            </div>
                            <p className="text-on-surface-variant text-sm font-medium mb-1">Active Visitors</p>
                            <h3 className="text-3xl font-extrabold text-on-surface tracking-tight">142</h3>
                        </div>
                    </div>

                    {/* Main Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Revenue Over Time - Large Bento Section */}
                        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-[2rem] shadow-sm relative overflow-hidden">
                            <div className="flex justify-between items-start mb-12">
                                <div>
                                    <h4 className="text-xl font-bold text-on-surface tracking-tight">Revenue Over Time</h4>
                                    <p className="text-sm text-on-surface-variant mt-1">Daily revenue performance</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                                        <span className="text-xs font-bold text-on-surface-variant">Current</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-outline-variant/30"></div>
                                        <span className="text-xs font-bold text-on-surface-variant">Previous</span>
                                    </div>
                                </div>
                            </div>

                            {/* Chart Simulation - Editorial Style */}
                            <div className="relative h-64 w-full flex items-end gap-1">
                                {/* Background Grid Lines */}
                                <div className="absolute inset-0 flex flex-col justify-between">
                                    <div className="w-full h-[1px] bg-surface-container/50"></div>
                                    <div className="w-full h-[1px] bg-surface-container/50"></div>
                                    <div className="w-full h-[1px] bg-surface-container/50"></div>
                                    <div className="w-full h-[1px] bg-surface-container"></div>
                                </div>

                                {/* Smooth Curve SVG Simulation */}
                                <svg className="absolute inset-0 w-full h-full preserve-3d" preserveAspectRatio="none" viewBox="0 0 1000 200">
                                    <path d="M0,180 C100,160 200,190 300,120 C400,50 500,80 600,40 C700,0 800,60 900,30 C1000,0 1000,200 0,200 Z" fill="url(#orangeGradient)" fillOpacity="0.1"></path>
                                    <path d="M0,180 C100,160 200,190 300,120 C400,50 500,80 600,40 C700,0 800,60 900,30" fill="none" stroke="#a63400" strokeLinecap="round" strokeWidth="4"></path>
                                    <defs>
                                        <linearGradient id="orangeGradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#a63400"></stop>
                                            <stop offset="100%" stopColor="white" stopOpacity="0"></stop>
                                        </linearGradient>
                                    </defs>
                                </svg>

                                {/* Points & Labels */}
                                <div className="absolute inset-0 flex justify-between px-2 pt-10">
                                    <div className="h-full flex flex-col justify-end items-center">
                                        <div className="w-2.5 h-2.5 rounded-full border-2 border-white bg-primary shadow-sm mb-[20px]"></div>
                                        <span className="text-[10px] font-bold text-outline-variant mt-2 uppercase">Oct 01</span>
                                    </div>
                                    <div className="h-full flex flex-col justify-end items-center">
                                        <div className="w-2.5 h-2.5 rounded-full border-2 border-white bg-primary shadow-sm mb-[80px]"></div>
                                        <span className="text-[10px] font-bold text-outline-variant mt-2 uppercase">Oct 10</span>
                                    </div>
                                    <div className="h-full flex flex-col justify-end items-center">
                                        <div className="w-2.5 h-2.5 rounded-full border-2 border-white bg-primary shadow-sm mb-[160px]"></div>
                                        <span className="text-[10px] font-bold text-outline-variant mt-2 uppercase">Oct 20</span>
                                    </div>
                                    <div className="h-full flex flex-col justify-end items-center">
                                        <div className="w-2.5 h-2.5 rounded-full border-2 border-white bg-primary shadow-sm mb-[170px]"></div>
                                        <span className="text-[10px] font-bold text-outline-variant mt-2 uppercase">Oct 30</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sales by Category - Donut Chart Section */}
                        <div className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-sm flex flex-col">
                            <h4 className="text-xl font-bold text-on-surface tracking-tight mb-8">Sales by Category</h4>
                            <div className="relative flex-grow flex items-center justify-center py-6">
                                {/* Radial Chart Visual */}
                                <div className="w-48 h-48 rounded-full border-[18px] border-surface-container relative flex items-center justify-center">
                                    {/* Simulated segments */}
                                    <div className="absolute inset-[-18px] w-[216px] h-[216px] rounded-full border-[18px] border-primary border-r-transparent border-b-transparent -rotate-12"></div>
                                    <div className="absolute inset-[-18px] w-[216px] h-[216px] rounded-full border-[18px] border-tertiary border-l-transparent border-t-transparent border-b-transparent rotate-[100deg]"></div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Total Sales</p>
                                        <p className="text-2xl font-black text-on-surface leading-none mt-1">1,429</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-3 mt-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                                        <span className="text-sm font-medium text-on-surface-variant">Home Decor</span>
                                    </div>
                                    <span className="text-sm font-bold text-on-surface">45%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-tertiary"></div>
                                        <span className="text-sm font-medium text-on-surface-variant">Tableware</span>
                                    </div>
                                    <span className="text-sm font-bold text-on-surface">32%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-primary-container"></div>
                                        <span className="text-sm font-medium text-on-surface-variant">Textiles</span>
                                    </div>
                                    <span className="text-sm font-bold text-on-surface">23%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Performance Table & Insights */}
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                        {/* Top Selling Products Table */}
                        <div className="xl:col-span-3 bg-white p-8 rounded-[2rem] shadow-sm">
                            <div className="flex justify-between items-center mb-10">
                                <h4 className="text-xl font-bold text-on-surface tracking-tight">Top Selling Products</h4>
                                <button className="text-sm font-bold text-primary hover:underline underline-offset-4 decoration-2">View Full Inventory</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-on-surface-variant border-b border-surface-container">
                                            <th className="pb-6 px-4">Product Details</th>
                                            <th className="pb-6 px-4">Category</th>
                                            <th className="pb-6 px-4">Units Sold</th>
                                            <th className="pb-6 px-4">Revenue</th>
                                            <th className="pb-6 px-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-surface-container/50">
                                        <tr className="group">
                                            <td className="py-6 px-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 bg-surface-container-low rounded-2xl overflow-hidden flex-shrink-0">
                                                        <img alt="Artisan Vase" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="close-up of a minimalist ceramic vase with textured matte finish on a clean white surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATkzIhEe9asSsPXT3DmqaggqtGTG7kPCL7hRiom5L41YhnAc1aBXFlH0SPO3bwiCOP0ricM3W0rWZwd3NfjeUMTUZgdnWYMKQNIG7MDAPHSfqOD1V70ymuLt5jo6p5IJ7uQI_j2TLgexX04vz1E8zXD-0oi4bFeJlsByqbNELbskqIAfB8QsmlXy6HBhH8DxP7h_d0L_L5Eh_bplFZb250E_PJ3gHamx7Ykp2tstR_YH5U0an2G6VjIl4RBGJu1ZyXUeKox6o3kQ" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-on-surface group-hover:text-primary transition-colors">Artisan Terrazzo Vase</p>
                                                        <p className="text-xs text-on-surface-variant">SKU: SOL-4921</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-6 px-4"><span className="text-sm font-medium text-on-surface-variant">Home Decor</span></td>
                                            <td className="py-6 px-4"><span className="text-sm font-bold text-on-surface">1,240</span></td>
                                            <td className="py-6 px-4"><span className="text-sm font-bold text-on-surface">$31,000.00</span></td>
                                            <td className="py-6 px-4">
                                                <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-extrabold uppercase rounded-full">Low Stock</span>
                                            </td>
                                        </tr>
                                        <tr className="group">
                                            <td className="py-6 px-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 bg-surface-container-low rounded-2xl overflow-hidden flex-shrink-0">
                                                        <img alt="Linen Pillows" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="luxury set of high-quality linen pillows in earthy tones arranged on a modern designer chair" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKy58tj9s0yKC_vNfGHs5V9Nh_DK_qErvFJxrMrjhoqMHQ4shpOGaG8z3PR5tHjddsX-6IF5xsqoAQdkMj3RlyfcIyPnyCETHDBXd-kPgmw9MMOzm1FpgicMGQ76PmOFUk5Lk5jZDMbAXmVwa5dNj1f6igJdIQYUf1cHe2rFZu1pef4QKkctMSE9EiV8rGE3e_OHWNO9zQ_DlJLv0Jw3fX887tO6nvEajMY6Tz1v2CyXVky2NUBBQ4BJOhl1I2yV6glOlhAsdD6Q" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-on-surface group-hover:text-primary transition-colors">Premium Linen Set</p>
                                                        <p className="text-xs text-on-surface-variant">SKU: SOL-8273</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-6 px-4"><span className="text-sm font-medium text-on-surface-variant">Textiles</span></td>
                                            <td className="py-6 px-4"><span className="text-sm font-bold text-on-surface">892</span></td>
                                            <td className="py-6 px-4"><span className="text-sm font-bold text-on-surface">$22,300.00</span></td>
                                            <td className="py-6 px-4">
                                                <span className="px-3 py-1 bg-surface-container text-on-surface-variant text-[10px] font-extrabold uppercase rounded-full">In Stock</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Engagement Insights / Customer Demographics */}
                        <div className="bg-[#2c2f30] p-8 rounded-[2rem] shadow-xl text-white flex flex-col">
                            <h4 className="text-xl font-bold tracking-tight mb-8">Traffic Sources</h4>
                            <div className="flex flex-col gap-8 flex-grow">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-xs font-bold tracking-wider uppercase text-outline-variant">
                                        <span>Organic Search</span>
                                        <span>58%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full editorial-gradient w-[58%] rounded-full"></div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-xs font-bold tracking-wider uppercase text-outline-variant">
                                        <span>Social Media</span>
                                        <span>24%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-tertiary w-[24%] rounded-full"></div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-xs font-bold tracking-wider uppercase text-outline-variant">
                                        <span>Direct Link</span>
                                        <span>18%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-white/40 w-[18%] rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12 bg-white/5 p-6 rounded-2xl border border-white/5">
                                <p className="text-xs text-outline-variant font-medium mb-2">Insight Highlight</p>
                                <p className="text-sm leading-relaxed">
                                    <span className="text-primary-fixed-dim font-bold">Organic Search</span> traffic is up by <span className="text-green-400 font-bold">12%</span> this month. Focus on SEO-optimized blog content for the holiday season.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
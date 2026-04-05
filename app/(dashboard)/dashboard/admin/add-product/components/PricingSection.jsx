// components/PricingSection.jsx
'use client';

export default function PricingSection({ basePrice, comparePrice, onBasePriceChange, onComparePriceChange, errors }) {
    return (
        <section className="bg-white dark:bg-gray-800 p-5 md:p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-600 dark:text-orange-400">payments</span>
                Pricing
            </h3>
            <div className="space-y-4 md:space-y-6">
                <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold mb-2">
                        Base Price <span className="text-red-500 dark:text-red-400">*</span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400 dark:text-gray-500">$</span>
                        <input
                            value={basePrice}
                            onChange={onBasePriceChange}
                            className={`w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl pl-8 pr-4 py-3 md:py-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-orange-500/20 dark:focus:ring-orange-400/20 focus:border-orange-500 dark:focus:border-orange-400 transition-all ${errors.basePrice ? 'ring-2 ring-red-500 dark:ring-red-400 border-red-500 dark:border-red-400' : ''
                                }`}
                            placeholder="0.00"
                            type="number"
                            step="0.01"
                        />
                    </div>
                    {errors.basePrice && (
                        <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.basePrice}</p>
                    )}
                </div>
                <div>
                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold mb-2">
                        Compare at Price
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400 dark:text-gray-500">$</span>
                        <input
                            value={comparePrice}
                            onChange={onComparePriceChange}
                            className={`w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl pl-8 pr-4 py-3 md:py-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-orange-500/20 dark:focus:ring-orange-400/20 focus:border-orange-500 dark:focus:border-orange-400 transition-all ${errors.comparePrice ? 'ring-2 ring-red-500 dark:ring-red-400 border-red-500 dark:border-red-400' : ''
                                }`}
                            placeholder="0.00"
                            type="number"
                            step="0.01"
                        />
                    </div>
                    {errors.comparePrice && (
                        <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.comparePrice}</p>
                    )}
                </div>
            </div>
        </section>
    );
}
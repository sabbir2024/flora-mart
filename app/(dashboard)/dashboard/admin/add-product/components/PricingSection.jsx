// components/PricingSection.jsx
'use client';

export default function PricingSection({ basePrice, comparePrice, onBasePriceChange, onComparePriceChange, errors }) {
    return (
        <section className="bg-surface-container-lowest p-5 md:p-8 rounded-xl shadow-sm">
            <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">payments</span>
                Pricing
            </h3>
            <div className="space-y-4 md:space-y-6">
                <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">
                        Base Price <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-neutral-400">$</span>
                        <input
                            value={basePrice}
                            onChange={onBasePriceChange}
                            className={`w-full bg-surface-container-highest border-none rounded-xl pl-8 pr-4 py-3 md:py-4 text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all ${errors.basePrice ? 'ring-2 ring-red-500' : ''
                                }`}
                            placeholder="0.00"
                            type="number"
                            step="0.01"
                        />
                    </div>
                    {errors.basePrice && (
                        <p className="text-red-500 text-xs mt-1">{errors.basePrice}</p>
                    )}
                </div>
                <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">
                        Compare at Price
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-neutral-400">$</span>
                        <input
                            value={comparePrice}
                            onChange={onComparePriceChange}
                            className={`w-full bg-surface-container-highest border-none rounded-xl pl-8 pr-4 py-3 md:py-4 text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all ${errors.comparePrice ? 'ring-2 ring-red-500' : ''
                                }`}
                            placeholder="0.00"
                            type="number"
                            step="0.01"
                        />
                    </div>
                    {errors.comparePrice && (
                        <p className="text-red-500 text-xs mt-1">{errors.comparePrice}</p>
                    )}
                </div>
            </div>
        </section>
    );
}
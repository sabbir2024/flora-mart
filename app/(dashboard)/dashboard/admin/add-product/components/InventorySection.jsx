// components/InventorySection.jsx
'use client';

export default function InventorySection({ sku, quantity, weight, onSkuChange, onQuantityChange, onWeightChange, onQuantityIncrement, onQuantityDecrement, errors }) {
    return (
        <section className="bg-surface-container-lowest p-5 md:p-8 rounded-xl shadow-sm">
            <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">inventory</span>
                Inventory
            </h3>
            <div className="space-y-4 md:space-y-6">
                <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">
                        SKU <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={sku}
                        onChange={onSkuChange}
                        className={`w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 md:py-4 text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all ${errors.sku ? 'ring-2 ring-red-500' : ''
                            }`}
                        placeholder="SLRS-VSSL-01"
                        type="text"
                    />
                    {errors.sku && (
                        <p className="text-red-500 text-xs mt-1">{errors.sku}</p>
                    )}
                </div>
                <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">
                        Quantity
                    </label>
                    <div className="flex items-center gap-2 md:gap-3">
                        <button
                            type="button"
                            onClick={onQuantityDecrement}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-surface-container-high flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                        >
                            <span className="material-symbols-outlined text-base md:text-lg">remove</span>
                        </button>
                        <input
                            value={quantity}
                            onChange={onQuantityChange}
                            className={`flex-1 bg-surface-container-highest border-none rounded-xl px-4 py-3 md:py-4 text-center text-sm font-bold focus:ring-2 focus:ring-primary/20 ${errors.quantity ? 'ring-2 ring-red-500' : ''
                                }`}
                            type="number"
                        />
                        <button
                            type="button"
                            onClick={onQuantityIncrement}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-surface-container-high flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                        >
                            <span className="material-symbols-outlined text-base md:text-lg">add</span>
                        </button>
                    </div>
                    {errors.quantity && (
                        <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
                    )}
                </div>
                <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">
                        Weight (kg)
                    </label>
                    <input
                        value={weight}
                        onChange={onWeightChange}
                        className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 md:py-4 text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                    />
                </div>
            </div>
        </section>
    );
}
// components/InventorySection.jsx
'use client';

export default function InventorySection({ sku, quantity, weight, onSkuChange, onQuantityChange, onWeightChange, onQuantityIncrement, onQuantityDecrement, errors }) {
    return (
        <section className="bg-surface-container-lowest dark:bg-gray-800 p-5 md:p-8 rounded-xl shadow-sm dark:shadow-gray-900/50">
            <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-on-surface dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary dark:text-orange-400">inventory</span>
                Inventory
            </h3>
            <div className="space-y-4 md:space-y-6">
                <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-500 dark:text-gray-400 font-bold mb-2">
                        SKU <span className="text-red-500 dark:text-red-400">*</span>
                    </label>
                    <input
                        value={sku}
                        onChange={onSkuChange}
                        className={`w-full bg-surface-container-highest dark:bg-gray-900 border-none rounded-xl px-4 py-3 md:py-4 text-sm dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary/20 dark:focus:ring-orange-400/20 transition-all ${errors.sku ? 'ring-2 ring-red-500 dark:ring-red-400' : ''
                            }`}
                        placeholder="SLRS-VSSL-01"
                        type="text"
                    />
                    {errors.sku && (
                        <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.sku}</p>
                    )}
                </div>
                <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-500 dark:text-gray-400 font-bold mb-2">
                        Quantity
                    </label>
                    <div className="flex items-center gap-2 md:gap-3">
                        <button
                            type="button"
                            onClick={onQuantityDecrement}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-surface-container-high dark:bg-gray-700 flex items-center justify-center hover:bg-primary dark:hover:bg-orange-600 hover:text-white transition-all dark:text-gray-200"
                        >
                            <span className="material-symbols-outlined text-base md:text-lg">remove</span>
                        </button>
                        <input
                            value={quantity}
                            onChange={onQuantityChange}
                            className={`flex-1 bg-surface-container-highest dark:bg-gray-900 border-none rounded-xl px-4 py-3 md:py-4 text-center text-sm font-bold dark:text-white focus:ring-2 focus:ring-primary/20 dark:focus:ring-orange-400/20 ${errors.quantity ? 'ring-2 ring-red-500 dark:ring-red-400' : ''
                                }`}
                            type="number"
                        />
                        <button
                            type="button"
                            onClick={onQuantityIncrement}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-surface-container-high dark:bg-gray-700 flex items-center justify-center hover:bg-primary dark:hover:bg-orange-600 hover:text-white transition-all dark:text-gray-200"
                        >
                            <span className="material-symbols-outlined text-base md:text-lg">add</span>
                        </button>
                    </div>
                    {errors.quantity && (
                        <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.quantity}</p>
                    )}
                </div>
                <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-500 dark:text-gray-400 font-bold mb-2">
                        Weight (kg)
                    </label>
                    <input
                        value={weight}
                        onChange={onWeightChange}
                        className="w-full bg-surface-container-highest dark:bg-gray-900 border-none rounded-xl px-4 py-3 md:py-4 text-sm dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary/20 dark:focus:ring-orange-400/20 transition-all"
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                    />
                </div>
            </div>
        </section>
    );
}
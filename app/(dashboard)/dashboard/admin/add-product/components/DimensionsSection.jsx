// components/DimensionsSection.jsx
'use client';

export default function DimensionsSection({ dimensions, onDimensionChange }) {
    return (
        <section className="bg-surface-container-lowest dark:bg-gray-800 p-5 md:p-8 rounded-xl shadow-sm dark:shadow-gray-900/50">
            <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-on-surface dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary dark:text-orange-400">straighten</span>
                Dimensions (cm)
            </h3>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
                <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-500 dark:text-gray-400 font-bold mb-2">
                        Length
                    </label>
                    <input
                        name="length"
                        value={dimensions.length}
                        onChange={onDimensionChange}
                        className="w-full bg-surface-container-highest dark:bg-gray-900 border-none rounded-xl px-4 py-3 md:py-4 text-sm dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary/20 dark:focus:ring-orange-400/20 transition-all text-center"
                        placeholder="0"
                        type="number"
                    />
                </div>
                <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-500 dark:text-gray-400 font-bold mb-2">
                        Width
                    </label>
                    <input
                        name="width"
                        value={dimensions.width}
                        onChange={onDimensionChange}
                        className="w-full bg-surface-container-highest dark:bg-gray-900 border-none rounded-xl px-4 py-3 md:py-4 text-sm dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary/20 dark:focus:ring-orange-400/20 transition-all text-center"
                        placeholder="0"
                        type="number"
                    />
                </div>
                <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-500 dark:text-gray-400 font-bold mb-2">
                        Height
                    </label>
                    <input
                        name="height"
                        value={dimensions.height}
                        onChange={onDimensionChange}
                        className="w-full bg-surface-container-highest dark:bg-gray-900 border-none rounded-xl px-4 py-3 md:py-4 text-sm dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary/20 dark:focus:ring-orange-400/20 transition-all text-center"
                        placeholder="0"
                        type="number"
                    />
                </div>
            </div>
        </section>
    );
}
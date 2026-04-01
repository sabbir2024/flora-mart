// components/DimensionsSection.jsx
'use client';

export default function DimensionsSection({ dimensions, onDimensionChange }) {
    return (
        <section className="bg-surface-container-lowest p-5 md:p-8 rounded-xl shadow-sm">
            <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">straighten</span>
                Dimensions (cm)
            </h3>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
                <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">
                        Length
                    </label>
                    <input
                        name="length"
                        value={dimensions.length}
                        onChange={onDimensionChange}
                        className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 md:py-4 text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all text-center"
                        placeholder="0"
                        type="number"
                    />
                </div>
                <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">
                        Width
                    </label>
                    <input
                        name="width"
                        value={dimensions.width}
                        onChange={onDimensionChange}
                        className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 md:py-4 text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all text-center"
                        placeholder="0"
                        type="number"
                    />
                </div>
                <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">
                        Height
                    </label>
                    <input
                        name="height"
                        value={dimensions.height}
                        onChange={onDimensionChange}
                        className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 md:py-4 text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all text-center"
                        placeholder="0"
                        type="number"
                    />
                </div>
            </div>
        </section>
    );
}
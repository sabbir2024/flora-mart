// components/ProductPreviewCard.jsx
'use client';

export default function ProductPreviewCard({ productName, category, brand, basePrice, comparePrice, descriptionHtml, previewImage }) {
    return (
        <div className="bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden border border-neutral-100/50">
            <div className="bg-neutral-100/30 p-3 md:p-4 border-b border-neutral-100 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Live Preview</span>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-400/20"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400/20"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400/20"></div>
                </div>
            </div>
            <div className="p-0">
                <div className="relative h-48 md:h-64 bg-surface-container-low group overflow-hidden">
                    <img
                        className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700"
                        src={previewImage || 'https://via.placeholder.com/400x400?text=No+Image'}
                        alt="Product preview"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container text-[10px] font-bold uppercase tracking-wider rounded-full">
                            Preview
                        </span>
                    </div>
                </div>
                <div className="p-5 md:p-8 space-y-3 md:space-y-4">
                    <div>
                        <h4 className="text-xl md:text-2xl font-extrabold tracking-tight text-on-surface">
                            {productName || "Artisan Vessel No. 04"}
                        </h4>
                        <p className="text-neutral-400 text-xs md:text-sm mt-1 uppercase tracking-widest font-medium">
                            {category} / {brand || "Solaris"}
                        </p>
                    </div>
                    <div className="flex items-end gap-3">
                        <span className="text-2xl md:text-3xl font-black text-primary">
                            ${basePrice || "0.00"}
                        </span>
                        {comparePrice && (
                            <span className="text-neutral-300 line-through text-sm md:text-base mb-1">
                                ${comparePrice}
                            </span>
                        )}
                    </div>
                    <div className="pt-4 border-t border-neutral-100">
                        <div
                            className="text-xs text-neutral-500 leading-relaxed prose prose-sm max-w-none"
                            style={{ direction: 'ltr', textAlign: 'left' }}
                            dangerouslySetInnerHTML={{
                                __html: descriptionHtml || "<p>Product description will appear here...</p>"
                            }}
                        />
                    </div>
                    <button
                        type="button"
                        className="w-full py-3 md:py-4 rounded-xl border-2 border-primary text-primary font-bold text-xs md:text-sm mt-4 hover:bg-primary hover:text-white transition-all uppercase tracking-widest"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
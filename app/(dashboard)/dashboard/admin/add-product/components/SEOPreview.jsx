// components/SEOPreview.jsx
'use client';

export default function SEOPreview({ productName, category, descriptionHtml }) {
    const generateSlug = (name) => {
        return name ? name.toLowerCase().replace(/\s+/g, '-') : "artisan-vessel-04";
    };

    const stripHtml = (html) => {
        if (!html) return "Elevate your living space with our hand-thrown artisan vessel...";
        return html.replace(/<[^>]*>/g, '').substring(0, 120);
    };

    return (
        <div className="bg-surface-container-lowest p-5 md:p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-neutral-500">
                    SEO Preview
                </h4>
                <span className="material-symbols-outlined text-sm text-primary cursor-pointer hover:opacity-70">
                    edit
                </span>
            </div>
            <div className="space-y-1">
                <p className="text-blue-700 font-medium text-xs md:text-sm truncate">
                    {productName || "Artisan Vessel No. 04"} | {category} | Solaris
                </p>
                <p className="text-green-800 text-[10px] truncate">
                    https://solaris.store/products/{generateSlug(productName)}
                </p>
                <div className="text-neutral-500 text-[10px] leading-relaxed line-clamp-2">
                    {stripHtml(descriptionHtml)}
                </div>
            </div>
        </div>
    );
}
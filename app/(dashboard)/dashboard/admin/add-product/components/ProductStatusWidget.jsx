// components/ProductStatusWidget.jsx
'use client';

export default function ProductStatusWidget({ isVisible, isPreorder, onVisibleChange, onPreorderChange }) {
    return (
        <div className="bg-surface-container-lowest p-5 md:p-6 rounded-xl shadow-sm">
            <h4 className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-4">
                Product Status
            </h4>
            <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-xs md:text-sm font-medium text-on-surface group-hover:text-primary transition-colors">
                        Visible on Storefront
                    </span>
                    <div className="relative inline-flex items-center">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isVisible}
                            onChange={onVisibleChange}
                        />
                        <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </div>
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-xs md:text-sm font-medium text-on-surface group-hover:text-primary transition-colors">
                        Allow Pre-orders
                    </span>
                    <div className="relative inline-flex items-center">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isPreorder}
                            onChange={onPreorderChange}
                        />
                        <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </div>
                </label>
            </div>
        </div>
    );
}
"use client"

import React from "react";

export default function EditProduct() {
    const [formData, setFormData] = React.useState({
        _id: "69e65e71ef7a5812d8a8faec",
        productName: "Vyvylabs D04 Mini Portable Desktop Fan with LED light",
        category: "Tech",
        brand: "China",
        description: "<p>Model: D04</p><p>Battery Capacity: 1800mAh</p><p>Battery Life: Approx. 1-7 hours</p><p>Material: ABS</p><p>3-Adjustable Speed, Built-in LED l</p><p>ightMaterial: ABS</p><p>Input: 5V-1A (Type-C)</p><p>Power Consumption: 6.5W</p><p>Battery Capacity: 1800mAh</p><p>Battery Life: 1-7 hours</p><p>Speed Settings: 3 Gears</p>",
        basePrice: 2290,
        comparePrice: 4500,
        sku: "fan",
        quantity: 100,
        isVisible: true,
        isPreorder: false,
        weight: 1.2,
        tags: [],
        images: [
            "https://i.ibb.co/TCpNfrW/image-1.jpg",
            "https://i.ibb.co/7tZ5vjqQ/image-3.jpg"
        ],
        primaryImage: "https://i.ibb.co/TCpNfrW/image-1.jpg",
        createdAt: "2026-04-20T17:12:16.388Z"
    });

    const handleSave = () => {
        console.log("Product updated:", formData);
        console.log("Product updated via FAB!");
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleQuantityChange = (delta) => {
        setFormData(prev => ({
            ...prev,
            quantity: Math.max(0, prev.quantity + delta)
        }));
    };

    const handleImageRemove = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handlePrimaryImageChange = (imageUrl) => {
        setFormData(prev => ({
            ...prev,
            primaryImage: imageUrl
        }));
    };

    return (
        <>
            {/* Main Content Area */}
            <main className="">

                <div className="p-8 max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h2 className="text-4xl font-black tracking-tight text-on-surface mb-2">Edit Catalog Item</h2>
                            <p className="text-on-surface-variant/70 font-medium">Last updated: {new Date(formData.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="px-8 py-3.5 text-on-surface font-bold bg-surface-container-high rounded-2xl hover:bg-surface-container-highest transition-all duration-300">
                                Discard
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-8 py-3.5 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                            >
                                Update Product
                            </button>
                        </div>
                    </div>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-12 gap-8">
                        {/* Left Column: Form */}
                        <div className="col-span-12 lg:col-span-8 space-y-8">
                            {/* General Information */}
                            <section className="bg-surface-container-low p-8 rounded-2xl">
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="material-symbols-outlined text-primary">info</span>
                                    <h3 className="text-xl font-bold tracking-tight">General Information</h3>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-[0.1em] mb-2">Product Title</label>
                                        <input
                                            className="w-full bg-surface-container-highest/50 border-none rounded-xl px-4 py-4 text-on-surface font-semibold focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                                            type="text"
                                            value={formData.productName}
                                            onChange={(e) => handleInputChange('productName', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-[0.1em] mb-2">Category</label>
                                            <select
                                                className="w-full bg-surface-container-highest/50 border-none rounded-xl px-4 py-4 text-on-surface font-semibold focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all appearance-none"
                                                value={formData.category}
                                                onChange={(e) => handleInputChange('category', e.target.value)}
                                            >
                                                <option>Tech</option>
                                                <option>Home Decor</option>
                                                <option>Kitchenware</option>
                                                <option>Lighting</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-[0.1em] mb-2">Brand</label>
                                            <input
                                                className="w-full bg-surface-container-highest/50 border-none rounded-xl px-4 py-4 text-on-surface font-semibold focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                                                type="text"
                                                value={formData.brand}
                                                onChange={(e) => handleInputChange('brand', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-[0.1em] mb-2">Description</label>
                                        <div className="bg-surface-container-highest/50 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:bg-white transition-all">
                                            <div className="flex items-center gap-2 p-3 bg-surface-container/30 border-b border-outline-variant/10">
                                                <button className="p-1.5 hover:bg-white rounded-md transition-colors"><span className="material-symbols-outlined text-lg">format_bold</span></button>
                                                <button className="p-1.5 hover:bg-white rounded-md transition-colors"><span className="material-symbols-outlined text-lg">format_italic</span></button>
                                                <button className="p-1.5 hover:bg-white rounded-md transition-colors"><span className="material-symbols-outlined text-lg">format_list_bulleted</span></button>
                                                <div className="w-px h-4 bg-outline-variant/20 mx-1"></div>
                                                <button className="p-1.5 hover:bg-white rounded-md transition-colors"><span className="material-symbols-outlined text-lg">link</span></button>
                                            </div>
                                            <textarea
                                                className="w-full bg-transparent border-none focus:ring-0 p-4 text-on-surface leading-relaxed"
                                                rows={6}
                                                value={formData.description.replace(/<[^>]*>/g, '')}
                                                onChange={(e) => handleInputChange('description', e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Media Assets */}
                            <section className="bg-surface-container-low p-8 rounded-2xl">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary">image</span>
                                        <h3 className="text-xl font-bold tracking-tight">Media Assets</h3>
                                    </div>
                                    <span className="text-xs font-bold text-on-surface-variant/40">{formData.images.length} / 5 Slots Used</span>
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    {formData.images.map((img, idx) => (
                                        <div key={idx} className={idx === 0 ? "col-span-2 relative group" : "relative group"}>
                                            <img className="w-full h-64 object-cover rounded-xl shadow-md" alt={`product image ${idx + 1}`} src={img} />
                                            <div className="absolute top-3 right-3 flex gap-2">
                                                <button
                                                    onClick={() => handlePrimaryImageChange(img)}
                                                    className="w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-primary shadow-sm hover:bg-white transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-sm">star</span>
                                                </button>
                                                <button
                                                    onClick={() => handleImageRemove(idx)}
                                                    className="w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-error shadow-sm hover:bg-white transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-sm">delete</span>
                                                </button>
                                            </div>
                                            {formData.primaryImage === img && (
                                                <div className="absolute bottom-3 left-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded">Primary</div>
                                            )}
                                        </div>
                                    ))}
                                    {Array.from({ length: Math.max(0, 5 - formData.images.length) }).map((_, idx) => (
                                        <button key={`empty-${idx}`} className="h-64 border-2 border-dashed border-outline-variant/30 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-white/50 hover:border-primary/40 transition-all group">
                                            <span className="material-symbols-outlined text-on-surface-variant/30 group-hover:text-primary transition-colors">add_photo_alternate</span>
                                            <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">Add Image</span>
                                        </button>
                                    ))}
                                </div>
                            </section>

                            {/* Pricing & Inventory */}
                            <section className="bg-surface-container-low p-8 rounded-2xl">
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="material-symbols-outlined text-primary">payments</span>
                                    <h3 className="text-xl font-bold tracking-tight">Pricing &amp; Inventory</h3>
                                </div>
                                <div className="grid grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-[0.1em] mb-2">Price ($)</label>
                                        <input
                                            className="w-full bg-surface-container-highest/50 border-none rounded-xl px-4 py-4 text-on-surface font-semibold focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                                            type="number"
                                            value={formData.basePrice}
                                            onChange={(e) => handleInputChange('basePrice', parseFloat(e.target.value))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-[0.1em] mb-2">Compare at Price</label>
                                        <input
                                            className="w-full bg-surface-container-highest/50 border-none rounded-xl px-4 py-4 text-on-surface font-semibold focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                                            type="number"
                                            value={formData.comparePrice}
                                            onChange={(e) => handleInputChange('comparePrice', parseFloat(e.target.value))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-[0.1em] mb-2">SKU</label>
                                        <input
                                            className="w-full bg-surface-container-highest/50 border-none rounded-xl px-4 py-4 text-on-surface font-semibold focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                                            type="text"
                                            value={formData.sku}
                                            onChange={(e) => handleInputChange('sku', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-[0.1em] mb-2">Weight (kg)</label>
                                        <input
                                            className="w-full bg-surface-container-highest/50 border-none rounded-xl px-4 py-4 text-on-surface font-semibold focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                                            type="number"
                                            step="0.1"
                                            value={formData.weight}
                                            onChange={(e) => handleInputChange('weight', parseFloat(e.target.value))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-[0.1em] mb-2">Quantity</label>
                                        <div className="flex items-center bg-surface-container-highest/50 rounded-xl px-2">
                                            <button
                                                onClick={() => handleQuantityChange(-1)}
                                                className="w-10 h-10 flex items-center justify-center text-on-surface-variant/60 hover:text-primary"
                                            >
                                                <span className="material-symbols-outlined">remove</span>
                                            </button>
                                            <input
                                                className="w-full bg-transparent border-none text-center font-bold focus:ring-0"
                                                type="text"
                                                value={formData.quantity}
                                                readOnly
                                            />
                                            <button
                                                onClick={() => handleQuantityChange(1)}
                                                className="w-10 h-10 flex items-center justify-center text-on-surface-variant/60 hover:text-primary"
                                            >
                                                <span className="material-symbols-outlined">add</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Right Column: Previews & Settings */}
                        <div className="col-span-12 lg:col-span-4 space-y-8">
                            {/* Visibility & SEO */}
                            <section className="bg-surface-container-low p-6 rounded-2xl">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-primary">visibility</span>
                                            <span className="font-bold">Storefront Visibility</span>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                checked={formData.isVisible}
                                                onChange={(e) => handleInputChange('isVisible', e.target.checked)}
                                                className="sr-only peer"
                                                type="checkbox"
                                            />
                                            <div className="w-12 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-primary">schedule</span>
                                            <span className="font-bold">Pre-order</span>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                checked={formData.isPreorder}
                                                onChange={(e) => handleInputChange('isPreorder', e.target.checked)}
                                                className="sr-only peer"
                                                type="checkbox"
                                            />
                                            <div className="w-12 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                    <div className="pt-6 border-t border-outline-variant/10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="material-symbols-outlined text-primary">search</span>
                                            <span className="font-bold">SEO Preview</span>
                                        </div>
                                        <div className="p-4 bg-white rounded-xl border border-outline-variant/10">
                                            <p className="text-blue-600 text-sm font-semibold truncate">solaris-studio.com › products › {formData.sku}</p>
                                            <h4 className="text-primary-dim text-lg font-bold leading-tight mt-1">{formData.productName} | Solaris Studio</h4>
                                            <p className="text-on-surface-variant/70 text-xs mt-1 line-clamp-2">{formData.description.replace(/<[^>]*>/g, '').substring(0, 120)}...</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Tags Section */}
                            <section className="bg-surface-container-low p-6 rounded-2xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="material-symbols-outlined text-primary">sell</span>
                                    <span className="font-bold">Tags</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.tags.map((tag, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-surface-container-highest rounded-full text-xs font-medium">{tag}</span>
                                    ))}
                                    <button className="px-3 py-1 border border-dashed border-outline-variant/30 rounded-full text-xs text-on-surface-variant/60 hover:border-primary/40 transition-colors">
                                        + Add Tag
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Footer spacing */}
                    <div className="h-20"></div>
                </div>
            </main>

            {/* Contextual FAB for quick update */}
            <button
                onClick={handleSave}
                className="fixed bottom-10 right-10 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all duration-300 z-50 md:hidden"
            >
                <span className="material-symbols-outlined text-3xl">done_all</span>
            </button>
        </>
    );
}
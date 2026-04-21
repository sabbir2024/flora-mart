// app/admin/products/add/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from '../RichTextEditor';
import ImageUploader from '../ImageUploader';
import PricingSection from '../PricingSection';
import InventorySection from '../InventorySection';
import ProductStatusWidget from '../ProductStatusWidget';
import SEOPreview from '../SEOPreview';
import { apiUrl } from '../../../../../../components/url';
import { IoIosStarHalf, IoMdStar } from 'react-icons/io';
import { FaCaretDown } from "react-icons/fa6"; import { IoStarOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';

export default function AddProduct() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Form state
    const [formData, setFormData] = useState({
        productName: '',
        category: 'Clothing',
        brand: '',
        description: '',
        basePrice: '',
        comparePrice: '',
        sku: '',
        quantity: 1,
        isVisible: true,
        isPreorder: false,
        tags: [],
        weight: '',
    });

    const [images, setImages] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const [descriptionHtml, setDescriptionHtml] = useState('');

    const categories = [
        'Clothing',
        'Baby',
        'Fitness',
        'Home',
        'Tech'
    ];

    const categoryIcons = {
        'Clothing & Fashion': '👕',
        'Baby Products': '👶',
        'Fitness': '💪',
        'Home & Decor': '🏠',
        'Tech & Gadgets': '📱'
    };

    const categoryColors = {
        'Clothing & Fashion': 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',
        'Baby Products': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
        'Fitness': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
        'Home & Decor': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
        'Tech & Gadgets': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
    };

    const handleImagesChange = (action) => {
        if (action.type === 'add') {
            setImages(prev => [...prev, ...action.images]);
            if (!previewImage && action.images.length > 0) {
                setPreviewImage(action.images[0].preview);
            }
        } else if (action.type === 'remove') {
            setImages(prev => {
                const filtered = prev.filter(img => img.id !== action.imageId);
                const removedImage = prev.find(img => img.id === action.imageId);
                if (removedImage?.preview === previewImage && filtered.length > 0) {
                    setPreviewImage(filtered[0].preview);
                } else if (filtered.length === 0) {
                    setPreviewImage(null);
                }
                return filtered;
            });
        } else if (action.type === 'error') {
            setErrors(prev => ({ ...prev, images: action.message }));
        } else if (action.type === 'clearError') {
            setErrors(prev => ({ ...prev, images: '' }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleQuantityChange = (e) => {
        setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }));
    };

    const handleQuantityIncrement = () => {
        setFormData(prev => ({ ...prev, quantity: prev.quantity + 1 }));
    };

    const handleQuantityDecrement = () => {
        setFormData(prev => ({ ...prev, quantity: Math.max(0, prev.quantity - 1) }));
    };

    const handleTagsChange = (e) => {
        const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
        setFormData(prev => ({ ...prev, tags: tagsArray }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
        else if (formData.productName.length < 3) newErrors.productName = 'Product name must be at least 3 characters';
        if (!formData.basePrice) newErrors.basePrice = 'Base price is required';
        else if (parseFloat(formData.basePrice) <= 0) newErrors.basePrice = 'Base price must be greater than 0';
        if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
        if (!formData.quantity || formData.quantity < 0) newErrors.quantity = 'Quantity must be 0 or greater';
        if (formData.comparePrice && parseFloat(formData.comparePrice) <= parseFloat(formData.basePrice)) {
            newErrors.comparePrice = 'Compare at price should be higher than base price';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);

        try {
            const imageUrls = images.map(img => img.uploadedUrl || img.displayUrl);

            const productData = {
                productName: formData.productName,
                category: formData.category,
                brand: formData.brand,
                description: descriptionHtml,
                basePrice: parseFloat(formData.basePrice),
                comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : null,
                sku: formData.sku,
                quantity: parseInt(formData.quantity),
                isVisible: formData.isVisible,
                isPreorder: formData.isPreorder,
                weight: formData.weight ? parseFloat(formData.weight) : null,

                tags: formData.tags,
                images: imageUrls,
                primaryImage: imageUrls[images.findIndex(img => img.preview === previewImage)] || imageUrls[0],
                createdAt: new Date().toISOString()
            };

            const response = await fetch(`${apiUrl}/add-product`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(productData)
            });

            const data = await response.json();
            if (data.success) {
                Swal.fire({
                    title: "Good job!",
                    text: data.message,
                    icon: "success",
                    background: '#1f2937',
                    color: '#fff'
                });
                setTimeout(() => router.push('/dashboard/admin/products'), 2000);
            } else {
                throw new Error(data.message || 'Failed to save product');
            }

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: error.message,
                background: '#1f2937',
                color: '#fff'
            });
            setErrors(prev => ({ ...prev, submit: error.message }));
            setTimeout(() => setErrors(prev => ({ ...prev, submit: '' })), 5000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDiscard = () => {
        if (confirm('Are you sure you want to discard all changes?')) router.back();
    };

    useEffect(() => {
        return () => images.forEach(image => URL.revokeObjectURL(image.preview));
    }, [images]);

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <form onSubmit={handleSubmit}>
                <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
                        <div className="space-y-1">
                            <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2 font-bold">
                                <span>Products</span>
                                <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                                <span className="text-orange-600 dark:text-orange-500">Add New</span>
                            </nav>
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Catalog Item</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">Create a new unique product entry for your global storefront.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={handleDiscard}
                                disabled={isLoading}
                                className="px-5 md:px-6 py-2.5 md:py-3 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs md:text-sm font-bold hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                            >
                                Discard
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-6 md:px-8 py-2.5 md:py-3 rounded-xl bg-linear-to-br from-orange-600 to-orange-700 dark:from-orange-500 dark:to-orange-600 text-white text-xs md:text-sm font-bold shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isLoading ? (<>Saving...</>) : ('Save Product')}
                            </button>
                        </div>
                    </div>

                    {errors.submit && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
                            {errors.submit}
                        </div>
                    )}

                    <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
                        {/* Left Column */}
                        <div className="col-span-12 lg:col-span-8 space-y-6 md:space-y-10">
                            {/* General Information */}
                            <section className="bg-white dark:bg-gray-900 p-5 md:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-orange-600 dark:text-orange-500">info</span>
                                    General Information
                                </h3>
                                <div className="space-y-4 md:space-y-6">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold mb-2">
                                            Product Name <span className="text-red-500 dark:text-red-400">*</span>
                                        </label>
                                        <input
                                            name="productName"
                                            value={formData.productName}
                                            onChange={handleInputChange}
                                            className={`w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 md:py-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:border-orange-500 transition-all ${errors.productName ? 'ring-2 ring-red-500 dark:ring-red-400' : ''}`}
                                            placeholder="e.g. Minimalist Ceramic Vessel"
                                            type="text"
                                        />
                                        {errors.productName && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.productName}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold mb-2">
                                                Category <span className="text-red-500 dark:text-red-400">*</span>
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 md:py-4 text-sm text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-orange-500/20 appearance-none cursor-pointer"
                                                >
                                                    {categories.map(cat => (
                                                        <option key={cat} value={cat}>
                                                            {categoryIcons[cat]} {cat}
                                                        </option>
                                                    ))}
                                                </select>
                                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"><FaCaretDown /></span>
                                            </div>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {categories.map(cat => (
                                                    <span
                                                        key={cat}
                                                        onClick={() => setFormData(prev => ({ ...prev, category: cat }))}
                                                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs cursor-pointer transition-all ${formData.category === cat ? categoryColors[cat] : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                                                    >
                                                        {categoryIcons[cat]} {cat}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold mb-2">Brand</label>
                                            <input
                                                name="brand"
                                                value={formData.brand}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 md:py-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                                placeholder="e.g. Nike, Apple, IKEA"
                                                type="text"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold mb-2">Description</label>
                                        <RichTextEditor value={descriptionHtml} onChange={setDescriptionHtml} placeholder="Describe the artisan quality and materials..." />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold mb-2">Tags (comma separated)</label>
                                        <input
                                            value={formData.tags.join(', ')}
                                            onChange={handleTagsChange}
                                            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 md:py-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                            placeholder="handmade, ceramic, minimalist"
                                            type="text"
                                        />
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {['premium', 'new arrival', 'best seller', 'limited edition', 'trending'].map(tag => (
                                                <span
                                                    key={tag}
                                                    onClick={() => setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }))}
                                                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Media Assets */}
                            <section className="bg-white dark:bg-gray-900 p-5 md:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                <div className="flex items-center justify-between mb-4 md:mb-6">
                                    <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                        <span className="material-symbols-outlined text-orange-600 dark:text-orange-500">image</span>
                                        Media Assets
                                    </h3>
                                    <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-widest">Max 10 files, 10MB each</span>
                                </div>
                                <ImageUploader images={images} onImagesChange={handleImagesChange} previewImage={previewImage} onSetPrimary={setPreviewImage} errors={errors} />
                            </section>

                            {/* Pricing & Inventory */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                                <PricingSection
                                    basePrice={formData.basePrice}
                                    comparePrice={formData.comparePrice}
                                    onBasePriceChange={(e) => setFormData(prev => ({ ...prev, basePrice: e.target.value }))}
                                    onComparePriceChange={(e) => setFormData(prev => ({ ...prev, comparePrice: e.target.value }))}
                                    errors={errors}
                                />
                                <InventorySection
                                    sku={formData.sku}
                                    quantity={formData.quantity}
                                    weight={formData.weight}
                                    onSkuChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                                    onQuantityChange={handleQuantityChange}
                                    onWeightChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                                    onQuantityIncrement={handleQuantityIncrement}
                                    onQuantityDecrement={handleQuantityDecrement}
                                    errors={errors}
                                />
                            </div>

                        </div>

                        {/* Right Column - Live Preview Cards */}
                        <aside className="col-span-12 lg:col-span-4 space-y-6 md:space-y-8">
                            {/* Preview Card 1: Product Listing Page View */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                                <div className="bg-linear-to-r from-orange-50 to-orange-100/30 dark:from-orange-950/30 dark:to-orange-900/20 p-3 md:p-4 border-b border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-500">Live Preview</span>
                                            <p className="text-[9px] text-gray-500 dark:text-gray-400 mt-0.5">Product Listing Page View</p>
                                        </div>
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 rounded-full bg-red-400/20"></div>
                                            <div className="w-2 h-2 rounded-full bg-yellow-400/20"></div>
                                            <div className="w-2 h-2 rounded-full bg-green-400/20"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="group cursor-pointer">
                                        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden aspect-square">
                                            <img
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                src={previewImage || 'https://via.placeholder.com/300x300?text=No+Image'}
                                                alt={formData.productName || "Product preview"}
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className="font-bold text-sm line-clamp-2 flex-1 text-gray-900 dark:text-white">
                                                    {formData.productName || "Product Name"}
                                                </h3>
                                                <p className="text-orange-600 dark:text-orange-500 font-bold text-sm whitespace-nowrap">
                                                    ${formData.basePrice || "0.00"}
                                                </p>
                                            </div>
                                            {formData.comparePrice && (
                                                <p className="text-xs text-gray-400 dark:text-gray-500 line-through">
                                                    ${formData.comparePrice}
                                                </p>
                                            )}
                                            <div className="flex items-center justify-between mt-1">
                                                <div className="flex text-orange-500 dark:text-orange-400">
                                                    <IoMdStar />
                                                    <IoMdStar />
                                                    <IoMdStar />
                                                    <IoMdStar />
                                                    <IoIosStarHalf />
                                                </div>
                                                <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full ${categoryColors[formData.category]}`}>
                                                    {categoryIcons[formData.category]} {formData.category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Preview Card 2: Product Details Page View */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                                <div className="bg-linear-to-r from-orange-50 to-orange-100/30 dark:from-orange-950/30 dark:to-orange-900/20 p-3 md:p-4 border-b border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-500">Live Preview</span>
                                            <p className="text-[9px] text-gray-500 dark:text-gray-400 mt-0.5">Product Details Page View</p>
                                        </div>
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 rounded-full bg-red-400/20"></div>
                                            <div className="w-2 h-2 rounded-full bg-yellow-400/20"></div>
                                            <div className="w-2 h-2 rounded-full bg-green-400/20"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex gap-3">
                                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0">
                                            <img
                                                className="w-full h-full object-cover"
                                                src={previewImage || 'https://via.placeholder.com/80x80?text=No+Image'}
                                                alt={formData.productName || "Product preview"}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-sm md:text-base text-gray-900 dark:text-white line-clamp-2">
                                                {formData.productName || "Product Name"}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="flex text-orange-500 dark:text-orange-400">
                                                    {[...Array(4)].map((_, i) => (
                                                        <IoMdStar key={i} className="text-xs" />
                                                    ))}
                                                    <IoIosStarHalf className="text-xs" />
                                                </div>
                                                <span className="text-[10px] text-gray-400 dark:text-gray-500">(12 reviews)</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-lg md:text-xl font-bold text-orange-600 dark:text-orange-500">
                                                    ${formData.basePrice || "0.00"}
                                                </span>
                                                {formData.comparePrice && (
                                                    <span className="text-xs text-gray-400 dark:text-gray-500 line-through">
                                                        ${formData.comparePrice}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="mt-3 max-h-32 overflow-y-auto">
                                                <div
                                                    className="prose prose-sm max-w-none dark:prose-invert"
                                                    style={{
                                                        fontSize: '0.75rem',
                                                        lineHeight: '1.5',
                                                        color: '#6b7280',
                                                        direction: 'ltr',
                                                        textAlign: 'left'
                                                    }}
                                                    dangerouslySetInnerHTML={{
                                                        __html: (() => {
                                                            if (!descriptionHtml || descriptionHtml === '<p><br></p>' || descriptionHtml === '<p></p>') {
                                                                return '<p class="text-gray-400 dark:text-gray-500">Product description will appear here...</p>';
                                                            }
                                                            return descriptionHtml;
                                                        })()
                                                    }}
                                                />
                                            </div>
                                            <button className="w-full mt-3 py-2 rounded-lg bg-orange-600 dark:bg-orange-500 text-white text-xs font-bold hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Preview Card 3: Cart/Quick View */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                                <div className="bg-linear-to-r from-orange-50 to-orange-100/30 dark:from-orange-950/30 dark:to-orange-900/20 p-3 md:p-4 border-b border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-500">Live Preview</span>
                                            <p className="text-[9px] text-gray-500 dark:text-gray-400 mt-0.5">Cart / Quick View</p>
                                        </div>
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 rounded-full bg-red-400/20"></div>
                                            <div className="w-2 h-2 rounded-full bg-yellow-400/20"></div>
                                            <div className="w-2 h-2 rounded-full bg-green-400/20"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0">
                                            <img
                                                className="w-full h-full object-cover"
                                                src={previewImage || 'https://via.placeholder.com/48x48?text=No+Image'}
                                                alt={formData.productName || "Product preview"}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-xs line-clamp-1 text-gray-900 dark:text-white">
                                                {formData.productName || "Product Name"}
                                            </h4>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-orange-600 dark:text-orange-500 font-bold text-sm">
                                                    ${formData.basePrice || "0.00"}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <button type="button" className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">-</button>
                                                    <span className="text-xs w-4 text-center text-gray-900 dark:text-white">1</span>
                                                    <button type="button" className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-500 dark:text-gray-400">Subtotal:</span>
                                            <span className="font-bold text-gray-900 dark:text-white">${formData.basePrice || "0.00"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <ProductStatusWidget
                                isVisible={formData.isVisible}
                                isPreorder={formData.isPreorder}
                                onVisibleChange={(e) => setFormData(prev => ({ ...prev, isVisible: e.target.checked }))}
                                onPreorderChange={(e) => setFormData(prev => ({ ...prev, isPreorder: e.target.checked }))}
                            />
                            <SEOPreview
                                productName={formData.productName}
                                category={formData.category}
                                descriptionHtml={descriptionHtml}
                            />
                        </aside>
                    </div>
                </div>
            </form>
        </main>
    );
}
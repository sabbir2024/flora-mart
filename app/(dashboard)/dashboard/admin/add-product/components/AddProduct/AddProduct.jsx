// app/admin/products/add/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from '../RichTextEditor';
import ImageUploader from '../ImageUploader';
import PricingSection from '../PricingSection';
import InventorySection from '../InventorySection';
import DimensionsSection from '../DimensionsSection';
import ProductPreviewCard from '../ProductPreviewCard';
import ProductStatusWidget from '../ProductStatusWidget';
import SEOPreview from '../SEOPreview';
import { apiUrl } from '../../../../../../components/url';

export default function AddProduct() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Form state
    const [formData, setFormData] = useState({
        productName: '',
        category: 'Home Decor',
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
        dimensions: { length: '', width: '', height: '' }
    });

    const [images, setImages] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const [descriptionHtml, setDescriptionHtml] = useState('');

    const categories = [
        'Home Decor', 'Furniture', 'Textiles', 'Lighting',
        'Accessories', 'Electronics', 'Footwear', 'Apparel',
        'Books', 'Toys', 'Sports', 'Beauty'
    ];

    // Handle image changes
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

    const handleDimensionChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            dimensions: { ...prev.dimensions, [name]: value }
        }));
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
            const submitData = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'dimensions') submitData.append('dimensions', JSON.stringify(formData.dimensions));
                else if (key === 'tags') submitData.append('tags', JSON.stringify(formData.tags));
                else if (key !== 'description') submitData.append(key, formData[key]);
            });
            submitData.append('description', descriptionHtml);
            images.forEach(image => submitData.append('images', image.file));
            submitData.append('primaryImageIndex', images.findIndex(img => img.preview === previewImage));

            const response = await fetch(`{${apiUrl}/products`, { method: 'POST', body: submitData });
            const data = await response.json();

            if (response.ok) {
                alert('Product created successfully!');
                router.push('dashboard/admin/products');
                router.refresh();
            } else {
                throw new Error(data.message || 'Failed to create product');
            }
        } catch (error) {
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
        <main className="min-h-screen bg-surface">
            <form onSubmit={handleSubmit}>
                <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
                        <div className="space-y-1">
                            <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-bold">
                                <span>Products</span>
                                <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                                <span className="text-primary">Add New</span>
                            </nav>
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface">Catalog Item</h2>
                            <p className="text-neutral-500 text-xs md:text-sm">Create a new unique product entry for your global storefront.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button type="button" onClick={handleDiscard} disabled={isLoading} className="px-5 md:px-6 py-2.5 md:py-3 rounded-xl bg-surface-container-high text-on-surface text-xs md:text-sm font-bold hover:bg-surface-container-highest transition-colors disabled:opacity-50">Discard</button>
                            <button type="submit" disabled={isLoading} className="px-6 md:px-8 py-2.5 md:py-3 rounded-xl bg-gradient-to-br from-primary to-primary-container text-white text-xs md:text-sm font-bold shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                                {isLoading ? (<>Saving...</>) : ('Save Product')}
                            </button>
                        </div>
                    </div>

                    {errors.submit && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{errors.submit}</div>}

                    <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
                        {/* Left Column */}
                        <div className="col-span-12 lg:col-span-8 space-y-6 md:space-y-10">
                            {/* General Information */}
                            <section className="bg-surface-container-lowest p-5 md:p-8 rounded-xl shadow-sm">
                                <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-on-surface flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">info</span> General Information
                                </h3>
                                <div className="space-y-4 md:space-y-6">
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">Product Name <span className="text-red-500">*</span></label>
                                        <input name="productName" value={formData.productName} onChange={handleInputChange} className={`w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 md:py-4 text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all ${errors.productName ? 'ring-2 ring-red-500' : ''}`} placeholder="e.g. Minimalist Ceramic Vessel" type="text" />
                                        {errors.productName && <p className="error-message text-red-500 text-xs mt-1">{errors.productName}</p>}
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">Category <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 md:py-4 text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer">
                                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                                </select>
                                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">expand_more</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">Brand</label>
                                            <input name="brand" value={formData.brand} onChange={handleInputChange} className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 md:py-4 text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Solaris Studio" type="text" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">Description</label>
                                        <RichTextEditor value={descriptionHtml} onChange={setDescriptionHtml} placeholder="Describe the artisan quality and materials..." />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2">Tags (comma separated)</label>
                                        <input value={formData.tags.join(', ')} onChange={handleTagsChange} className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 md:py-4 text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all" placeholder="handmade, ceramic, minimalist" type="text" />
                                    </div>
                                </div>
                            </section>

                            {/* Media Assets */}
                            <section className="bg-surface-container-lowest p-5 md:p-8 rounded-xl shadow-sm">
                                <div className="flex items-center justify-between mb-4 md:mb-6">
                                    <h3 className="text-base md:text-lg font-bold text-on-surface flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">image</span> Media Assets
                                    </h3>
                                    <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-widest">Max 10 files, 10MB each</span>
                                </div>
                                <ImageUploader images={images} onImagesChange={handleImagesChange} previewImage={previewImage} onSetPrimary={setPreviewImage} errors={errors} />
                            </section>

                            {/* Pricing & Inventory */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                                <PricingSection basePrice={formData.basePrice} comparePrice={formData.comparePrice} onBasePriceChange={(e) => setFormData(prev => ({ ...prev, basePrice: e.target.value }))} onComparePriceChange={(e) => setFormData(prev => ({ ...prev, comparePrice: e.target.value }))} errors={errors} />
                                <InventorySection sku={formData.sku} quantity={formData.quantity} weight={formData.weight} onSkuChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))} onQuantityChange={handleQuantityChange} onWeightChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))} onQuantityIncrement={handleQuantityIncrement} onQuantityDecrement={handleQuantityDecrement} errors={errors} />
                            </div>

                            {/* Dimensions */}
                            <DimensionsSection dimensions={formData.dimensions} onDimensionChange={handleDimensionChange} />
                        </div>

                        {/* Right Column */}
                        <aside className="col-span-12 lg:col-span-4 sticky top-24 space-y-6 md:space-y-8">
                            <ProductPreviewCard productName={formData.productName} category={formData.category} brand={formData.brand} basePrice={formData.basePrice} comparePrice={formData.comparePrice} descriptionHtml={descriptionHtml} previewImage={previewImage} />
                            <ProductStatusWidget isVisible={formData.isVisible} isPreorder={formData.isPreorder} onVisibleChange={(e) => setFormData(prev => ({ ...prev, isVisible: e.target.checked }))} onPreorderChange={(e) => setFormData(prev => ({ ...prev, isPreorder: e.target.checked }))} />
                            <SEOPreview productName={formData.productName} category={formData.category} descriptionHtml={descriptionHtml} />
                        </aside>
                    </div>
                </div>
            </form>
        </main>
    );
}
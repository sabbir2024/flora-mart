"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import RichTextEditor from "../../../add-product/components/RichTextEditor";
import ImageUploader from "../../../add-product/components/ImageUploader";
import { apiUrl } from "../../../../../../components/url";
import { useRouter } from "next/navigation";

export default function EditProduct({ product = {} }) {
    const [formData, setFormData] = useState(product);
    const [loading, setLoading] = useState(false);
    const [descriptionHtml, setDescriptionHtml] = useState(product.description || "");
    const [images, setImages] = useState([]);
    const [previewImage, setPreviewImage] = useState(product.primaryImage || null);
    const [errors, setErrors] = useState({});

    const router = useRouter();

    // Initialize images from product data on component mount
    useEffect(() => {
        if (product.images && product.images.length > 0) {
            const existingImages = product.images.map((img, index) => ({
                id: `existing-${index}`,
                preview: img,
                uploadedUrl: img,
                name: `image-${index}`,
                size: 0,
                type: 'image/jpeg',
                isExisting: true
            }));
            setImages(existingImages);
        }
        if (product.primaryImage) {
            setPreviewImage(product.primaryImage);
        }
        if (product.description) {
            setDescriptionHtml(product.description);
        }
    }, [product]);

    const handleSave = async () => {
        setLoading(true);

        // Prepare final data - only include fields that have changed
        const finalData = {
            productName: formData.productName,
            category: formData.category,
            brand: formData.brand,
            description: descriptionHtml,
            basePrice: formData.basePrice,
            comparePrice: formData.comparePrice,
            sku: formData.sku,
            quantity: formData.quantity,
            isVisible: formData.isVisible,
            isPreorder: formData.isPreorder,
            weight: formData.weight,
            tags: formData.tags || [],
            images: images.map(img => img.uploadedUrl || img.preview),
            primaryImage: previewImage
        };

        try {
            const response = await fetch(`${apiUrl}/products/${formData._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(finalData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Show success message
                Swal.fire({
                    title: "Success!",
                    text: "Product updated successfully",
                    icon: "success",
                    confirmButtonColor: "#a63400",
                    timer: 2000,
                    showConfirmButton: true
                });
                router.push("/dashboard/admin/products");
            } else {
                // Show error message
                Swal.fire({
                    title: "Error!",
                    text: result.error || "Failed to update product",
                    icon: "error",
                    confirmButtonColor: "#a63400"
                });
                console.error("Update failed:", result.error);
            }
        } catch (error) {
            // Show network error message
            Swal.fire({
                title: "Network Error!",
                text: "Failed to connect to server. Please try again.",
                icon: "error",
                confirmButtonColor: "#a63400"
            });
            console.error("Error updating product:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDiscard = async () => {
        const result = await Swal.fire({
            title: "Discard Changes?",
            text: "You have unsaved changes. Are you sure you want to discard them?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#a63400",
            cancelButtonColor: "#757778",
            confirmButtonText: "Yes, discard",
            cancelButtonText: "Cancel"
        });

        if (result.isConfirmed) {
            // Reset to original product data
            setFormData(product);
            setDescriptionHtml(product.description || "");
            setPreviewImage(product.primaryImage || null);

            // Reset images
            if (product.images && product.images.length > 0) {
                const existingImages = product.images.map((img, index) => ({
                    id: `existing-${index}`,
                    preview: img,
                    uploadedUrl: img,
                    name: `image-${index}`,
                    size: 0,
                    type: 'image/jpeg',
                    isExisting: true
                }));
                setImages(existingImages);
            } else {
                setImages([]);
            }

            Swal.fire({
                title: "Discarded!",
                text: "Your changes have been discarded",
                icon: "info",
                confirmButtonColor: "#a63400",
                timer: 1500,
                showConfirmButton: false
            });
        }
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
            quantity: Math.max(0, (prev.quantity || 0) + delta)
        }));
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

    const handleSetPrimary = (imageUrl) => {
        setPreviewImage(imageUrl);
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
                            <p className="text-on-surface-variant/70 font-medium">
                                Last updated: {formData.createdAt ? new Date(formData.createdAt).toLocaleString() : "N/A"}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleDiscard}
                                className="px-8 py-3.5 text-on-surface font-bold bg-surface-container-high rounded-2xl hover:bg-surface-container-highest transition-all duration-300"
                            >
                                Discard
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="px-8 py-3.5 bg-linear-to-br from-primary to-primary-container text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Updating..." : "Update Product"}
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
                                        <label className="block text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-2">
                                            Product Title
                                        </label>
                                        <input
                                            className="w-full bg-surface-container-highest/50 border-none rounded-xl px-4 py-4 text-on-surface font-semibold focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                                            type="text"
                                            value={formData.productName || ""}
                                            onChange={(e) => handleInputChange("productName", e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-2">
                                                Category
                                            </label>
                                            <select
                                                className="w-full bg-surface-container-highest/50 border-none rounded-xl px-4 py-4 text-on-surface font-semibold focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all appearance-none"
                                                value={formData.category || ""}
                                                onChange={(e) => handleInputChange("category", e.target.value)}
                                            >

                                                <option value="">Select Category</option>
                                                <option>Clothing</option>
                                                <option>Baby</option>
                                                <option>Fitness</option>
                                                <option>Decor</option>
                                                <option>Tech</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-2">
                                                Brand
                                            </label>
                                            <input
                                                className="w-full bg-surface-container-highest/50 border-none rounded-xl px-4 py-4 text-on-surface font-semibold focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                                                type="text"
                                                value={formData.brand || ""}
                                                onChange={(e) => handleInputChange("brand", e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <RichTextEditor
                                        value={descriptionHtml}
                                        onChange={setDescriptionHtml}
                                        placeholder="Describe the artisan quality and materials..."
                                    />
                                </div>
                            </section>

                            {/* Media Assets */}
                            <section className="bg-surface-container-low p-8 rounded-2xl">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary">image</span>
                                        <h3 className="text-xl font-bold tracking-tight">Media Assets</h3>
                                    </div>
                                    <span className="text-xs font-bold text-on-surface-variant/40">
                                        {images.length} / 5 Slots Used
                                    </span>
                                </div>
                                <ImageUploader
                                    images={images}
                                    onImagesChange={handleImagesChange}
                                    previewImage={previewImage}
                                    onSetPrimary={handleSetPrimary}
                                    errors={errors}
                                />
                            </section>

                            {/* Pricing & Inventory */}
                            <section className="bg-surface-container-low p-8 rounded-2xl">
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="material-symbols-outlined text-primary">payments</span>
                                    <h3 className="text-xl font-bold tracking-tight">Pricing &amp; Inventory</h3>
                                </div>
                                <div className="grid grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-2">
                                            Price ($)
                                        </label>
                                        <input
                                            className="w-full bg-surface-container-highest/50 border-none rounded-xl px-4 py-4 text-on-surface font-semibold focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                                            type="number"
                                            value={formData.basePrice || 0}
                                            onChange={(e) => handleInputChange("basePrice", parseFloat(e.target.value))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-2">
                                            Compare at Price
                                        </label>
                                        <input
                                            className="w-full bg-surface-container-highest/50 border-none rounded-xl px-4 py-4 text-on-surface font-semibold focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                                            type="number"
                                            value={formData.comparePrice || 0}
                                            onChange={(e) => handleInputChange("comparePrice", parseFloat(e.target.value))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-2">
                                            SKU
                                        </label>
                                        <input
                                            className="w-full bg-surface-container-highest/50 border-none rounded-xl px-4 py-4 text-on-surface font-semibold focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                                            type="text"
                                            value={formData.sku || ""}
                                            onChange={(e) => handleInputChange("sku", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-2">
                                            Weight (kg)
                                        </label>
                                        <input
                                            className="w-full bg-surface-container-highest/50 border-none rounded-xl px-4 py-4 text-on-surface font-semibold focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                                            type="number"
                                            step="0.1"
                                            value={formData.weight || 0}
                                            onChange={(e) => handleInputChange("weight", parseFloat(e.target.value))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-2">
                                            Quantity
                                        </label>
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
                                                value={formData.quantity || 0}
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
                                                checked={formData.isVisible || false}
                                                onChange={(e) => handleInputChange("isVisible", e.target.checked)}
                                                className="sr-only peer"
                                                type="checkbox"
                                            />
                                            <div className="w-12 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-primary">schedule</span>
                                            <span className="font-bold">Pre-order</span>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                checked={formData.isPreorder || false}
                                                onChange={(e) => handleInputChange("isPreorder", e.target.checked)}
                                                className="sr-only peer"
                                                type="checkbox"
                                            />
                                            <div className="w-12 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                    <div className="pt-6 border-t border-outline-variant/10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="material-symbols-outlined text-primary">search</span>
                                            <span className="font-bold">SEO Preview</span>
                                        </div>
                                        <div className="p-4 bg-white rounded-xl border border-outline-variant/10">
                                            <p className="text-blue-600 text-sm font-semibold truncate">
                                                solaris-studio.com › products › {formData.sku || "product"}
                                            </p>
                                            <h4 className="text-primary-dim text-lg font-bold leading-tight mt-1">
                                                {formData.productName || "Product Name"} | Solaris Studio
                                            </h4>
                                            <p className="text-on-surface-variant/70 text-xs mt-1 line-clamp-2">
                                                {descriptionHtml.replace(/<[^>]*>/g, "").substring(0, 120)}...
                                            </p>
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
                                    {(formData.tags || []).map((tag, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-surface-container-highest rounded-full text-xs font-medium">
                                            {tag}
                                        </span>
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
                disabled={loading}
                className="fixed bottom-10 right-10 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all duration-300 z-50 md:hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span className="material-symbols-outlined text-3xl">done_all</span>
            </button>
        </>
    );
}
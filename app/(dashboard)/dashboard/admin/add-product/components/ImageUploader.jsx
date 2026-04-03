// components/ImageUploader.jsx
'use client';

import { useRef, useState } from 'react';

export default function ImageUploader({ images, onImagesChange, previewImage, onSetPrimary, errors }) {
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({});

    // ImageBB API Key - You need to get this from https://api.imgbb.com/
    const IMAGEBB_API_KEY = process.env.NEXT_PUBLIC_IMAGEBB_API_KEY;

    const uploadToImageBB = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('key', IMAGEBB_API_KEY);

        try {
            const response = await fetch('https://api.imgbb.com/1/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                return {
                    success: true,
                    url: data.data.url,
                    display_url: data.data.display_url,
                    delete_url: data.data.delete_url,
                    title: data.data.title
                };
            } else {
                throw new Error(data.error?.message || 'Upload failed');
            }
        } catch (error) {
            console.error('ImageBB upload error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => {
            const isValidType = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/gif'].includes(file.type);
            const isValidSize = file.size <= 32 * 1024 * 1024; // ImageBB supports up to 32MB
            return isValidType && isValidSize;
        });

        if (validFiles.length !== files.length) {
            onImagesChange({
                type: 'error',
                message: 'Only JPEG, PNG, WEBP, GIF files up to 32MB are allowed'
            });
            setTimeout(() => onImagesChange({ type: 'clearError' }), 3000);
            return;
        }

        setUploading(true);

        // Upload each file to ImageBB
        const uploadedImages = [];
        for (const file of validFiles) {
            setUploadProgress(prev => ({ ...prev, [file.name]: 'uploading' }));

            const result = await uploadToImageBB(file);

            if (result.success) {
                uploadedImages.push({
                    file: file,
                    preview: URL.createObjectURL(file),
                    uploadedUrl: result.url,
                    displayUrl: result.display_url,
                    deleteUrl: result.delete_url,
                    id: Date.now() + Math.random(),
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    uploadedAt: new Date().toISOString()
                });
                setUploadProgress(prev => ({ ...prev, [file.name]: 'success' }));
            } else {
                setUploadProgress(prev => ({ ...prev, [file.name]: 'error' }));
                onImagesChange({
                    type: 'error',
                    message: `Failed to upload ${file.name}: ${result.error}`
                });
                setTimeout(() => onImagesChange({ type: 'clearError' }), 3000);
            }
        }

        if (uploadedImages.length > 0) {
            onImagesChange({ type: 'add', images: uploadedImages });
        }

        setUploading(false);

        // Clear upload progress after 2 seconds
        setTimeout(() => setUploadProgress({}), 2000);
    };

    const removeImage = (imageId) => {
        const imageToRemove = images.find(img => img.id === imageId);

        // Optional: Call ImageBB delete API if you have delete URL
        if (imageToRemove?.deleteUrl) {
            // You can implement delete functionality here
            // fetch(imageToRemove.deleteUrl, { method: 'DELETE' });
        }

        onImagesChange({ type: 'remove', imageId });

        // Revoke object URL to avoid memory leaks
        if (imageToRemove?.preview) {
            URL.revokeObjectURL(imageToRemove.preview);
        }
    };

    const setAsPrimary = (imagePreview) => {
        onSetPrimary(imagePreview);
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div>
            {errors.images && (
                <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-xs">{errors.images}</p>
                </div>
            )}

            {uploading && (
                <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                        <p className="text-blue-600 text-xs">Uploading images to ImageBB...</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                {/* Upload Area */}
                <div
                    onClick={() => !uploading && fileInputRef.current?.click()}
                    className={`col-span-2 row-span-2 group relative aspect-square bg-surface-container-low rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/30 hover:border-primary/50 transition-all cursor-pointer overflow-hidden ${uploading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/jpg,image/gif"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={uploading}
                    />
                    <div className="z-10 text-center px-4">
                        <span className="material-symbols-outlined text-3xl md:text-4xl text-primary mb-2">
                            add_photo_alternate
                        </span>
                        <p className="text-xs font-bold text-on-surface">Upload Images</p>
                        <p className="text-[10px] text-neutral-400 mt-1">JPEG, PNG, WEBP, GIF</p>
                        <p className="text-[9px] text-neutral-400 mt-0.5">Max 32MB per file</p>
                    </div>
                </div>

                {/* Display Images */}
                {images.map((image) => (
                    <div
                        key={image.id}
                        className={`aspect-square bg-surface-container-high rounded-xl relative overflow-hidden group cursor-pointer transition-all ${previewImage === image.preview ? 'ring-2 ring-primary ring-offset-2' : ''
                            }`}
                        onClick={() => setAsPrimary(image.preview)}
                    >
                        <img
                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                            src={image.preview}
                            alt={image.name || 'Product'}
                        />

                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setAsPrimary(image.preview);
                                }}
                                className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                                title="Set as primary"
                            >
                                <span className="material-symbols-outlined text-xs text-primary">star</span>
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeImage(image.id);
                                }}
                                className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                                title="Delete"
                            >
                                <span className="material-symbols-outlined text-xs text-error">delete</span>
                            </button>
                        </div>

                        {/* Primary Badge */}
                        {previewImage === image.preview && (
                            <div className="absolute top-2 left-2 bg-primary text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold z-10">
                                Primary
                            </div>
                        )}

                        {/* File Info Tooltip */}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[8px] p-1 translate-y-full group-hover:translate-y-0 transition-transform">
                            <div className="truncate">{image.name}</div>
                            <div>{formatFileSize(image.size)}</div>
                            {image.uploadedUrl && (
                                <div className="text-[7px] text-green-300">✓ Uploaded to Cloud</div>
                            )}
                        </div>
                    </div>
                ))}

                {/* Add More Button */}
                {images.length > 0 && images.length < 10 && !uploading && (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square bg-surface-container-high rounded-xl border-2 border-dashed border-outline-variant/30 flex items-center justify-center hover:bg-surface-container-low transition-colors cursor-pointer group"
                    >
                        <div className="text-center">
                            <span className="material-symbols-outlined text-neutral-400 group-hover:text-primary transition-colors">add</span>
                            <p className="text-[8px] text-neutral-400 mt-1">Add more</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Upload Progress Indicators */}
            {Object.keys(uploadProgress).length > 0 && (
                <div className="mt-3 space-y-1">
                    {Object.entries(uploadProgress).map(([fileName, status]) => (
                        <div key={fileName} className="flex items-center gap-2 text-xs">
                            {status === 'uploading' && (
                                <>
                                    <div className="animate-spin rounded-full h-3 w-3 border-2 border-blue-500 border-t-transparent"></div>
                                    <span className="text-blue-600">{fileName} - Uploading...</span>
                                </>
                            )}
                            {status === 'success' && (
                                <>
                                    <span className="text-green-500">✓</span>
                                    <span className="text-green-600">{fileName} - Uploaded successfully</span>
                                </>
                            )}
                            {status === 'error' && (
                                <>
                                    <span className="text-red-500">✗</span>
                                    <span className="text-red-600">{fileName} - Upload failed</span>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Image Count Info */}
            {images.length > 0 && (
                <p className="text-[10px] text-neutral-400 mt-3">
                    {images.length} image{images.length !== 1 ? 's' : ''} uploaded •
                    <span className="text-primary ml-1">Click on image to set as primary</span>
                </p>
            )}
        </div>
    );
}
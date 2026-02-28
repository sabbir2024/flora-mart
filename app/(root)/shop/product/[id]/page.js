export default async function Page({ params }) {
    const resolvedParams = await params;
    const id = resolvedParams?.id;
    console.log("Requested Product ID:", id);

    const products = [
        {
            "_id": "dfdfds",
            "product_url": "https://i.ibb.co.com/2Y7b75Yq/bag.jpg",
            "product_name": "Waterproof and Sweat Proof Hair Dye Color",
            "price": {
                "currency": "BDT",
                "original_price": 1190.00,
                "current_price": 750.00
            },
            "key_features": [
                "Long-lasting (দীর্ঘস্থায়ী)",
                "Water resistant (জল-প্রতিরোধী)",
                "Sweat resistant (ঘাম-প্রতিরোধী)",
                "Maintains style in any weather (যেকোনো আবহাওয়ায় স্টাইল বজায় রাখুন)"
            ],
            "description_summary": "This hair dye is designed to keep hair color perfect and durable, preventing damage from water, sweat, or humidity.",
            "detailed_features": [
                "💧 Waterproof Formula: Color stays intact even if wet in the rain.",
                "🔥 Sweat Resistant: Color does not fade due to sweat from heat or exercise.",
                "🌿 Ammonia-free and Skin-friendly: Safe for hair and skin.",
                "⏳ Long-lasting Effect: Lasts for 7-10 days (may vary individually).",
                "🎨 Easy to Apply: Usable at home with quick results."
            ],
            "usage_tips": [
                "Let the color set for 24 hours before washing hair.",
                "For best results, apply a light conditioner after using shampoo."
            ],
            "review_info": {
                "average_rating": null,
                "review_count": 0,
                "note": "There are no reviews yet for this product."
            }
        }
    ];

    // Find the product with matching ID
    const product = products.find(p => p._id === id);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-2">পণ্যটি পাওয়া যায়নি</h1>
                    <p className="text-gray-600">Product not found</p>
                </div>
            </div>
        );
    }

    // Calculate discount percentage correctly from price object
    const discountPercentage = (
        (product.price.original_price - product.price.current_price) /
        product.price.original_price * 100
    ).toFixed(1);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Main Product Section */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex">


                    {/* Product Image */}
                    <div className="w-full h-96 overflow-hidden">
                        <img
                            src={product.product_url}
                            alt={product.product_name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>


                {/* Description Section */}
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-bold mb-4">Description</h2>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Product Description (পণ্যের বিস্তারিত বিবরণ):
                    </h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {product.description_summary}
                    </p>
                </div>

                {/* Detailed Features */}
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-bold mb-4">বিস্তারিত বৈশিষ্ট্য</h2>
                    <div className="space-y-4">
                        {product.detailed_features?.map((feature, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <span className="text-2xl">{feature.split(' ')[0]}</span>
                                <p className="text-gray-700">{feature}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-gray-700 mt-6 leading-relaxed">
                        পার্টি, ওয়েডিং, ফটোশুট বা ডেইলি স্টাইল – যেকোনো পরিবেশে আপনার চুলের রঙকে দিন একটি নিখুঁত, উজ্জ্বল ও টেকসই লুক।
                    </p>
                </div>

                {/* Usage Tips Section */}
                <div className="p-6 border-b bg-gray-50">
                    <h2 className="text-2xl font-bold mb-4">Usage Tips</h2>
                    <ul className="space-y-3">
                        {product.usage_tips?.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="text-green-500 font-bold mt-1">✓</span>
                                <span className="text-gray-700">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Reviews Section */}
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                    {product.review_info?.review_count === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500 mb-4">{product.review_info.note}</p>
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                Be the first to review “{product.product_name}”
                            </button>
                            <p className="text-sm text-gray-500 mt-4">
                                Your email address will not be published. Required fields are marked *
                            </p>
                        </div>
                    ) : (
                        <p>Reviews coming soon...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
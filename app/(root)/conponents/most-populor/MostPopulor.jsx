import Card from "../../../components/Card";

export default function MostPopulor() {
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
    ]
    return (
        <div>
            <h1 className="h-full mt-2 p-2 bg-info text-2xl font-bold"> MostPopulor </h1>
            <div className="gird grid-cols-2 lg:grid-cols-4">
                {products?.map(item => <Card key={item?._id} item={item} />)}
            </div>
        </div>
    );
}
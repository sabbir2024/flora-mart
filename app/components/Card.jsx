import Image from "next/image";
import Link from "next/link";

// export default function Card({ item }) {
//     return (
//         <Link href={`/shop/product/${item?._id}`} className="card card-sm bg-base-200 mx-w-60 shadow">

//             <figure className="">
//                 <img src={item?.product_url} />
//             </figure>
//             <div className="card-body">
//                 <h2 className="card-title flex justify-between">
//                     {item?.product_name}
//                     <span className="flex gap-1 text-md font-bold w-full">
//                         <span className="flex"> {item?.price?.current_price} ৳ </span>
//                         <span className="text-red-700 flex line-through">{item?.price?.original_price} ৳ </span>
//                     </span>
//                 </h2>
//                 <button className="border-2 border-info text-center text-xl font-bold rounded-2xl">Order Now</button>
//             </div>
//         </Link>
//     );
// }

export default function Card({ product }) {

    // রেটিং অনুযায়ী স্টার জেনারেট করার ফাংশন
    const renderRatingStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        // ফুল স্টার
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <svg key={`full-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 fill-orange-600 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }

        // হাফ স্টার
        if (hasHalfStar) {
            stars.push(
                <svg key="half" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                    <defs>
                        <linearGradient id="halfGradient">
                            <stop offset="50%" stopColor="#f97316" />
                            <stop offset="50%" stopColor="#e5e7eb" />
                        </linearGradient>
                    </defs>
                    <path fill="url(#halfGradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }

        // খালি স্টার
        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }

        return stars;
    };

    // রেটিং ভ্যালু নির্ধারণ (একাধিক সোর্স থেকে)
    const getRatingValue = () => {
        // review_info অবজেক্ট থেকে rating নেওয়া
        if (product.review_info?.average_rating) {
            return product.review_info.average_rating;
        }
        // সরাসরি rating ফিল্ড থেকে
        if (product.rating) {
            return product.rating;
        }
        // ডিফল্ট রেটিং
        return 0;
    };

    // রিভিউ কাউন্ট
    const getReviewCount = () => {
        if (product.review_info?.review_count) {
            return product.review_info.review_count;
        }
        if (product.review_count) {
            return product.review_count;
        }
        return 0;
    };

    const rating = getRatingValue();
    const reviewCount = getReviewCount();

    return (
        <Link href={`/shop/product/${product?._id}`} className="group cursor-pointer">
            {/* Image Container */}
            <div className="bg-gray-100 rounded-xl overflow-hidden aspect-4/5">
                <Image
                    height={200}
                    width={200}
                    src={product.product_url || product.primaryImage}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={product.productName || product.product_name}
                />
            </div>

            {/* Product Info */}
            <div className="mt-3 space-y-2">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-sm sm:text-base line-clamp-2 flex-1">
                        {product.productName || product.product_name}
                    </h3>
                    <p className="text-orange-600 font-bold text-sm sm:text-base whitespace-nowrap">
                        ৳{product.price?.current_price || product.basePrice || 0}
                    </p>
                </div>

                {/* Rating Section */}
                <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                        {renderRatingStars(rating)}
                    </div>
                    {reviewCount > 0 && (
                        <span className="text-xs text-gray-500">
                            ({reviewCount})
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
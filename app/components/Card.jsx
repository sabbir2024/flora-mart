// import Link from "next/link";

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
    return (
        <div className="group cursor-pointer">

            <div className="bg-gray-100 rounded-xl overflow-hidden">
                <img
                    src={product.image}
                    className="w-full h-64 object-cover group-hover:scale-105 transition"
                    alt={product.name}
                />
            </div>

            <div className="mt-3 flex justify-between">

                <div>
                    <h3 className="font-bold">{product.name}</h3>

                    {/* ⭐ Dynamic Rating */}
                    <div className="rating rating-sm">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <input
                                key={star}
                                type="radio"
                                name={`rating-${product.name}`} // unique name
                                className="mask mask-star-2 bg-orange-600"
                                checked={product.rating === star}
                                readOnly
                            />
                        ))}
                    </div>
                </div>

                <p className="text-orange-600 font-bold">
                    ${product.price}
                </p>

            </div>
        </div>
    );
}
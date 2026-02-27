export default function Card({ item }) {
    return (
        <div className="card card-sm bg-base-200 mx-w-60 shadow">

            <figure className="">
                <img src={item?.product_url} />
            </figure>
            <div className="card-body">
                <h2 className="card-title flex justify-between">
                    {item?.product_name}
                    <span className="flex gap-1 text-md font-bold w-full">
                        <span className="flex"> {item?.price?.current_price} ৳ </span>
                        <span className="text-red-700 flex line-through">{item?.price?.original_price} ৳ </span>
                    </span>
                </h2>
                <div className="border-2 border-info text-center text-xl font-bold rounded-2xl">Order Now</div>
            </div>
        </div>
    );
}
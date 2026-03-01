import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";
import Card from "../../../components/Card";
import { mainUrl } from "../../../components/url";
import { headers } from "next/headers";

export default async function MostPopulor() {
    ;

    const res = await fetch(`${mainUrl}/products`, {
        headers: new Headers(await headers())
    })
    const products = await res?.json()

    return (
        <div>
            <div className="h-full mt-2 p-2 bg-info text-2xl font-bold flex justify-between">
                <span>Most Populor</span>
                <button className="btn btn-outline btn-info text-black bg-amber-50">More Products <BiArrowFromLeft size={24} /> </button> </div>
            <div className="grid grid-cols-2 lg:grid-cols-4">
                {products?.map(item => <Card key={item?._id} item={item} />)}
            </div>
        </div>
    );
}
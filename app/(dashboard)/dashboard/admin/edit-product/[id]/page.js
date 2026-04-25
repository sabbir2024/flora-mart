import { apiUrl } from "../../../../../components/url";
import EditProduct from "./components/EditProduct";

export default async function page({ params }) {
    const param = await params;
    const id = param.id;

    //find the product db by id and pass it to the edit product components
    const fetchingData = await fetch(`${apiUrl}/products/${id}`)
    const product = await fetchingData.json();


    return (
        <div>
            <EditProduct product={product} />
        </div>
    );
}
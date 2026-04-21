import { apiUrl } from "../../../../components/url";
import ProductsManagement from "./components/ProductsManagement";

export default async function page() {
    let products;

    try {
        const response = await fetch(`${apiUrl}/products`, {
            cache: 'no-store'
        });
        const data = await response.json();
        products = data.data;
    } catch (error) {
        console.log('page--error=>', error);
    }

    return (
        <div>
            <ProductsManagement products={products} />
        </div>
    );
}
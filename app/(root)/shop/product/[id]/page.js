import Container from "../../../../components/Container";
import { apiUrl } from "../../../../components/url";
import HoverImage from "./components/HoverImage";
import ProductInfo from "./components/ProductInfo";


export default async function Page({ params }) {
    const resolvedParams = await params;
    const id = resolvedParams?.id;

    const res = await fetch(`${apiUrl}/products/${id}`, {
        cache: "no-cache"
    })
    const product = await res.json()

    console.log("produc =>", product)
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

    const imageUrl = product?.product_url;

    return (
        <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2">

                <HoverImage src={imageUrl}
                    alt={product?.name || 'Product'}
                    zoomLevel={1.5} />
                <ProductInfo product={product} />
            </div>

        </Container>
    );
}
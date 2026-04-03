import Link from "next/link";
import Container from "../../../../components/Container";
import NewsMarquee from "../../../../components/NewsMarquee";
import { apiUrl } from "../../../../components/url";
import ImageHover from "./components/ImageHover";
import ProductInfo from "./components/ProductInfo";
import { FaCartShopping, FaRegFolderOpen } from "react-icons/fa6";
import { AiOutlineHome } from "react-icons/ai";


export default async function Page({ params }) {
    const resolvedParams = await params;
    const id = resolvedParams?.id;
    const res = await fetch(`${apiUrl}/products/${id}`, {
        cache: "no-cache"
    })
    const product = await res.json();

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

    const imageUrl = product.images;
    return (
        <Container>

            <div className="breadcrumbs text-sm">
                <ul>
                    <li>
                        <Link href={'/'}>
                            <AiOutlineHome />
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href={'/shop'}>
                            <FaRegFolderOpen />
                            Shop
                        </Link>
                    </li>
                    <li>
                        <FaRegFolderOpen />
                        Product Details
                    </li>
                    <li>
                        <span className="inline-flex items-center gap-2">
                            <FaCartShopping />
                            {product?.productName}
                        </span>
                    </li>
                </ul>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <ImageHover imageUrl={imageUrl} />

                <ProductInfo product={product} />
            </div>
            <NewsMarquee />

        </Container>
    );
}
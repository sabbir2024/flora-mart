import Card from "../../../../components/Card";
import { apiUrl } from "../../../../components/url";



export default async function ProductGrid() {
    let products = [];

    try {
        const response = await fetch(`${apiUrl}/products`, {
            cache: 'no-store',
        })
        const data = await response.json();
        products = data
    } catch (error) {
        console.log(error)
    }

    return (
        <section className="grow">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {products.map((p, i) => (
                    <Card key={i} product={p} />
                ))}
            </div>

            <div className="mt-20 flex justify-center">
                <button className="px-10 py-5 bg-black text-white rounded-full">
                    Discover More Pieces
                </button>
            </div>
        </section>
    );
}
import Card from "../../../components/Card";
import { apiUrl } from "../../../components/url";

export default async function ProductGrid() {
    let products = []
    try {
        const response = await fetch(`${apiUrl}/products?isNew=true`, {
            cache: 'force-cache',
        })
        const data = await response.json();
        products = data
    } catch (error) {
        // console.log(error)
    }



    return (
        <section className="max-w-screen-2xl mx-auto px-4 md:px-6 mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-6">
                Collection
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((p, i) => (
                    <Card key={i} product={p} />
                ))}
            </div>
        </section>
    );
}
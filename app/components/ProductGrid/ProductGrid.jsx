// components/ProductGrid/ProductGrid.jsx
import Card from "../Card";
import { apiUrl } from "../url";

export default async function ProductGrid({ category, sort }) {
    console.log('ProductGrid received - Category:', category, 'Sort:', sort);

    // API URL বিল্ড করুন সঠিক ফরম্যাটে
    let apiUrlWithParams = `${apiUrl}/products`;
    const params = new URLSearchParams();

    // শুধু non-default values যোগ করুন
    if (category && category !== 'Home') {
        params.append('category', category);
    }
    if (sort && sort !== 'Latest') {
        params.append('sort', sort);
    }

    const queryString = params.toString();
    if (queryString) {
        apiUrlWithParams += `?${queryString}`;
    }

    console.log('Fetching from:', apiUrlWithParams);

    let products = [];
    try {
        const response = await fetch(apiUrlWithParams, {
            cache: 'force-cache',
            // next: { revalidate: 3600 } // optional: revalidate every hour
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        products = data.data || data; // যদি API থেকে {data: []} ফরম্যাটে আসে
    } catch (error) {
        console.error('Error fetching products:', error);
        products = [];
    }

    // ফিল্টার করা প্রোডাক্টের সংখ্যা দেখান
    const displayCategory = category === 'All' ? 'All' : category;

    return (
        <section className="max-w-screen-2xl mx-auto px-4 md:px-6 mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-6">
                Collection {displayCategory !== 'Home' ? `- ${displayCategory}` : ''}
                <span className="text-sm font-normal text-gray-500 ml-2">
                    ({products.length} items)
                </span>
            </h2>

            {products.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <p className="text-gray-500 text-lg">
                        No products found in {displayCategory} category.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((p, i) => (
                        <Card key={p.id || i} product={p} />
                    ))}
                </div>
            )}
        </section>
    );
}
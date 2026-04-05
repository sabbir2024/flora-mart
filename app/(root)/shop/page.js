import Filters from "../../components/Filters/Filters";
import ProductGrid from "../../components/ProductGrid/ProductGrid";


export default async function page({ searchParams }) {
    const resolvedSearchParams = await searchParams;

    // Change default from 'Home' to 'All' to match Filters
    const category = resolvedSearchParams?.category || 'All';
    const sort = resolvedSearchParams?.sort || 'Latest';

    return (
        <div className="w-full mx-auto text-center">
            <Filters />
            <ProductGrid category={category} sort={sort} />
        </div>
    );
}
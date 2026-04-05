// app/page.jsx
import Container from "../components/Container";
import Filters from "../components/Filters/Filters";
import NewsMarquee from "../components/NewsMarquee";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import CategoryBento from "./conponents/CategoryBento/CategoryBento";
import Hero from "./conponents/hero/Hero";

export default async function Page({ searchParams }) {
    const resolvedSearchParams = await searchParams;

    // Change default from 'Home' to 'All' to match Filters
    const category = resolvedSearchParams?.category || 'All';
    const sort = resolvedSearchParams?.sort || 'Latest';

    return (
        <Container>
            <Hero />
            <NewsMarquee />
            <Filters />
            <ProductGrid category={category} sort={sort} />
            <CategoryBento />
        </Container>
    );
}
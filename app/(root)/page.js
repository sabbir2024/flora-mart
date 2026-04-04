// app/page.jsx
import Container from "../components/Container";
import NewsMarquee from "../components/NewsMarquee";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import CategoryBento from "./conponents/CategoryBento/CategoryBento";
import Filters from "./conponents/Filters/Filters";
import Hero from "./conponents/hero/Hero";

export default async function Page({ searchParams }) {
    // searchParams ইতিমধ্যেই একটি Promise, একবার await করলেই হবে
    const resolvedSearchParams = await searchParams;

    // সঠিকভাবে মান নিন
    const category = resolvedSearchParams?.category || 'Home';
    const sort = resolvedSearchParams?.sort || 'Latest';

    console.log('Page received:', { category, sort });

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
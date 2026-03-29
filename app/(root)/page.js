import Container from "../components/Container";
import NewsMarquee from "../components/NewsMarquee";
import CategoryBento from "./conponents/CategoryBento/CategoryBento";
import Filters from "./conponents/Filters/Filters";
import Hero from "./conponents/hero/Hero";
import ProductGrid from "./conponents/ProductGrid/ProductGrid";

export default function page() {
    return (
        <Container>
            <Hero />
            <NewsMarquee />
            <Filters />
            <ProductGrid />
            <CategoryBento />
        </Container>
    );
}
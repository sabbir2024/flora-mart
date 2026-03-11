import Container from "../components/Container";
import NewsMarquee from "../components/NewsMarquee";
import Banner from "./conponents/banner/Banner";
import MostPopulor from "./conponents/most-populor/MostPopulor";

export default function page() {
    return (
        <Container>
            <Banner />
            <NewsMarquee />
            <MostPopulor />
        </Container>
    );
}
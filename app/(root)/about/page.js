import Container from "../../components/Container";
import AboutHero from "./components/AboutHero/AboutHero";
import BrandStory from "./components/BrandStory/BrandStory";
import LoginSection from "./components/LoginSection/LoginSection";
import Registard from "./components/registard/Registard";

export default function page() {
    return (
        <Container>
            <AboutHero />
            <BrandStory />
            <Registard />
        </Container>
    );
}
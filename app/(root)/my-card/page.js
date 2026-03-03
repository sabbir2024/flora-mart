import Container from "../../components/Container"
import { apiUrl } from "../../components/url";
import Mycard from "./components/Mycard";


export default async function page() {
    const email = 'talevihaq@mailinator.com'
    const res = await fetch(`${apiUrl}/my-card?email=${encodeURIComponent(email)}`, {
        cache: "no-store",
        headers: {
            "Contain-Type": "application/json"
        }
    })
    const bookings = await res.json();
    console.log("result client=>", bookings)
    return (
        <Container>
            <Mycard bookings={bookings?.data} />
        </Container>
    );
}
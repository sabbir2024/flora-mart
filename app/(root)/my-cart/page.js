// app/my-cart/page.js
import { cookies } from 'next/headers'; // Server component এর জন্য
import Container from "../../components/Container"
import { apiUrl } from "../../components/url";
import Mycart from "./components/Mycart";
import NewsMarquee from '../../components/NewsMarquee';

export default async function page() {
    const cookieStore = await cookies();
    const my_product_list = cookieStore.get('product_id')?.value;


    const res = await fetch(`${apiUrl}/my-cart?productId=${encodeURIComponent(my_product_list || '')}`, {
        cache: "no-store",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const bookings = await res.json();

    return (
        <Container>
            <NewsMarquee />
            <Mycart bookings={bookings?.data || []} />
        </Container>
    );
}
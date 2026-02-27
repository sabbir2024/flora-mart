import Link from "next/link";
import Image from "next/image";
import logo from "../../public/flora-mart-logo.jpg";

export default function Logo() {
    return (
        <Link href={'/'}>
            <Image src={logo} height={35} width={35} alt="Brand logo" className="rounded-full ring-1" />
        </Link>
    );
}
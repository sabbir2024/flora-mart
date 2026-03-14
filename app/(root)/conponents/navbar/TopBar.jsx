import Link from "next/link";
import { CgFacebook, CgMail } from "react-icons/cg";
import { FaPhone } from "react-icons/fa";


export default function TopBar({ showCall }) {
    return (
        <div
            className={`bg-blue-400 w-full h-auto p-2 flex justify-between transition-transform duration-300 ${showCall ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            <h1 className="font-bold flex gap-1"> <FaPhone />
                +880 1628-507832</h1>
            <div className="flex justify-between gap-4">
                <Link href={'https://www.facebook.com/people/Fabric-Flora-%E0%A6%AB%E0%A7%87%E0%A6%AC%E0%A7%8D%E0%A6%B0%E0%A6%BF%E0%A6%95-%E0%A6%AB%E0%A7%8D%E0%A6%B2%E0%A7%8B%E0%A6%B0%E0%A6%BE/61587371759656/'}>                <CgFacebook className="w-5 h-5 rounded-full bg-amber-50 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer" />
                </Link>
                <Link href={'mailto:sabbirbinkabir@gmail.com'}>
                    <CgMail className="w-5 h-5 rounded-full bg-amber-50 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer" />
                </Link>
            </div>
        </div>
    );
}
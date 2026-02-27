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
                <CgFacebook className="w-5 h-5 rounded-full bg-amber-50 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer" />
                <CgMail className="w-5 h-5 rounded-full bg-amber-50 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer" />
            </div>
        </div>
    );
}
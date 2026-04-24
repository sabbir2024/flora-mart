'use client';
import { useRouter } from "next/navigation";
import { TiEdit } from "react-icons/ti";

export default function EditBtn({ product }) {
    const router = useRouter();
    return (
        <button onClick={() => router.push(`/dashboard/admin/edit-product/${product._id}`)} className="p-1.5 md:p-2 hover:bg-surface-container rounded-lg text-secondary-dim transition-colors">
            <span className="material-symbols-outlined text-base md:text-lg"><TiEdit /></span>
        </button>
    );
}
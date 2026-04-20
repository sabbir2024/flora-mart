'use client';
import { MdDelete } from "react-icons/md";
import { apiUrl } from "../../../../../components/url";
import Swal from "sweetalert2";


export default function DeleteBtn({ product }) {
    const handleDelete = async (item) => {
        const request = await fetch(`${apiUrl}/products/${item._id}`, {
            method: "DELETE"
        })
        const deleteData = await request.json();

        if (deleteData.deletedCount > 0) {
            Swal.fire({
                title: "Deleted!",
                text: item.productName,
                icon: "success",
                background: '#e17100',
                color: '#fff'
            })
        }
        console.log('DeleteBtn--handleDelete=>', deleteData);
    };
    return (
        <button onClick={() => handleDelete(product)} className="p-1.5 bg md:p-2 hover:bg-error-container/10 rounded-lg text-error transition-colors">
            <span className="material-symbols-outlined text-base md:text-lg"><MdDelete /></span>
        </button>
    );
}
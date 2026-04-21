'use client';
import { MdDelete } from "react-icons/md";
import { apiUrl } from "../../../../../components/url";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function DeleteBtn({ product }) {
    const router = useRouter();

    const handleDelete = async (item) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });

            if (result.isConfirmed) {
                // Show loading state
                Swal.fire({
                    title: "Deleting...",
                    text: "Please wait",
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                const request = await fetch(`${apiUrl}/products/${item._id}`, {
                    method: "DELETE"
                });

                const deleteData = await request.json();

                if (request.ok) {
                    // Success
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.productName} has been deleted successfully.`,
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });

                    // Refresh the page or update the UI
                    router.refresh();
                    // Or if using client-side state, you might want to trigger a re-fetch
                    // window.location.reload(); // Alternative: hard refresh
                } else {
                    // Error from server
                    throw new Error(deleteData.message || "Failed to delete product");
                }
            }
        } catch (error) {
            console.error("Delete error:", error);
            Swal.fire({
                title: "Error!",
                text: error.message || "Something went wrong while deleting the product.",
                icon: "error",
                confirmButtonColor: "#3085d6"
            });
        }
    };

    return (
        <button
            onClick={() => handleDelete(product)}
            className="p-1.5 md:p-2 hover:bg-error-container/10 rounded-lg text-error transition-colors"
            aria-label="Delete product"
        >
            <MdDelete className="text-base md:text-lg" />
        </button>
    );
}
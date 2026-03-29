import ProductGrid from "./components/ProductGrid/ProductGrid";
import Sidebar from "./components/Sidebar/Sidebar";


export default function page() {

    return (
        <div className="w-full mx-auto text-center">
            <main className=" max-w-360 mx-auto px-8">

                <div className="flex flex-col lg:flex-row gap-12">
                    <Sidebar />
                    <ProductGrid />
                </div>
            </main>
        </div>
    );
}
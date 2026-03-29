export default function Sidebar() {
    return (
        <aside className="w-full lg:w-72">
            <div className="sticky top-32 space-y-10">

                {/* Category */}
                <div>
                    <h3 className="text-sm font-bold uppercase mb-6">Category</h3>
                    <ul className="space-y-4">
                        <li><button className="text-orange-600 font-bold w-full flex justify-between">Seating <span>12</span></button></li>
                        <li><button className="opacity-70 hover:text-orange-600 w-full flex justify-between">Lighting <span>08</span></button></li>
                        <li><button className="opacity-70 hover:text-orange-600 w-full flex justify-between">Textiles <span>24</span></button></li>
                    </ul>
                </div>

                {/* Price */}
                <div>
                    <h3 className="text-sm font-bold uppercase mb-6">Price Range</h3>
                    <input type="range" className="w-full accent-orange-600" />
                    <div className="flex justify-between mt-2 text-sm">
                        <span>$0</span>
                        <span>$5000+</span>
                    </div>
                </div>


            </div>
        </aside>
    );
}
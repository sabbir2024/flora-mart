// components/TableHeaderControls.jsx
export default function TableHeaderControls({
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy
}) {
    return (
        <div className="p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-surface-container-low">
            <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative w-full md:w-80">
                    {/* <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
                        search
                    </span> */}
                    <input
                        className="w-full bg-surface-container border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20"
                        placeholder="Filter products..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="bg-surface-container-low px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-surface-container transition-colors whitespace-nowrap">
                    <span className="material-symbols-outlined text-base">filter_list</span>
                    Filters
                </button>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm text-secondary-dim">Sort by:</span>
                <select
                    className="bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="latest">Latest Added</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="stock">Stock Level</option>
                </select>
            </div>
        </div>
    );
}
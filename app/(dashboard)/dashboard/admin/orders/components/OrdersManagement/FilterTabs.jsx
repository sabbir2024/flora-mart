'use client'
import { CiFilter } from "react-icons/ci";


export default function FilterTabs({ tabs, activeTab, setActiveTab, searchQuery, setSearchQuery }) {
    return (
        <div className="px-4 sm:px-6 md:px-8 pt-6 md:pt-8 pb-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6 md:mb-8">
                <div className="flex flex-wrap items-center gap-1 bg-gray-50 p-1.5 rounded-2xl w-fit">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative flex-1 sm:flex-initial">

                        <input
                            className="pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm w-full sm:w-72 transition-all"
                            placeholder="Search by ID, name or email..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all whitespace-nowrap border border-gray-200">

                        <CiFilter />
                    </button>
                </div>
            </div>
        </div>
    );
}
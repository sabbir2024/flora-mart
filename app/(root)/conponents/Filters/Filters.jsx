// components/Filters/Filters.jsx
"use client";

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Filters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [selectedCategory, setSelectedCategory] = useState(() => {
        return searchParams.get('category') || 'Home';
    });
    const [selectedSort, setSelectedSort] = useState(() => {
        return searchParams.get('sort') || 'Latest';
    });

    const updateURLParams = (category, sort) => {
        const params = new URLSearchParams();

        if (category && category !== 'Home') {
            params.set('category', category);
        }
        if (sort && sort !== 'Latest') {
            params.set('sort', sort);
        }

        const queryString = params.toString();
        const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

        // Use replace instead of push to avoid history stack pollution
        router.replace(newUrl, { scroll: false });
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        updateURLParams(category, selectedSort);
    };

    const handleSortChange = (e) => {
        const sortValue = e.target.value;
        setSelectedSort(sortValue);
        updateURLParams(selectedCategory, sortValue);
    };

    // Sync state with URL changes (back/forward buttons)
    useEffect(() => {
        const category = searchParams.get('category') || 'Home';
        const sort = searchParams.get('sort') || 'Latest';

        if (category !== selectedCategory) setSelectedCategory(category);
        if (sort !== selectedSort) setSelectedSort(sort);
    }, [searchParams]);

    return (
        <section className="max-w-screen-2xl mx-auto px-4 md:px-6 mb-10 sticky top-0 z-10 bg-white/90 backdrop-blur-sm">
            <div className="bg-gray-100 rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between">
                <div className="tabs tabs-box bg-white p-1 rounded-xl">
                    <input
                        type="radio"
                        name="category"
                        className="tab rounded-lg transition-all font-bold text-black checked:bg-orange-600 checked:text-white cursor-pointer"
                        aria-label="All"
                        checked={selectedCategory === 'All'}
                        onChange={() => handleCategoryChange('All')}
                    />
                    <input
                        type="radio"
                        name="category"
                        className="tab rounded-lg transition-all font-bold text-black checked:bg-orange-600 checked:text-white cursor-pointer"
                        aria-label="Home"
                        checked={selectedCategory === 'Home'}
                        onChange={() => handleCategoryChange('Home')}
                    />
                    <input
                        type="radio"
                        name="category"
                        className="tab rounded-lg transition-all font-bold text-black checked:bg-orange-600 checked:text-white cursor-pointer"
                        aria-label="Tech"
                        checked={selectedCategory === 'Tech'}
                        onChange={() => handleCategoryChange('Tech')}
                    />
                </div>

                <select
                    className="bg-transparent font-bold text-orange-600 border-none focus:outline-none cursor-pointer"
                    value={selectedSort}
                    onChange={handleSortChange}
                >
                    <option value="Latest">Latest</option>
                    <option value="Popular">Popular</option>
                </select>
            </div>
        </section>
    );
}
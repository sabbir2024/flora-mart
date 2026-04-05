"use client";

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Filters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [selectedCategory, setSelectedCategory] = useState(() => {
        return searchParams.get('category') || 'All';
    });
    const [selectedSort, setSelectedSort] = useState(() => {
        return searchParams.get('sort') || 'Latest';
    });

    const updateURLParams = (category, sort) => {
        const params = new URLSearchParams();

        if (category && category !== 'All') {
            params.set('category', category);
        }
        if (sort && sort !== 'Latest') {
            params.set('sort', sort);
        }

        const queryString = params.toString();
        const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

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

    useEffect(() => {
        const category = searchParams.get('category') || 'All';
        const sort = searchParams.get('sort') || 'Latest';

        if (category !== selectedCategory) setSelectedCategory(category);
        if (sort !== selectedSort) setSelectedSort(sort);
    }, [searchParams]);

    // ক্যাটাগরি লিস্ট
    const categories = [
        { label: 'All', value: 'All' },
        { label: 'Clothing & Fashion', value: 'Clothing' },
        { label: 'Baby Products', value: 'Baby' },
        { label: 'Fitness', value: 'Fitness' },
        { label: 'Home & Decor', value: 'Home' },
        { label: 'Tech & Gadgets', value: 'Tech' }
    ];

    return (
        <section className="max-w-screen-2xl mx-auto px-4 md:px-6 mb-10 sticky top-0 z-50 bg-white/90 backdrop-blur-sm">
            <div className="bg-gray-100 rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center">

                {/* ক্যাটাগরি ট্যাবস - মোবাইলের জন্য স্ক্রল যোগ করা হয়েছে */}
                <div className="tabs tabs-box bg-white p-1 rounded-xl flex overflow-x-auto gap-1 md:flex-wrap">
                    {categories.map((category) => (
                        <input
                            key={category.value}
                            type="radio"
                            name="category"
                            className="tab rounded-lg transition-all font-bold text-black checked:bg-orange-600 checked:text-white cursor-pointer whitespace-nowrap"
                            aria-label={category.label}
                            checked={selectedCategory === category.value}
                            onChange={() => handleCategoryChange(category.value)}
                        />
                    ))}
                </div>

                {/* সর্ট অপশন */}
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
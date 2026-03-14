'use client'

import { useState } from "react";

export default function page() {
    const [selectedFilter, setSelectedFilter] = useState('all');

    console.log(selectedFilter)

    return (
        <div className="w-full mx-auto text-center">
            <div className="filter inline-block">
                <input className="btn filter-reset" type="radio" name="metaframeworks" aria-label="All" onChange={() => setSelectedFilter('all')} />
                <input className="btn" type="radio" name="metaframeworks" aria-label="Men" onChange={() => setSelectedFilter('men')} />
                <input className="btn" type="radio" name="metaframeworks" aria-label="Women" onChange={() => setSelectedFilter('women')} />
                <input className="btn" type="radio" name="metaframeworks" aria-label="Children" onChange={() => setSelectedFilter('children')} />
            </div>
        </div>
    );
}
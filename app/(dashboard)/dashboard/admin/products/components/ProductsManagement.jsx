// components/ProductsManagement.jsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ProductsManagement() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('latest');
    const [currentPage, setCurrentPage] = useState(1);

    // Products data
    const products = [
        {
            id: 1,
            name: 'Lunar Chronograph',
            sku: 'SOL-492-W',
            category: 'Accessories',
            stock: 142,
            price: 249.00,
            status: 'active',
            statusColor: 'green',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRt3cTYQ0Yn6EiJSD4RSpQ78sTGFZqvXxyJUBcbuHm9qWXrohbyZrIJOV2vVXl70o9qePnSS6xSQyn8Zc7Ja8H-FKSMhQX-29vJXQqMBaMz7Nv-Cs1qHt9a7I98n1JyL0CoPFaE8o3i9pumlLw1lFFsvKOfFqB4tQD-WUZBnmswkAZzDuGWcVljhta2dA9K-zSKmPF1lG9rOg3QqxE3U64JuLuJV5laqRjkf-omlo-GyJs81y13stOdM5VD-mbIB-bF4BMUnvzVg'
        },
        {
            id: 2,
            name: 'Obsidian Audio Gen-2',
            sku: 'SOL-110-B',
            category: 'Electronics',
            stock: 8,
            price: 399.00,
            status: 'lowStock',
            statusColor: 'amber',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeI8aRSy_1mF4bukjjalgVqoG0N-3CSGX2g5iRRIkWTIjN5eBvDgDd5mVnoe0v4NTgGRwjjhcxUxOjL9OjNpJr3R8ID1otJiBNtc9GCNBt7l-4uWLzvNDeurM1A0H9D1QzvXtsGfVo2NWZygC-i2TMXIcihZF4ZkzjUh1TSV2JfGs_ClRJnFMbiYKwR_wSkk4wzdATDwgM3P5NqU52s026MvweNxh50DRBJ-e4YhGP9mvu54aQxh2id1xmp9TnTXJh-xVYABPwtw'
        },
        {
            id: 3,
            name: 'Apex Velocity Runners',
            sku: 'SOL-882-R',
            category: 'Footwear',
            stock: 0,
            price: 120.00,
            status: 'outOfStock',
            statusColor: 'neutral',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFS-woW9N84mjCBLL2KMilaXwZwnpD5ZTyazwjAkL0pJ9LVWI8_O3tOkT97wV-wH26ElyBq39Igjd0wm1TJRg4BdaItPvNUfDk6-x_U1e6M-SUYdtmKdzldOqJKkr8V6b88Utat8jLZeC5fuopU6coHhEiXi78xmRyp0dBpMvQMYBYk3O217reG0MOfH5YwNywfm0WR5_niLpiqUzhxBqBroffuz6RCnHS7mMmc5Vgiq9qpbg_p12wuDUMs46Ekp60e7JDm4gHZQ'
        },
        {
            id: 4,
            name: 'Cedar & Moss Candle',
            sku: 'SOL-041-C',
            category: 'Home',
            stock: 56,
            price: 34.00,
            status: 'draft',
            statusColor: 'blue',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5NwzCSBMEqK3Iiq1j4pETNm-PkaZcaf8KlVkNta_Lp2sdjh1zPxCuzMeFU-ZLbztLvnFK5r5lEZqrkLBAfdq9cDRYcEJLaipJ_o1wn40dDWgEfs0Rcru8BstRUEq1Vgv4Pmg9f88BK4zKuTNJNZ2Ju7aPkMz4cZQ5zhtbDxbYoi2ZojLZxR1I3fUsWbcCHdj7Zv5DnCL7ZjwlWpQAWsT9whG_hGbYzt0vwE2zo1gOqG5sJo8JXl-muVrWCFUSLbkr9dHH3DJUCA'
        }
    ];

    const stats = [
        {
            title: 'Total Products',
            value: '1,284',
            change: '+12% this month',
            changeType: 'positive',
            icon: 'inventory',
            iconBg: 'bg-surface-container-low',
            iconColor: 'text-primary'
        },
        {
            title: 'Low Stock',
            value: '24',
            change: 'Requires attention',
            changeType: 'warning',
            icon: 'production_quantity_limits',
            iconBg: 'bg-error-container/10',
            iconColor: 'text-error'
        },
        {
            title: 'Active Categories',
            value: '18',
            change: 'Across 4 marketplaces',
            changeType: 'neutral',
            icon: 'category',
            iconBg: 'bg-tertiary-container/20',
            iconColor: 'text-tertiary'
        }
    ];

    const getStatusBadge = (status, statusColor) => {
        const colors = {
            green: 'bg-green-100 text-green-700',
            amber: 'bg-amber-100 text-amber-700',
            neutral: 'bg-neutral-200 text-neutral-600',
            blue: 'bg-blue-100 text-blue-700'
        };

        const labels = {
            active: 'Active',
            lowStock: 'Low Stock',
            outOfStock: 'Out of Stock',
            draft: 'Draft'
        };

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${colors[statusColor]}`}>
                {labels[status]}
            </span>
        );
    };

    const filteredProducts = products.filter(product => {
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !product.sku.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    return (
        <main className="flex-1 min-h-screen bg-background">
            <div className="p-4 md:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface mb-2">
                                Product Catalog
                            </h1>
                            <p className="text-secondary-dim max-w-lg leading-relaxed text-sm md:text-base">
                                Manage your inventory, pricing, and product visibility across your global storefront.
                            </p>
                        </div>
                        <Link href={'/dashboard/admin/add-product'}>
                            <button className="bg-linear-to-br from-primary to-primary-container text-on-primary px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.03] transition-all flex items-center justify-center gap-2 group">

                                Add New Product
                            </button>
                        </Link>
                    </div>
                    {/* Summary Bento Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
                        {stats.map((stat, idx) => (
                            <div
                                key={idx}
                                className="bg-surface-container-lowest p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group"
                            >
                                <div>
                                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-outline mb-1">
                                        {stat.title}
                                    </p>
                                    <h3 className="text-2xl md:text-3xl font-extrabold">{stat.value}</h3>
                                    <p className={`text-xs font-bold mt-2 flex items-center gap-1 ${stat.changeType === 'positive' ? 'text-green-600' :
                                        stat.changeType === 'warning' ? 'text-error' : 'text-secondary-dim'
                                        }`}>
                                        {stat.changeType === 'positive' && (
                                            <span className="material-symbols-outlined text-xs">trending_up</span>
                                        )}
                                        {stat.changeType === 'warning' && (
                                            <span className="material-symbols-outlined text-xs">warning</span>
                                        )}
                                        {stat.change}
                                    </p>
                                </div>
                                <div className={`w-10 h-10 md:w-14 md:h-14 ${stat.iconBg} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <span className={`material-symbols-outlined text-xl md:text-3xl ${stat.iconColor}`}>
                                        {stat.icon}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Table Section */}
                    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                        {/* Table Header Controls */}
                        <div className="p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-surface-container-low">
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <div className="relative w-full md:w-80">

                                    <input
                                        className="w-full bg-surface-container border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20"
                                        placeholder="Filter products..."
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <button className="bg-surface-container-low px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-surface-container transition-colors whitespace-nowrap">
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

                        {/* Products Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-200">
                                <thead>
                                    <tr className="bg-surface-container-low/30">
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-outline">
                                            Product
                                        </th>
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-outline">
                                            Category
                                        </th>
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-outline text-center">
                                            Stock
                                        </th>
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-outline">
                                            Price
                                        </th>
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-outline">
                                            Status
                                        </th>
                                        <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-outline text-right">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-surface-container-low">
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-surface-container-low/20 transition-colors group">
                                            <td className="px-4 md:px-6 py-4">
                                                <div className="flex items-center gap-3 md:gap-4">
                                                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl overflow-hidden bg-surface-container shrink-0">
                                                        <img
                                                            alt={product.name}
                                                            className="w-full h-full object-cover"
                                                            src={product.image}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-on-surface text-sm md:text-base">
                                                            {product.name}
                                                        </p>
                                                        <p className="text-[10px] md:text-xs text-secondary-dim uppercase tracking-tighter">
                                                            SKU: {product.sku}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-4 text-xs md:text-sm font-medium text-secondary-dim">
                                                {product.category}
                                            </td>
                                            <td className="px-4 md:px-6 py-4 text-center">
                                                <span className={`text-sm font-bold ${product.stock === 0 ? 'text-error' :
                                                    product.stock < 10 ? 'text-amber-600' : 'text-on-surface'
                                                    }`}>
                                                    {product.stock}
                                                </span>
                                            </td>
                                            <td className="px-4 md:px-6 py-4 text-sm font-bold text-on-surface">
                                                ${product.price.toFixed(2)}
                                            </td>
                                            <td className="px-4 md:px-6 py-4">
                                                {getStatusBadge(product.status, product.statusColor)}
                                            </td>
                                            <td className="px-4 md:px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1 md:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-1.5 md:p-2 hover:bg-surface-container rounded-lg text-secondary-dim transition-colors">
                                                        <span className="material-symbols-outlined text-base md:text-lg">edit</span>
                                                    </button>
                                                    <button className="p-1.5 md:p-2 hover:bg-error-container/10 rounded-lg text-error transition-colors">
                                                        <span className="material-symbols-outlined text-base md:text-lg">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {filteredProducts.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-secondary-dim">No products found</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="p-4 md:p-6 border-t border-surface-container-low flex flex-col sm:flex-row justify-between items-center gap-4">
                            <p className="text-xs md:text-sm text-secondary-dim">
                                Showing <span className="font-bold text-on-surface">1-{filteredProducts.length}</span> of{' '}
                                <span className="font-bold text-on-surface">1,284</span> products
                            </p>
                            <div className="flex items-center gap-1 md:gap-2">
                                <button
                                    className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-secondary-dim hover:bg-surface-container-low transition-colors disabled:opacity-30"
                                    disabled
                                >
                                </button>
                                <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold shadow-md shadow-primary/20 text-sm md:text-base">
                                    1
                                </button>
                                <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-low text-on-surface transition-colors text-sm md:text-base">
                                    2
                                </button>
                                <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-low text-on-surface transition-colors text-sm md:text-base">
                                    3
                                </button>
                                <span className="px-1 md:px-2 text-outline text-sm">...</span>
                                <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-low text-on-surface transition-colors text-sm md:text-base">
                                    321
                                </button>
                                <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-secondary-dim hover:bg-surface-container-low transition-colors">
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-6 md:py-8 text-center border-t border-surface-container-low mt-8">
                <p className="text-[10px] md:text-xs text-outline font-medium tracking-wide">
                    © 2024 Solaris Commerce Systems. All rights reserved.
                </p>
            </footer>
        </main>
    );
}
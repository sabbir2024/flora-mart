// components/ProductsManagement.jsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import ProductsTable from './ProductsTable';
import Pagination from './Pagination';
import TableHeaderControls from './TableHeaderControls';
import { MdOutlineInventory, MdCategory } from 'react-icons/md';
import { FaBatteryQuarter, FaBatteryEmpty, FaBatteryFull } from 'react-icons/fa6';
// Or use from react-icons/fa:
// import { FaBatteryLow } from 'react-icons/fa';

export default function ProductsManagement({ products = [] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('latest');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate dynamic stats
    const getStats = () => {
        const totalProducts = products.length;
        const lowStockCount = products.filter(p => p.quantity > 0 && p.quantity < 10).length;
        const uniqueCategories = [...new Set(products.map(p => p.category))].length;

        const lastMonthProducts = products.filter(p => {
            const createdAt = new Date(p.createdAt);
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            return createdAt >= oneMonthAgo;
        });

        const growthRate = lastMonthProducts.length > 0 && totalProducts > 0
            ? `+${Math.round((lastMonthProducts.length / totalProducts) * 100)}% this month`
            : '0% this month';

        return [
            {
                title: 'Total Products',
                value: totalProducts.toLocaleString(),
                change: growthRate,
                changeType: 'positive',
                icon: <MdOutlineInventory className="text-xl md:text-3xl" />,
                iconBg: 'bg-surface-container-low',
                iconColor: 'text-primary'
            },
            {
                title: 'Low Stock',
                value: lowStockCount.toString(),
                change: lowStockCount > 0 ? 'Requires attention' : 'All stock levels healthy',
                changeType: lowStockCount > 0 ? 'warning' : 'positive',
                icon: <FaBatteryQuarter className="text-xl md:text-3xl" />, // Using FaBatteryQuarter instead
                iconBg: 'bg-error-container/10',
                iconColor: 'text-error'
            },
            {
                title: 'Active Categories',
                value: uniqueCategories.toString(),
                change: `Across ${products.length} products`,
                changeType: 'neutral',
                icon: <MdCategory className="text-xl md:text-3xl" />,
                iconBg: 'bg-tertiary-container/20',
                iconColor: 'text-tertiary'
            }
        ];
    };

    const getStatusBadge = (quantity) => {
        let statusType = '';
        let label = '';

        if (quantity === 0) {
            statusType = 'outOfStock';
            label = 'Out of Stock';
        } else if (quantity < 10) {
            statusType = 'lowStock';
            label = 'Low Stock';
        } else {
            statusType = 'active';
            label = 'Active';
        }

        const colors = {
            active: 'bg-green-100 text-green-700',
            lowStock: 'bg-amber-100 text-amber-700',
            outOfStock: 'bg-red-100 text-red-700',
            draft: 'bg-neutral-200 text-neutral-600'
        };

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${colors[statusType]}`}>
                {label}
            </span>
        );
    };

    // Filter and sort products
    const getFilteredAndSortedProducts = () => {
        let filtered = [...products];

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.sku?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply sorting
        switch (sortBy) {
            case 'latest':
                filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'price-high':
                filtered.sort((a, b) => b.basePrice - a.basePrice);
                break;
            case 'price-low':
                filtered.sort((a, b) => a.basePrice - b.basePrice);
                break;
            case 'stock':
                filtered.sort((a, b) => a.quantity - b.quantity);
                break;
            default:
                break;
        }

        return filtered;
    };

    const filteredProducts = getFilteredAndSortedProducts();

    // Pagination logic with validation
    const validTotalProducts = Array.isArray(filteredProducts) ? filteredProducts.length : 0;
    const totalPages = validTotalProducts > 0 ? Math.ceil(validTotalProducts / itemsPerPage) : 1;
    const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, validTotalProducts);
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    const stats = getStats();

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
                                {/* <span className="material-symbols-outlined text-xl">add</span> */}
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
                                    {stat.icon}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Table Section */}
                    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
                        {/* Table Header Controls */}
                        <TableHeaderControls
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                        />

                        {/* Products Table */}
                        <ProductsTable
                            filteredProducts={currentProducts}
                            getStatusBadge={getStatusBadge}
                        />

                        {/* Pagination */}
                        <Pagination
                            currentPage={validCurrentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                            totalItems={validTotalProducts}
                            startIndex={startIndex}
                            endIndex={endIndex}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
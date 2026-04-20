// components/Pagination.jsx
export default function Pagination({ currentPage, setCurrentPage, totalPages, totalItems, startIndex, endIndex }) {
    // Validate props and provide defaults
    const validCurrentPage = Number.isInteger(currentPage) && currentPage > 0 ? currentPage : 1;
    const validTotalPages = Number.isInteger(totalPages) && totalPages > 0 ? totalPages : 1;
    const validTotalItems = Number.isInteger(totalItems) && totalItems >= 0 ? totalItems : 0;
    const validStartIndex = Number.isInteger(startIndex) && startIndex >= 0 ? startIndex : 0;
    const validEndIndex = Number.isInteger(endIndex) && endIndex >= 0 ? endIndex : 0;

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (validTotalPages <= maxVisible) {
            for (let i = 1; i <= validTotalPages; i++) {
                pages.push(i);
            }
        } else {
            if (validCurrentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(validTotalPages);
            } else if (validCurrentPage >= validTotalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = validTotalPages - 3; i <= validTotalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = validCurrentPage - 1; i <= validCurrentPage + 1; i++) pages.push(i);
                pages.push('...');
                pages.push(validTotalPages);
            }
        }

        return pages;
    };

    // Don't render pagination if there are no items
    if (validTotalItems === 0) return null;

    const startDisplay = validStartIndex + 1;
    const endDisplay = Math.min(validEndIndex, validTotalItems);

    // Ensure we have valid numbers for display
    if (isNaN(startDisplay) || isNaN(endDisplay) || isNaN(validTotalItems)) {
        return null;
    }

    return (
        <div className="p-4 md:p-6 border-t border-surface-container-low flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs md:text-sm text-secondary-dim">
                Showing <span className="font-bold text-on-surface">{String(startDisplay)}</span> to{' '}
                <span className="font-bold text-on-surface">{String(endDisplay)}</span> of{' '}
                <span className="font-bold text-on-surface">{String(validTotalItems)}</span> products
            </p>
            <div className="flex items-center gap-1 md:gap-2">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={validCurrentPage === 1}
                    className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-secondary-dim hover:bg-surface-container-low transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    {/* <span className="material-symbols-outlined text-lg">chevron_left</span> */}
                </button>

                {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                        <span key={`dots-${index}`} className="px-1 md:px-2 text-outline text-sm">...</span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg transition-colors text-sm md:text-base ${validCurrentPage === page
                                ? 'bg-primary text-on-primary font-bold shadow-md shadow-primary/20'
                                : 'hover:bg-surface-container-low text-on-surface'
                                }`}
                        >
                            {page}
                        </button>
                    )
                ))}

                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, validTotalPages))}
                    disabled={validCurrentPage === validTotalPages}
                    className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-secondary-dim hover:bg-surface-container-low transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    {/* <span className="material-symbols-outlined text-lg">chevron_right</span> */}
                </button>
            </div>
        </div>
    );
}
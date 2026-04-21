// components/ProductsTable.jsx
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";

export default function ProductsTable({ filteredProducts, getStatusBadge }) {
    return (
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
                            Status
                        </th>
                        <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-outline">
                            Price
                        </th>
                        <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-outline text-right">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low">
                    {filteredProducts.map((product) => (
                        <tr key={product._id} className="hover:bg-surface-container-low/20 transition-colors group">
                            <td className="px-4 md:px-6 py-4">
                                <div className="flex items-center gap-3 md:gap-4">
                                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl overflow-hidden bg-surface-container shrink-0">
                                        {product.primaryImage ? (
                                            <img
                                                alt={product.productName}
                                                className="w-full h-full object-cover"
                                                src={product.primaryImage}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-surface-container-low">
                                                <span className="material-symbols-outlined text-outline">image</span>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-bold text-on-surface text-sm md:text-base line-clamp-2">
                                            {product.productName}
                                        </p>
                                        <p className="text-[10px] md:text-xs text-secondary-dim uppercase tracking-tighter">
                                            SKU: {product.sku}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 md:px-6 py-4 text-xs md:text-sm font-medium text-secondary-dim">
                                {product.category || 'Uncategorized'}
                            </td>
                            <td className="px-4 md:px-6 py-4 text-center">
                                <span className={`text-sm font-bold ${product.quantity === 0 ? 'text-error' :
                                    product.quantity < 10 ? 'text-amber-600' : 'text-on-surface'
                                    }`}>
                                    {product.quantity}
                                </span>
                            </td>
                            <td className="px-4 md:px-6 py-4">
                                {getStatusBadge(product.status, product.quantity)}
                            </td>
                            <td className="px-4 md:px-6 py-4">
                                <div>
                                    <p className="text-sm font-bold text-on-surface">
                                        ${product.basePrice?.toFixed(2) || '0.00'}
                                    </p>
                                    {product.comparePrice && product.comparePrice > product.basePrice && (
                                        <p className="text-[10px] text-secondary-dim line-through">
                                            ${product.comparePrice.toFixed(2)}
                                        </p>
                                    )}
                                </div>
                            </td>
                            <td className="px-4 md:px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-1 md:gap-2 ">
                                    <EditBtn product={product} />
                                    <DeleteBtn product={product} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                    <span className="material-symbols-outlined text-4xl text-outline mb-2">inventory_2</span>
                    <p className="text-secondary-dim">No products found</p>
                </div>
            )}
        </div>
    );
}
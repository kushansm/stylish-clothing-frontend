import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [page,setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters,setFilters] = useState({ search: "", category: "", size: "", minPrice:"", maxPrice:"" });

    const fetch = async () => {
        const res = await getProducts({ page, limit: 12, ...filters });
        setProducts(res.data.products);
        setTotalPages(res.data.pages);
    };

    useEffect(() => { fetch(); }, [page, filters]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">All Products</h1>

            <div className="max-w-6xl mx-auto">
                {/* Filters */}
                <div className="flex gap-2 mb-4">
                    <input placeholder="Search" value={filters.search} onChange={e=>setFilters(f=>({...f,search:e.target.value}))} className="border p-2 rounded w-full" />
                    <select value={filters.category} onChange={e=>setFilters(f=>({...f,category:e.target.value}))} className="border p-2 rounded">
                        <option value="">All</option>
                        <option>Men</option><option>Women</option><option>Kids</option>
                    </select>
                    <select value={filters.size} onChange={e=>setFilters(f=>({...f,size:e.target.value}))} className="border p-2 rounded">
                        <option value="">Size</option><option>S</option><option>M</option><option>L</option><option>XL</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(p => <ProductCard key={p._id} product={p} />)}
                </div>

                <div className="flex justify-center gap-2 mt-6">
                    <button disabled={page<=1} onClick={()=>setPage(p=>p-1)} className="px-3 py-1 border rounded">Prev</button>
                    <div className="px-3 py-1">{page} / {totalPages}</div>
                    <button disabled={page>=totalPages} onClick={()=>setPage(p=>p+1)} className="px-3 py-1 border rounded">Next</button>
                </div>
            </div>
        </div>
    );
}

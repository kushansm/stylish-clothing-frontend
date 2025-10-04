import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import API from "../api";

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        API.get("/products")
            .then((res) => setProducts(res.data.products))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                All Products
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
}

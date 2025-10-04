import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, addToCart } from "../api";

export default function Product() {
    const { id } = useParams();
    const nav = useNavigate();
    const [product, setProduct] = useState(null);
    const [size, setSize] = useState("");
    const [qty, setQty] = useState(1);

    useEffect(() => {
        getProductById(id).then(r=>setProduct(r.data)).catch(()=>{});
    }, [id]);

    const handleAdd = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            await addToCart({ productId: id, size, quantity: qty });
            alert("Added to cart");
        } else {
            // guest: use localStorage
            const g = JSON.parse(localStorage.getItem("guest_cart") || "[]");
            const found = g.find(i => i.productId === id && i.size === size);
            if (found) found.quantity += qty;
            else g.push({ productId: id, size, quantity: qty });
            localStorage.setItem("guest_cart", JSON.stringify(g));
            alert("Added to guest cart");
        }
    };

    if (!product) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6 max-w-4xl mx-auto flex gap-6">
            <img src={product.image} alt={product.name} className="w-1/2 rounded object-cover" />
            <div className="flex-1">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <p className="text-gray-700 mt-2">${product.price}</p>
                <p className="mt-4">{product.description}</p>
                <div className="mt-4">
                    <select value={size} onChange={e=>setSize(e.target.value)} className="border p-2 rounded">
                        <option value="">Select size</option>
                        {product.sizes.map(s => <option key={s}>{s}</option>)}
                    </select>
                    <input type="number" min="1" value={qty} onChange={e=>setQty(Number(e.target.value))} className="border p-2 rounded ml-2 w-20" />
                </div>
                <button disabled={!size} onClick={handleAdd} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">Add to cart</button>
            </div>
        </div>
    );
}

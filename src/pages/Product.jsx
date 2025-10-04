import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        API.get(`/products/${id}`)
            .then((res) => setProduct(res.data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!product) return <div className="p-6">Loading...</div>;

    return (
        <div className="p-6 max-w-3xl mx-auto flex flex-col md:flex-row gap-6">
            <img src={product.image} alt={product.name} className="w-full md:w-1/2 object-cover rounded" />
            <div className="flex-1">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-gray-700 mt-2">${product.price}</p>
                <p className="mt-4">{product.description}</p>
            </div>
        </div>
    );
}

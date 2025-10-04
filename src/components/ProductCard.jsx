import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    return (
        <div className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
            <img src={product.image} alt={product.name} className="h-48 object-cover rounded" />
            <h3 className="font-bold mt-2 text-lg">{product.name}</h3>
            <p className="text-gray-700 mt-1">${product.price}</p>
            <Link
                to={`/products/${product._id}`}
                className="mt-auto text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
            >
                View
            </Link>
        </div>
    );
}

import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        API.get("/cart")
            .then((res) => setCart(res.data.cart))
            .catch((err) => console.error(err));
    }, []);

    const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>
            {cart.length === 0 ? (
                <p className="text-center text-gray-700">Cart is empty.</p>
            ) : (
                <div className="space-y-4">
                    {cart.map((item) => (
                        <div key={item._id} className="flex justify-between items-center border p-4 rounded">
                            <div className="flex gap-4 items-center">
                                <img src={item.product.image} className="w-20 h-20 object-cover rounded" />
                                <div>
                                    <h3 className="font-bold">{item.product.name}</h3>
                                    <p>${item.product.price}</p>
                                    <p>Size: {item.size}</p>
                                    <p>Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <button className="bg-red-600 text-white px-3 py-1 rounded">Remove</button>
                        </div>
                    ))}
                    <div className="text-right font-bold text-xl mt-4">
                        Total: ${total}
                    </div>
                    <Link
                        to="/checkout"
                        className="block mt-4 bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-500"
                    >
                        Checkout
                    </Link>
                </div>
            )}
        </div>
    );
}

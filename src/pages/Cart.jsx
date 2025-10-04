import { useEffect, useState } from "react";
import { getCart, removeFromCart, updateCartItem, getProductById } from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const nav = useNavigate();

    // Load cart items
    const load = async () => {
        const token = localStorage.getItem("token");

        if (token) {
            // Logged-in user: fetch cart from backend
            const res = await getCart();
            setCart(res.data.cart);
        } else {
            // Guest user: fetch product details from backend
            const guest = JSON.parse(localStorage.getItem("guest_cart") || "[]");
            const detailedCart = await Promise.all(
                guest.map(async (item) => {
                    try {
                        const res = await getProductById(item.productId);
                        return {
                            product: res.data,
                            size: item.size,
                            quantity: item.quantity
                        };
                    } catch (err) {
                        console.error("Failed to fetch product", item.productId);
                        return null;
                    }
                })
            );
            setCart(detailedCart.filter(i => i !== null));
        }
    };

    useEffect(() => {
        load();
    }, []);

    // Remove item
    const handleRemove = async (productId, size) => {
        const token = localStorage.getItem("token");

        if (token) {
            await removeFromCart({ productId, size });
            load();
        } else {
            const guest = JSON.parse(localStorage.getItem("guest_cart") || "[]")
                .filter(i => !(i.productId === productId && i.size === size));
            localStorage.setItem("guest_cart", JSON.stringify(guest));
            load();
        }
    };

    // Total price
    const total = cart.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
            {cart.length === 0 ? <p>Cart empty</p> : (
                <div className="space-y-4">
                    {cart.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center border p-4 rounded">
                            <div className="flex gap-4 items-center">
                                <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded" />
                                <div>
                                    <h3 className="font-bold">{item.product.name}</h3>
                                    <p>${item.product.price}</p>
                                    <p>Size: {item.size}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={async e => {
                                        const q = Number(e.target.value);
                                        if (localStorage.getItem("token")) {
                                            await updateCartItem({ productId: item.product._id, size: item.size, quantity: q });
                                        } else {
                                            const guest = JSON.parse(localStorage.getItem("guest_cart") || "[]");
                                            const found = guest.find(x => x.productId === item.product._id && x.size === item.size);
                                            if (found) found.quantity = q;
                                            localStorage.setItem("guest_cart", JSON.stringify(guest));
                                        }
                                        load();
                                    }}
                                    className="border p-1 w-16"
                                />
                                <button
                                    onClick={() => handleRemove(item.product._id, item.size)}
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="text-right font-bold">Total: ${total}</div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Link to="/checkout" className="bg-blue-600 text-white px-4 py-2 rounded">
                            Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

import { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export function Checkout() {
    const [address, setAddress] = useState({
        street: "",
        city: "",
        country: "",
        postalCode: "",
        phone: "",
        email: ""
    });
    const [cart, setCart] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(localCart);
    }, []);

    const handlePlace = async (e) => {
        e.preventDefault();

        if (cart.length === 0) return alert("Cart is empty!");

        // Map items properly for backend
        const items = cart.map(item => ({
            product: item.product?._id || item._id || item.productId, // fallback for guest
            size: item.size,
            quantity: item.quantity,
            price: item.product?.price || item.price
        }));

        const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

        try {
            await API.post("/orders/checkout", {
                items,
                total,
                shippingAddress: address,
                paymentMethod: "COD",
                email: !localStorage.getItem("token") ? address.email : undefined
            });

            alert("Order placed! Check email.");
            localStorage.removeItem("cart"); // clear cart
            nav("/");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Checkout failed");
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto mt-10 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4 text-center">Checkout</h1>
            <form className="flex flex-col gap-2" onSubmit={handlePlace}>
                <input value={address.street} onChange={e => setAddress({...address, street: e.target.value})} placeholder="Street" className="border p-2 rounded" required />
                <input value={address.city} onChange={e => setAddress({...address, city: e.target.value})} placeholder="City" className="border p-2 rounded" required />
                <input value={address.country} onChange={e => setAddress({...address, country: e.target.value})} placeholder="Country" className="border p-2 rounded" required />
                <input value={address.postalCode} onChange={e => setAddress({...address, postalCode: e.target.value})} placeholder="Postal Code" className="border p-2 rounded" required />
                <input value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} placeholder="Phone" className="border p-2 rounded" required />
                {!localStorage.getItem("token") && (
                    <input value={address.email} onChange={e => setAddress({...address, email: e.target.value})} placeholder="Email" className="border p-2 rounded" required />
                )}
                <button type="submit" className="bg-green-600 text-white py-2 rounded mt-2">Place Order</button>
            </form>
        </div>
    );
}

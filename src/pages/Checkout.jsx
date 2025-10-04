import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export function Checkout() {
    const [address, setAddress] = useState({street: "", city: "", country: "", postalCode: "", phone: ""});
    const nav = useNavigate();

    const handlePlace = async (e) => {
        e.preventDefault();

        // Get cart from localStorage
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cart.length === 0) return alert("Cart is empty!");

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        try {
            await API.post("/orders/checkout", {
                items: cart.map(item => ({
                    product: item._id,
                    size: item.size,
                    quantity: item.quantity,
                    price: item.price,
                })),
                total,
                shippingAddress: address,
                paymentMethod: "COD"
            });
            alert("Order placed! Check email.");
            localStorage.removeItem("cart"); // clear cart
            nav("/");
        } catch (err) {
            console.error(err);
            alert("Checkout failed");
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto mt-10 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4 text-center">Checkout</h1>
            <form className="flex flex-col gap-2" onSubmit={handlePlace}>
                <input value={address.street} onChange={e => setAddress({...address, street: e.target.value})} placeholder="Street" className="border p-2 rounded"/>
                <input value={address.city} onChange={e => setAddress({...address, city: e.target.value})} placeholder="City" className="border p-2 rounded"/>
                <input value={address.country} onChange={e => setAddress({...address, country: e.target.value})} placeholder="Country" className="border p-2 rounded"/>
                <input value={address.postalCode} onChange={e => setAddress({...address, postalCode: e.target.value})} placeholder="Postal Code" className="border p-2 rounded"/>
                <input value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} placeholder="Phone" className="border p-2 rounded"/>
                <button type="submit" className="bg-green-600 text-white py-2 rounded mt-2">Place Order</button>
            </form>
        </div>
    );
}

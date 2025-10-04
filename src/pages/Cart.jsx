import { useEffect, useState } from "react";
import { getCart, removeFromCart, updateCartItem } from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const nav = useNavigate();

    const load = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            const res = await getCart();
            setCart(res.data.cart);
        } else {
            // load guest cart and fetch product data for display
            const guest = JSON.parse(localStorage.getItem("guest_cart") || "[]");
            // optionally fetch product details for each; for simplicity display ids
            setCart(guest.map(i=>({ product: { _id: i.productId, name: "Product", image: "", price: 0 }, ...i })));
        }
    };

    useEffect(()=>{ load(); }, []);

    const handleRemove = async (productId, size) => {
        if (localStorage.getItem("token")) {
            await removeFromCart({ productId, size });
            load();
        } else {
            const guest = JSON.parse(localStorage.getItem("guest_cart") || "[]").filter(i=> !(i.productId===productId && i.size===size));
            localStorage.setItem("guest_cart", JSON.stringify(guest));
            load();
        }
    };

    const total = cart.reduce((s,i) => s + (i.product?.price || 0) * i.quantity, 0);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
            {cart.length === 0 ? <p>Cart empty</p> : (
                <div className="space-y-4">
                    {cart.map((i, idx) => (
                        <div key={idx} className="flex justify-between items-center border p-4 rounded">
                            <div className="flex gap-4 items-center">
                                <img src={i.product.image} alt="" className="w-20 h-20 object-cover rounded" />
                                <div>
                                    <h3 className="font-bold">{i.product.name}</h3>
                                    <p>${i.product.price}</p>
                                    <p>Size: {i.size}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="number" min="1" value={i.quantity} onChange={async e=>{
                                    const q = Number(e.target.value);
                                    if (localStorage.getItem("token")) {
                                        await updateCartItem({ productId: i.product._id, size: i.size, quantity: q });
                                        load();
                                    } else {
                                        const guest = JSON.parse(localStorage.getItem("guest_cart") || "[]");
                                        const found = guest.find(x => x.productId === i.product._id && x.size === i.size);
                                        if (found) found.quantity = q;
                                        localStorage.setItem("guest_cart", JSON.stringify(guest));
                                        load();
                                    }
                                }} className="border p-1 w-16" />
                                <button onClick={()=>handleRemove(i.product._id, i.size)} className="bg-red-600 text-white px-3 py-1 rounded">Remove</button>
                            </div>
                        </div>
                    ))}
                    <div className="text-right font-bold">Total: ${total}</div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Link to="/checkout" className="bg-blue-600 text-white px-4 py-2 rounded">Checkout</Link>
                    </div>
                </div>
            )}
        </div>
    );
}

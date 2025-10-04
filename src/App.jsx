import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import {Checkout} from "./pages/Checkout.jsx";


function App() {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />

            <h1 className="text-3xl font-bold text-center text-blue-600 mt-10">
                Hello, Clothing E-Commerce 👕
            </h1>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Home />} />
                <Route path="/products/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

            </Routes>
        </div>
    );
}

export default App;

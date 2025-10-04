import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Navbar() {
    const { user, logout } = useContext(UserContext);

    return (
        <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
            <h2 className="text-xl font-bold tracking-wide">Clothing E-Commerce</h2>
            <ul className="flex space-x-6 items-center">
                <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
                <li><Link to="/products" className="hover:text-blue-400">Products</Link></li>
                <li><Link to="/cart" className="hover:text-blue-400">Cart</Link></li>

                {user ? (
                    <>
                        <li className="font-semibold">Hello, {user.name}</li>
                        <li>
                            <button
                                onClick={logout}
                                className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
                            >
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login" className="hover:text-blue-400">Login</Link></li>
                        <li><Link to="/register" className="hover:text-blue-400">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;

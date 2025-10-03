import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
            <h2 className="text-xl font-bold tracking-wide">Clothing E-Commerce</h2>

            <ul className="flex space-x-6">
                <li>
                    <Link
                        to="/"
                        className="hover:text-blue-400 transition-colors duration-200"
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/products"
                        className="hover:text-blue-400 transition-colors duration-200"
                    >
                        Products
                    </Link>
                </li>
                <li>
                    <Link
                        to="/cart"
                        className="hover:text-blue-400 transition-colors duration-200"
                    >
                        Cart
                    </Link>
                </li>
                <li>
                    <Link
                        to="/login"
                        className="hover:text-blue-400 transition-colors duration-200"
                    >
                        Login
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;

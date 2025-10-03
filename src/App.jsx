import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />

            <h1 className="text-3xl font-bold text-center text-blue-600 mt-10">
                Hello, Clothing E-Commerce 👕
            </h1>

            <Routes>
                {/* pages will go here */}
            </Routes>
        </div>
    );
}

export default App;

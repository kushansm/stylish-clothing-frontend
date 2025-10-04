import { useState } from "react";
import { loginUser } from "../api"; // your axios API wrapper
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser({ email, password });
            // Save JWT token
            localStorage.setItem("token", res.data.token);
            alert("Login successful!");
            nav("/"); // redirect to home
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="p-6 max-w-sm mx-auto mt-10 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
            <form className="flex flex-col gap-3" onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-500">
                    Login
                </button>
            </form>
        </div>
    );
}

import { useState, useContext } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext);
    const nav = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await registerUser({ name, email, password });

            // Save token
            localStorage.setItem("token", res.data.token);

            // Update user context
            setUser(res.data.user);

            alert("Registration successful!");
            nav("/"); // redirect to home
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="p-6 max-w-sm mx-auto mt-10 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
            <form className="flex flex-col gap-3" onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    className="border p-2 rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                    Register
                </button>
            </form>
        </div>
    );
}

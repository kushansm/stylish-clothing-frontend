// src/context/UserContext.jsx
import { createContext, useEffect, useState } from "react";
import API from "../api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loadUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setUser(null);
            return;
        }

        try {
            const res = await API.get("/auth/me"); // create a /me endpoint in backend to return logged-in user
            setUser(res.data.user);
        } catch (err) {
            console.error(err);
            setUser(null);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

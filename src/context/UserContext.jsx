import { createContext, useState, useEffect } from "react";
import API from "../api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Load user info from token/localStorage
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Optionally, decode token to get user info
            // For simplicity, assume backend returns user data in /auth/me
            API.get("/auth/me")
                .then(res => setUser(res.data))
                .catch(() => setUser(null));
        }
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

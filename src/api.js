import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api", // your backend URL
});

// Add JWT token if stored
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default API;

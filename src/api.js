import axios from "axios";

// Create Axios instance
const API = axios.create({
    baseURL: "http://localhost:5000/api", // your backend URL
});

// Automatically attach JWT token if present
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// Products
export const getProducts = (params) => API.get("/products", { params });
export const getProductById = (id) => API.get(`/products/${id}`);

// Cart
export const addToCart = (data) => API.post("/cart/add", data);
export const updateCartItem = (data) => API.put("/cart/update", data);
export const removeFromCart = (data) => API.delete("/cart/remove", { data });
export const getCart = () => API.get("/cart");

// Orders
export const checkoutCart = (data) => API.post("/orders/checkout", data);

export default API;

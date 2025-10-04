# Clothing E-Commerce Frontend (React)

Frontend for the Clothing Brand E-Commerce Web App. Allows users to browse products, manage cart, and checkout.

---

## Features

* User registration and login (JWT-based)
* Browse clothing items with categories (Men/Women/Kids)
* Search and filter products
* Pagination
* Shopping cart (guest: localStorage, user: backend)
* Checkout form
* Display logged-in user info and logout option

---

## Tech Stack

* React.js
* React Router
* Axios
* TailwindCSS

---

## Project Structure

```
frontend/
├─ src/
│  ├─ pages/
│  │  ├─ Home.jsx
│  │  ├─ Products.jsx
│  │  ├─ Cart.jsx
│  │  ├─ Checkout.jsx
│  │  ├─ Login.jsx
│  │  └─ Register.jsx
│  ├─ components/
│  │  └─ Navbar.jsx
│  ├─ api.js
│  ├─ App.jsx
│  └─ index.jsx
├─ package.json
└─ tailwind.config.js
```

---

## Setup

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

Open browser at `http://localhost:5173` (or port displayed in terminal)

---

## Scripts

| Script          | Description                    |
| --------------- | ------------------------------ |
| `npm run dev`   | Start React development server |
| `npm run build` | Build production bundle        |
| `npm start`     | Serve production build         |

---

## Notes & Trade-offs

* Minimal UI: focus on functionality, not design
* Guest cart stored in localStorage (not synced across devices)
* Checkout is mock (no real payment)
* Filters and pagination handled client-side
* Admin features not implemented
* Frontend expects backend API at `http://localhost:5000/api` by default

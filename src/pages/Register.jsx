

export default function Register() {
    return (
        <div className="p-6 max-w-sm mx-auto mt-10 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
            <form className="flex flex-col gap-3">
                <input type="text" placeholder="Name" className="border p-2 rounded" />
                <input type="email" placeholder="Email" className="border p-2 rounded" />
                <input type="password" placeholder="Password" className="border p-2 rounded" />
                <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-500">Register</button>
            </form>
        </div>
    );
}

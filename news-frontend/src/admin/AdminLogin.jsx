import { useState } from "react";
import { adminLogin } from "../api";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await adminLogin(username, password);
    console.log("LOGIN RESPONSE 👉", res);

    // ✅ YAHI MAIN FIX HAI
    if (res.access_token) {
      localStorage.setItem("token", res.access_token);

      // 🔴 IMPORTANT: route match hona chahiye
      navigate("/admin/dashboard");   // 👈 YAHI CHANGE
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow w-[400px]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          className="w-full border p-2 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;

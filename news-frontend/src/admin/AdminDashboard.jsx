import { useEffect, useState } from "react";
import { fetchAdminNews, deleteAdminNews } from "../api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetchAdminNews(token).then((data) => {
      setNews(data || []);
    });
  }, []);

  // 🔴 LOGOUT
  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;

    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this news?")) return;
    await deleteAdminNews(token, id);
    setNews(news.filter((n) => n._id !== id));
  };

  return (
    <div className="p-6">
      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <div className="flex gap-3">
          {/* ADD NEWS */}
          <button
            onClick={() => navigate("/admin/add")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add News
          </button>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ⚠️ NO NEWS */}
      {news.length === 0 && (
        <p className="text-gray-500">
          No news found. Click <b>Add News</b> to publish your first news.
        </p>
      )}

      {/* 📰 NEWS LIST */}
      {news.map((n) => (
        <div
          key={n._id}
          className="border p-4 mb-4 rounded bg-white shadow"
        >
          <h2 className="font-bold text-lg">{n.title}</h2>
          <p className="text-sm text-gray-600">
            Category: {n.category}
          </p>

          <div className="mt-3 flex gap-3">
            <button
              onClick={() => navigate(`/admin/edit/${n._id}`)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(n._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

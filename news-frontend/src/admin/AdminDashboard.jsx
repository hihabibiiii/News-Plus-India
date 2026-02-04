import { useEffect, useState } from "react";
import { fetchAllNews, deleteNews } from "../api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAllNews().then((data) => setNews(data));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this news?")) return;

    await deleteNews(token, id);
    setNews(news.filter((n) => n.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold">Admin Dashboard</h1>

  <div className="flex gap-3">
    <button
      onClick={() => navigate("/admin/add")}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      ➕ Add News
    </button>

    <button
      onClick={handleLogout}
      className="bg-gray-800 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  </div>
</div>


      {/* News List */}
      <div className="space-y-4">
        {news.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.category}</p>
            </div>

            <button
              onClick={() => handleDelete(item.id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

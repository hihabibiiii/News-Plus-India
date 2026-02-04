import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateAdminNews } from "../api";

export default function AdminEditNews() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    image: "",
    category: "",
    is_hero: false,
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/news/${id}`)
      .then((res) => res.json())
      .then(setForm);
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateAdminNews(token, id, form);
    alert("News updated");
    navigate("/admin/dashboard");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit News</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="title" value={form.title} onChange={handleChange} className="w-full border p-2" />
        <input name="summary" value={form.summary} onChange={handleChange} className="w-full border p-2" />
        <input name="image" value={form.image} onChange={handleChange} className="w-full border p-2" />
        <input name="category" value={form.category} onChange={handleChange} className="w-full border p-2" />

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          className="w-full border p-2"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_hero"
            checked={form.is_hero}
            onChange={handleChange}
          />
          Show in Hero Slider
        </label>

        <button className="bg-green-600 text-white px-4 py-2">
          Update News
        </button>
      </form>
    </div>
  );
}

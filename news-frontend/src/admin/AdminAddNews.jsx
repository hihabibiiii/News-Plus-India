import { useState } from "react";
import { addNews } from "../api";
import { useNavigate } from "react-router-dom";

export default function AdminAddNews() {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addNews(token, form);
    alert("✅ News added successfully");
    navigate("/admin/dashboard");
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Add News</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          className="w-full border p-2"
          onChange={handleChange}
          required
        />

        <input
          name="image"
          placeholder="Image URL"
          className="w-full border p-2"
          onChange={handleChange}
          required
        />

        <select
          name="category"
          className="w-full border p-2"
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option>India</option>
          <option>Politics</option>
          <option>World</option>
          <option>Sports</option>
          <option>Business</option>
          <option>Technology</option>
          <option>Entertainment</option>
          <option>Health</option>
        </select>

        <textarea
          name="summary"
          placeholder="Summary"
          className="w-full border p-2"
          rows="3"
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Full Content"
          className="w-full border p-2"
          rows="6"
          onChange={handleChange}
          required
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_hero"
            onChange={handleChange}
          />
          Show in Hero Slider
        </label>

        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-2 rounded"
        >
          Publish News
        </button>
      </form>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminAddNews() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    is_hero: false,
  });

  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("summary", form.summary);
    formData.append("content", form.content);
    formData.append("category", form.category);

    // 🔥 IMPORTANT: boolean as string
    formData.append("is_hero", form.is_hero ? "true" : "false");

    if (imageFile) {
      formData.append("image_file", imageFile);
    } else if (imageUrl) {
      formData.append("image_url", imageUrl);
    }

    const API_BASE_URL = import.meta.env.VITE_API_URL;

const res = await fetch(`${API_BASE_URL}/admin/news`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: formData,
});

    if (!res.ok) {
      alert("Error adding news");
      return;
    }

    alert("News published successfully");
    navigate("/admin/dashboard");
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Add News</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* TITLE */}
        <input
          name="title"
          placeholder="Title"
          className="w-full border p-2"
          onChange={handleChange}
          required
        />

        {/* IMAGE URL */}
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          disabled={!!imageFile}
          onChange={(e) => setImageUrl(e.target.value)}
          className={`w-full border p-2 ${
            imageFile ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        />

        <p className="text-center text-gray-500">OR</p>

        {/* IMAGE FILE */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImageFile(e.target.files[0]);
            setImageUrl("");
          }}
        />

        {/* PREVIEW */}
        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            className="h-40 rounded object-cover"
          />
        )}

        {!imageFile && imageUrl && (
          <img src={imageUrl} className="h-40 rounded object-cover" />
        )}

        {/* CATEGORY */}
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
        </select>

        {/* SUMMARY */}
        <textarea
          name="summary"
          placeholder="Summary"
          className="w-full border p-2"
          rows="3"
          onChange={handleChange}
          required
        />

        {/* CONTENT */}
        <textarea
          name="content"
          placeholder="Full Content"
          className="w-full border p-2"
          rows="6"
          onChange={handleChange}
          required
        />

        {/* HERO */}
        <label className="flex gap-2">
          <input
            type="checkbox"
            name="is_hero"
            onChange={handleChange}
          />
          Show in Hero Slider
        </label>

        <button className="bg-red-600 text-white px-6 py-2 rounded">
          Publish News
        </button>
      </form>
    </div>
  );
}

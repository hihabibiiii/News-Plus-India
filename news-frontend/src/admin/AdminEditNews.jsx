import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AdminEditNews() {
  const { id } = useParams();
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

  // 🔹 LOAD NEWS
  useEffect(() => {
  fetch(`${API_BASE_URL}/news/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setForm({
        title: data.title,
        summary: data.summary,
        content: data.content,
        category: data.category,
        is_hero: data.is_hero,
      });
      setImageUrl(data.image || "");
    });
}, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // 🔥 FIXED SUBMIT (FormData)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("summary", form.summary);
    formData.append("content", form.content);
    formData.append("category", form.category);
    formData.append("is_hero", form.is_hero ? "true" : "false");

    if (imageFile) {
      formData.append("image_file", imageFile);
    } else if (imageUrl) {
      formData.append("image_url", imageUrl);
    }

    const res = await fetch(
  `${API_BASE_URL}/admin/news/${id}`,
  {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }
);

    if (!res.ok) {
      alert("Image update failed");
      return;
    }

    alert("News updated successfully");
    navigate("/admin/dashboard");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit News</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* TITLE */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2"
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
          <img
            src={imageUrl}
            className="h-40 rounded object-cover"
          />
        )}

        {/* CATEGORY */}
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2"
        />

        {/* SUMMARY */}
        <textarea
          name="summary"
          value={form.summary}
          onChange={handleChange}
          className="w-full border p-2"
        />

        {/* CONTENT */}
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          className="w-full border p-2"
        />

        {/* HERO */}
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

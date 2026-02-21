const API_BASE_URL = import.meta.env.VITE_API_URL;

// 📰 Get all news
export async function fetchAllNews() {
  const res = await fetch(`${API_BASE_URL}/news`);
  return res.json();
}

// 📂 Get category news
export async function fetchCategoryNews(category) {
  const res = await fetch(`${API_BASE_URL}/news/category/${category}`);
  return res.json();
}

// 📰 Get single news
export async function fetchSingleNews(id) {
  const res = await fetch(`${API_BASE_URL}/news/${id}`);
  return res.json();
}

// 🔥 Hero news
export async function fetchHeroNews() {
  const res = await fetch(`${API_BASE_URL}/news/hero`);
  return res.json();
}

// 🔐 Admin login
export async function adminLogin(username, password) {
  const res = await fetch(`${API_BASE_URL}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ username, password }),
  });

  return res.json();
}

// ➕ Add news (ADMIN)
export async function addNews(token, data) {
  const res = await fetch(`${API_BASE_URL}/admin/news`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

// 📋 Get admin news
export async function fetchAdminNews(token) {
  const res = await fetch(`${API_BASE_URL}/admin/news`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

// ❌ Delete news
export async function deleteAdminNews(token, id) {
  const res = await fetch(`${API_BASE_URL}/admin/news/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

// ✏️ Update news (FormData)
export async function updateAdminNews(token, id, formData) {
  const res = await fetch(`${API_BASE_URL}/admin/news/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      // ❗ Content-Type mat daalo (FormData auto set karega)
    },
    body: formData,
  });

  return res.json();
}
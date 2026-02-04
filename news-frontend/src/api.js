const API_BASE_URL = "http://127.0.0.1:8000";

// 📰 Get all news
export async function fetchAllNews() {
  const res = await fetch(`${API_BASE_URL}/news`);
  return res.json();
}

// 📂 Get category news
export async function fetchCategoryNews(category) {
  const res = await fetch(
    `${API_BASE_URL}/news/category/${category}`
  );
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
    body: new URLSearchParams({
      username,
      password,
    }),
  });

  return res.json();
}

// ➕ Add news (ADMIN)
export async function addNews(token, data) {
  const res = await fetch(`${API_BASE_URL}/admin/news`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

// ❌ Delete news (ADMIN)
export async function deleteNews(token, id) {
  const res = await fetch(
    `${API_BASE_URL}/admin/news/${id}`,
    {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }
  );

  return res.json();
}

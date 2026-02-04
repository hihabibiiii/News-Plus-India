import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { fetchAllNews } from "./api";

import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import NewsCard from "./components/NewsCard";
import Footer from "./components/Footer";

import Category from "./pages/Category";
import NewsDetail from "./pages/NewsDetail";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminRoute from "./admin/AdminRoute";
import AdminAddNews from "./admin/AdminAddNews";
import AdminEditNews from "./admin/AdminEditNews";


function Layout() {
  const location = useLocation();

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllNews().then((data) => {
      setNews(data);
      setLoading(false);
    });
  }, []);

  // 🔹 Hero sirf Home par
  const hideHero =
    location.pathname.startsWith("/news/") ||
    location.pathname.startsWith("/category/") ||
    location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-white text-black">
      {/* ❌ Admin pages par Header/Footer nahi */}
      {!location.pathname.startsWith("/admin") && <Header />}

      {!hideHero && <HeroSlider category="All" />}

      <Routes>
        {/* 🏠 HOME */}
        <Route
          path="/"
          element={
            <main className="max-w-7xl mx-auto px-6 py-8">
              <h2 className="text-2xl font-bold mb-6">
                Top Headlines
              </h2>

              {loading ? (
                <p className="text-center">Loading news...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {news.map((item) => (
                    <NewsCard key={item.id} {...item} />
                  ))}
                </div>
              )}
            </main>
          }
        />

        {/* 📂 CATEGORY */}
        <Route path="/category/:name" element={<Category />} />

        {/* 📰 SINGLE NEWS */}
        <Route path="/news/:id" element={<NewsDetail />} />

        {/* 🔐 ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 🔐 ADMIN DASHBOARD (PROTECTED) */}
        <Route
  path="/admin/dashboard"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>
 <Route
    path="/admin/add"
    element={
      <AdminRoute>
        <AdminAddNews />
      </AdminRoute>
    }
  />
  <Route
  path="/admin/edit/:id"
  element={
    <AdminRoute>
      <AdminEditNews />
    </AdminRoute>
  }
/>

 </Routes>

      {!location.pathname.startsWith("/admin") && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

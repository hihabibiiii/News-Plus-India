import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import NewsCard from "./components/NewsCard";
import Footer from "./components/Footer";

import Category from "./pages/Category";
import NewsDetail from "./pages/NewsDetail";
import news from "./data/news";

function Layout() {
  const location = useLocation();

  // 🔴 Hero sirf Home page par dikhe
  const hideHero =
    location.pathname.startsWith("/news/") ||
    location.pathname.startsWith("/category/");

  return (
    <>
      <Header />

      {!hideHero && <HeroSlider category="All" />}

      <Routes>
        {/* 🏠 HOME */}
        <Route
          path="/"
          element={
            <main className="max-w-7xl mx-auto px-6 py-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Top Headlines
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {news.map((item) => (
                  <NewsCard key={item.id} {...item} />
                ))}
              </div>
            </main>
          }
        />

        {/* 📂 CATEGORY PAGE */}
        <Route path="/category/:name" element={<Category />} />

        {/* 📰 SINGLE NEWS */}
        <Route path="/news/:id" element={<NewsDetail />} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;

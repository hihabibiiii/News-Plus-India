import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";
import { fetchCategoryNews } from "../api";

const ITEMS_PER_LOAD = 6;

function Category() {
  const { name } = useParams();

  const [news, setNews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH CATEGORY NEWS FROM BACKEND
  useEffect(() => {
    setLoading(true);
    fetchCategoryNews(name).then((data) => {
      setNews(data);
      setVisibleCount(ITEMS_PER_LOAD);
      setLoading(false);
    });
  }, [name]);

  // 🔥 INFINITE SCROLL
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200;

      if (nearBottom && visibleCount < news.length) {
        setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount, news.length]);

  const visibleNews = news.slice(0, visibleCount);

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-6 capitalize">
        {name} News
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">
          Loading news...
        </p>
      ) : visibleNews.length === 0 ? (
        <p className="text-gray-500">
          No news found
        </p>
      ) : (
        <>
          {/* 📰 NEWS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleNews.map((item) => (
              <NewsCard key={item.id} {...item} />
            ))}
          </div>

          {/* ⏳ LOAD MORE */}
          {visibleCount < news.length && (
            <p className="text-center text-gray-500 mt-8">
              Loading more news...
            </p>
          )}
        </>
      )}
    </main>
  );
}

export default Category;

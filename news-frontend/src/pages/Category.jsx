import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";
import news from "../data/news";

const ITEMS_PER_LOAD = 6;

function Category() {
  const { name } = useParams();

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  // 🔎 Category-wise filter
  const filteredNews = news.filter(
    (item) =>
      item.category.toLowerCase() === name.toLowerCase()
  );

  // 🔁 Category change par reset
  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [name]);

  // 👇 Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200;

      if (nearBottom && visibleCount < filteredNews.length) {
        setVisibleCount((prev) =>
          prev + ITEMS_PER_LOAD
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, [visibleCount, filteredNews.length]);

  const visibleNews = filteredNews.slice(
    0,
    visibleCount
  );

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-6 capitalize">
        {name} News
      </h2>

      {visibleNews.length === 0 ? (
        <p className="text-gray-500">
          No news found
        </p>
      ) : (
        <>
          {/* News Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleNews.map((item) => (
              <NewsCard key={item.id} {...item} />
            ))}
          </div>

          {/* Loading indicator */}
          {visibleCount < filteredNews.length && (
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

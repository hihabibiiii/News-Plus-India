import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const heroNews = [
  {
    id: 1,
    category: "India",
    title: "Big breaking news from India impacting millions today",
    image: "https://images.unsplash.com/photo-1581092334651-ddf26d9b66c6",
    tag: "India",
  },
  {
    id: 2,
    category: "Politics",
    title: "Government announces major reform for youth employment",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620",
    tag: "Politics",
  },
  {
    id: 3,
    category: "Sports",
    title: "India wins thrilling match in international tournament",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a",
    tag: "Sports",
  },
  {
    id: 4,
    category: "Technology",
    title: "Technology sector sees massive growth in 2026",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    tag: "Technology",
  },
  {
    id: 5,
    category: "Business",
    title: "Stock market hits new all-time high this week",
    image: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9",
    tag: "Business",
  },
  
];

function HeroSlider({ category }) {
  const [current, setCurrent] = useState(0);

  // 🔹 Category ke hisaab se filter
  const filteredNews =
    category === "All"
      ? heroNews
      : heroNews.filter((n) => n.category === category);

  // 🔹 Category change hone par slider reset
  useEffect(() => {
    setCurrent(0);
  }, [category]);

  // 🔹 Auto slide (filtered news par)
  useEffect(() => {
    if (filteredNews.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % filteredNews.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [filteredNews]);

  // 🔹 Agar category me hero news na ho
  if (filteredNews.length === 0) return null;

  const news = filteredNews[current];

  return (
  <section className="bg-gray-100">
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="relative h-[420px] rounded-xl overflow-hidden shadow-lg">

        {/* 🔗 CLICKABLE HERO */}
        <Link to={`/news/${news.id}`} className="block h-full">
          {/* Image */}
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover transition-all duration-700"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 flex items-end">
            <div className="p-6">
              <span className="bg-red-600 text-white text-xs px-3 py-1 rounded">
                {news.tag}
              </span>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold text-white max-w-3xl">
                {news.title}
              </h2>
            </div>
          </div>
        </Link>

        {/* Dots */}
        <div className="absolute bottom-4 right-4 flex gap-2 z-10">
          {filteredNews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 w-3 rounded-full ${
                index === current ? "bg-red-500" : "bg-white/50"
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  </section>
);

}

export default HeroSlider;

import { useEffect, useState } from "react";
import { fetchHeroNews } from "../api";

function HeroSlider() {
  const [news, setNews] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchHeroNews().then(setNews);
  }, []);

  useEffect(() => {
    if (news.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % news.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [news]);

  if (news.length === 0) return null;

  const item = news[current];

  return (
    <section className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="relative h-[420px] rounded-xl overflow-hidden">
          <img src={item.image} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 flex items-end p-6">
            <h2 className="text-3xl font-bold text-white">
              {item.title}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSlider;

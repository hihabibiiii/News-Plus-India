import { Link } from "react-router-dom";

function NewsCard({ id, image, title, summary, category }) {
  return (
    <Link to={`/news/${id}`}>
      <article className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 cursor-pointer">
        
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />

          {/* Category Badge */}
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">
            {category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-bold text-lg text-gray-900 leading-snug line-clamp-2 group-hover:text-red-600 transition">
            {title}
          </h3>

          <p className="mt-3 text-sm text-gray-600 line-clamp-3">
            {summary}
          </p>

          {/* Read More */}
          <div className="mt-4 text-sm font-semibold text-red-600">
            Read More →
          </div>
        </div>
      </article>
    </Link>
  );
}

export default NewsCard;

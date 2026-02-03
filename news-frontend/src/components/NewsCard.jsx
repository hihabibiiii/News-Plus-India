import { Link } from "react-router-dom";

function NewsCard({ id, image, title, summary, category }) {
  return (
    <Link to={`/news/${id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer ">
        <img
          src={image}
          alt={title}
          className="h-48 w-full object-cover rounded-t-lg"
        />
        <div className="p-4">
          <span className="text-xs text-red-600 font-semibold uppercase">
            {category}
          </span>
          <h3 className="mt-2 font-bold text-lg text-gray-900 line-clamp-2">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">
            {summary}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default NewsCard;

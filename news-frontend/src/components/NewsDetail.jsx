import { useParams } from "react-router-dom";
import news from "../data/news";

function NewsDetail() {
  const { id } = useParams();

  const article = news.find((item) => item.id === Number(id));

  if (!article) {
    return (
      <div className="text-center py-10 text-gray-500">
        News not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <span className="text-red-600 font-semibold text-sm">
        {article.category}
      </span>

      <h1 className="mt-2 text-3xl font-bold text-gray-900">
        {article.title}
      </h1>

      <img
        src={article.image}
        alt={article.title}
        className="w-full h-80 object-cover rounded-lg my-6"
      />

      <p className="text-gray-700 leading-relaxed text-lg">
        {article.summary} <br /><br />
        This is a detailed version of the news article. In a real application,
        this content will come from the backend and may include full reports,
        quotes, and additional media.
      </p>
    </div>
  );
}

export default NewsDetail;

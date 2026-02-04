import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSingleNews } from "../api";

function NewsDetail() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSingleNews(id).then((data) => {
      setArticle(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!article) {
    return <p className="text-center mt-10">News not found</p>;
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">
        {article.title}
      </h1>

      <img
        src={article.image}
        alt={article.title}
        className="w-full rounded mb-6"
      />

      <p className="text-gray-700 ">
        {article.summary}
      </p>
    </main>
  );
}

export default NewsDetail;

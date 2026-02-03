fetch("http://localhost:8000/news")
  .then(res => res.json())
  .then(data => setNews(data));

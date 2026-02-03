from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from data import news_data
from models import News

app = FastAPI(title="News Plus India API")

# 🔥 CORS (React connect ke liye)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # frontend url baad me restrict karenge
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🏠 Root
@app.get("/")
def home():
    return {"message": "News Plus India Backend Running"}

# 📰 All News
@app.get("/news", response_model=list[News])
def get_all_news():
    return news_data

# 📂 Category wise news
@app.get("/news/category/{category}", response_model=list[News])
def get_news_by_category(category: str):
    filtered = [
        n for n in news_data
        if n["category"].lower() == category.lower()
    ]
    return filtered

# 🧾 Single news
@app.get("/news/{news_id}", response_model=News)
def get_single_news(news_id: int):
    for news in news_data:
        if news["id"] == news_id:
            return news
    raise HTTPException(status_code=404, detail="News not found")

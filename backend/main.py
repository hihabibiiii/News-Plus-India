from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from bson import ObjectId


from database import news_collection
from models import News
from auth import ADMIN, verify_password
from security import create_token
from dependencies import admin_required

app = FastAPI(title="News Plus India API")

# ✅ CORS FIX
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- HOME ----------------
@app.get("/")
def home():
    return {"message": "Backend running"}

# ---------------- ADMIN LOGIN ----------------
@app.post("/admin/login")
def admin_login(form: OAuth2PasswordRequestForm = Depends()):
    if form.username != ADMIN["username"]:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(form.password, ADMIN["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token({"sub": form.username})
    return {"access_token": token, "token_type": "bearer"}

# ---------------- ADD NEWS ----------------
@app.post("/admin/news")
def add_news(news: dict, admin=Depends(admin_required)):
    result = news_collection.insert_one(news)
    news["_id"] = str(result.inserted_id)
    return {"message": "News added successfully", "news": news}


# ---------------- DELETE NEWS ----------------
@app.delete("/admin/news/{id}")
def delete_news(id: str, admin=Depends(admin_required)):
    news_collection.delete_one({"_id": ObjectId(id)})
    return {"message": "Deleted"}

# ---------------- ALL NEWS ----------------
@app.get("/news")
def get_all_news():
    news = list(news_collection.find())
    for n in news:
        n["_id"] = str(n["_id"])
    return news


# ---------------- HERO NEWS ----------------
@app.get("/news/hero")
def hero_news():
    news = list(news_collection.find({"is_hero": True}).limit(5))
    for n in news:
        n["_id"] = str(n["_id"])
    return news


# ---------------- CATEGORY NEWS ----------------
@app.get("/news/category/{category}")
def get_news_by_category(category: str):
    news = list(news_collection.find({
        "category": {"$regex": f"^{category}$", "$options": "i"}
    }))
    for n in news:
        n["_id"] = str(n["_id"])
    return news


# ---------------- SINGLE NEWS ----------------

@app.get("/news/{news_id}")
def get_single_news(news_id: str):
    news = news_collection.find_one({"_id": ObjectId(news_id)})
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    news["_id"] = str(news["_id"])
    return news

@app.get("/test-db")
def test_db():
    count = news_collection.count_documents({})
    return {"mongo": "connected", "documents": count}

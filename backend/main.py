from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import UploadFile, File, Form
from fastapi.staticfiles import StaticFiles
import os, shutil
from bson import ObjectId
import re

app = FastAPI()

from database import news_collection
from models import News
from auth import ADMIN, verify_password
from security import create_token
from dependencies import admin_required
os.makedirs("uploads", exist_ok=True)
app = FastAPI(title="News Plus India API")

# ✅ CORS FIX

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

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

##slug
def make_slug(text: str):
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")

# ---------------- ADD NEWS ----------------

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/admin/news")
def add_news(
    title: str = Form(...),
    summary: str = Form(...),
    content: str = Form(...),
    category: str = Form(...),
    is_hero: bool = Form(False),
    image_url: str = Form(None),
    image_file: UploadFile = File(None),
):
    image = None

    # 🔹 Image upload
    if image_file:
        filename = f"{ObjectId()}_{image_file.filename}"
        file_path = os.path.join(UPLOAD_DIR, filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image_file.file, buffer)

        image = f"http://127.0.0.1:8000/uploads/{filename}"

    # 🔹 Image URL
    elif image_url:
        image = image_url

    # 🔹 SLUG (🔥 MOST IMPORTANT FIX)
    slug = make_slug(title)

    # agar same slug pehle se ho to unique bana do
    if news_collection.find_one({"slug": slug}):
        slug = f"{slug}-{ObjectId()}"

    news_doc = {
        "title": title,
        "slug": slug,        # ✅ REQUIRED
        "summary": summary,
        "content": content,
        "category": category,
        "image": image,
        "is_hero": is_hero,
    }

    news_collection.insert_one(news_doc)

    return {"message": "News added successfully"}


# ---------------- DELETE NEWS ----------------
@app.delete("/admin/news/{id}")
def delete_news(id: str, admin=Depends(admin_required)):
    news_collection.delete_one({"_id": ObjectId(id)})
    return {"message": "Deleted"}

# ---------------- ALL NEWS ----------------
@app.get("/news")
def get_all_news():
    news = []
    for n in news_collection.find().sort("_id", -1):
        n["id"] = str(n["_id"])   # ✅ IMPORTANT
        del n["_id"]
        news.append(n)
    return news



# ---------------- HERO NEWS ----------------
@app.get("/news/hero")
def hero_news():
    news = []
    for n in news_collection.find({"is_hero": True}).sort("_id", -1).limit(5):
        n["id"] = str(n["_id"])
        del n["_id"]
        news.append(n)
    return news



# ---------------- CATEGORY NEWS ----------------
@app.get("/news/category/{category}")
def get_news_by_category(category: str):
    news = []
    for n in news_collection.find({
        "category": {"$regex": f"^{category}$", "$options": "i"}
    }):
        n["id"] = str(n["_id"])
        del n["_id"]
        news.append(n)
    return news



# ---------------- SINGLE NEWS ----------------

@app.get("/news/{news_id}")
def get_single_news(news_id: str):
    news = news_collection.find_one({"_id": ObjectId(news_id)})
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    news["_id"] = str(news["_id"])
    return news

@app.get("/admin/news")
def admin_get_news(admin=Depends(admin_required)):
    news = list(news_collection.find())
    for n in news:
        n["_id"] = str(n["_id"])
    return news



@app.delete("/admin/news/{news_id}")
def delete_news(news_id: str, admin=Depends(admin_required)):
    result = news_collection.delete_one({"_id": ObjectId(news_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="News not found")
    return {"message": "News deleted successfully"}



@app.put("/admin/news/{id}")
def update_news(
    id: str,
    title: str = Form(...),
    summary: str = Form(...),
    content: str = Form(...),
    category: str = Form(...),
    is_hero: bool = Form(False),
    image_url: str = Form(None),
    image_file: UploadFile = File(None),
):
    update_data = {
        "title": title,
        "summary": summary,
        "content": content,
        "category": category,
        "is_hero": is_hero,
    }

    if image_file:
        filename = f"{ObjectId()}_{image_file.filename}"
        path = os.path.join(UPLOAD_DIR, filename)
        with open(path, "wb") as f:
            shutil.copyfileobj(image_file.file, f)
        update_data["image"] = f"http://127.0.0.1:8000/uploads/{filename}"

    elif image_url:
        update_data["image"] = image_url

    news_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": update_data}
    )

    return {"message": "News updated"}
@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/db-test")
def db_test():
    count = news_collection.count_documents({})
    return {"news_count": count}

@app.get("/")
def root():
    return {"message": "API running"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
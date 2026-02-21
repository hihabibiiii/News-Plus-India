import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Local ke liye (Railway par ignore ho jayega)
load_dotenv()

MONGO_URL = os.getenv("MONGODB_URL")
DB_NAME = os.getenv("DB_NAME", "newsplusindia")

if not MONGO_URL:
    raise ValueError("❌ MONGODB_URL not found in environment variables")

client = MongoClient(MONGO_URL)
db = client[DB_NAME]
news_collection = db["news"]
from pymongo import MongoClient
import os

MONGO_URL = os.getenv("MONGODB_URL")

try:
    client = MongoClient(MONGO_URL)
    db = client["newsdb"]
    client.admin.command("ping")
    print("✅ MongoDB Connected")
except Exception as e:
    print("❌ MongoDB Connection Failed:", e)
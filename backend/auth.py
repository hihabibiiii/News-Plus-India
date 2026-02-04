from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ADMIN = {
    "username": "admin",
    "password": pwd_context.hash("admin123")
}

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

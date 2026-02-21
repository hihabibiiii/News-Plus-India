from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# pre-generated hash for password: admin123
ADMIN = {
    "username": "admin",
    "password": "$2b$12$KIXQ4QbZ8H6z0x9QxZ8H6uQ0GQm1l0p0WQ9v1pQJ7sY7QJ0zQJ7Q2"
}

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
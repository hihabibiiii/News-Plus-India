from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# pre-generated hash for password: admin123
ADMIN = {
    "username": "admin",
    "password": "$2b$12$xtu58A0nS.2wYdsIGnfY7OzV06c.aJjo.RIjcLBXydgaMNTIxJYQS"
}

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
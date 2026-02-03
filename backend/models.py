from pydantic import BaseModel

class News(BaseModel):
    id: int
    title: str
    category: str
    image: str
    summary: str

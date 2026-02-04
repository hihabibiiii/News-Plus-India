from pydantic import BaseModel, Field
from typing import Optional

class News(BaseModel):
    id: Optional[str] = Field(None)
    title: str
    summary: str
    content: str
    image: str
    category: str
    is_hero: bool = False

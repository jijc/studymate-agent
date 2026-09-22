from click import prompt
from pydantic import BaseModel


class PracticeQuestion(BaseModel):
    id: str
    prompt: str
    topic: str

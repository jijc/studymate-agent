from pydantic import BaseModel, Field


class AnswerSubmit(BaseModel):
    question_id: int = Field(gt=0)
    answer: str = Field(min_length=2, max_length=2000)

from pydantic import BaseModel, Field


class EvaluationResult(BaseModel):
    score: int = Field(ge=0, le=100)
    covered_points: list[str]
    missing_points: list[str]
    weak_topics: list[str]

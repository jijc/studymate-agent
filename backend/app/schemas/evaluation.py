"""
文件作用：定义评分结果 Schema（数据结构），约束 score、covered_points、missing_points 和 weak_topics。
"""

from pydantic import BaseModel, Field


class EvaluationResult(BaseModel):
    score: int = Field(ge=0, le=100)
    covered_points: list[str]
    missing_points: list[str]
    weak_topics: list[str]

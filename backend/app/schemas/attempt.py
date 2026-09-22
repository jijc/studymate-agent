"""
文件作用：定义用户提交答案的请求 Schema（数据结构），校验 question_id 和 answer。
"""

from pydantic import BaseModel, Field


class AnswerSubmit(BaseModel):
    question_id: int = Field(gt=0)
    answer: str = Field(min_length=2, max_length=2000)

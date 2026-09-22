"""
文件作用：定义早期“今日题目” Question Schema；当前主线正逐步迁移到 PracticeQuestion。
"""

from pydantic import BaseModel


class Question(BaseModel):
    id: int
    question: str
    topic: str

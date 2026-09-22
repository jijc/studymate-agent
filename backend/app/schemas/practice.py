"""
文件作用：定义真实练习题 Schema（数据结构），约束题目 id、prompt（题目正文）和 topic（知识点）。
"""

from pydantic import BaseModel


class PracticeQuestion(BaseModel):
    id: str
    prompt: str
    topic: str

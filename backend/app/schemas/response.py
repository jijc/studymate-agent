"""
文件作用：定义统一 API 响应 Schema（数据结构），用 Generic（泛型）支持不同业务 data 类型。
"""

from typing import Generic, TypeVar
from pydantic import BaseModel

T = TypeVar("T")


class ApiResponse(BaseModel, Generic[T]):
    code: int = 200
    msg: str = "success"
    data: T

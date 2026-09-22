"""
文件作用：练习题 API 接口层；接收 source / library_id / limit 等查询参数，并调用 practice_service 返回练习题。
"""

from fastapi import APIRouter, Query

from backend.app.api import questions
from backend.app.schemas.practice import PracticeQuestion
from backend.app.schemas.response import ApiResponse
from backend.app.services.practice_service import get_practice_questions

router = APIRouter(
    prefix="/practice",
    tags=["practice"],
)


@router.get(
    "/questions",
    response_model=ApiResponse[list[PracticeQuestion]],
    summary="获取练习题",
)
async def practice_questions(
        source: str = Query(..., min_length=1),
        library_id: str = Query(..., min_length=1),
        limit: int = Query(default=10, ge=1, le=10),
):
    questions = get_practice_questions(
        source=source,
        library_id=library_id,
        limit=limit,
    )

    return ApiResponse(data=questions)

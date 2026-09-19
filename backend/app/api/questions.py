from fastapi import APIRouter, Query

from backend.app.schemas.question import Question
from backend.app.schemas.response import ApiResponse
from backend.app.services.question_service import get_today_questions

router = APIRouter()


@router.get(
    "/questions/today",
    response_model=ApiResponse[list[Question]],
    summary="获取今天要练的题",
    description="用于获取今天要练的题目列表",
)
async def today_questions(
        limit: int = Query(default=5, ge=1, le=10),
):
    questions = get_today_questions(limit)

    return ApiResponse(data=questions)

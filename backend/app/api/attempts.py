from fastapi import APIRouter

from backend.app.schemas.attempt import AnswerSubmit
from backend.app.schemas.evaluation import EvaluationResult
from backend.app.services.evaluation_service import evaluate_answer

router = APIRouter()


@router.post(
    "/attempts",
    response_model=EvaluationResult,
    summary="提交并评分回答",
    description="提交一次面试题回答，并返回结构化评分结果",
)
async def create_attempt(payload: AnswerSubmit):
    return evaluate_answer(payload)

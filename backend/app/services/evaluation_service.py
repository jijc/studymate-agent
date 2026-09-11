from backend.app.schemas.attempt import AnswerSubmit
from backend.app.schemas.evaluation import EvaluationResult


def evaluate_answer(payload: AnswerSubmit) -> EvaluationResult:
    answer_length = len(payload.answer)
    if answer_length >= 50:
        score = 80
    elif answer_length >= 20:
        score = 60
    else:
        score = 40
    return EvaluationResult(
        score=score,
        covered_points=[
            "回答到了部分核心概念",
        ],
        missing_points=[
            "缺少更完整的原理说明",
        ],
        weak_topics=[
            "concept-depth",
        ]
    )

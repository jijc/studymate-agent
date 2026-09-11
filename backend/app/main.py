from fastapi import FastAPI, Query
from pydantic import BaseModel, Field

app = FastAPI()


class AnswerSubmit(BaseModel):
    question_id: int = Field(gt=0)
    answer: str = Field(min_length=2, max_length=2000)


class EvaluationResult(BaseModel):
    score: int = Field(ge=0, le=100)
    covered_points: list[str]
    missing_points: list[str]
    weak_topics: list[str]


@app.get("/",
         summary="检查服务状态",
         description="用于确认 StudyMate 后端是否正常运行"
         )
async def root():
    return {"message": "StudyMate API is running"}


@app.get("/questions/today",
         summary="获取今天要练的题",
         description="用于获取今天要练的题目列表，每天 5 道题"
         )
async def get_today_questions(
        limit: int = Query(5, ge=1, le=10),
):
    questions = [
        {"id": 1, "question": "什么是 JavaScript 闭包？", "topic": "JavaScript"},
        {"id": 2, "question": "Promise 和 async/await 是什么关系？", "topic": "JavaScript"},
        {"id": 3, "question": "Vue2 和 Vue3 响应式有什么区别？", "topic": "Vue"},
        {"id": 4, "question": "SSE 和 WebSocket 有什么区别？", "topic": "Network"},
        {"id": 5, "question": "什么是事件循环？", "topic": "JavaScript"},
        {"id": 6, "question": "React useEffect 是做什么的？", "topic": "React"},
        {"id": 7, "question": "HTTP 强缓存是什么？", "topic": "HTTP"},
        {"id": 8, "question": "Python async/await 是什么？", "topic": "Python"},
        {"id": 9, "question": "什么是 RAG？", "topic": "AI"},
        {"id": 10, "question": "什么是 Agent Tool Calling？", "topic": "Agent"},
    ]

    return questions[:limit]


@app.post("/attempts",
          summary="attempts-submit",
          description="attempts123"
          )
async def create_attempt(payload: AnswerSubmit):
    return {
        "question_id": payload.question_id,
        "answer": payload.answer,
        "status": "received",
    }

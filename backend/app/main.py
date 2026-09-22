"""
文件作用：FastAPI 后端应用入口；创建 app，并统一注册各业务 Router（路由器）。
"""

from fastapi import FastAPI

from backend.app.api.attempts import router as attempts_router
from backend.app.api.questions import router as questions_router
from backend.app.api.practice import router as practice_router

app = FastAPI()

app.include_router(questions_router)
app.include_router(attempts_router)
app.include_router(practice_router)


@app.get(
    "/",
    summary="检查服务状态",
    description="用于确认 StudyMate 后端是否正常运行",
)
async def root():
    return {"message": "StudyMate API is running"}

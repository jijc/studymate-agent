"""
文件作用：早期“今日题目” Service（业务服务层）；当前使用内存静态题库，主线正逐步迁移到 practice_service。
"""

QUESTIONS = [
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


def get_today_questions(limit: int):
    return QUESTIONS[:limit]

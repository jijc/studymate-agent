from backend.app.schemas.practice import PracticeQuestion

REACT_TOPICS = [
    "组件",
    "Hooks",
    "状态管理",
]

REACT_PROMPTS = [
    "什么是 React 组件？",
    "props 和 state 有什么区别？",
    "useState 是做什么的？",
    "React 组件为什么会重新渲染？",
    "useEffect 是做什么的？",
    "React 中为什么列表渲染需要 key？",
    "什么是受控组件？",
    "父子组件之间如何通信？",
    "useMemo 和 useCallback 分别解决什么问题？",
    "React 状态更新为什么推荐保持不可变？",
]


def get_practice_questions(
        source: str,
        library_id: str,
        limit: int
) -> list[PracticeQuestion]:
    if source != "basic" or library_id != "react":
        return []

    questions = []

    for index, prompt in enumerate(REACT_PROMPTS):
        question = PracticeQuestion(
            id=f"{source}-{library_id}-{index + 1}",
            prompt=prompt,
            topic=REACT_TOPICS[index % len(REACT_TOPICS)],
        )

        questions.append(question)

    return questions[:limit]

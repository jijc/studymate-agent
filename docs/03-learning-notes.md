# StudyMate Agent 学习笔记

> 目的：把每天学到的新知识整理成可复习、可迁移、可面试的长期笔记。

## 固定记录格式

每个知识点尽量按照以下结构记录：

```markdown
## 知识：

### 一句话本质

### 大白话解释

### 与 Vue / JavaScript 已知知识的类比

### 最小代码示例

### 在 StudyMate 项目中的用途

### 容易踩的坑

### 相关英文术语
```

---

## 当前索引

- Day 1：FastAPI 最小应用、路由、装饰器、异步函数、Python 字典返回 JSON

---

# Day 1

## 知识：FastAPI 最小应用与路由

### 一句话本质

FastAPI 用“路由 + Python 函数”把一个 HTTP 请求映射到一段后端处理逻辑。

### 大白话解释

`app = FastAPI()` 创建后端应用；`@app.get("/")` 告诉 FastAPI，当客户端用 GET 请求访问 `/` 时，执行紧跟在下面的函数。

`async def root()` 定义一个异步函数。以后访问数据库、调用 LLM、请求第三方接口时都会出现等待，异步可以避免等待期间把整个服务堵住。

函数返回 Python `dict` 时，FastAPI 会自动把它序列化成 JSON 响应。

### 与 Vue / JavaScript 已知知识的类比

Python：

```python
@app.get("/")
async def root():
    return {"message": "StudyMate API is running"}
```

可以先类比成 JavaScript 后端中的：

```javascript
router.get("/", async () => {
  return { message: "StudyMate API is running" }
})
```

`async def` 可以先类比 JavaScript 的 `async function`。

Python `dict` 可以先类比 JavaScript 普通对象。

### 最小代码示例

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "StudyMate API is running"}
```

### 在 StudyMate 项目中的用途

后续会逐步增加例如：

- `GET /questions/today`：取得今天的面试题
- `POST /attempts`：提交一次回答
- `GET /mastery`：读取知识掌握度

### 容易踩的坑

- `@app.get(...)` 必须写在它要注册的函数正上方。
- Python 使用缩进表示代码块，函数体必须正确缩进。
- `async def` 并不代表里面所有代码都会自动异步；真正的 I/O 操作还需要使用支持异步的调用方式。

### 相关英文术语

- Route：路由
- Decorator：装饰器
- Request：请求
- Response：响应
- Async / Asynchronous：异步
- Dictionary (`dict`)：字典
- JSON：JavaScript Object Notation
- Swagger UI：接口文档与调试界面

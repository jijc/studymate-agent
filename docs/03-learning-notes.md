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
- Day 1：Query 查询参数、默认值、类型标注与数值/字符串校验
- Day 1：Python list 切片（slice）常见写法

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

---

## 知识：FastAPI Query 查询参数与校验

### 一句话本质

`Query(...)` 用来声明 URL 查询参数的默认值、范围、长度、格式和接口文档信息，FastAPI 会自动完成解析与校验。

### 大白话解释

例如：

```python
limit: int = Query(default=5, ge=1, le=10)
```

表示 `limit` 是整数，默认值是 5，并且只能在 1 到 10 之间。

常见数值约束：

- `gt` = greater than，严格大于，例如 `gt=0` 表示 `> 0`
- `ge` = greater than or equal，大于等于，例如 `ge=1` 表示 `>= 1`
- `lt` = less than，严格小于，例如 `lt=100` 表示 `< 100`
- `le` = less than or equal，小于等于，例如 `le=10` 表示 `<= 10`
- `multiple_of` = 必须是某个数的倍数，例如 `multiple_of=5`

常见字符串约束：

- `min_length` = 最小长度
- `max_length` = 最大长度
- `pattern` = 正则表达式格式校验

常见文档/参数配置：

- `default` = 默认值
- `description` = Swagger 文档中的参数说明
- `title` = 参数标题
- `alias` = URL 中使用另一个参数名
- `deprecated=True` = 标记参数已废弃

### 与 Vue / JavaScript 已知知识的类比

可以把 FastAPI 的 `Query` 理解成把前端常见的“参数类型 + 表单校验规则 + 接口文档”放到一个地方声明。

例如前端可能写：

```javascript
if (limit < 1 || limit > 10) {
  throw new Error('limit 不合法')
}
```

FastAPI 可以通过：

```python
limit: int = Query(default=5, ge=1, le=10)
```

自动完成。

### 最小代码示例

```python
from fastapi import FastAPI, Query

app = FastAPI()

@app.get("/questions/today")
async def get_today_questions(
    limit: int = Query(default=5, ge=1, le=10)
):
    return {"limit": limit}
```

字符串例子：

```python
keyword: str = Query(
    default="",
    min_length=0,
    max_length=30,
    description="题目搜索关键词"
)
```

### 在 StudyMate 项目中的用途

`GET /questions/today?limit=10` 可以让用户控制今天返回几道题，同时限制合法范围，避免传入 0、负数或过大的数量。

### 容易踩的坑

- `gt` 和 `ge` 不一样：`gt=1` 不允许 1，`ge=1` 允许 1。
- `lt` 和 `le` 同理。
- 类型标注写成 `int` 后，传入无法转换成整数的值会被 FastAPI 自动拒绝。
- 校验失败时 FastAPI 通常返回 422，而不是进入业务函数后再手写判断。

### 面试可说答案

FastAPI 可以通过 Python 类型标注配合 `Query`、`Path`、Pydantic Model 等方式声明请求数据约束。比如 `ge/le` 可以约束数值范围，`min_length/max_length/pattern` 可以约束字符串。校验失败时框架会自动返回结构化错误响应，同时这些约束也会进入 OpenAPI 文档。

### 相关英文术语

- Query Parameter：查询参数
- Validation：校验
- Greater Than：大于
- Greater Than or Equal：大于等于
- Less Than：小于
- Less Than or Equal：小于等于
- Pattern：模式 / 正则表达式
- Alias：别名

---

## 知识：Python list 切片（slice）

### 一句话本质

Python 的切片就是从序列里按“开始、结束、步长”取一部分数据，语法是 `list[start:stop:step]`。

### 大白话解释

`questions[:limit]` 的意思是：从开头开始，取到 `limit` 之前，不包含 `limit` 对应的位置。

例如：

```python
items = [10, 20, 30, 40, 50]

items[:3]      # [10, 20, 30]
items[1:4]     # [20, 30, 40]
items[2:]      # [30, 40, 50]
items[:]       # 复制整个列表（浅拷贝）
items[::2]     # [10, 30, 50]，每隔一个取一个
items[::-1]    # [50, 40, 30, 20, 10]，倒序
items[-1]      # 50，最后一个元素（这是索引，不是切片）
items[-2:]     # [40, 50]，最后两个
```

### 与 JavaScript 的类比

Python：

```python
questions[:limit]
```

大致对应 JavaScript：

```javascript
questions.slice(0, limit)
```

Python：

```python
items[1:4]
```

对应 JavaScript：

```javascript
items.slice(1, 4)
```

Python 切片还有 `step`，例如：

```python
items[::2]
```

JavaScript 没有完全相同的 `slice` 第三个步长参数，通常需要 `filter` 等方式实现。

### 通用格式

```python
list[start:stop:step]
```

- `start`：从哪里开始，包含该位置
- `stop`：到哪里结束，不包含该位置
- `step`：步长，默认是 1

### 在 StudyMate 项目中的用途

```python
return questions[:limit]
```

用于根据用户传入的 `limit`，返回前 N 道题。

### 容易踩的坑

- `stop` 不包含结束位置。
- 负数索引从列表尾部开始算：`-1` 是最后一个。
- `[::-1]` 经常用于快速倒序，但大数据场景会生成新的列表副本。
- `[:]` 是浅拷贝，不会深拷贝嵌套对象。

### 面试可说答案

Python 切片语法是 `sequence[start:stop:step]`，可以用于 list、字符串等序列。`stop` 不包含结束位置，支持负数索引和步长。例如 `items[:5]` 取前 5 个，`items[::-1]` 可以生成倒序副本。

### 相关英文术语

- Slice / Slicing：切片
- Start：开始位置
- Stop：结束位置
- Step：步长
- Negative Index：负数索引

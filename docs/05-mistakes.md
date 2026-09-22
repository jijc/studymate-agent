# StudyMate Agent 踩坑与 Bad Case 记录

> 目的：记录真实开发问题、排查思路和修复方式。两个月后这些内容会成为非常重要的项目经验和面试素材。

## 固定记录格式

```markdown
## 问题标题

日期：
Day：

### 现象

### 报错 / 日志

### 最初猜测

### 实际原因

### 排查过程

### 最终修复

### 为什么这样修

### 如何避免再次出现

### 面试可以怎么讲
```

---

## 当前记录

## Python 联合类型误写成 `int / str`

日期：2026-09-22

### 现象

启动 FastAPI 后 Swagger 一直加载，PyCharm 控制台启动失败。

### 报错 / 日志

~~~text
TypeError: unsupported operand type(s) for /: 'type' and 'type'
~~~

定位到：

~~~python
limit: int / str
~~~

### 最初想法

希望参数同时支持 int 和 str 两种类型。

### 实际原因

Python 中 `/` 是 division（除法）运算符。

因此：

~~~python
int / str
~~~

实际是在尝试对两个 type（类型对象）做除法，模块 import（导入）阶段就直接抛出 TypeError。

### 最终修复

如果真的需要联合类型，Python 3.10+ 应写：

~~~python
value: int | str
~~~

旧写法可以使用：

~~~python
from typing import Union

value: Union[int, str]
~~~

但当前 StudyMate 的 `limit` 不应该写联合类型，应保持：

~~~python
limit: int
~~~

FastAPI 会把 URL 中的 Query Parameter（查询参数）按照类型标注解析成 int，并继续执行 ge / le 校验。

### 为什么这样修

`limit` 在业务语义上就是数量，不应该同时接受任意字符串。

类型越精确，接口契约越清晰。

### 如何避免再次出现

看到 Python 类型“或”关系时记住：

~~~text
| = 或 / Union（联合类型）
/ = 除法
~~~

同时不要因为 HTTP Query 在 URL 中以文本形式传输，就把 FastAPI 参数标成 str；FastAPI 会负责类型解析。

### 面试可以怎么讲

FastAPI 会根据 Python 类型标注解析和校验 Query 参数。例如 `limit: int` 时，即使 URL 中原始参数来自文本，FastAPI 也会尝试转换为整数，不合法时返回校验错误。因此接口 Schema 应表达真实业务类型，而不是底层传输格式。

---

从 Day 1 开始，只记录真实遇到的问题，不人为制造流水账。

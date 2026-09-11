# StudyMate 常用命令速查

> 这份文档只记录项目里真正用到、值得记住的命令。
> 不追求一次写全，后续学习过程中持续补充。

## 1. Python 版本管理：pyenv

### 查看 pyenv 版本

```bash
pyenv --version
```

作用：确认当前安装的 pyenv 版本。

### 查看本机已经安装的 Python 版本

```bash
pyenv versions
```

作用：查看 pyenv 管理的所有 Python 版本，以及当前正在使用哪一个版本。

### 给当前项目固定 Python 版本

```bash
pyenv local 3.12.12
```

作用：在当前项目目录生成 `.python-version` 文件。以后进入这个目录时，pyenv 会自动使用 Python 3.12.12。

### 查看当前项目固定的 Python 版本

```bash
cat .python-version
```

作用：查看 `.python-version` 文件中的内容。

### 查看当前实际使用的 Python 版本

```bash
python3 --version
```

作用：确认终端当前真正执行的是哪个 Python 版本。

---

## 2. Python 虚拟环境：venv

### 创建项目虚拟环境

```bash
python3 -m venv backend/.venv
```

作用：在 `backend/.venv` 中创建一套只属于 StudyMate 后端的 Python 运行环境。

可以先粗略理解为：

- `pyenv`：管理“电脑上有哪些 Python 版本”。
- `venv`：给“某一个项目”隔离 Python 依赖。
- 类比前端：有点像项目自己的依赖环境，但和 `node_modules` 并不完全相同。

### 激活 StudyMate 后端虚拟环境

```bash
source backend/.venv/bin/activate
```

作用：让当前终端进入 StudyMate 的 Python 虚拟环境。激活后，终端前面通常会出现 `(.venv)`。

### 确认当前 Python 来自虚拟环境

```bash
which python
```

StudyMate 中正常结果应该类似：

```text
/Users/ab/self/studymate-agent/backend/.venv/bin/python
```

作用：确认接下来执行的 Python 和安装的依赖都属于当前项目。

### 查看虚拟环境里的 Python 版本

```bash
python --version
```

作用：确认虚拟环境实际使用的 Python 版本。

---

## 3. Python 包管理：pip

### pip 是什么

`pip` 是 Python 的第三方包安装工具，可以类比前端里的 `npm` / `pnpm`。

例如：

```text
npm install axios      ≈      python -m pip install fastapi
```

### 查看当前 pip 版本和路径

```bash
python -m pip --version
```

作用：确认当前 Python 使用的是哪一个 pip，以及 pip 安装在哪里。

为什么优先写 `python -m pip`，而不是直接写 `pip`：

> 这样可以明确让“当前这个 Python”调用自己的 pip，减少把依赖安装到错误 Python 环境里的情况。

### 安装 FastAPI 和 Uvicorn

```bash
python -m pip install fastapi "uvicorn[standard]"
```

作用：

- `FastAPI`：Python Web 后端框架，用来写 API 接口。
- `Uvicorn`：运行 FastAPI 应用的 ASGI 服务器。

安装完成看到 `Successfully installed ...` 就表示成功。

如果最后看到：

```text
[notice] A new release of pip is available
```

这只是升级提醒，不是报错。项目可以继续运行，不需要看到提醒就立刻升级。

---

## 4. Python 命令参数基础

### `python -c` 是什么意思

例如：

```bash
python -c "import fastapi; print(fastapi.__version__)"
```

其中 `-c` 的意思是：**直接执行后面这一小段 Python 代码字符串**。

可以理解成：

```text
python       = 启动 Python
-c           = command，后面跟一段要立即执行的代码
"..."        = 真正执行的 Python 代码
```

上面的命令等价于临时写一个 Python 文件：

```python
import fastapi
print(fastapi.__version__)
```

然后再运行它，只不过 `-c` 省去了创建文件这一步，特别适合做版本检查、环境验证和一两行的小测试。

StudyMate 中第一次使用它是为了确认 FastAPI 已经安装成功：

```bash
python -c "import fastapi; print(fastapi.__version__)"
```

输出 `0.141.1`，说明当前虚拟环境可以正常导入 FastAPI。

---

## 5. 环境排查命令

这些命令平时不一定需要背，遇到环境问题时知道它们是干什么的即可。

### 查看 Python 可执行文件来自哪里

```bash
which python3
```

作用：确认当前 `python3` 命令最终指向哪个位置。

### 查看 Node 可执行文件来自哪里

```bash
which node
```

作用：确认当前 Node 是由哪个版本管理器或路径提供的。

### 查看 Mac CPU 架构

```bash
uname -m
```

常见结果：

```text
arm64
```

说明这是 Apple Silicon（M 系列）Mac。

### 查看 Apple 编译器版本

```bash
clang --version
```

作用：排查 Python 等源码编译问题时，确认当前 C/C++ 编译器版本。

### 查看当前 Xcode / Command Line Tools 路径

```bash
xcode-select -p
```

作用：确认当前 macOS 开发工具链使用的是完整 Xcode，还是 Command Line Tools。

### 查看 macOS SDK 路径

```bash
xcrun --show-sdk-path
```

作用：确认编译时使用的 macOS SDK 在哪里。

---

## 6. 当前 StudyMate 环境

目前项目确定使用：

```text
Python 3.12.12
pyenv 2.8.4
Node 24.16.0
npm 11.13.0
Git 2.52.0
Apple Silicon arm64
```

当前原则：只在项目确实需要时升级版本，不为了追最新版而升级。

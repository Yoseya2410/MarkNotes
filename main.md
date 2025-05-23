# 欢迎使用 MarkNotes

MarkNotes 是一个笔记引擎，将使用 Markdown 编写的笔记以网页的形式展示。

该项目仅用最纯粹的 Web 三件套（HTML、CSS、JavaScript）构建，用最简单的方式帮你部署一个属于自己的笔记网站。

## 项目架构

```text
.
├─ core
│  ├─ marked.min.js
│  ├─ press.js
│  └─ toc.js
├─ style
│  └─ style.css
├─ 404.html
├─ index.html
└─ main.md
```

1. core 文件存放项目的所有主要的功能性代码文件
   - `marked.min.js` 是开源项目 marked 的代码文件，用于将 md 文件转换为 HTML ，是该项目的核心引擎
   - `press.js` 是该项目的核心代码，用于主要功能的实现
   - `toc.js` 用于实现目录功能，动态检查网页结构并将其整理成目录
2. `style.css` 文件用于控制页面的样式，通过修改css变量设置页面主题色
3. `index.html` 是页面的入口文件，`main.md` 存放主页内容
4. 当没有索引到文件时就会跳转到 `404.html`


## 文件索引

该项目采用 URL 参数的方式索引文件。格式为`file=文件路径`，`file` 是索引文件的参数名，文件路径是参数值。例如，如果要索引路径为`./file/example.md`文件是就将 URL 写为

```
http://marknotes.yoseya.top/?file=file/example.md
```

以下是 Markdowen 笔记显示的效果展示：

## 1. 标题
Markdown支持多级标题，使用`#`符号表示：

## 2. 段落
段落之间需要空一行，例如：
这是第一段。

这是第二段。

## 3. 列表
### 无序列表
使用`-`、`*`或`+`表示无序列表：
- 项目1
- 项目2
  - 子项目2.1
  - 子项目2.2
* 项目3
+ 项目4

### 有序列表
使用数字加点表示有序列表：
1. 第一项
2. 第二项
   1. 子项2.1
   2. 子项2.2
3. 第三项

## 4. 代码块
### 行内代码
使用反引号表示行内代码，例如：`print("Hello, World!")`。

### 多行代码块
使用三个反引号包裹多行代码，并指定语言（可选）：
```python
def hello_world():
    print("Hello, World!")
```

## 5. 引用
使用`>`表示引用：
> 这是一个引用示例。
> 引用可以跨多行。

## 6. 链接和图片
### 链接
使用`[文本](URL)`表示链接，例如：[Google](https://www.google.com)。

### 图片
使用`![替代文本](图片URL)`表示图片，例如：
![Markdown Logo](https://lib.yoseya.top/img/示例1.png)

## 7. 表格
使用`|`和`-`创建表格：

| 序号 | 名称  | 描述  |
| ---- | ----- | ----- |
| 1    | 项目1 | 描述1 |
| 2    | 项目2 | 描述2 |
| 3    | 项目3 | 描述3 |

## 8. 强调
使用`*`或`_`表示斜体，`**`或`__`表示加粗：
- *斜体文本*
- **加粗文本**
- **_斜体加粗文本_**

## 9. 分割线
使用三个或以上的`-`、`*`或`_`表示分割线：

---

## 10. 数学公式

<p>表达式 \(f(x) = \log_{a}{b}-c\) 是一个对数函数<p>

$$\int_{-\infty}^\infty e^{-x^2} dx = \sqrt{\pi}$$

## 11. 任务列表
使用`- [ ]`表示未完成任务，`- [x]`表示已完成任务：
- [x] 任务1
- [ ] 任务2
- [ ] 任务3

## 12. 图表

### 流程图

```mermaid
graph TD
   A[开始] --> B[输入用户名和密码]
   B --> C{验证通过?}
   C -->|是| D[登录成功]
   C -->|否| E[显示错误信息]
   D --> F[进入系统主页]
   E --> B
```

### 时序图

```mermaid
sequenceDiagram
    participant User
    participant Server
    User->>Server: 发送请求
    Server-->>User: 返回响应
```


### 状态图

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Active: 用户操作
    Active --> Idle: 操作完成
```


### 思维导图

```mermaid
mindmap
    root((中心主题))
        一级分支1
            子分支1
            子分支2
        一级分支2
            子分支A
            子分支B
```

### 甘特图

```mermaid
gantt
    title 项目进度
    dateFormat  YYYY-MM-DD
    section 阶段一
    任务1       :done, 2025-01-01, 7d
    任务2       :active, 2025-01-08, 5d
```

### 四象限图

```mermaid
quadrantChart
    title 技术评估
    x-axis Low Latency, High Latency
    y-axis Easy, Hard
    quadrant-1 We
    quadrant-2 Work
    quadrant-3 Could
    quadrant-4 Be
```

### 时间轴

```mermaid
timeline
    title 时间轴
    2025 Q1 : 项目立项
    2025 Q2 : 开发阶段
```
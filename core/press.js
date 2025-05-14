function loadMarkdownFile() {
    // 显示内容区域
    document.getElementById("content").style.display = "block";

    // 获取 URL 参数中的文件路径
    const urlParams = new URLSearchParams(window.location.search);
    const selectedFile = urlParams.get("file") || "main.md";

    // 获取 Markdown 文件内容
    fetch(selectedFile)
        .then((response) => {
            if (!response.ok) {
                throw new Error("File not found");
            }
            return response.text();
        })
        .then((markdownText) => {

            // 创建自定义 renderer 以支持 mermaid 图表
            const renderer = new marked.Renderer();
            const originCode = renderer.code;

            // 自定义 code 方法，将 mermaid 代码块包裹在 <div> 中
            renderer.code = function (code, language) {
                if (language === 'mermaid') {
                    return `<div class="mermaid">${code}</div>`;
                }

                // 对于非 mermaid 的代码块，使用 highlight.js 高亮
                return originCode.call(this, code, language);
            };

            hljs.configure({
                ignoreUnescapedHTML: true
            });

            // 设置 marked 解析选项
            // 设置 marked 解析选项
            marked.setOptions({
                renderer: renderer,
                highlight: function (code, lang) {
                    const validLangs = hljs.listLanguages();

                    // 忽略不支持的语言
                    if (!lang || lang === 'text' || lang === 'none' || lang === 'no-highlight') {
                        return code;
                    }

                    // 高亮合法语言
                    if (validLangs.includes(lang)) {
                        try {
                            return hljs.highlight(code, { language: lang }).value;
                        } catch (e) {
                            console.warn(`Highlight error for language "${lang}"`, e);
                            return code;
                        }
                    }

                    // 兜底：不支持的语言也不报错
                    console.warn(`Language "${lang}" is not supported by highlight.js`);
                    return code;
                },
                pedantic: false,
                gfm: true,
                breaks: false,
                sanitize: false,
                smartLists: true,
                smartypants: false
            });

            // 解析 Markdown 内容
            const htmlContent = marked.parse(markdownText);

            // 插入 HTML 到页面中
            document.getElementById("content").innerHTML = htmlContent;

            // 生成目录（toc.js）
            if (typeof generateToc === 'function') {
                generateToc();
            }

            // 代码高亮
            hljs.highlightAll();

            // 渲染 LaTeX 数学公式（KaTeX）
            if (typeof renderMathInElement === 'function') {
                renderMathInElement(document.body, {
                    delimiters: [
                        { left: "$$", right: "$$", display: true },
                        { left: "\\(", right: "\\)", display: false },
                    ],
                });
            }

            // 初始化 Mermaid 图表
            if (typeof mermaid !== 'undefined' && typeof mermaid.run === 'function') {
                mermaid.initialize({
                    startOnLoad: false,
                    theme: 'default',
                    flowchart: {
                        useMaxWidth: true,
                        htmlLabels: true
                    }
                });
                mermaid.run(); // 手动运行一次，渲染所有 .mermaid 元素
                if (typeof mermaidSVGPanZoom === 'function') {
                    // 获取所有 .mermaid 容器中的 SVG，并启用缩放
                    document.querySelectorAll('.mermaid svg').forEach(svg => {
                        mermaidSVGPanZoom(svg);
                    });
                }
            } else {
                console.warn("Mermaid is not loaded or not available.");
            }

        })
        .catch((error) => {
            console.error("Error reading the file:", error);
            window.location.href = "404.html";
        });
}
var GLOBAL_ATTRIBUTES_DATA = {
  "title": "HTML 全局属性",
  "englishName": "Global Attributes",
  "chineseDesc": "可应用于几乎所有 HTML 标签的通用属性",
  "description": "HTML 全局属性是可以应用于<strong>几乎所有 HTML 标签</strong>的通用属性。掌握全局属性是理解 HTML 标准的关键，它们提供了元素标识、样式控制、辅助功能、国际化等基础能力。以下列出所有常用全局属性，<strong>在每个标签讲解页的属性表格中同样会出现</strong>。",
  "attributes": [
    {
      "name": "id", "star": true,
      "explain": "元素的唯一标识符，同一页面内不可重复",
      "english": "identifier n.标识符",
      "values": [
        { "value": "自定义字符串（如 id=\"main-content\"）", "english": "", "note": "同一页面中 id 必须唯一，不能出现重复；id 可用于 CSS 选择器、JS 操作、锚点定位" }
      ]
    },
    {
      "name": "class", "star": true,
      "explain": "元素的类名，用于 CSS 选择器和 JS 操作",
      "english": "class n.类 / 类别",
      "values": [
        { "value": "类名字符串（如 class=\"btn primary\"）", "english": "", "note": "多个类名用空格隔开；同一个类名可应用于多个元素；是 CSS 样式的首选挂钩" }
      ]
    },
    {
      "name": "style", "star": true,
      "explain": "元素的内联样式，直接写入 CSS 声明",
      "english": "style n.样式",
      "values": [
        { "value": "CSS 声明（如 style=\"color: red; font-size: 16px;\"）", "english": "", "note": "内联样式优先级高于外部/内部样式表；建议尽量用 class 替代内联样式以保持样式与结构分离" }
      ]
    },
    {
      "name": "title", "star": false,
      "explain": "元素的提示文本，鼠标悬停时显示为工具提示",
      "english": "title n.标题 / 提示",
      "values": [
        { "value": "任意文本字符串（如 title=\"点击查看详情\"）", "english": "", "note": "悬停时显示为 tooltip；对无障碍访问有帮助，但不应依赖它传达关键信息" }
      ]
    },
    {
      "name": "lang", "star": false,
      "explain": "元素内容的语言代码，用于辅助技术和搜索引擎",
      "english": "language n.语言",
      "values": [
        { "value": "\"en\"", "english": "English 英语", "note": "" },
        { "value": "\"zh-CN\"", "english": "Chinese (Simplified) 简体中文", "note": "中国大陆使用的简体中文" },
        { "value": "\"zh-TW\"", "english": "Chinese (Traditional) 繁体中文", "note": "台湾地区使用的繁体中文" },
        { "value": "\"ja\"", "english": "Japanese 日语", "note": "" },
        { "value": "\"ko\"", "english": "Korean 韩语", "note": "" },
        { "value": "其他 ISO 639-1 语言代码", "english": "", "note": "遵循 ISO 639-1 标准，如 fr（法语）、de（德语）、es（西班牙语）" }
      ]
    },
    {
      "name": "dir", "star": false,
      "explain": "文本的书写方向",
      "english": "direction n.方向",
      "values": [
        { "value": "\"ltr\"", "english": "left to right 从左到右", "note": "默认值，适用于大多数语言（英语、中文等）" },
        { "value": "\"rtl\"", "english": "right to left 从右到左", "note": "适用于阿拉伯语、希伯来语、波斯语等从右向左书写的语言" },
        { "value": "\"auto\"", "english": "automatic 自动检测", "note": "浏览器根据内容自动判断文本方向" }
      ]
    },
    {
      "name": "hidden", "star": true,
      "explain": "隐藏元素，使其不在页面中渲染",
      "english": "hidden adj.隐藏的",
      "values": [
        { "value": "hidden（布尔属性，写上即生效）", "english": "", "note": "该元素及其所有子元素都不会被渲染；与 CSS display:none 效果类似但语义更强；屏幕阅读器也会忽略 hidden 元素" }
      ]
    },
    {
      "name": "tabindex", "star": false,
      "explain": "元素的 Tab 键导航顺序",
      "english": "tab index 制表索引",
      "values": [
        { "value": "\"0\"", "english": "", "note": "使元素可被 Tab 键聚焦，按 DOM 顺序排列；推荐使用此值" },
        { "value": "正整数（如 \"1\"、\"2\"）", "english": "", "note": "按数值升序聚焦；不推荐使用，会破坏自然的 Tab 导航顺序" },
        { "value": "\"-1\"", "english": "", "note": "元素不可通过 Tab 键聚焦，但可通过 JS focus() 方法聚焦；适用于模态框、自定义组件" }
      ]
    },
    {
      "name": "accesskey", "star": false,
      "explain": "元素的键盘快捷键字符",
      "english": "access key 访问键",
      "values": [
        { "value": "单字符（如 accesskey=\"s\"）", "english": "", "note": "不同浏览器/操作系统的触发组合键不同（Windows 通常为 Alt+字符，Mac 为 Ctrl+Option+字符）；可能与浏览器或系统快捷键冲突" }
      ]
    },
    {
      "name": "contenteditable", "star": false,
      "explain": "元素内容是否可由用户直接编辑",
      "english": "content editable 内容可编辑",
      "values": [
        { "value": "\"true\" 或 contenteditable（空值）", "english": "", "note": "用户可直接在浏览器中点击并编辑元素内容" },
        { "value": "\"false\"", "english": "", "note": "默认值，元素内容不可编辑" },
        { "value": "\"plaintext-only\"", "english": "", "note": "只允许纯文本编辑，粘贴富文本时自动去除格式；兼容性有限" }
      ]
    },
    {
      "name": "draggable", "star": false,
      "explain": "元素是否可拖拽",
      "english": "draggable adj.可拖拽的",
      "values": [
        { "value": "\"true\"", "english": "", "note": "元素可被拖拽，需配合 JS 拖拽 API（dragstart、dragover、drop 等事件）使用" },
        { "value": "\"false\"", "english": "", "note": "默认值，元素不可拖拽" },
        { "value": "\"auto\"", "english": "", "note": "使用浏览器默认行为（图片、选中的文本、链接默认可拖拽）" }
      ]
    },
    {
      "name": "spellcheck", "star": false,
      "explain": "是否对元素的可编辑内容进行拼写检查",
      "english": "spell check 拼写检查",
      "values": [
        { "value": "\"true\"", "english": "", "note": "启用拼写检查，拼写错误会以红色波浪线标记" },
        { "value": "\"false\"", "english": "", "note": "禁用拼写检查；适用于代码片段、邮箱地址、用户名、专有名词等不需要拼写检查的内容" }
      ]
    },
    {
      "name": "data-*", "star": true,
      "explain": "自定义数据属性（* 为任意合法名称），用于在 HTML 中存储页面或应用私有的自定义数据",
      "english": "data attribute 数据属性",
      "values": [
        { "value": "data-自定义名称=\"值\"（如 data-id=\"123\"、data-user-name=\"张三\"）", "english": "", "note": "可通过 JS 的 element.dataset 属性访问（如 element.dataset.id）；非常适合在 HTML 中嵌入应用数据，避免使用非标准属性" }
      ]
    },
    {
      "name": "role", "star": false,
      "explain": "ARIA 角色属性，定义元素的语义角色以辅助无障碍访问",
      "english": "role n.角色",
      "values": [
        { "value": "\"button\"", "english": "", "note": "将元素语义定义为按钮" },
        { "value": "\"navigation\"", "english": "", "note": "将元素语义定义为导航区域" },
        { "value": "\"main\"", "english": "", "note": "将元素语义定义为主要内容区域" },
        { "value": "\"banner\"", "english": "", "note": "将元素语义定义为页眉/横幅区域" },
        { "value": "\"dialog\"", "english": "", "note": "将元素语义定义为对话框" },
        { "value": "\"alert\"", "english": "", "note": "将元素语义定义为警告/通知信息" },
        { "value": "其他 WAI-ARIA 角色值", "english": "", "note": "参考 WAI-ARIA 规范，共有数十种标准角色" }
      ]
    },
    {
      "name": "aria-*", "star": false,
      "explain": "ARIA 状态与属性，为辅助技术（屏幕阅读器等）提供额外的语义信息",
      "english": "Accessible Rich Internet Applications 可访问的富互联网应用",
      "values": [
        { "value": "aria-label=\"描述文本\"", "english": "", "note": "为元素提供可被屏幕阅读器读取的标签名称" },
        { "value": "aria-hidden=\"true\" / \"false\"", "english": "", "note": "控制元素对辅助技术是否可见（true=隐藏）" },
        { "value": "aria-expanded=\"true\" / \"false\"", "english": "", "note": "指示可展开/折叠控件的当前状态" },
        { "value": "aria-describedby=\"元素ID\"", "english": "", "note": "引用描述该元素的另一个元素的 ID" }
      ]
    },
    {
      "name": "translate", "star": false,
      "explain": "指定元素内容是否应该被网页翻译工具翻译",
      "english": "translate v.翻译",
      "values": [
        { "value": "\"yes\"", "english": "", "note": "默认值，允许自动翻译工具翻译该元素内容" },
        { "value": "\"no\"", "english": "", "note": "禁止翻译；适用于代码、品牌名称、专有名词、引用原文等不应被翻译的内容" }
      ]
    },
    {
      "name": "inert", "star": false,
      "explain": "使元素及其子树对用户交互完全不可操作（较新的全局属性）",
      "english": "inert adj.惰性的 / 不活动的",
      "values": [
        { "value": "inert（布尔属性，写上即生效）", "english": "", "note": "元素不可被点击、聚焦、选择；对辅助技术也隐藏；适用于模态框打开时屏蔽背景内容" }
      ]
    }
  ],
  "cssProperties": [],
  "relatedTags": []
}
;

# HTML 标签速查手册 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个暖色护眼风格的 HTML 标签速查手册 SPA 网站，包含 80+ 个标签的完整属性/CSS 数据，支持搜索和移动端适配。

**Architecture:** 纯静态 SPA，index.html + CSS + 4 个 JS 模块 + 2 个 JSON 数据文件。Hash 路由驱动内容渲染，零依赖零构建。

**Tech Stack:** HTML5 + CSS3 + Vanilla JavaScript (ES6+)

---

### Task 1: 项目骨架与 HTML 结构

**Files:**
- Create: `index.html`
- Create: `css/style.css` (基础变量)
- Create: `js/main.js` (入口骨架)
- Create: `js/sidebar.js` (模块骨架)
- Create: `js/search.js` (模块骨架)
- Create: `js/render.js` (模块骨架)
- Create: `data/html-tags.json` (占位)
- Create: `data/global-attributes.json` (占位)

- [ ] **Step 1: 创建 index.html 主文件**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML 标签速查手册</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="topbar" id="topbar">
    <button class="hamburger" id="hamburger" aria-label="菜单">
      <span></span><span></span><span></span>
    </button>
    <span class="topbar-title">HTML 标签速查手册</span>
    <div class="search-box" id="searchBox">
      <input type="text" id="searchInput" placeholder="搜索标签，如 img、table、class..." autocomplete="off">
    </div>
  </header>
  <div class="overlay" id="overlay"></div>
  <div class="layout">
    <aside class="sidebar" id="sidebar">
      <nav id="tagNav"></nav>
    </aside>
    <main class="content" id="content">
      <div class="welcome" id="welcome">
        <h1>HTML 标签速查手册</h1>
        <p>在左侧选择标签，或使用顶部搜索框快速查找。</p>
        <p>本手册涵盖 80+ 个 HTML 标签的完整属性、CSS 样式及使用说明。</p>
      </div>
      <div class="tag-page" id="tagPage" style="display:none;"></div>
    </main>
  </div>
  <script src="js/render.js"></script>
  <script src="js/sidebar.js"></script>
  <script src="js/search.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: 创建 JS 模块占位文件**

`js/main.js`:
```js
(function () {
  'use strict';
  // 入口：加载数据，初始化侧边栏和搜索
})();
```

`js/sidebar.js`:
```js
var Sidebar = (function () {
  'use strict';
  return {};
})();
```

`js/search.js`:
```js
var Search = (function () {
  'use strict';
  return {};
})();
```

`js/render.js`:
```js
var Render = (function () {
  'use strict';
  return {};
})();
```

- [ ] **Step 3: 创建 JSON 数据占位文件**

`data/html-tags.json`:
```json
{ "a": {} }
```

`data/global-attributes.json`:
```json
{ "title": "HTML 全局属性", "description": "", "attributes": [], "cssProperties": [], "relatedTags": [] }
```

- [ ] **Step 4: 创建 CSS 变量与基础重置**

`css/style.css` (第一部分 — CSS 变量与重置):
```css
:root {
  --brown-dark: #5C4033;
  --cream-bg: #FDF6EE;
  --beige-sidebar: #FAF0E1;
  --warm-orange: #C8956C;
  --warm-orange-light: #E8C8A8;
  --accent-red: #C0392B;
  --text-primary: #3E2723;
  --text-secondary: #8B7355;
  --border-color: #E8D5C4;
  --table-header-bg: #F5E6D3;
  --font-mono: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
  --font-sans: 'Segoe UI', system-ui, -apple-system, sans-serif;
  --sidebar-width: 240px;
  --topbar-height: 52px;
  --radius: 8px;
  --shadow: 0 2px 8px rgba(92, 64, 51, 0.08);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { font-size: 15px; scroll-behavior: smooth; }

body {
  font-family: var(--font-sans);
  color: var(--text-primary);
  background: var(--cream-bg);
  line-height: 1.6;
  min-height: 100vh;
}

a { color: var(--warm-orange); text-decoration: none; }
a:hover { text-decoration: underline; }

strong { color: var(--accent-red); font-weight: 600; }
```

- [ ] **Step 5: 验证** — 打开 index.html，确认页面正常加载，无控制台错误

---

### Task 2: CSS 完整样式

**Files:**
- Modify: `css/style.css` (追加全部样式)

- [ ] **Step 1: 导航栏样式**

```css
/* === 顶部导航栏 === */
.topbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  height: var(--topbar-height);
  background: var(--brown-dark);
  color: #f5e6d3;
  display: flex; align-items: center; gap: 16px;
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.topbar-title {
  font-size: 1.1rem; font-weight: 700; white-space: nowrap;
  letter-spacing: 0.5px;
}

.search-box { flex: 1; max-width: 420px; position: relative; }

.search-box input {
  width: 100%; padding: 7px 14px;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 6px;
  background: rgba(255,255,255,0.12);
  color: #f5e6d3; font-size: 0.9rem;
  font-family: var(--font-sans);
  outline: none; transition: border-color 0.2s, background 0.2s;
}

.search-box input::placeholder { color: rgba(245,230,211,0.5); }
.search-box input:focus {
  border-color: var(--warm-orange);
  background: rgba(255,255,255,0.18);
}

.search-hint {
  position: absolute; top: 100%; left: 0; right: 0;
  background: var(--cream-bg); color: var(--text-primary);
  padding: 8px 14px; border-radius: 0 0 6px 6px;
  font-size: 0.85rem; box-shadow: var(--shadow);
  display: none;
}
.search-hint.show { display: block; }
.search-hint.error { color: var(--accent-red); }

/* 汉堡菜单按钮 */
.hamburger {
  display: none;
  background: none; border: none; cursor: pointer;
  padding: 6px; flex-direction: column; gap: 5px;
}
.hamburger span {
  display: block; width: 22px; height: 2px;
  background: #f5e6d3; border-radius: 2px;
  transition: transform 0.2s, opacity 0.2s;
}
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
```

- [ ] **Step 2: 布局与侧边栏样式**

```css
/* === 整体布局 === */
.layout {
  display: flex;
  margin-top: var(--topbar-height);
  min-height: calc(100vh - var(--topbar-height));
}

/* === 侧边栏 === */
.sidebar {
  width: var(--sidebar-width); min-width: var(--sidebar-width);
  background: var(--beige-sidebar);
  border-right: 1px solid var(--border-color);
  position: fixed; top: var(--topbar-height); bottom: 0; left: 0;
  overflow-y: auto; overflow-x: hidden;
  padding: 12px 0;
  z-index: 100;
  transition: transform 0.3s ease;
}

.sidebar::-webkit-scrollbar { width: 5px; }
.sidebar::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 3px; }

.sidebar .letter-group { margin-bottom: 4px; }

.sidebar .letter-title {
  padding: 6px 20px;
  font-size: 0.7rem; font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.sidebar .tag-link {
  display: block;
  padding: 5px 20px;
  font-family: var(--font-mono); font-size: 0.85rem;
  color: var(--text-primary);
  border-left: 3px solid transparent;
  transition: background 0.15s, border-color 0.15s;
  cursor: pointer;
}

.sidebar .tag-link:hover { background: rgba(200, 149, 108, 0.12); }
.sidebar .tag-link.active {
  background: rgba(200, 149, 108, 0.2);
  border-left-color: var(--warm-orange);
  font-weight: 600;
}

.sidebar .sidebar-divider {
  margin: 12px 20px;
  border: none; border-top: 1px solid var(--border-color);
}

.sidebar .global-link {
  display: block;
  padding: 8px 20px;
  font-size: 0.85rem; font-weight: 600;
  color: var(--warm-orange);
  cursor: pointer;
  transition: background 0.15s;
}
.sidebar .global-link:hover { background: rgba(200, 149, 108, 0.12); }
.sidebar .global-link.active {
  background: rgba(200, 149, 108, 0.2);
  border-left: 3px solid var(--warm-orange);
}
```

- [ ] **Step 3: 内容区样式**

```css
/* === 内容区 === */
.content {
  margin-left: var(--sidebar-width);
  flex: 1; padding: 32px 40px;
  max-width: 1000px;
}

.welcome {
  text-align: center; padding: 80px 20px;
  color: var(--text-secondary);
}
.welcome h1 { font-size: 2rem; color: var(--text-primary); margin-bottom: 16px; }
.welcome p { margin-bottom: 8px; }

.tag-page h2 {
  font-size: 2rem; font-family: var(--font-mono); margin-bottom: 2px;
}
.tag-page .tag-subtitle {
  font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 20px;
}
.tag-page .tag-desc {
  font-size: 0.95rem; line-height: 1.8; margin-bottom: 32px;
  background: var(--beige-sidebar);
  padding: 16px 20px; border-radius: var(--radius);
  border-left: 4px solid var(--warm-orange);
}

.tag-page h3 {
  font-size: 1.2rem; margin: 32px 0 12px;
  padding-bottom: 6px; border-bottom: 2px solid var(--border-color);
}

/* === 表格 === */
.table-wrapper { overflow-x: auto; margin-bottom: 32px; border-radius: var(--radius); box-shadow: var(--shadow); }

table.attr-table {
  width: 100%; border-collapse: collapse;
  font-size: 0.88rem; min-width: 750px;
}

table.attr-table thead th {
  background: var(--table-header-bg);
  padding: 10px 12px; text-align: left;
  font-weight: 700; color: var(--text-primary);
  border-bottom: 2px solid var(--border-color);
  white-space: nowrap;
}

table.attr-table tbody td {
  padding: 8px 12px;
  border-bottom: 1px solid var(--border-color);
  vertical-align: top;
}

table.attr-table tbody tr:hover { background: rgba(200, 149, 108, 0.05); }

table.attr-table .attr-name {
  font-family: var(--font-mono); font-weight: 700;
  color: var(--brown-dark);
}
table.attr-table .attr-star { color: var(--warm-orange); font-size: 1rem; }

table.attr-table .attr-explain {
  display: block; font-size: 0.78rem;
  color: var(--text-secondary); margin-top: 2px;
  font-weight: 400; font-family: var(--font-sans);
}

table.attr-table .val-text {
  font-family: var(--font-mono); font-size: 0.82rem;
  color: var(--brown-dark);
}
table.attr-table .val-note {
  display: block; font-size: 0.78rem;
  color: var(--text-secondary); margin-top: 2px;
}

table.attr-table .en-text {
  color: var(--text-secondary); font-style: italic; font-size: 0.82rem;
}

table.attr-table .note-text {
  color: var(--accent-red); font-size: 0.82rem;
}

/* === 相关标签 === */
.related-tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }

.related-tag {
  display: inline-block;
  padding: 6px 16px;
  background: var(--beige-sidebar);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  font-family: var(--font-mono); font-size: 0.85rem;
  color: var(--text-primary); cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
  text-decoration: none;
}

.related-tag:hover {
  background: var(--warm-orange-light);
  border-color: var(--warm-orange);
  color: var(--brown-dark);
  text-decoration: none;
}
```

- [ ] **Step 4: 遮罩层与移动端样式**

```css
/* === 遮罩层 === */
.overlay {
  display: none; position: fixed;
  top: var(--topbar-height); left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  z-index: 99;
}
.overlay.show { display: block; }

/* === 移动端 (≤768px) === */
@media (max-width: 768px) {
  .hamburger { display: flex; }

  .topbar-title { font-size: 0.95rem; }

  .search-box { max-width: none; }

  .sidebar {
    transform: translateX(-100%);
    width: 80vw; min-width: 80vw; max-width: 300px;
  }
  .sidebar.show { transform: translateX(0); }

  .content { margin-left: 0; padding: 20px 16px; }

  .tag-page h2 { font-size: 1.5rem; }

  table.attr-table { font-size: 0.8rem; min-width: 650px; }

  .related-tag { font-size: 0.8rem; padding: 5px 12px; }
}

/* === 打印样式 === */
@media print {
  .topbar, .sidebar, .overlay, .hamburger { display: none; }
  .content { margin-left: 0; }
}
```

---

### Task 3: JavaScript 模块 — render.js 内容渲染

**Files:**
- Modify: `js/render.js`

- [ ] **Step 1: 编写 render.js 完整代码**

```js
var Render = (function () {
  'use strict';

  function renderTagPage(tagData) {
    if (!tagData) {
      document.getElementById('welcome').style.display = 'block';
      document.getElementById('tagPage').style.display = 'none';
      return;
    }

    document.getElementById('welcome').style.display = 'none';
    var page = document.getElementById('tagPage');
    page.style.display = 'block';

    var html = '';

    // 标题
    html += '<h2>&lt;' + esc(tagData.name) + '&gt;</h2>';
    html += '<p class="tag-subtitle">' + esc(tagData.englishName) + ' — ' + esc(tagData.chineseDesc || '') + '</p>';

    // 描述
    html += '<div class="tag-desc">' + (tagData.description || '') + '</div>';

    // 属性表格
    if (tagData.attributes && tagData.attributes.length > 0) {
      html += '<h3>属性表格</h3>';
      html += buildTable(tagData.attributes, 'attr');
    }

    // CSS 表格
    if (tagData.cssProperties && tagData.cssProperties.length > 0) {
      html += '<h3>CSS 表格</h3>';
      html += buildTable(tagData.cssProperties, 'css');
    }

    // 相关标签
    if (tagData.relatedTags && tagData.relatedTags.length > 0) {
      html += '<h3>相关标签</h3>';
      html += '<div class="related-tags">';
      tagData.relatedTags.forEach(function (t) {
        html += '<a class="related-tag" href="#' + esc(t) + '">&lt;' + esc(t) + '&gt;</a>';
      });
      html += '</div>';
    }

    page.innerHTML = html;
  }

  function buildTable(items, type) {
    var headers = (type === 'attr')
      ? ['属性', '英文原称', '属性值 / 写法', '英文解释', '注意']
      : ['CSS 属性', '英文原称', '属性值 / 写法', '英文解释', '注意'];

    // 计算总行数（用于 rowspan）
    var totalRows = 0;
    items.forEach(function (item) {
      totalRows += item.values ? item.values.length : 1;
    });

    var html = '<div class="table-wrapper"><table class="attr-table"><thead><tr>';
    headers.forEach(function (h) { html += '<th>' + h + '</th>'; });
    html += '</tr></thead><tbody>';

    items.forEach(function (item) {
      var rowCount = item.values ? item.values.length : 1;

      item.values.forEach(function (v, idx) {
        html += '<tr>';

        // 第一列：属性名 + 解释
        if (idx === 0) {
          html += '<td rowspan="' + rowCount + '">';
          if (item.star) html += '<span class="attr-star">&#11088; </span>';
          html += '<span class="attr-name">' + esc(item.name) + '</span>';
          if (item.explain) html += '<span class="attr-explain">' + esc(item.explain) + '</span>';
          html += '</td>';
        }

        // 第二列：英文原称
        if (idx === 0) {
          html += '<td rowspan="' + rowCount + '"><span class="en-text">' + esc(item.english || '') + '</span></td>';
        }

        // 第三列：属性值
        html += '<td><span class="val-text">' + esc(v.value) + '</span>';
        if (v.valueNote) html += '<span class="val-note">' + esc(v.valueNote) + '</span>';
        html += '</td>';

        // 第四列：英文解释
        html += '<td><span class="en-text">' + esc(v.english || '') + '</span></td>';

        // 第五列：注意
        html += '<td><span class="note-text">' + esc(v.note || '') + '</span></td>';

        html += '</tr>';
      });
    });

    html += '</tbody></table></div>';
    return html;
  }

  function esc(str) { return String(str == null ? '' : str); }

  return { renderTagPage: renderTagPage };
})();
```

---

### Task 4: JavaScript 模块 — sidebar.js 侧边栏

**Files:**
- Modify: `js/sidebar.js`

- [ ] **Step 1: 编写 sidebar.js 完整代码**

```js
var Sidebar = (function () {
  'use strict';

  var tagData = {};
  var sortedKeys = [];
  var currentTag = null;

  function init(data, globalData) {
    tagData = data;
    sortedKeys = Object.keys(data).sort();
    buildNav(globalData);
    bindHamburger();
  }

  function buildNav(globalData) {
    var nav = document.getElementById('tagNav');
    var html = '';
    var lastLetter = '';

    sortedKeys.forEach(function (key) {
      var tag = tagData[key];
      if (!tag) return;
      var first = key.charAt(0).toUpperCase();
      if (first !== lastLetter) {
        if (lastLetter) html += '</div>';
        html += '<div class="letter-group">';
        html += '<div class="letter-title">' + first + '</div>';
        lastLetter = first;
      }
      html += '<a class="tag-link" href="#' + key + '" data-tag="' + key + '">&lt;' + key + '&gt;</a>';
    });

    if (lastLetter) html += '</div>';

    // 分隔线 + 全局属性链接
    html += '<hr class="sidebar-divider">';
    html += '<a class="global-link" href="#global-attributes" data-tag="global-attributes">全局属性 (Global Attributes)</a>';

    nav.innerHTML = html;

    // 委托点击事件
    nav.addEventListener('click', function (e) {
      var link = e.target.closest('[data-tag]');
      if (!link) return;
      e.preventDefault();
      var tag = link.getAttribute('data-tag');
      window.location.hash = tag;
      closeMobileSidebar();
    });
  }

  function setActive(tag) {
    currentTag = tag;
    var nav = document.getElementById('tagNav');
    var links = nav.querySelectorAll('[data-tag]');
    links.forEach(function (l) { l.classList.remove('active'); });
    var active = nav.querySelector('[data-tag="' + CSS.escape(tag) + '"]');
    if (active) {
      active.classList.add('active');
      // 滚动到可视区
      active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  function bindHamburger() {
    var btn = document.getElementById('hamburger');
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('overlay');

    btn.addEventListener('click', function () {
      var open = sidebar.classList.toggle('show');
      overlay.classList.toggle('show', open);
      btn.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    overlay.addEventListener('click', closeMobileSidebar);

    // ESC 关闭
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMobileSidebar();
    });
  }

  function closeMobileSidebar() {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('overlay');
    var btn = document.getElementById('hamburger');
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
    btn.classList.remove('open');
    document.body.style.overflow = '';
  }

  function getSortedKeys() { return sortedKeys; }
  function getTagData() { return tagData; }

  return {
    init: init,
    setActive: setActive,
    getSortedKeys: getSortedKeys,
    getTagData: getTagData
  };
})();
```

---

### Task 5: JavaScript 模块 — search.js 搜索

**Files:**
- Modify: `js/search.js`

- [ ] **Step 1: 编写 search.js 完整代码**

```js
var Search = (function () {
  'use strict';

  var tagData = {};
  var sortedKeys = [];
  var globalData = null;

  function init(data, gData, keys) {
    tagData = data;
    sortedKeys = keys;
    globalData = gData;
    bindSearch();
  }

  function bindSearch() {
    var input = document.getElementById('searchInput');
    var hintEl = null;

    input.addEventListener('input', function () {
      var val = input.value.trim().toLowerCase();
      if (!val) {
        hideHint();
        return;
      }
      // 实时提示（不跳转，仅提示可匹配的标签）
      var found = findMatch(val);
      if (found) {
        showHint('回车跳转到: &lt;' + found + '&gt;', false);
      } else {
        showHint('未找到相关标签', true);
      }
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        var val = input.value.trim().toLowerCase();
        if (!val) return;
        var found = findMatch(val);
        if (found) {
          window.location.hash = found;
          hideHint();
        }
      }
    });

    function showHint(msg, isError) {
      if (!hintEl) {
        hintEl = document.createElement('div');
        hintEl.className = 'search-hint';
        document.getElementById('searchBox').appendChild(hintEl);
      }
      hintEl.className = 'search-hint' + (isError ? ' error' : '');
      hintEl.innerHTML = msg;
      hintEl.classList.add('show');
    }

    function hideHint() {
      if (hintEl) hintEl.classList.remove('show');
    }

    // 点击外部关闭提示
    document.addEventListener('click', function (e) {
      if (!document.getElementById('searchBox').contains(e.target)) hideHint();
    });
  }

  function findMatch(query) {
    // 1. 精确匹配标签名
    if (tagData[query]) return query;

    // 2. 检查全局属性关键词
    var globalKeywords = ['id', 'class', 'style', 'title', 'lang', 'dir', 'hidden',
      'tabindex', 'accesskey', 'contenteditable', 'draggable', 'spellcheck', 'data-*'];
    if (globalKeywords.indexOf(query) !== -1) return 'global-attributes';

    // 3. 模糊匹配标签英文名
    for (var i = 0; i < sortedKeys.length; i++) {
      var key = sortedKeys[i];
      var tag = tagData[key];
      if (!tag) continue;
      if (tag.englishName && tag.englishName.toLowerCase().indexOf(query) !== -1) return key;
    }

    // 4. 模糊匹配中文描述
    for (var i = 0; i < sortedKeys.length; i++) {
      var k = sortedKeys[i];
      var t = tagData[k];
      if (!t) continue;
      var desc = (t.chineseDesc || '') + (t.description || '');
      if (desc.toLowerCase().indexOf(query) !== -1) return k;
    }

    // 5. 前缀匹配
    for (var j = 0; j < sortedKeys.length; j++) {
      if (sortedKeys[j].indexOf(query) === 0) return sortedKeys[j];
    }

    return null;
  }

  return { init: init };
})();
```

---

### Task 6: JavaScript 模块 — main.js 入口

**Files:**
- Modify: `js/main.js`

- [ ] **Step 1: 编写 main.js 完整代码**

```js
(function () {
  'use strict';

  var tagData = {};
  var globalData = {};
  var sortedKeys = [];

  // 加载 JSON 数据
  Promise.all([
    fetch('data/html-tags.json').then(function (r) { return r.json(); }),
    fetch('data/global-attributes.json').then(function (r) { return r.json(); })
  ]).then(function (results) {
    tagData = results[0];
    globalData = results[1];

    sortedKeys = Object.keys(tagData).sort();

    // 初始化侧边栏
    Sidebar.init(tagData, globalData);

    // 初始化搜索
    Search.init(tagData, globalData, sortedKeys);

    // 监听 hash 变化
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
  }).catch(function (err) {
    console.error('数据加载失败:', err);
    document.getElementById('content').innerHTML =
      '<div class="welcome"><h1>加载失败</h1><p>请检查 data/ 目录下的 JSON 文件是否存在。</p></div>';
  });

  function handleRoute() {
    var hash = window.location.hash.replace('#', '');
    if (!hash) {
      // 默认首页
      document.getElementById('welcome').style.display = 'block';
      document.getElementById('tagPage').style.display = 'none';
      Sidebar.setActive(null);
      return;
    }

    if (hash === 'global-attributes') {
      // 渲染全局属性页
      document.getElementById('welcome').style.display = 'none';
      var page = document.getElementById('tagPage');
      page.style.display = 'block';

      var g = globalData;
      var html = '<h2>HTML 全局属性</h2>';
      html += '<p class="tag-subtitle">Global Attributes</p>';
      html += '<div class="tag-desc">' + (g.description || '') + '</div>';

      if (g.attributes && g.attributes.length > 0) {
        html += '<h3>属性表格</h3>';
        html += Render.buildTable(g.attributes, 'attr');
      }

      page.innerHTML = html;
      Sidebar.setActive('global-attributes');
      return;
    }

    var tag = tagData[hash];
    if (tag) {
      Render.renderTagPage(tag);
      Sidebar.setActive(hash);
    } else {
      document.getElementById('welcome').style.display = 'block';
      document.getElementById('tagPage').style.display = 'none';
    }
  }
})();
```

**注意**：render.js 需要暴露 `buildTable` 函数给 main.js 使用（渲染全局属性页时调用）。更新 render.js 的导出：

在 render.js 的 return 语句改为：
```js
return { renderTagPage: renderTagPage, buildTable: buildTable };
```

---

### Task 7: 全局属性数据 (global-attributes.json)

**Files:**
- Modify: `data/global-attributes.json`

- [ ] **Step 1: 编写完整的全局属性数据**

```json
{
  "title": "HTML 全局属性",
  "englishName": "Global Attributes",
  "description": "HTML 全局属性是可以应用于<strong>几乎所有 HTML 标签</strong>的通用属性。掌握全局属性是理解 HTML 标准的关键，它们提供了元素标识、样式控制、辅助功能、国际化等基础能力。以下列出所有常用全局属性，<strong>在每个标签讲解页的属性表格中同样会出现</strong>。",
  "attributes": [
    {
      "name": "id", "star": true,
      "explain": "元素的唯一标识符，同一页面内不可重复",
      "english": "identifier n.标识符",
      "values": [
        { "value": "自定义字符串", "english": "", "note": "同一页面中 id 必须唯一，不能出现重复" }
      ]
    },
    {
      "name": "class", "star": true,
      "explain": "元素的类名，用于 CSS 选择器和 JS 操作",
      "english": "class n.类 / 类别",
      "values": [
        { "value": "类名字符串（如 \"btn primary\"）", "english": "", "note": "多个类名用空格隔开，同一个类名可应用于多个元素" }
      ]
    },
    {
      "name": "style", "star": true,
      "explain": "元素的内联样式，直接写入 CSS 声明",
      "english": "style n.样式",
      "values": [
        { "value": "CSS 声明（如 \"color: red; font-size: 16px;\"）", "english": "", "note": "优先级高于外部/内部样式表，但建议尽量用 class 替代内联样式" }
      ]
    },
    {
      "name": "title", "star": false,
      "explain": "元素的提示文本，鼠标悬停时显示",
      "english": "title n.标题 / 提示",
      "values": [
        { "value": "任意文本字符串", "english": "", "note": "悬停时显示为 tooltip，对无障碍访问有帮助" }
      ]
    },
    {
      "name": "lang", "star": false,
      "explain": "元素内容的语言代码",
      "english": "language n.语言",
      "values": [
        { "value": "\"en\"", "english": "English 英语", "note": "" },
        { "value": "\"zh-CN\"", "english": "Chinese (Simplified) 简体中文", "note": "" },
        { "value": "\"ja\"", "english": "Japanese 日语", "note": "" },
        { "value": "\"ko\"", "english": "Korean 韩语", "note": "" },
        { "value": "其他 ISO 语言代码", "english": "", "note": "遵循 ISO 639-1 标准" }
      ]
    },
    {
      "name": "dir", "star": false,
      "explain": "文本的书写方向",
      "english": "direction n.方向",
      "values": [
        { "value": "\"ltr\"", "english": "left to right 从左到右", "note": "默认值，适用于大多数语言" },
        { "value": "\"rtl\"", "english": "right to left 从右到左", "note": "适用于阿拉伯语、希伯来语等" },
        { "value": "\"auto\"", "english": "automatic 自动检测", "note": "浏览器自动判断文本方向" }
      ]
    },
    {
      "name": "hidden", "star": true,
      "explain": "隐藏元素（不渲染、不可见、不占空间）",
      "english": "hidden adj.隐藏的",
      "values": [
        { "value": "hidden（布尔属性，写上即生效）", "english": "", "note": "该元素及其所有子元素都不会被渲染。与 CSS display:none 效果类似但语义更强" }
      ]
    },
    {
      "name": "tabindex", "star": false,
      "explain": "元素的 Tab 键导航顺序",
      "english": "tab index 制表索引",
      "values": [
        { "value": "\"0\"", "english": "", "note": "使元素可被 Tab 键聚焦，按 DOM 顺序" },
        { "value": "正整数（如 \"1\"）", "english": "", "note": "按数值升序聚焦，不推荐使用（破坏自然顺序）" },
        { "value": "\"-1\"", "english": "", "note": "元素不可 Tab 聚焦，但可通过 JS focus() 聚焦" }
      ]
    },
    {
      "name": "accesskey", "star": false,
      "explain": "元素的键盘快捷键",
      "english": "access key 访问键",
      "values": [
        { "value": "单字符（如 \"s\"）", "english": "", "note": "不同浏览器/系统的触发组合键不同（如 Alt+S 或 Ctrl+Alt+S），可能与浏览器快捷键冲突" }
      ]
    },
    {
      "name": "contenteditable", "star": false,
      "explain": "元素内容是否可编辑",
      "english": "content editable 内容可编辑",
      "values": [
        { "value": "\"true\"", "english": "", "note": "用户可直接在浏览器中编辑元素内容" },
        { "value": "\"false\"", "english": "", "note": "默认值，不可编辑" },
        { "value": "\"plaintext-only\"", "english": "", "note": "只允许纯文本编辑，粘贴时自动去除格式" }
      ]
    },
    {
      "name": "draggable", "star": false,
      "explain": "元素是否可拖拽",
      "english": "draggable adj.可拖拽的",
      "values": [
        { "value": "\"true\"", "english": "", "note": "元素可被拖拽，需配合 JS 拖拽 API 使用" },
        { "value": "\"false\"", "english": "", "note": "默认值，不可拖拽" },
        { "value": "\"auto\"", "english": "", "note": "浏览器默认行为（图片、链接默认可拖拽）" }
      ]
    },
    {
      "name": "spellcheck", "star": false,
      "explain": "是否对元素内容进行拼写检查",
      "english": "spell check 拼写检查",
      "values": [
        { "value": "\"true\"", "english": "", "note": "启用拼写检查" },
        { "value": "\"false\"", "english": "", "note": "禁用拼写检查（如代码片段、邮箱地址）" }
      ]
    },
    {
      "name": "data-*", "star": true,
      "explain": "自定义数据属性，* 为任意名称，用于存储页面私有的自定义数据",
      "english": "data attribute 数据属性",
      "values": [
        { "value": "data-自定义名称=\"值\"（如 data-id=\"123\"）", "english": "", "note": "可通过 JS 的 element.dataset 访问，非常适合在 HTML 中嵌入应用数据" }
      ]
    },
    {
      "name": "role", "star": false,
      "explain": "ARIA 角色，定义元素的语义角色以辅助无障碍访问",
      "english": "role n.角色",
      "values": [
        { "value": "\"button\"", "english": "", "note": "将元素语义定义为按钮" },
        { "value": "\"navigation\"", "english": "", "note": "导航区域" },
        { "value": "\"main\"", "english": "", "note": "主要内容区域" },
        { "value": "\"banner\"", "english": "", "note": "页眉/横幅区域" },
        { "value": "其他 WAI-ARIA 角色值", "english": "", "note": "参考 WAI-ARIA 规范" }
      ]
    },
    {
      "name": "aria-*", "star": false,
      "explain": "ARIA 状态和属性，为辅助技术提供额外信息",
      "english": "Accessible Rich Internet Applications",
      "values": [
        { "value": "aria-label=\"描述文本\"", "english": "", "note": "为元素提供可访问的标签名称" },
        { "value": "aria-hidden=\"true/false\"", "english": "", "note": "控制辅助技术是否可见该元素" },
        { "value": "aria-expanded=\"true/false\"", "english": "", "note": "指示可展开控件的展开状态" }
      ]
    },
    {
      "name": "translate", "star": false,
      "explain": "指定元素内容是否应该被翻译",
      "english": "translate v.翻译",
      "values": [
        { "value": "\"yes\"", "english": "", "note": "默认值，允许翻译" },
        { "value": "\"no\"", "english": "", "note": "禁止翻译（如代码、品牌名、专有名词）" }
      ]
    }
  ],
  "cssProperties": [],
  "relatedTags": []
}
```

---

### Task 8: HTML 标签数据 (html-tags.json) — 完整写入

**Files:**
- Modify: `data/html-tags.json`

这是整个项目工作量最大的部分，需要为 80+ 个标签写入完整的属性/CSS/描述数据。

- [ ] **Step 1: 写入 html-tags.json — 全部标签数据**

由于数据量极大，将在实施时直接写入完整文件。数据需覆盖 txt 文件中列出的所有标签。每个标签包含完整字段：`name`、`englishName`、`chineseDesc`、`isDouble`、`description`（含 `<strong>` 标记）、`attributes` 数组（含属性名、解释、英文、星号标记、属性值数组）、`cssProperties` 数组（结构同 attributes）、`relatedTags` 数组。

按字母分组列出需覆盖的标签：

**A**: a, abbr, address, area, article, aside, audio
**B**: b, base, bdi, bdo, blockquote, body, br, button
**C**: canvas, caption, cite, code, col, colgroup
**D**: data, datalist, dd, del, details, dfn, dialog, div, dl, dt
**E**: em, embed
**F**: fieldset, figcaption, figure, footer, form
**H**: h1-h6, head, header, hr, html
**I**: i, iframe, img, input, ins
**K**: kbd
**L**: label, legend, li, link
**M**: main, map, mark, menu, meta, meter
**N**: nav
**O**: object, ol, optgroup, option, output
**P**: p, param, picture, pre, progress
**Q**: q
**R**: rp, rt, ruby
**S**: s, samp, script, section, select, small, source, span, strong, style, sub, summary, sup, svg
**T**: table, tbody, td, template, textarea, tfoot, th, thead, time, title, tr, track
**U**: u, ul
**V**: var, video
**W**: wbr

共计约 85 个标签。由于数据量极大，本任务将分配多个子代理并行完成数据编写。

---

### Task 9: 最终联调与验证

**Files:**
- Verify: `index.html` 正常工作

- [ ] **Step 1: 启动本地服务器测试**

```bash
cd "c:/Users/10295/Desktop/Code Collection/HTML tags"
# 使用 Python 内置服务器
python -m http.server 8080
```

打开 `http://localhost:8080`，验证：

- [ ] 侧边栏正确显示所有标签，按字母分组
- [ ] 点击标签可跳转并渲染内容
- [ ] 搜索框输入 img 回车跳转到 img 标签页
- [ ] 搜索框输入 class 跳转到全局属性页
- [ ] 表格五列正确渲染，星号、空单元格正确
- [ ] 相关标签链接可点击跳转
- [ ] 移动端（≤768px）：汉堡菜单出现，侧边栏可滑出
- [ ] 遮罩层正常工作，ESC 键可关闭侧边栏
- [ ] 全局属性页面内容完整
- [ ] 所有标签页无缺少字段、无 undefined 显示

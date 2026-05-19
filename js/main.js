(function () {
  'use strict';

  var tagData = {};
  var globalData = {};
  var sortedKeys = [];

  Promise.all([
    fetch('data/html-tags.json').then(function (r) { return r.json(); }),
    fetch('data/global-attributes.json').then(function (r) { return r.json(); })
  ]).then(function (results) {
    tagData = results[0];
    globalData = results[1];

    sortedKeys = Object.keys(tagData).sort();

    Sidebar.init(tagData, globalData);

    Search.init(tagData, globalData, sortedKeys);

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
      document.getElementById('welcome').style.display = 'block';
      document.getElementById('tagPage').style.display = 'none';
      document.getElementById('toc').classList.remove('visible');
      Sidebar.setActive(null);
      return;
    }

    if (hash === 'global-attributes') {
      document.getElementById('welcome').style.display = 'none';
      var page = document.getElementById('tagPage');
      page.style.display = 'block';

      var g = globalData;
      var html = '<h2>HTML 全局属性</h2>';
      html += '<p class="tag-subtitle">Global Attributes</p>';
      html += '<div class="tag-desc" id="section-basic">' + (g.description || '') + '</div>';

      if (g.attributes && g.attributes.length > 0) {
        html += '<h3 id="section-attributes">属性表格</h3>';
        html += Render.buildTable(g.attributes, 'attr');
      }

      page.innerHTML = html;
      Render.buildToc();
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
      document.getElementById('toc').classList.remove('visible');
    }
  }
})();

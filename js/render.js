var Render = (function () {
  'use strict';

  var observer = null;

  function renderTagPage(tagData) {
    if (!tagData) {
      document.getElementById('welcome').style.display = 'block';
      document.getElementById('tagPage').style.display = 'none';
      document.getElementById('toc').classList.remove('visible');
      return;
    }

    document.getElementById('welcome').style.display = 'none';
    var page = document.getElementById('tagPage');
    page.style.display = 'block';

    var html = '';

    html += '<h2>&lt;' + esc(tagData.name) + '&gt;</h2>';
    html += '<p class="tag-subtitle">' + esc(tagData.englishName) + ' — ' + esc(tagData.chineseDesc || '') + '</p>';

    html += '<div class="tag-desc" id="section-basic">' + (tagData.description || '') + '</div>';

    if (tagData.attributes && tagData.attributes.length > 0) {
      html += '<h3 id="section-attributes">属性表格</h3>';
      html += buildTable(tagData.attributes, 'attr');
    }

    if (tagData.cssProperties && tagData.cssProperties.length > 0) {
      html += '<h3 id="section-css">CSS 表格</h3>';
      html += buildTable(tagData.cssProperties, 'css');
    }

    if (tagData.relatedTags && tagData.relatedTags.length > 0) {
      html += '<h3 id="section-related">相关标签</h3>';
      html += '<div class="related-tags">';
      tagData.relatedTags.forEach(function (t) {
        html += '<a class="related-tag" href="#' + esc(t) + '">&lt;' + esc(t) + '&gt;</a>';
      });
      html += '</div>';
    }

    page.innerHTML = html;
    buildToc();
  }

  function buildToc() {
    var toc = document.getElementById('toc');
    var list = document.getElementById('tocList');
    var sections = document.querySelectorAll('[id^="section-"]');

    if (sections.length === 0) {
      toc.classList.remove('visible');
      return;
    }

    toc.classList.add('visible');

    var items = [];
    sections.forEach(function (sec) {
      var id = sec.id;
      var text = '';
      if (id === 'section-basic') text = '基础讲解';
      else if (id === 'section-attributes') text = '属性表格';
      else if (id === 'section-css') text = 'CSS 表格';
      else if (id === 'section-related') text = '相关标签';
      else text = sec.textContent.trim();
      items.push({ id: id, text: text });
    });

    var html = '';
    items.forEach(function (item) {
      html += '<li><a href="#' + item.id + '" data-toc="' + item.id + '">' + esc(item.text) + '</a></li>';
    });
    list.innerHTML = html;

    list.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-toc]');
      if (!a) return;
      e.preventDefault();
      var id = a.getAttribute('data-toc');
      var el = document.getElementById(id);
      if (el) {
        var topbarH = 52;
        var top = el.getBoundingClientRect().top + window.pageYOffset - topbarH - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });

    setupObserver(items);
  }

  function setupObserver(items) {
    if (observer) observer.disconnect();

    var links = {};
    document.querySelectorAll('#tocList a[data-toc]').forEach(function (a) {
      links[a.getAttribute('data-toc')] = a;
    });

    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.id;
        var link = links[id];
        if (!link) return;
        if (entry.isIntersecting) {
          document.querySelectorAll('#tocList a.active').forEach(function (a) {
            a.classList.remove('active');
          });
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-60px 0px -60% 0px', threshold: 0 });

    items.forEach(function (item) {
      var el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
  }

  function buildTable(items, type) {
    var headers = (type === 'attr')
      ? ['属性', '英文原称', '属性值 / 写法', '英文解释', '注意']
      : ['CSS 属性', '英文原称', '属性值 / 写法', '英文解释', '注意'];

    var html = '<div class="table-wrapper"><table class="attr-table"><thead><tr>';
    headers.forEach(function (h) { html += '<th>' + h + '</th>'; });
    html += '</tr></thead><tbody>';

    items.forEach(function (item) {
      var rowCount = item.values ? item.values.length : 1;

      item.values.forEach(function (v, idx) {
        html += '<tr>';

        if (idx === 0) {
          html += '<td rowspan="' + rowCount + '">';
          if (item.star) html += '<span class="attr-star">&#11088; </span>';
          html += '<span class="attr-name">' + esc(item.name) + '</span>';
          if (item.explain) html += '<span class="attr-explain">' + esc(item.explain) + '</span>';
          html += '</td>';
        }

        if (idx === 0) {
          html += '<td rowspan="' + rowCount + '"><span class="en-text">' + esc(item.english || '') + '</span></td>';
        }

        html += '<td><span class="val-text">' + esc(v.value) + '</span>';
        if (v.valueNote) html += '<span class="val-note">' + esc(v.valueNote) + '</span>';
        html += '</td>';

        html += '<td><span class="en-text">' + esc(v.english || '') + '</span></td>';

        html += '<td><span class="note-text">' + esc(v.note || '') + '</span></td>';

        html += '</tr>';
      });
    });

    html += '</tbody></table></div>';
    return html;
  }

  function esc(str) { return String(str == null ? '' : str); }

  return { renderTagPage: renderTagPage, buildTable: buildTable, buildToc: buildToc };
})();

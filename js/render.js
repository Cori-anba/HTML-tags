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

    html += '<h2>&lt;' + esc(tagData.name) + '&gt;</h2>';
    html += '<p class="tag-subtitle">' + esc(tagData.englishName) + ' — ' + esc(tagData.chineseDesc || '') + '</p>';

    html += '<div class="tag-desc">' + (tagData.description || '') + '</div>';

    if (tagData.attributes && tagData.attributes.length > 0) {
      html += '<h3>属性表格</h3>';
      html += buildTable(tagData.attributes, 'attr');
    }

    if (tagData.cssProperties && tagData.cssProperties.length > 0) {
      html += '<h3>CSS 表格</h3>';
      html += buildTable(tagData.cssProperties, 'css');
    }

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

  return { renderTagPage: renderTagPage, buildTable: buildTable };
})();

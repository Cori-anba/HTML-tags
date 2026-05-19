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
      var found = findMatch(val);
      if (found) {
        var displayName = (found === 'global-attributes') ? '全局属性' : found;
        showHint('回车跳转到: &lt;' + displayName + '&gt;', false);
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

    document.addEventListener('click', function (e) {
      if (!document.getElementById('searchBox').contains(e.target)) hideHint();
    });
  }

  function findMatch(query) {
    if (tagData[query]) return query;

    var globalKeywords = ['id', 'class', 'style', 'title', 'lang', 'dir', 'hidden',
      'tabindex', 'accesskey', 'contenteditable', 'draggable', 'spellcheck', 'data-*'];
    if (globalKeywords.indexOf(query) !== -1) return 'global-attributes';

    for (var i = 0; i < sortedKeys.length; i++) {
      var key = sortedKeys[i];
      var tag = tagData[key];
      if (!tag) continue;
      if (tag.englishName && tag.englishName.toLowerCase().indexOf(query) !== -1) return key;
    }

    for (var i = 0; i < sortedKeys.length; i++) {
      var k = sortedKeys[i];
      var t = tagData[k];
      if (!t) continue;
      var desc = (t.chineseDesc || '') + (t.description || '');
      if (desc.toLowerCase().indexOf(query) !== -1) return k;
    }

    for (var j = 0; j < sortedKeys.length; j++) {
      if (sortedKeys[j].indexOf(query) === 0) return sortedKeys[j];
    }

    return null;
  }

  return { init: init };
})();

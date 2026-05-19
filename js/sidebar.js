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

    html += '<hr class="sidebar-divider">';
    html += '<a class="global-link" href="#global-attributes" data-tag="global-attributes">全局属性 (Global Attributes)</a>';

    nav.innerHTML = html;

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
    if (tag) {
      var active = nav.querySelector('[data-tag="' + CSS.escape(tag) + '"]');
      if (active) {
        active.classList.add('active');
        active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
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

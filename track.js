/* Records clicks on buy buttons and other outbound store links in the Google tag data layer. */
(function () {
  var stores = [
    [/amazon\.com|amzn\.to/, 'amazon'],
    [/gumroad\.com/, 'gumroad'],
    [/etsy\.com/, 'etsy'],
    [/herbalrhymes\.com/, 'herbalrhymes'],
    [/stacypropp-lgtm\.github\.io/, 'free_tool']
  ];
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    for (var i = 0; i < stores.length; i++) {
      if (stores[i][0].test(href)) {
        var card = a.closest('[id]');
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'store_click',
          store: stores[i][1],
          link_url: href,
          link_text: (a.textContent || '').trim().slice(0, 80),
          item_id: card ? card.id : '',
          page_path: location.pathname
        });
        return;
      }
    }
  }, true);
})();

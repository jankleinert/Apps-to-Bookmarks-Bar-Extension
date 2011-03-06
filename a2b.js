chrome.management.onInstalled.addListener(function(info) {
  var id;
  if (info.isApp) {
    chrome.bookmarks.getTree(function(results) {
      if (results[0].children != undefined) {
        var children = results[0].children;
        chrome.bookmarks.create({'parentId': children[0].id,
                                   'url': info.appLaunchUrl }, 
                                    function(result) {
        }); 
      }
    });
  } 
});

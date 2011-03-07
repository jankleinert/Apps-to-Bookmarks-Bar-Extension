chrome.management.onInstalled.addListener(function(info) {
  var id;
  if (info.isApp) {
    // Using an id of 1 is a "reasonably safe" way of getting to
    // the Bookmarks Bar according to http://crbug.com/21330
    chrome.bookmarks.create({'parentId': '1',
                             'url': info.appLaunchUrl}); 
  } 
});

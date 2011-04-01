chrome.management.onInstalled.addListener(function(info) {
  var id;
  if (info.isApp) {
    // Using an id of 1 is a "reasonably safe" way of getting to
    // the Bookmarks Bar according to http://crbug.com/21330
	console.log("an app was just installed");
    chrome.bookmarks.create({'parentId': '1',
                             'url': info.appLaunchUrl}); 
  } 
});

// This event is fired each time the user updates the text in the omnibox,
// as long as the extension's keyword mode is still active.
chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    suggest([
      {content: text + " import", description: "Import your existing apps to the bookmarks bar."}
    ]);
  });

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    if (text.toLowerCase() == 'import') {
      chrome.management.getAll(function(items) {
		var appsOnly = new Array();
		for (var i = 0; i < items.length; i++) {
	      if (items[i].isApp) {
			// Using an id of 1 is a "reasonably safe" way of getting to
			// the Bookmarks Bar according to http://crbug.com/21330
			chrome.bookmarks.create({'parentId': '1',
			                           'url': items[i].appLaunchUrl}); 				
		  }	
		}			
      });
	}
  });

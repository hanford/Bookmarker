chrome.commands.onCommand.addListener(function(command) {
  console.log('onCommand event received for message: ', command);
  

  var storage = chrome.storage.sync;

  storage.get('group', function(data) {
    if (data.group === undefined) { alert('No Bookmarks added yet!'); }

    var groupLength = data.group.length;
    for (var i = 0; i < groupLength; i++) {
      chrome.tabs.create({url: data.group[i].bookmark});
    }
  });
});
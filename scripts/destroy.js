var storage = chrome.storage.sync;
var confirmMessage = confirm("Are you sure you want to remove all bookmarks from Bookmarker? This won't remove any bookmarks from chrome");
$(document).ready(function(){
  if (confirmMessage) {
    destroy();
  } else {
    console.log('Aborted');
  }

});

function destroy() {
  storage.get('group', function(res) {
    var group = [];
    storage.set({'group': group});
  })
}
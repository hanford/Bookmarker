var storage = chrome.storage.sync;

$('.removeEm').click(function(){
  var confirmMessage = confirm("Are you sure you want to remove all bookmarks from Bookmarker? This won't remove any bookmarks from chrome");
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
    alert('Removed Bookmarks')
  })
}
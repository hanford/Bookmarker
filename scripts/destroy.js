var storage = chrome.storage.sync;

$('.removeEm').click(function(){
    destroy();
});

function destroy() {
  storage.get('group', function(res) {
    var group = [];
    storage.set({'group': group});
  })
}
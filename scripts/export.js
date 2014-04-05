var storage = chrome.storage.sync;

$(document).ready(function(){
  exportToText();
});

function exportToText() {
  storage.get('group', function(data) {
    if (data.group === undefined) { return null; }
    var groupLength = data.group.length;
    for (var i = 0; i < groupLength; i++) {
      var url = data.group[i].bookmark;
      var title = data.group[i].title;
      var faveSrc = data.group[i].fave;

      $('ol').append('<li>'+ '<img src="'+ faveSrc +'">'+ ' '  + '<span>' + url + '</span></li><br />');
    }
  })
}
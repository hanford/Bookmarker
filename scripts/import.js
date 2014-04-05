$('.importChrome').click(function(){
  importChrome();
  $('.importChrome').attr('disabled', "disabled");
});

function importChrome() {
  $('.results').fadeIn('fast');

  chrome.bookmarks.getTree(function(data){
    data.forEach(function(data) {
      var length = data.children.length;
      if (length > 0) {
        $('.results').append('<h3>Great, we found' +' '+ length+ ' ' + 'folders! Click one to import it.</h3>');
        var forData = data.children;
        for (var i = 0; length > i; i++) {
          $('.results').append('<div class="folder" value="'+[i]+'"><img src="images/datFold.png"> <br />' + forData[i].title + '<br />'+ forData[i].children.length + ' bookmarks' +' <br />');
        }
        var folder = $('.folder');
        folder.click(function(){
          var urlList = this.getAttribute('value');
          var loopLength = forData[urlList].children.length;
          chrome.storage.sync.get('group', function(res) {
            var group = res['group'];

            if (group === undefined) {
              group = [];
            }

            for (var i = 0; loopLength > i; i++) {
              var bookmark = {bookmark: forData[urlList].children[i].url, title: forData[urlList].children[i].url};
              if (bookmark.bookmark != undefined) {
                group.push(bookmark);
                $('.results-list').append('<li>'+forData[urlList].children[i].url+'</li> <br/>')
              }   
            }
            chrome.storage.sync.set({'group': group});
          })
        })
      }
    })
  })
}
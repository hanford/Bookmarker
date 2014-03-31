$('.importChrome').click(function(){
  importChrome();
});

function importChrome() {
  $('.results').fadeIn();

  chrome.bookmarks.getTree(function(data){
    data.forEach(function(data) {
      if (data.children) {
        var length = data.children.length;
        $('.results').append('<h3>Great, we found' +' '+ length +' '+ 'Folders! By selecting them we can import the URLs</h3>');
        data.children.forEach(function(data) { 
          $('#results').append('<div class="folder">'+data.title +' which has '+ data.children.length + ' URLs' +' <br />');
          data.children.forEach(function(data) { 
            if (data.children) {

            } else {
            $('.results-list').append(data.url + ' ' +'<br />');
          }
          })
        })
      }
    })
  })
}
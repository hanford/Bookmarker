'use strict';

var storage = chrome.storage.sync;

$(document).ready(function(){
  syncList();
});

$('.open').click(function(){
  opentab();
});

$('.grabber').click(function(){
  urlGrab();
});

$('.remove').click(function(){
  removeObj();
});

$('.settings').click(function() {
  chrome.tabs.create({url: "settings.html"});
});

function urlGrab(){
  chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
    var url = arrayOfTabs[0].url;
    var favIcon = arrayOfTabs[0].favIconUrl;
    var title = arrayOfTabs[0].title;

    $('ul').append('<li class="popup-li">'+ '<img src="'+ favIcon +'">' + ' ' + title + '</li>');

    storage.get('group', function(res) {
      var group = res['group'];

      if (group === undefined) {
        group = [];
      }

      var bookmark = {bookmark: url, fave: favIcon, title: title};

      group.push(bookmark);

      storage.set({'group': group});
    });
  });
}

function syncList() {
  storage.get('group', function(data) {
    if (data.group === undefined) { return null; }

    var groupLength = data.group.length;
    for (var i = 0; i < groupLength; i++) {
      var url = data.group[i].bookmark;
      var title = data.group[i].title;
      var faveSrc = data.group[i].fave;

      $('ul').append('<li class="popup-li">'+ '<img src="'+ faveSrc +'">'+ ' ' + '<a class="text-bump" href="' + url + '" target="_blank">' + title + '</a>' + '</li>');
    }
  })
}

function removeObj() {
  storage.get('group', function(data) {
    var group = data['group'];

    $('ul').empty();
    var groupLength = group.length;

    for (var i = 0; i < groupLength; i++) {
      $('ul').append('<li class="popup-li">'+ '<input type="checkbox" value="'+[i]+'">' + '<span class="text-bump">' + data.group[i].title + '</span>' + '</li>');
    }

    var checkbox = $('input[type="checkbox"]');
    var redButton = $('.bttn-danger');

    checkbox.click(function(){
      var checked = $("input[type='checkbox']:checked").val();
      delete group[checked];
      storage.set({'group': group}); 
      $('ul').empty();
      syncList();
    });
  })
}

function opentab() {
  storage.get('group', function(data) {
    if (data.group === undefined) { return null; }

    var groupLength = data.group.length;
    for (var i = 0; i < groupLength; i++) {
      chrome.tabs.create({url: data.group[i].bookmark});
    }
  });
}
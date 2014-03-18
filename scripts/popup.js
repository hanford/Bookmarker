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
  removeAll();
});

$('.personal-link').click(function(){
  chrome.tabs.create({url: "http://jackhanford.com"});
});

function urlGrab(){
  chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
    var url = arrayOfTabs[0].url;
    var favIcon = arrayOfTabs[0].favIconUrl;
    var randomNum = Math.random() * (1, 1000000);
    var id = Math.round(randomNum);

    $('ul').append('<li>'+ '<img src="'+ favIcon +'">' + ' ' + url + '</li>');

    storage.get('group', function(res) {
      var group = res['group'];

      // if new group
      if (group === undefined) {
        group = [];
      }

      var bookmark = {id: id, bookmark: url, fave: favIcon};

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
      $('ul').append('<li>'+ '<img src="'+ data.group[i].fave +'">'+ ' ' + '<span class="text-bump">' + data.group[i].bookmark + '</span>' + '</li>');
    }
  })
}

function removeAll() {
  storage.remove('group');

  $('ul').empty();
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
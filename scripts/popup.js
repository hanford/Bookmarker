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
  $('.remove').empty().append('Select to keep');
  removeAll();
});

$('.personal-link').click(function(){
  chrome.tabs.create({url: "http://jackhanford.com"});
});

function urlGrab(){
  chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
    var url = arrayOfTabs[0].url;
    var favIcon = arrayOfTabs[0].favIconUrl;

    $('ul').append('<li>'+ '<img src="'+ favIcon +'">' + ' ' + url + '</li>');

    storage.get('group', function(res) {
      var group = res['group'];

      console.log(group);
      if (group === undefined) {
        group = [];
      }

      var bookmark = {bookmark: url, fave: favIcon};

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

      $('ul').append('<li>'+ '<img src="'+ data.group[i].fave +'">'+ ' ' + '<a class="text-bump" href="' + url + '" target="_blank">' + url + '</a>' + '</li>');
    }
  })
}

function removeAll() {
  storage.get('group', function(data) {

    $('ul').empty();
    var groupLength = data.group.length;
    $('ul').empty();
    var toDelete = [];

    for (var i = 0; i < groupLength; i++) {
      $('ul').append('<li>'+ '<input type="checkbox" value="'+[i]+'">' + '<span class="text-bump">' + data.group[i].bookmark + '</span>' + '</li>');
    }

    $('input').click(function(){
      var redButton = $('.bttn-danger');
      redButton.removeClass('.remove');
      redButton.addClass('delete');
      redButton.empty().append('Keep Selected');

      var removeMe = $("input[type='checkbox']:checked").val();

      toDelete.push(removeMe);
      $('.delete').click(function(){
        toDelete.push(removeMe);
        data = data.group.splice(removeMe);
        storage.set({'group': data});
        syncList();
      })
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
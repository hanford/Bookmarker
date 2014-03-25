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

$('.settings').click(function() {
  $('#main').toggle();
  $('.settingsbin').toggle();
});

function urlGrab(){
  chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {
    var url = arrayOfTabs[0].url;
    var favIcon = arrayOfTabs[0].favIconUrl;
    var title = arrayOfTabs[0].title;

    $('ul').append('<li>'+ '<img src="'+ favIcon +'">' + ' ' + title + '</li>');

    storage.get('group', function(res) {
      var group = res['group'];

      console.log(group);
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

      $('ul').append('<li>'+ '<img src="'+ data.group[i].fave +'">'+ ' ' + '<a class="text-bump" href="' + url + '" target="_blank">' + title + '</a>' + '</li>');
    }
  })
}

function removeAll() {
  storage.get('group', function(data) {

    $('ul').empty();
    var groupLength = data.group.length;
    var toDelete = [];

    for (var i = 0; i < groupLength; i++) {
      $('ul').append('<li>'+ '<input type="checkbox" value="'+[i]+'">' + '<span class="text-bump">' + data.group[i].title + '</span>' + '</li>');
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
        console.log(data);
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
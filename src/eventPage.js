'use strict';

chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.query({}, function (tabs) {
    tabs.forEach(tab => {
      chrome.tabs.update(tab.id, { muted: true });
    });
  })
});

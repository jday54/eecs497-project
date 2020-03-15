// chrome.runtime.onInstalled.addListener(function() {
//     chrome.storage.sync.set({color: '#3aa757'}, function() {
//       console.log("The color is green.");
//     });
// });

'use strict';
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "memorizer_id",
        title: "Memorizer",
        contexts: ["selection"]
    });
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'developer.chrome.com'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
});

  chrome.browserAction.onClicked(object details, function callback);
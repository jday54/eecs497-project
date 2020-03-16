'use strict';


// context menu
function onClickHandler(){
    alert("Hello from your Chrome extension!") 
    // todo store that shit
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

// // first run
// chrome.runtime.onInstalled.addListener( function(details) {

//   contexts = ["page","selection","link", "image"];
//   for (var i = 0; i < contexts.length; i++) {
//   	var context = contexts[i];
//   	var title = "Share " + context + " on Twitter";
//   	chrome.contextMenus.create({"title": title, "contexts":[context], "id": "tweet-"+context});
//   }
// });

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "memorizer_id",
        title: "Memorizer",
        contexts: ["selection"]
    });
});

// chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     chrome.declarativeContent.onPageChanged.addRules([{
//         conditions: [new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: {hostEquals: 'developer.chrome.com'},
//         })
//         ],
//             actions: [new chrome.declarativeContent.ShowPageAction()]
//     }]);
// });

//   chrome.browserAction.onClicked(object details, function callback);
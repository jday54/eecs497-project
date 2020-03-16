'use strict';

function onClickHandler(info) {
    if (info.menuItemId == "memorizer") {
        // alert("Hello from your Chrome extension!") 

        let text = info.selectionText;
        chrome.storage.sync.set({text: "lul"}, function() {
            alert("Storage sync called with " + text);
            console.log("text stored:" + text);
        });
    }
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "memorizer",
        title: "Memorizer",
        contexts: ["selection"]
    });
});

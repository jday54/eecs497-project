'use strict';

function onClickHandler(info) {
    if (info.menuItemId == "memorizer") {
        let text = info.selectionText;
        var date = new Date().getTime();
        chrome.storage.sync.set({[text]: date}, function() {
            alert("Storage sync called with " + text);
            console.log("text stored:" + text);
            console.log("date stored:" + date);
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

chrome.tabs.onCreated.addListener(function() {
    chrome.storage.sync.get(null, function(items) {
        console.log("Checking terms to memorize.")
        var threshold = 1000*5;
        var allKeys = Object.keys(items);
        console.log("Here: " + Object.entries(items));
        for (let [text,date] of Object.entries(items)) {
            alert("text: "+ text + " | date: " + date);
            var current_date = new Date().getTime();
            if ((current_date - date) > threshold) {
                console.log("Reminder sent " + text);
                alert("Reminder sent " + text);
            }
            else {
                // alert("nope");
            }
        }
    });
});
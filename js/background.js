'use strict';

function onClickHandler(info) {
    if (info.menuItemId == "memorizer") {
        let text = info.selectionText;
        var date = new Date().getTime();
        chrome.storage.sync.set({date: notecard}, function() {
            alert("You have selected --" + text + " to memorize!")
            console.log("Storage sync called with " + text);
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
    chrome.storage.sync.set({"threshold": 1000*500});
    // var decks = Set()
});

// Check to send reminders
chrome.tabs.onCreated.addListener(function() {
    chrome.storage.sync.get(null, function(items) {
        console.log("Checking terms to memorize.")
        var threshold = 1000 * 10;
        // var threshold = chrome.storage.sync.get()
        console.log("Here: " + Object.entries(items));
        for (let [text,date] of Object.entries(items)) {
            // alert("text: "+ text + " | date: " + date);
            var current_date = new Date().getTime();
            if ((current_date - date) > threshold) {
                console.log("Reminder sent " + text);
                alert("Reminder sent " + text);
            }
            else {
                alert("Not enough time elapsed for: " + text);
            }
        }
    });
});


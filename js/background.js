'use strict';

// Initialize extension and parameters
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "memorizer",
        title: "Memorizer",
        contexts: ["selection"]
    });
    chrome.storage.sync.set({"threshold": 1000*5}); // 5 seconds
    chrome.storage.sync.set({"notecards": {}});
    // var decks = Set()
});

// Store highlighted text  
function onClickHandler(info) {
    if (info.menuItemId == "memorizer") {
        chrome.storage.sync.get({notecards : {}}, function(result){
            let notecards = result.notecards;
            let date = new Date().getTime();
            let notecard = {"text" : info.selectionText, "date" : date, "timer_multiplier":1};
            notecards[date] = notecard;
            chrome.storage.sync.set({'notecards':notecards}, function() {
                alert("You have selected \"" + notecard.text + "\" to memorize!");
                console.log("Storage sync called with notecard:", notecard);
                // ---For Debugging---
                console.log("Current state of notecards (in no particular order):");
                for (let [key, value] of Object.entries(notecards)) {
                    console.log(key, "data: ", value);
                }
                // ---For Debugging---
                });
        });
    }
};

// Run onClickHandler when context menu item is selected
chrome.contextMenus.onClicked.addListener(onClickHandler);

function updateTimerMultiplier(notecard_date) {
    chrome.storage.sync.get({notecards : []}, function(result){
        let notecards = result.notecards;
        notecards[notecard_date].timer_multiplier *= 2;
        chrome.storage.sync.set({'notecards':notecards}, function() {
            console.log("Timer multiplier updated: ", notecards[notecard_date].timer_multiplier);
        });
    });
};

// Check for terms to send reminder for upon new tab creation
chrome.tabs.onCreated.addListener(function() {
    chrome.storage.sync.get(['notecards','threshold'], function(result) {
        console.log("Checking for terms to memorize.")
        let notecards = result.notecards
        for (let [date, notecard] of Object.entries(notecards)) {
            let threshold = result.threshold * (parseInt(notecard.timer_multiplier));
            let current_date = new Date().getTime();
            if ((current_date - notecard.date) > threshold) {
                updateTimerMultiplier(notecard.date);
                alert("Reminder to memorize: " + notecard.text);
                console.log("Reminder sent for: " + notecard.text);
            }
            else {
                // alert("Not enough time elapsed for: " + notecard.text);
            }
        }
    });
});


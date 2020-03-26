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
            let add_date = new Date().getTime();
            let notecard = {"text" : info.selectionText, "add_date" : add_date, "timer_multiplier" : 1, "last_reminder_date" : add_date};
            notecards[add_date] = notecard;
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

// Update last_reminder_date and time_multiplier for specified notecard
function updateNotecard(add_date) {
    chrome.storage.sync.get({notecards : []}, function(result){
        let notecards = result.notecards;
        notecards[add_date].last_reminder_date = new Date().getTime();
        notecards[add_date].timer_multiplier *= 2;
        chrome.storage.sync.set({'notecards':notecards}, function() {
            console.log("For notecard: ", add_date);
            console.log("-- last reminder date updated: ", notecards[add_date].last_reminder_date);
            console.log("-- timer multiplier updated: ", notecards[add_date].timer_multiplier);
        });
    });
};

// Check for terms to send reminder for upon new tab creation
chrome.tabs.onCreated.addListener(function() {
    chrome.storage.sync.get({'notecards':{},'threshold':5000}, function(result) {
        console.log("Checking for terms to memorize.")
        let notecards = result.notecards
        for (let [add_date, notecard] of Object.entries(notecards)) {
            let threshold = result.threshold * (parseInt(notecard.timer_multiplier));
            console.log("Computed threshold: ",threshold)
            let current_date = new Date().getTime();
            if ((current_date - notecard.last_reminder_date) > threshold) {
                updateNotecard(add_date);
                alert("Reminder to memorize: " + notecard.text);
                console.log("Reminder sent for: " + notecard.text);
            }
            else {
                // alert("Not enough time elapsed for: " + notecard.text);
            }
        }
    });
});


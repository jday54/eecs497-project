'use strict';

// Initialize extension and parameters
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "memorizer",
        title: "Memorizer",
        contexts: ["selection"]
    });
    chrome.storage.sync.set({"threshold": 1000*5}); // 5 seconds
    chrome.storage.sync.set({"notecards": []});
    // var decks = Set()
});

// Store highlighted text  
function onClickHandler(info) {
    if (info.menuItemId == "memorizer") {
        chrome.storage.sync.get({notecards : []}, function(result){
            let notecards = result.notecards;
            let notecard = {"text" : info.selectionText,"date" : new Date().getTime(),"times_reminded":0};
            notecards.push(notecard);
            chrome.storage.sync.set({'notecards':notecards}, function() {
                alert("You have selected -- " + notecard.text + " -- to memorize!");
                console.log("Storage sync called with notecard:", notecard);
                // ---For Debugging---
                console.log("Current state of notecards (in no particular order):");
                for (var i = 0; i < notecards.length; i++) {
                    console.log("Notecard "+i+":", notecards[i]);
                }
                // ---For Debugging---
                });
        });
    }
};

// Run onClickHandler when context menu item is selected
chrome.contextMenus.onClicked.addListener(onClickHandler);

// Check for terms to send reminder for upon new tab creation
chrome.tabs.onCreated.addListener(function() {
    chrome.storage.sync.get(['notecards','threshold'], function(result) {
        console.log("Checking for terms to memorize.")
        var threshold = result.threshold
        let notecards = result.notecards
        for (let notecard of notecards) {
            // alert("text: "+ text + " | date: " + date);
            let current_date = new Date().getTime();
            if ((current_date - notecard.date) > threshold) {
                // TODO: update times_reminded for notecard 
                alert("Reminder to memorize: " + notecard.text);
                console.log("Reminder sent for: " + notecard.text);
            }
            else {
                // alert("Not enough time elapsed for: " + notecard.text);
            }
        }
    });
});


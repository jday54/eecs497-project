function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let topics = [
    "Brachi/o - Arm",
    "Cardio - Heart",
    "Cyto - Cell",
    "Dermo- Skin",
    "Encephalo - Brain",
    "Gastro - Stomach",
    "Hemato - Blood",
    "Histo - Tissue"
]

var addSelected = document.getElementById("addSelected");
addSelected.addEventListener('click', function() {
    // Store highlighted text  
    chrome.storage.sync.get({notecards : {}}, async function(result){
        let notecards = result.notecards;
        for(let i = 0 ; i < 8; i++) {
            let topic = topics[i];
            let add_date = new Date().getTime();
            let notecard = {
                "text" : topic,
                "add_date" : add_date,
                "timer_multiplier" : 1,
                "last_reminder_date" : add_date
            };
            console.log(topic)
            console.log(add_date)
            notecards[add_date] = notecard;
            await sleep(10);
        }
        chrome.storage.sync.set({'notecards':notecards}, function() {})
    });

    alert("Successfully added starter topics! Feel free to close this window");
});
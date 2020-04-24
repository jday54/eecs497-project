let page = document.getElementById('buttonDiv');

// const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
// function constructOptions(kButtonColors) {
//   for (let item of kButtonColors) {
//     let button = document.createElement('button');
//     button.style.backgroundColor = item;
//     button.addEventListener('click', function() {
//       chrome.storage.sync.set({color: item}, function() {
//         console.log('color is ' + item);
//       })
//     });
//     page.appendChild(button);
//   }
// }
// constructOptions(kButtonColors);

chrome.storage.sync.get({notecards : {}}, function(items) {
  let notecards = items.notecards;

  // create a new div element 
  var numMemorize = document.getElementById("numMemorize");

  let numOfNotecards = 0;
  for (let [key, value] of Object.entries(notecards)) {
    numOfNotecards = numOfNotecards + 1;
  }
  numMemorize.innerHTML = "You have " + numOfNotecards + " things to memorize";

  var form = document.getElementById("formMemorize"); 

  // give it some content
  var count = 0;
  for (let notecard of Object.values(notecards)) {
    //create checkbox element
    var i = document.createElement("input");
    i.type = "checkbox";
    i.value = notecard.text;
    i.id = notecard.text + notecard.add_date.toString();
    i.className = "listCheckbox";

    var l = document.createElement("l");
    l.for = notecard.text + notecard.add_date.toString();
    l.innerHTML = notecard.text;
    l.className = "listText";

    // add the text node to the newly created div
    form.append(i);
    form.append(l);
    form.append(document.createElement("br"));
  };

  // add the newly created element and its content into the DOM 
  // var resetButton = document.getElementById("resetButtonDiv");
  // resetButton.insertBefore(listHead, document.getElementById("resetButton"));
});

var resetButton = document.getElementById("resetButton");
resetButton.addEventListener('click', function() {
  chrome.storage.sync.set({"notecards": {}});
  window.location.reload();
});

var deleteSelectedButton = document.getElementById("deleteSelected");
deleteSelectedButton.addEventListener('click', function() {
  chrome.storage.sync.get({notecards : {}}, function(items) {
    var endNotecards = {}
    let notecards = items.notecards;
    
    for (let notecard of Object.values(notecards)) {
      var id = notecard.text + notecard.add_date
      var get = document.getElementById(id);
      if(get != null && !get.checked) {
        endNotecards[notecard.add_date] = notecard;
      }
    }

    chrome.storage.sync.set({"notecards": endNotecards});
    window.location.reload();
  })
});

var addTagsButton = document.getElementById("addTag");
addTagsButton.addEventListener('submit', function() {
  chrome.storage.sync.get({notecards : {}}, function(items) {
    var endNotecards = {}
    let notecards = items.notecards;
    
    for (let notecard of Object.values(notecards)) {
      console.log(notecard);
      var id = notecard.text + notecard.add_date;
      var get = document.getElementById(id);
      if (get != null ) {
        if (!get.checked) {
          endNotecards[notecard.add_date] = notecard;
        }
        else {
          notecard["tag"] = document.getElementById('newTag').value;
          endNotecards[notecard.add_date] = notecard;
        }
      }
    }
    chrome.storage.sync.set({"notecards": endNotecards});
  });
});

var addQuizButton = document.getElementById("addQuizPrompt");
addQuizButton.addEventListener('submit', function() {
  newQuizPrompt = document.getElementById('newQuizPrompt').value;
  chrome.storage.sync.get({notecards : {}}, function(items) {
    var endNotecards = {};
    let notecards = items.notecards;

    var count = 0;
    for (let notecard of Object.values(notecards)) {
      console.log(notecard);
      var id = notecard.text + notecard.add_date;
      var get = document.getElementById(id);
      if (get != null) {
        if (!get.checked) {
          endNotecards[notecard.add_date] = notecard;
        }
        else {
          notecard["quiz_prompt"] = newQuizPrompt;
          endNotecards[notecard.add_date] = notecard;
          ++count;
        }
      }
    }

    if (count > 1) {
      if (!window.confirm("Are you sure you want to apply this question to multiple notecards?")) {
        return;
      }
    }

    chrome.storage.sync.set({"notecards": endNotecards});
  });
});

// var printConsole = document.getElementById("printConsole");
// printConsole.addEventListener('click', function() {
//   chrome.storage.sync.get({notecards : {}}, function(items) {
//     let notecards = items.notecards;
//     console.log(notecards);
//   })
// });


chrome.storage.sync.get('threshold', function(items) {
  threshold = items.threshold
  document.getElementById('threshAmt').value = threshold / 60000
});

var newThreshold = document.getElementById("changeThreshold");
newThreshold.addEventListener('submit', function() {
  let newThresh = document.getElementById('threshAmt').value
  chrome.storage.sync.set({"threshold": newThresh * 60000});
  alert("You will be reminded every " + newThresh + " minute(s).")
});

let goToStarterTopicsPage = document.getElementById('starterTopicsButton');
goToStarterTopicsPage.onclick = function(element) {
  chrome.tabs.create({'url': "/starterTopics.html" } )
};
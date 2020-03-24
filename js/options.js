// import React from 'react';
// import ReactDOM from 'react-dom';

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

chrome.storage.sync.get({notecards : []}, function(items) {
  var notecards = items.notecards
  console.log("current number of notecards:", notecards.length.toString());
  
  // create a new div element
  var numMemorize = document.getElementById("titleLine");
  numMemorize.innerHTML = "You have " + notecards.length.toString() + " things to memorize";

  var list_head = document.createElement("ul"); 
  // give it some content
  for (let notecard of notecards) {
    var newListElem = document.createElement("li");
    newListElem.innerHTML = notecard.text;
    console.log("newListItem notecard:", notecard); 
    // add the text node to the newly created div
    list_head.appendChild(newListElem);
  };
  // add the newly created element and its content into the DOM 
  var resetButton = document.getElementById("resetButton"); 
  document.body.insertBefore(list_head, resetButton);   
});

//https://stackoverflow.com/questions/14853779/adding-input-elements-dynamically-to-form

var clear_button = document.getElementById("resetButton");
clear_button.addEventListener('click', function() {
  chrome.storage.sync.clear(function() {
    console.log("all items cleared");
  })
});

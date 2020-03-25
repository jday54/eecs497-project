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

chrome.storage.sync.get(null, function(items) {
  var allKeys = Object.keys(items);
  // create a new div element 
  var numMemorize = document.getElementById("numMemorize");
  numMemorize.innerHTML = "You have " + allKeys.length.toString() + " things to memorize";

  var list_head = document.createElement("ul"); 
  // give it some content
  for (let item of Object.values(allKeys)) {
    var newListElem = document.createElement("li");
    newListElem.innerHTML = item;
    console.log(item); 
    // add the text node to the newly created div
    list_head.appendChild(newListElem);
  };
  // add the newly created element and its content into the DOM 
  var resetButton = document.getElementById("resetButtonDiv"); 
  resetButton.insertBefore(list_head, document.getElementById("resetButton"));   
});

https://stackoverflow.com/questions/14853779/adding-input-elements-dynamically-to-form

var clear_button = document.getElementById("resetButton");
clear_button.addEventListener('click', function() {
  chrome.storage.sync.clear(function() {
    console.log("all items cleared");
  })
  window.location.reload();
});

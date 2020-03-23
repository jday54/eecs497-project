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
  var numMemorize = document.getElementById("titleLine");
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
  var resetButton = document.getElementById("reset_button"); 
  document.body.insertBefore(list_head, resetButton);   
  console.log(allKeys);
});

function addFields(){
  // Number of inputs to create
  var number = document.getElementById("member").value;
  // Container <div> where dynamic content will be placed
  var container = document.getElementById("container");
  // Clear previous contents of the container
  while (container.hasChildNodes()) {
      container.removeChild(container.lastChild);
  }
  for (i=0;i<number;i++){
      // Append a node with a random text
      container.appendChild(document.createTextNode("Member " + (i+1)));
      // Create an <input> element, set its type and name attributes
      var input = document.createElement("input");
      input.type = "text";
      input.name = "member" + i;
      container.appendChild(input);
      // Append a line break 
      container.appendChild(document.createElement("br"));
  }
}

var clear_button = document.getElementById("reset_button");
clear_button.addEventListener('click', function() {
  chrome.storage.sync.clear(function() {
    console.log("all items cleared");
  })
});


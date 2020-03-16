let page = document.getElementById('buttonDiv');

const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({color: item}, function() {
        console.log('color is ' + item);
      })
    });
    page.appendChild(button);
  }
}
constructOptions(kButtonColors);

chrome.storage.sync.get(null, function(items) {
  var allKeys = Object.keys(items);
  // alert(allKeys["text"])
  console.log(allKeys);
});


// Code to try to display all the "memorized" values onto the html
chrome.storage.sync.get(null, function(items) {
  var allKeys = Object.keys(items);
  // create a new div element 
  var newDiv = document.createElement("div"); 
  // give it some content
  for (let item of Object.values(allKeys)) {
    var newContent = document.createTextNode(item);
    console.log(item); 
    // add the text node to the newly created div
    newDiv.appendChild(newContent);
  };
  // add the newly created element and its content into the DOM 
  var currentDiv = document.getElementById("buttonDiv"); 
  document.body.insertBefore(newDiv, currentDiv);   
  console.log(allKeys);
});


// chrome.storage.sync.get(['Value'], function(result) {
//   alert('Value currently is ' + result["Value"]);
// });
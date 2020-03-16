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

let allKeys;
chrome.storage.sync.get(null, function(items) {
  allKeys = Object.keys(items);
  console.log(typeof allKeys);
  console.log(typeof kButtonColors);
  console.log(allKeys);
});

// function listText() {
//   for (let i=0; i<allKeys.length; i++) {
//   // for (let item of allKeys) {
//     let div = document.createElement('div');
//     div.innerHTML = allKeys[i];
//     // button.addEventListener('click', function() {
//     //   chrome.storage.sync.set({color: item}, function() {
//     //     console.log('color is ' + item);
//     //   })
//     // });
//     page.appendChild(div);
//   }
// }
// listText();


// chrome.storage.sync.get(['Value'], function(result) {
//   alert('Value currently is ' + result["Value"]);
// });
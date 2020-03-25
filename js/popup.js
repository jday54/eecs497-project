let goToReviewPage = document.getElementById('goToReviewPage');

goToReviewPage.onclick = function(element) {
  chrome.tabs.create({'url': "/options.html" } )
};
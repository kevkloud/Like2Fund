// Open a new tab with a given URL.
// Inputs:
//   url: string - url for the tab
function openTab(url) {
    chrome.tabs.create({ url: url})
};
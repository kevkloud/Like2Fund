// Open a new tab with a given URL.
// Inputs:
//   url: string - url for the tab
function openTab(url) {
    chrome.tabs.create({ url: url})
};

function donate(apikey, accountID){
  alert("git here");
  require(['withdrawal'], function(withdrawal){
    var withdrawalAccount = withdrawal.initWithKey(apikey);
    var sampleWithdrawal = "{\"medium\": \"balance\",\"amount\": 10,\"description\": \"test\"}";  
    console.log("[withdrawal - withdraw an account] Response: "+ withdrawalAccount.createWithdrawal(accountID, sampleWithdrawal));
  });   
}


chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  console.log(message);
  donate(message.key, message.acc);
  sendResponse({stat : "complete"});
});
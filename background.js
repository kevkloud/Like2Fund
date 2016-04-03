var database = new Firebase('https://burning-torch-5051.firebaseio.com/');

$.get('https://burning-torch-5051.firebaseio.com/.json', function(success, error) {
  if (success) {
    console.log(success);
  } else {
    console.log(error);
  }
});

database.set({name : "Kevin"});

/*
var data;

database.on("value", function(snapshot) {
  data = snapshot.val();
  console.log(data);
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
*/
// Open a new tab with a given URL.
// Inputs:
//   url: string - url for the tab
function openTab(url) {
    chrome.tabs.create({ url: url})
};

function donate(apikey, senderID, receiverID, fbID) {
  alert("git here");

  let amount = 10; 
  //data.customerIDs[senderID].donationAmount;

  require(['withdrawal'], function(withdrawal){
    var withdrawalAccount = withdrawal.initWithKey(apikey);
    var sampleWithdrawal = "{\"medium\": \"balance\",\"amount\": " + amount + ",\"description\": \"test\"}";  
    console.log("[withdrawal - withdraw an account] Response: " + withdrawalAccount.createWithdrawal(senderID, sampleWithdrawal));
  });

  require(['deposit'], function(deposit) {
    var depositAccount = deposit.initWithKey(apikey);
    var sampleDeposit = "{\"medium\": \"balance\",\"status\": \"completed\", \"amount\": " + amount + ",\"description\": \"Dummy Deposit\"}";
        console.log("[Deposit - New deposit]: " + depositAccount.createDeposit(depositAccount, sampleDeposit));
  });
}

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  console.log(message);
  donate(message.key, message.sender, message.receiver, message.fbID);
  sendResponse({stat : "complete"});
});
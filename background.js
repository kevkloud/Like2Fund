var database = new Firebase('https://burning-torch-5051.firebaseio.com/');

// Open a new tab with a given URL.
// Inputs:
//   url: string - url for the tab

var monetizedPosts = new Firebase('https://burning-torch-5051.firebaseio.com/monetizedPosts');
var database = new Firebase('https://burning-torch-5051.firebaseio.com/');

function openTab(url) {
    chrome.tabs.create({ url: url})
};

function donate(apikey, senderID, receiverID, fbID) {
  console.log("apikey: " + apikey);
  console.log("senderID: " + senderID);
  console.log("receiverID: " + receiverID);
  console.log("fbID: " + fbID);

  $.get('https://burning-torch-5051.firebaseio.com/accountIDs.json', function(success, error) {
    if (success) {
      console.log(success);

      let amount = success[senderID].donationAmount; 

      console.log(amount);

      require(['withdrawal'], function(withdrawal){
        var withdrawalAccount = withdrawal.initWithKey(apikey);
        var sampleWithdrawal = "{\"medium\": \"balance\",\"amount\": " + amount + ",\"description\": \"test\"}";  
        console.log("[withdrawal - withdraw an account] Response: " + withdrawalAccount.createWithdrawal(senderID, sampleWithdrawal));
      });

      require(['deposit'], function(deposit) {
        var depositAccount = deposit.initWithKey(apikey);
        var sampleDeposit = "{\"medium\": \"balance\",\"status\": \"completed\", \"amount\": " + amount + ",\"description\": \"Dummy Deposit\"}";
            console.log("[Deposit - New deposit]: " + depositAccount.createDeposit(receiverID, sampleDeposit));
      });

      let time = Date.now();

      database.child('donations').push({ 'senderID' : senderID, 'receiverID' : receiverID, 'amount' : amount, 'time' : time});
    } else {
      console.log("Firebase get request failed: " + error);
    }
  });
}

chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  console.log(message);
  if (message.meth == "donate"){
    donate(message.key, message.sender, message.receiver, message.fbID);
    sendResponse({stat : "complete"});  
  }
  else if (message.meth == "updateMonetized"){
    var fid = message.fbID;
    var cid = message.acc;
    monetizedPosts.push({'postID' : fid, 'receiverID' : cid});
    sendResponse({stat : "complete"});  
  }
});
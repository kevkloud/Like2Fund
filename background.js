var database = new Firebase('https://burning-torch-5051.firebaseio.com/');

$.get('https://burning-torch-5051.firebaseio.com/.json', function(success, error) {
  if (success) {
    console.log(success);
  } else {
    console.log(error);
  }
});


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

var monetizedPosts = new Firebase('https://burning-torch-5051.firebaseio.com/monetizedPosts');
var database = new Firebase('https://burning-torch-5051.firebaseio.com/');

var data;

database.on("value", function(snapshot) {
  data = snapshot.val();
  console.log(data);
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

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
  if (message.meth == "donate"){
    donate(message.key, message.acc);
    sendResponse({stat : "complete"});  
  }
  else if (message.meth == "updateMonetized"){
    var res;
    $.get('https://burning-torch-5051.firebaseio.com/monetizedPosts.json', function(success, error) {
      if (success) {
        console.log(success);
        if (success[parseInt(message.postId)] != null){
          res = true;    
        }
        else {
          res = false;
        }
      } else {
        console.log(error);
      }
        console.log("res : " + res);
        sendResponse({stat : "complete", isMon : res});
    });
  }
});
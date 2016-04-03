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
  if (message.meth == "donate"){
    //donate(message.key, message.acc);
    sendResponse({stat : "complete"});  
  }
  else if (message.meth == "checkMonetized"){
    var res;
    if (data.monetizedPosts[message.postId] != null){
      res = true;
    }
    else{
      res = false;
    }
    sendResponse({stat : "complete", isMon : res});
    
  }
  
});
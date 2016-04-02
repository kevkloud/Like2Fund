var tab = null;

function setInitialValues(apikey, custID, accID){
  require(['account'], function(account){
        var accounts =  account.initWithKey(apikey);
        $("#account_balance").text('$' + parseFloat(accounts.getAccountById(accID).balance).toFixed(2));
      });
}

$(function() {

  var BG = chrome.extension.getBackgroundPage();

  var apikey = '239143738d067654ff5ed96860e2335b';
  var bank = '5700210e35b13979061e7054';
  var dummyCustomerID = '5700126435b13979061e7048';
  var dummyAccountID = '5700296435b13979061e7069';

  setInitialValues(apikey, dummyCustomerID, dummyAccountID);

  // We need to reload popover in Safari, so that we could
  // update popover according to the status of AdBlock.
  // We don't need to reload popup in Chrome,
  // because Chrome reloads every time the popup for us.
  function closeAndReloadPopup() {
      if (SAFARI) {
          safari.self.hide();
          setTimeout(function() {
              window.location.reload();
          }, 200);
      } else {
          window.close();
      }
  }


  

  $("#account_menu_item").click(function() {
      BG.openTab("../options/index.html");
      closeAndReloadPopup();
  });

  $("#deposit").click(function() {
      require(['account', 'deposit'], function(account, deposit){
        var depositAccount = deposit.initWithKey(apikey);
        var sampleDeposit = "{\"medium\": \"balance\",\"status\": \"completed\", \"amount\": 100,\"description\": \"Dummy Deposit\"}";
        console.log("[Deposit - New deposit]: " + depositAccount.createDeposit(dummyAccountID, sampleDeposit));

        var accounts =  account.initWithKey(apikey);
        $("#account_balance").text('$' + parseFloat(accounts.getAccountById(dummyAccountID).balance).toFixed(2));
      });
  });

});
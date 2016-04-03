let myAccountID = '5700296435b13979061e7069';
let oneHundred = 100;

var accountIDs = new Firebase('https://burning-torch-5051.firebaseio.com/accountIDs');

$.get('https://burning-torch-5051.firebaseio.com/accountIDs.json', function(success, error) {
    if (success) {
      console.log(success);
      var account = success[myAccountID];
      console.log(account);

      document.getElementById("amount-text").value = (account.donationAmount / oneHundred).toFixed(2);
      document.getElementById("age-text").value = account.age;
      document.getElementById("gender-text").value = account.gender;
      document.getElementById("state-text").value = account.location.region;
      document.getElementById("country-text").value = account.location.country;
    } else {
      console.log("Firebase get request failed: " + error);
    }
  });

function saveSettings() {
  accountIDs.child(myAccountID);
}
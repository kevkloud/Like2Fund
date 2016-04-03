
var bank = '5700210e35b13979061e7054';
var dummyCustomerID = '5700126435b13979061e7048';
var dummyAccountID = '5700296435b13979061e7069';
var charityID = '570064289e40c18d0e246907'
let apikey = '239143738d067654ff5ed96860e2335b';
var bank = '5700210e35b13979061e7054';
let dummySenderID = '5700296435b13979061e7069';
let dummyReceiverID = '570064289e40c18d0e246907';
let myProfileID = 'https://www.facebook.com/officialkevkloud?fref=nf';

let defaultFbId = "ThePoob";

function donate(pid){

  $.get('https://burning-torch-5051.firebaseio.com/monetizedPosts.json', function(success, error) {

    if (success) {
      console.log(success);

      var receiverID;

      for (var i in success) {
        if (success[i].postID == pid) {
          receiverID = success[i].receiverID;
        }
      }

      console.log(receiverID);

      chrome.runtime.sendMessage({meth : "donate", key: apikey, sender : dummySenderID, receiver : dummyReceiverID, fbID: pid}, function(response) {
      console.log(response);
      console.log(response.stat);
  });
    } else {
      console.log("Firebase get request failed: " + error);
    }

  });
}

function updateMonetized(pid, cid){
  chrome.runtime.sendMessage({meth : "updateMonetized", acc : cid, fbID: pid}, function(response) {
    console.log(response.stat);
  }); 
}

function checkMonetized(pid, profileID){
  var isMonetized = false;
  var textToAdd = ""; 

  $.get('https://burning-torch-5051.firebaseio.com/monetizedPosts.json', function(success, error) {
    if (success) {

      for (var i in success) {
        if (success[i].postID == pid) {
          isMonetized = true;
        }
      }

      if (isMonetized){
        textToAdd = "Donate";
      }
      else if (profileID === myProfileID) {
        textToAdd = "Monetize";
      }
      var elem = $("#addComment_" + pid).closest(".commentable_item").find("._42nr");
      if (elem.find(".testing").length == 0) {
        elem.append(
        "<span><div class='_khz'>" +
        "<a href='#'><span class='testing'>" + textToAdd + "</span></a></div></span>" );    
      }
    } else {
      console.log(error);
    }
        //sendResponse({stat : "complete", isMon : res});
  });
/*

  chrome.runtime.sendMessage({meth : "checkMonetized", postID : pid}, function(response) {
    console.log(response.stat);
    isMonetized = response.isMon;
    if (isMonetized){
      textToAdd = "Donate";
    }
    else {
      textToAdd = "Monetize";
    }

    if (elem.find(".testing").length == 0) {
      $(this).append(
        "<span><div class='_khz'>" +
        "<a href='#'><span class='testing'>" + textToAdd + "</span></a></div></span>" );    
    }
  }); */
}

function inject(){
    var count = 0;
    
    $("._42nr").each(function() {  
      if ($(this).find(".testing").length == 0) {
        var postDiv = $(this).closest(".commentable_item").find(".UFIAddComment");
        var rawPostID = postDiv.attr("id");
        if (rawPostID != null) {
          var postID = rawPostID.replace("addComment_","");

          var profileDiv = $(this).closest(".userContentWrapper").find("._8s");
          //console.log(profileDiv);
          var profileID = profileDiv.attr("href");
          //console.log(profileID);  

          var elem = $(this);
          checkMonetized(postID, profileID);  
        }
      }
  });
}

var timeout = null;
inject();
document.addEventListener("DOMSubtreeModified", function() {
    if(timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(inject, 1500);
}, false);


$(function(){

  $("body").on('click', '.testing', function(){
      console.log("clicked....");
      //TODO:  only click on the like button if it isnt already 
      //active
      var target = $(this).closest("._42nr").find(".UFILikeLink");
      target.attr('onclick', 'return false;');
      if (target.attr("aria-pressed") === "false"){
        target[0].click();  
      }
      
      var postDiv = $(this).closest(".commentable_item").find(".UFIAddComment");
      var rawPostID = postDiv.attr("id");
      var postID = rawPostID.replace("addComment_","");
      
      if ($(this).text() === "Monetize") {
        console.log("here");
        updateMonetized(postID, charityID);
        $(this).text("Donate");
      }
      else {
        //donate the amount for the specified account
        //TODO: Pass post id so correctly deposit money
        donate(postID);

      }
      
  });

/*
    $("body").on('click', '.UFILikeLink', function(e){
        e.preventDefault;
    });*/
});


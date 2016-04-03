var apikey = '239143738d067654ff5ed96860e2335b';
var bank = '5700210e35b13979061e7054';
var dummyCustomerID = '5700126435b13979061e7048';
var dummyAccountID = '5700296435b13979061e7069';


function donate(pid){
  chrome.runtime.sendMessage({key: apikey, acc : dummyAccountID, fbID: pid}, function(response) {
    console.log(response.stat);
  });
}

function inject(){
    var count = 0;
    $("._42nr").each(function() {  
        count++;
        if ($(this).find(".testing").length == 0) {
            $(this).append(
              "<span><div class='_khz'>" +
              "<a href='#'><span class='testing'> hallo?</span></a></div></span>" );    
        }
    });
}

var timeout = null;
inject();
document.addEventListener("DOMSubtreeModified", function() {
    if(timeout) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(inject, 1000);
}, false);


$(function(){

  $("body").on('click', '.testing', function(){
      console.log("clicked....");
      //TODO:  only click on the like button if it isnt already 
      //active
      var target = $(this).closest("._42nr").find(".UFILikeLink");
      target.attr('onclick', 'return false;');
      target[0].click();
      
      //donate the amount for the specified account
      //TODO: Pass post id so correctly deposit money
      var postDiv = $(this).closest(".commentable_item").find(".UFIAddComment");
      var rawPostID = postDiv.attr("id");
      var postID = rawPostID.replace("addComment_","");

      donate(postID);
  });

/*
    $("body").on('click', '.UFILikeLink', function(e){
        e.preventDefault;
    });*/
});


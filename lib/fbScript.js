var database = new Firebase('https://burning-torch-5051.firebaseio.com/');

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
        var target = $(this).closest("._42nr").find(".UFILikeLink");
        target.attr('onclick', 'return false;');
        target[0].click();
        /*$(this).closest("._42nr").find(".UFILikeLink")[0].click();*/
    });

/*
    $("body").on('click', '.UFILikeLink', function(e){
        e.preventDefault;
    });*/
});


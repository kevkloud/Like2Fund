$(document).ready(function(){


    var id = 'X7PTHY-4AJ4TWH2JA'
    var input = "plot%20%7B%7B1%2C%202%7D%2C%20%7B3%2C%204%7D%2C%20%7B4%2C%203%7D%7D"
    var list = $('dl')
    $.ajax({
        
        type: 'GET',
        url: 'http://api.wolframalpha.com/v2/query?input='+input+'&format=image&appid='+id,
        dataType: 'xml',
        success: xmlParse
    });

    function xmlParse(xml){
        $('#load').fadeOut();

        $(xml).find('subpod').each(function(){

            var b = $(this).find('img').each(function(index, element){
                var label = (new XMLSerializer()).serializeToString(element);
                var tag = '<div class="subpod">' + label + '</div>';
                console.log(tag)
                $("#graphs").append(tag);
            });
            $(".subpod").fadeIn(1000);

        });
    }



});
$(document).ready(function() {
  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId: '1732064593678722',
      version: 'v2.5' // or v2.0, v2.1, v2.2, v2.3
    });     
    
    FB.api(
      "/{post-id}",
      function (response) {
        if (response && !response.error) {
          console.log(response);
        }
      }
    );
  });
});
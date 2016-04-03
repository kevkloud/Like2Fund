


$(function() {
  $("#map").hide();
   $("#map-1").attr("value", "false");
   $("#info-1").attr("value", "true");


  console.log("started");
  $("#info-1").click(function(){
    console.log("info clicked");
    if ($(this).attr("value") === "false"){
      console.log("switching to info");
      $(this).attr("value", "true");
      $("#map-1").attr("value", "false");
      $("#map").hide();
      $("#media-1").show();
    }
  });

  $("#map-1").click(function(){
    console.log("map clicked");
    console.log($(this).attr("value"));
    
    if ($(this).attr("value") === "false"){
      console.log("switching to map");
      $(this).attr("value", "true");
      $("#info-1").attr("value", "false");
      $("#media-1").hide();
      $("#map").show();
    }
  });
});


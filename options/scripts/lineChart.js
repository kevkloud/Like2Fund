function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

$.get('https://burning-torch-5051.firebaseio.com/donations.json', function(success, error) {

    if (success) {

      var amounts = [];

      for (var i in success) {
          amounts.push(success[i].amount);
      }

    var totals = new Array(amounts.length)
    var readTime = new Array(amounts.length)
    var count = 0
    var date = 3

    for (i = 0; i < amounts.length; i++) {
        count += amounts[i];
        date += 1
        totals[i] = count;
        var d = "April " + date + "th"
        readTime[i] = d;
    }
    

    if (readTime.length >= 6) {
        var n = readTime.length;
        var readTime = readTime.slice(n - 6, n);
        var totals = totals.slice(n - 6, n);
        var amounts = amounts.slice(n-6, n);

    }
    var data = {
        labels: readTime,
        datasets: [
            {
                label: "Total Cash Raised",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: totals
            },
            {
                label: "Daily Cash",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: amounts
            }
        ]
    };
    var context = document.getElementById('linechart').getContext('2d');
    var skillsChart = new Chart(context).Line(data, {
        scaleShowHorizontalLines: false
    });

}});
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
                fillColor: "rgba(232,137,137,0)",
                strokeColor: "rgba(232,137,137,1)",
                pointColor: "rgba(232,137,137,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(232,137,137,1)",
                data: totals
            },
            {
                label: "Daily Cash",
                fillColor: "rgba(109,158,225,0)",
                strokeColor: "rgba(109,158,225,1)",
                pointColor: "rgba(109,158,225,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(109,158,225,1)",
                data: amounts
            }
        ]
    };
    var context = document.getElementById('linechart').getContext('2d');
    var skillsChart = new Chart(context).Line(data, {
        scaleShowHorizontalLines: false,
        scaleFontFamily : "'Ubuntu'",
        pointLabelFontFamily: "'Ubuntu'"
    });

}});
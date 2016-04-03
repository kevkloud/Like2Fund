$.get('https://burning-torch-5051.firebaseio.com/donations.json', function(success, error) {

    if (success) {

      var amounts = [];

      for (var i in success) {
          amounts.push(success[i].amount);
      }

    var totals = new Array(amounts.length)
    var nAmounts = new Array(amounts.length)
    var readTime = new Array(amounts.length)
    var count = 0.0
    var date = -10

    for (i = 0; i < amounts.length; i++) {
        count += amounts[i];
        date += 1
        totals[i] = count/100;
        nAmounts[i] = amounts[i]/100.0;
        var d = "Apr " + date
        readTime[i] = d;
    }
    

    if (readTime.length >= 6) {
        var n = readTime.length;
        var readTime = readTime.slice(n - 6, n);
        var totals = totals.slice(n - 6, n);
        var amounts = nAmounts.slice(n-6, n);

    }
    var data = {
        labels: readTime,
        datasets: [
            {
                label: "Total Cash Raised",
                fillColor: "rgba(180,180,180,0)",
                strokeColor: "rgba(180,180,180,0.8)",
                highlightFill: "rgba(180,180,180,0.75)",
                highlightStroke: "rgba(180,180,180,1)",
                data: totals
            },
            {
                label: "Daily Cash",
                fillColor: "rgba(151,187,205,0)",
                strokeColor: "rgba(151,187,205,0.8)",
                highlightFill: "rgba(151,187,205,0.75)",
                highlightStroke: "rgba(151,187,205,1)",
                data: amounts
            }
        ]
    };
    var context = document.getElementById('linechart').getContext('2d');
    var skillsChart = new Chart(context).Line(data, {
        scaleShowHorizontalLines: false,
        scaleFontFamily : "'Ubuntu'",
        pointLabelFontFamily: "'Ubuntu'",
        scaleIntegersOnly: false
    });

}});
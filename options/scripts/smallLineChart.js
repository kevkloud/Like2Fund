

var amounts = []

for (i = 0; i < 6; i++) {
    amounts.push(Math.floor(Math.random() * 10))
}

var totals = new Array(amounts.length);
var readTime = new Array(amounts.length);
var nAmounts = new Array(amounts.length);
var count = 0;
var date = -10;

for (i = 0; i < amounts.length; i++) {
    count += amounts[i];
    date += 1;
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
var context = document.getElementById('linechart-small').getContext('2d');
var skillsChart = new Chart(context).Line(data, {
        scaleShowHorizontalLines: false,
        scaleFontFamily : "'Ubuntu'",
        pointLabelFontFamily: "'Ubuntu'"
});

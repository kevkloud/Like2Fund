var data = [
    {
        value: 54,
        color:"#E88989",
        highlight: "#E86D6D",
        label: "Female"
    },
    {
        value: 42,
        color: "#6D9EE1",
        highlight: "#5889CC",
        label: "Male"
    },
    {
        value: 5,
        color: "#BDBDBD",
        highlight: "#A6A6A6",
        label: "Unreported"
    }
];
var context = document.getElementById('piechart').getContext('2d');
var skillsChart = new Chart(context).Doughnut(data, {
        scaleFontFamily : "'Ubuntu'",
        pointLabelFontFamily: "'Ubuntu'",
        tooltipTitleFontFamily: "'Ubuntu', 'Ubuntu', 'Ubuntu', sans-serif",
        animationSteps: 60,
        animationEasing: "easeOutBounce",
        segmentStrokeColor : "#dfdfdf",
});

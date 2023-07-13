
var w = 1000;
var h = 600;
var rad = 20;
var margin = 100;

var canvas = d3.select("#canvas")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lightgray");

var birthDay = [
    { name: "Dogan", day: 1, month: 10, yr: 21, gender: "male" },
    { name: "Annelie", day: 11, month: 9, yr: 29, gender: "female" },
    { name: "Mark", day: 12, month: 3, yr: 55, gender: "male" },
    { name: "Joe Biden", day: 18, month: 6, yr: 82, gender: "male" },
    { name: "Jens", day: 18, month: 6, yr: 98, gender: "male" }
];

var gennemsnitMand = 79.3
var gennemsnitKvinde = 83.2

var maxYear = Math.max.apply(Math, birthDay.map(function (b) { return b.yr; }));
console.log(maxYear)

var rScale = d3.scaleLinear()
    .domain([0, maxYear]) // This shows the limits - input
    .range([0, maxYear]) // Output

var xScale = d3.scaleLinear()
    .domain([0, birthDay.length-1]) // This shows the limits - input
    .range([margin, w - margin]) // Output

var spacing = 50
var heightOfAlmostEverything = 200
var circles = canvas.selectAll("circle")
    .data(birthDay)
    .join("circle")
    .attr("cx", function (d, i) {
        return xScale(i);
    })
    .attr("cy", heightOfAlmostEverything)
    .attr("r", function (d) {
        return rScale(d.yr)
    })
    .attr("fill", "lightgreen")
    .attr("fill", function(d) {
        if (d.yr > gennemsnitMand){
            return "pink"
        }
        return "lightgreen"
    })

var outerCircles = canvas.selectAll("outerCircle")
    .data(birthDay)
    .join("circle")
    .attr("class", "outerCircle")
    .attr("cx", function (d, i) {
        return xScale(i);
    })
    .attr("cy", heightOfAlmostEverything)
    .attr("r", function (d) {

        if (d.gender == "female") {
            return gennemsnitKvinde;
        } else if (d.gender == "male") {
            return gennemsnitMand;
        }

    })
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 3);

var text = canvas.selectAll("text")
    .data(birthDay)
    .join("text")
    .attr("x", function (d, i) {
        return xScale(i);
    })
    .attr("y", heightOfAlmostEverything)
    .text(function (d) {
        return d.name;
    })
    .attr("font-family", "Indie Flower")
    .attr("font-size", "12px")
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle");


function addText (x, y, text, font, font_size, text_anchor, fill) {
    canvas.append("text")
    .attr("x", x)
    .attr("y", y)
    .text(text)
    .attr("font-family", font)
    .attr("font-size", font_size)
    .attr("text-anchor", text_anchor)
    .attr("fill", fill)
}

addText(w/2, heightOfAlmostEverything-125, 
"Age represented in circles",
"Indie Flower",
"48px",
"middle",
"black"
)

addText(w/2, heightOfAlmostEverything+200, 
"Different circle meanings",
"Indie Flower",
"48px",
"middle",
"black"
)
addText(25, heightOfAlmostEverything+275, 
"Outer Circle: Expected Life Expectancy",
"Indie Flower",
"32px",
"left",
"black"
)

addText(25, heightOfAlmostEverything+325, 
"Green & Pink circle: Actual age",
"Indie Flower",
"32px",
"left",
"black"
)


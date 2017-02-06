var d3 = require("../external/d3.min.v4.js"),
    json_config = require("../config/config.js");

require("../external/sankey.js");

function PredictionGraph(svg, reactor) {

    var thisResult = this;

    thisResult.svgtext = svg;
    thisResult.aspect = [0, 0, 1200, 800];

    thisResult.svg = svg.append("svg")
        .attr("viewBox", thisResult.aspect[0] + " " +
            thisResult.aspect[1] + " " +
            thisResult.aspect[2] + " " +
            thisResult.aspect[3])
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("visibility", "hidden");


    thisResult.start = 0;
    thisResult.queryNumber = 1;

    thisResult.reactor = reactor;
    thisResult.reactor.addEventListener('query_successful', thisResult.updateResult.bind(this));
}

PredictionGraph.prototype.updateResult = function (graph) {

    var thisResult = this;

    var units = "individuals";

    var formatNumber = d3.format(",.0f"),    // zero decimal places
        format = function (d) {
            return formatNumber(d) + " " + units;
        };

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var width = 1200 - 20;
    var height = 800 - 20;

    // House keeping
    this.svg.attr("visibility", "visible");
    this.svg.select("*").remove();
    var svg = this.svg.append("g");

    // Makes Sankey Diagram
    var my_sankey = d3.sankey()
        .nodeWidth(35)
        .nodePadding(10)
        .size([width, height]);

    var path = my_sankey.link();

    my_sankey.nodes(graph.nodes)
        .links(graph.links)
        .layout(32);

    // add in the links
    var link = svg.append("g").selectAll(".link")
        .data(graph.links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", path)
        .style("stroke-width", function (d) {
            return Math.max(10, d.dy);
        })
        .sort(function (a, b) {
            return b.dy - a.dy;
        });

    // --- LINK TITLES ---
    link.append("title")
        .text(function (d) {
            return d.source.name + " → " +
                d.target.name + "\n" + format(d.value);
        });

    link.each(function (p) {
        if (p.target.name == "None") {
            d3.select(this)
                .attr("visibility", "hidden");
        }
    });


    // --- NODES TITLES ---
    var node = svg.append("g").selectAll(".node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .on("start", function () {
            this.parentNode.appendChild(this);
        });
    // --- NODE RECTANGLES ---
    node.append("rect")
        .attr("height", function (d) {
            return d.dy;
        })
        .attr("width", my_sankey.nodeWidth())
        .on("mousedown", function (d) {
            console.log(d);
            console.log(this);
        })
        .style("fill", function (d) {
            return d.color = color(d.name.replace(/ .*/, ""));
        })
        .style("stroke", function (d) {
            return d3.rgb(d.color).darker(2);
        })
        .append("title")
        .text(function (d) {
            return d.name + "\n" + format(d.value) + "\n" + format(d.rr);
        });


    // add in the title for the nodes
    node.append("text")
        .attr("x", -6)
        .attr("y", function (d) {
            return d.dy / 2;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .attr("transform", null)
        .text(function (d) {
            return d.name;
        })
        .filter(function (d) {
            return d.x < width / 2;
        })
        .attr("x", 6 + my_sankey.nodeWidth())
        .attr("text-anchor", "start");

    node.each(function (p) {
        if (p.name == "None") {
            d3.select(this)
                .attr("visibility", "hidden");
        }
    });


};

module.exports = PredictionGraph;
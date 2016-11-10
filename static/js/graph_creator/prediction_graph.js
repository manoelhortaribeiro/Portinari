var d3 = require("../external/d3.min.v4.js"),
    json_config = require("../config.js");

require("../external/sankey.js");

function PredictionGraph(svg1, svg2, reactor) {

    var thisResult = this;

    thisResult.config = json_config.VIEW_PREDICTION_GRAPH;

    thisResult.svg1text = svg1;
    thisResult.svg2text = svg2;

    thisResult.svg1 = svg1.append("svg")
        .classed("shadow-box", true)
        .classed("grid-svg", true)
        .attr("width", "900px")
        .attr("height", "825px")
        .attr("visibility", "hidden");

    thisResult.svg2 = svg2.append("svg")
        .classed("shadow-box", true)
        .classed("grid-svg", true)
        .attr("width", "900px")
        .attr("height", "825px")
        .attr("visibility", "hidden");

    thisResult.svg = null;
    thisResult.svgtext = null;

    thisResult.start = 0;
    thisResult.queryNumber = 1;

    thisResult.reactor = reactor;
    thisResult.reactor.addEventListener('query_successful', thisResult.updateResult.bind(this));
}

PredictionGraph.prototype.updateResult = function (graph) {

    var thisResult = this;

    var width = parseInt(d3.select("#query-results1 svg").attr("width")) - 10;
    var height = parseInt(d3.select("#query-results1 svg").attr("height")) - 10;

    if (thisResult.start == 0) {
        this.svg = this.svg1;
        this.svgtext = this.svg1text;
    }
    else {
        this.svg = this.svg2;
        this.svgtext = this.svg2text;
    }


    this.svgtext.select("p").remove();

    this.svgtext.insert("p", ":first-child")
        .text("query: " + this.queryNumber.toString() +
              ", attr: "  + graph.pred_attr.toString() +
              ", steps: " + graph.future_nodes.toString() +
              ", time range: [" + graph.begin_date.toString() + "," + graph.end_date.toString() + "]");

    this.svg.attr("visibility","visible");
    this.svg.select("*").remove();

    var svg = this.svg.append("g");

    var sankey = d3.sankey()
        .nodeWidth(25)
        .nodePadding(20)
        .size([width, height]);

    var path = sankey.link();

    sankey.nodes(graph.nodes)
        .links(graph.links)
        .layout(32);

    var units = "individuals";

    var formatNumber = d3.format(",.0f"),    // zero decimal places
        format = function (d) {
            return formatNumber(d) + " " + units;
        };

    // add in the links
    var link = svg.append("g").selectAll(".sankey_link")
        .data(graph.links)
        .enter()
        .append("path")
        .attr("class", "sankey_link")
        .attr("d", path)
        .style("stroke-width", function (d) {
            return Math.max(1, d.dy);
        }).sort(function (a, b) {
            if (a.target.name == -1 || a.source.name == -1) {
                return -1;
            }
            else if (b.target.name == -1 || b.source.name == -1) {
                return 1;
            }
            else {
                return b.dy - a.dy;
            }
        });

    // link.each(function (p) {
    //     if (p.target.name == -1) {
    //         d3.select(this)
    //             .attr("visibility", "hidden");
    //     }
    // });

    // add the link titles
    link.append("title")
        .text(function (d) {
            var array = d.source.sourceLinks;
            var value = 0;
            var last = 0;
            array.forEach(function (p) {
                value += p.value;
                if (p.target.name == -1) {
                    last += p.value;
                }
            });
            console.log(d.source.sourceLinks);
            console.log(value);
            console.log(last);

            var round_abs = Math.round((d.value / value) * 10000) / 100;
            var round_rel = Math.round((d.value / (value - last)) * 10000) / 100;


            return thisResult.config.display[d.source.name.toString()].text + " → " +
                thisResult.config.display[d.target.name.toString()].text + "\n" + format(d.value) + "\n" +
                "(" + round_abs + "% of total) \n" +
                "(" + round_rel + "% of taken exams)";
        });

    // add in the nodes
    var node = svg.append("g").selectAll(".sankey_node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "sankey_node")
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    // add the rectangles for the nodes
    node.append("rect")
        .attr("height", function (d) {
            return d.dy;
        })
        .attr("width", sankey.nodeWidth())
        .style("fill", function (d) {
            return d.color = thisResult.config.display[d.name.toString()].color;
        })
        .style("stroke", function (d) {
            return d3.rgb(d.color).darker(2);
        })
        .append("title")
        .text(function (d) {
            var value = 0;
            var last = 0;
            var array = [];
            var aux = false;
            if (d.sourceLinks.length == 0) {
                array = d.targetLinks;
            }
            else {
                array = d.sourceLinks;
                aux = true;
            }

            if (d.name == -2){
                aux = false;
            }

            array.forEach(function (p) {
                value += p.value;
                if (p.target.name == -1) {
                    last += p.value;
                }
            });

            var round = Math.round((last / value) * 10000) / 100;
            var title = "";

            title += thisResult.config.display[d.name.toString()].text;
            title += "\n";
            title += value.toString() + " Individuals \n";
            if (aux == true) {
                title += last.toString() + " didn't follow up (" + round.toString() + "%)";
            }

            return title;
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
            return thisResult.config.display[d.name.toString()].text;
        })
        .filter(function (d) {
            return d.x < width / 2;
        })
        .attr("x", 6 + sankey.nodeWidth())
        .attr("text-anchor", "start");

    // node.each(function (p) {
    //     if (p.name == -1) {
    //         d3.select(this)
    //             .attr("visibility", "hidden");
    //     }
    // });

    this.start = (this.start + 1) % 2;
    this.queryNumber += 1;
};

module.exports = PredictionGraph;
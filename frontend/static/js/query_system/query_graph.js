var d3 = require("../external/d3.min.v4.js"),
    $ = require("../external/jquery.min.js"),
    utils = require("./utils.js"),
    json_config = require("../config/config.js"),
    graph = require("./graph.js");

function QueryGraph(query_interface_selection, reactor) {

    var QG = this;

    QG.config = json_config.QUERY_SYSTEM;

    QG.graph = new graph.Graph();

    QG.graph.setMatching(QG.config.matchingDefault());

    /* Initializes the svg */
    QG.aspect = [0, 0, QG.config.svgWidth(), QG.config.svgHeight()];
    QG.svg = query_interface_selection.append("svg")
        .attr("id", "query-graph-svg")
        .attr("width", QG.aspect[2])
        .attr("height", QG.aspect[3]);

    $(window).resize(function () {
        QG.aspect = [0, 0, QG.config.svgWidth(), QG.config.svgHeight()];
        d3.select("#query-graph-svg")
            .attr("width", QG.aspect[2])
            .attr("height", QG.aspect[3])
    });

    QG.svgG = QG.svg.append("g").classed(QG.config.graphClass, true);   // graph
    QG.svgG.append("g").classed(QG.config.nodesClass, true);            // nodes
    QG.svgG.append("g").classed(QG.config.innerTextNodeClass, true);    // node text
    QG.svgG.append("g").classed(QG.config.outerTextNodeClass, true);    // node constraint text
    QG.svgG.append("g").classed(QG.config.edgesClass, true);            // edges
    QG.svgG.append("g").classed(QG.config.innerTextEdgeClass, true);    // edge text
    QG.svgG.append("g").classed(QG.config.outerTextEdgeClass, true);    // edge constraint text


    QG.svg.append('svg:defs').append('svg:marker').attr('id', 'end-arrow').attr('viewBox', '0 -5 10 10')
        .attr('refX', 8.5).attr('markerWidth', 3.5).attr('markerHeight', 3.5).attr('orient', 'auto')
        .append('svg:path').attr('d', 'M0,-5L10,0L0,5');

    /* Effects */


    d3.select(window).on("keydown", function () {
        if (d3.event.shiftKey) {
            QG.svgKeyDown.call(QG);
        }
    });

    QG.nodeAdder();

    QG.drag = d3.drag().on("drag", function (d) {

        var tmp_x = d.x + d3.event.dx,
            tmp_y = d.y + d3.event.dy,
            radius = QG.config.nodeRadius,
            aspect = QG.aspect,
            nodes = QG.graph.nodes,
            node = d;

        var can_move = utils.canDo(tmp_x, tmp_y, radius, aspect, nodes, node);

        if (can_move) {
            d.x += d3.event.dx;
            d.y += d3.event.dy;
            QG.updateGraph();
        }
    });

    QG.graph.addNode([QG.aspect[2] / 2, QG.aspect[3] / 2]);
    QG.updateGraph();

    /* Binds events to the reactor */
    QG.reactor = reactor;
    QG.reactor.addEventListener('update_graph', this.updateGraph.bind(this));
    QG.reactor.addEventListener('matching_changed', this.graph.setMatching.bind(this.graph));
}

QueryGraph.prototype.nodeAdder = function () {

    var QG = this;

    QG.svg.append("circle")
        .attr("id", "tst")
        .attr("r", 15)
        .attr("color", "#121212")
        .attr("transform", "translate(20,20)")
        .call(d3.drag()
            .on("drag", function (d) {
                QG.svg.select("#tst")
                    .attr("transform", "translate(" + d3.event.x + "," + d3.event.y + ")");
            })
            .on("end", function (d) {
                QG.svg.select("#tst").remove();
                QG.nodeAdder();
                var can_create = utils.canDo(d3.event.x, d3.event.y, QG.config.nodeRadius, QG.aspect, QG.graph.nodes);
                if (can_create){
                    QG.graph.addNode([d3.event.x, d3.event.y]);
                }
                QG.updateGraph();
            }));
};

QueryGraph.prototype.nodeMouseDown = function (svg_element) {
    var QG = this;
    d3.event.stopPropagation();
    var p_selected = d3.select(".selected").data();

    if (d3.event.shiftKey && p_selected.length != 0) {
        var n_selected = d3.select(svg_element).data();

        var aux = QG.graph.edges.filter(function (a) {
            return ((a.source == p_selected[0].name) &&
                (a.destination == n_selected[0].name)) ||
                ((a.source == n_selected[0].name) &&
                (a.destination == p_selected[0].name))
        });

        if (aux.length == 0 && p_selected[0].name != n_selected[0].name) {
            if (d3.event.ctrlKey) {
                QG.graph.addEdge(p_selected[0], n_selected[0], "undirected");
            }
            else {
                QG.graph.addEdge(p_selected[0], n_selected[0], "directed");
            }
            QG.updateGraph();

        }
    }
    else {
        QG.replaceSelected(svg_element);
    }
};

QueryGraph.prototype.edgeMouseDown = function (svg_element) {
    var QG = this;
    d3.event.stopPropagation();
    QG.replaceSelected(svg_element);
};

QueryGraph.prototype.svgKeyDown = function () {
    var QG = this;
    var nodes = QG.graph.nodes;
    var edges = QG.graph.edges;

    switch (d3.event.keyCode) {
        case QG.config.delete:
            // - deletes a node/edge -
            var selected = d3.select(".selected").data();
            if (selected.length == 0) {
                break;
            }
            var sel_id = selected[0].id;
            nodes = nodes.filter(function (a) {
                return a.id !== sel_id
            });
            edges = edges.filter(function (a) {
                return (a.id !== sel_id) &&
                    (a.src.id !== sel_id) &&
                    (a.dst.id !== sel_id);
            });

            QG.graph.nodes = nodes;
            QG.graph.edges = edges;
            QG.graph.selectedSvgID = -1;
            QG.updateGraph();
            QG.reactor.dispatchEvent("selected_node_changed", undefined);
    }
};

QueryGraph.prototype.replaceSelected = function (svg_element) {
    var QG = this;
    var svg_d = d3.select(svg_element).data()[0];
    var svg_id = svg_d.id;
    d3.select(".selected").classed("selected", false);
    d3.select(svg_element).classed("selected", true);
    QG.graph.selectedSvgID = svg_id;

    QG.reactor.dispatchEvent("selected_node_changed", svg_d);
};

QueryGraph.prototype.updateGraph = function () {

    var QG = this;

    // -- Nodes --
    var nodes = QG.svg
        .select("g." + QG.config.nodesClass)
        .selectAll("g." + QG.config.nodeClass);
    var data = QG.graph.nodes;
    // - enter
    var aux = nodes.data(data, function (d) {
        return d.name;
    }).enter()
        .append("g")
        .classed(QG.config.nodeClass, true)
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .on("mousedown", function (d) {
            QG.nodeMouseDown(this)
        })
        .call(QG.drag);
    aux.append("circle")
        .attr("r", String(QG.config.nodeRadius));

    // - update
    nodes.data(data, function (d) {
        return d.name;
    })
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    // - exit
    nodes.data(data, function (d) {
        return d.name;
    })
        .exit()
        .remove();

    // -- InText/Nodes--
    var text = QG.svg
        .select("g." + QG.config.innerTextNodeClass)
        .selectAll("text");
    var data = QG.graph.nodes;
    // -- enter
    var aux = text.data(data, function (d) {
        return d.name;
    }).enter()
        .append("text")
        .attr("x", function (d) {
            return d.x
        })
        .attr("y", function (d) {
            return d.y
        })
        .attr("text-anchor", "middle")
        .text(function (d) {
            return "#node" + d.id;
        });
    // -- update
    text.data(data, function (d) {
        return d.name;
    }).attr("x", function (d) {
        return d.x
    }).attr("y", function (d) {
        return d.y
    }).text(function (d) {
        return "#node" + d.id;
    });
    // -- exit
    text.data(data, function (d) {
        return d.name;
    }).exit()
        .remove();

    // -- OutText/Nodes --
    var text = QG.svg
        .select("g." + QG.config.outerTextNodeClass)
        .selectAll("text");
    var data = QG.graph.nodes;
    // -- enter
    var aux = text.data(data, function (d) {
        return d.name;
    }).enter()
        .append("text")
        .attr("x", function (d) {
            return d.x
        })
        .attr("y", function (d) {
            return d.y
        })
        .attr("text-anchor", "middle");

    // -- update
    var aux = text.data(data, function (d) {
        return d.name;
    }).attr("x", function (d) {
        return d.x
    })
        .attr("y", function (d) {
            return d.y + 50
        })
        .html(function (d) {
            var string = "";
            var x = d.x;
            d.key_op_value.forEach(function (d) {
                string += "<tspan x=" + x + " dy=\"1.2em\">" + d[0] + d[1] + d[2] + "<\/tspan>";
            });
            return string;
        });
    // -- exit
    text.data(data, function (d) {
        return d.name;
    }).exit()
        .remove();

    // -- Edges --
    var edges = QG.svg
        .select("g." + QG.config.edgesClass)
        .selectAll("g." + QG.config.edgeClass);
    var data = QG.graph.edges;
    // - enter
    var aux = edges.data(data, function (d) {
        return d.name;
    }).enter()
        .append("g")
        .classed(QG.config.edgeClass, true)
        .on("mousedown", function (d) {
            QG.edgeMouseDown(this)
        });
    aux.append("path")
        .style('marker-end', function (d) {
            if (d.kind == "directed") {
                return 'url(#end-arrow)'
            }
            else return 'none';
        })
        .attr("d", function (d) {
            return utils.calcEdgePath(d, QG.config.nodeRadius);
        })
        .classed("link", true);
    // - update
    edges.data(data, function (d) {
        return d.name;
    })
        .selectAll("path")
        .attr("d", function (d) {
            return utils.calcEdgePath(d, QG.config.nodeRadius);
        });
    // - exit
    edges.data(data, function (d) {
        return d.name;
    })
        .exit()
        .remove();

    // -- OutText/Edges --
    var text = QG.svg
        .select("g." + QG.config.outerTextEdgeClass)
        .selectAll("text");
    var data = QG.graph.edges;
    var modifier = 15;
    // -- enter
    var aux = text.data(data, function (d) {
        return d.name;
    }).enter()
        .append("text")
        .attr("x", function (d) {
            return utils.calcTextEdgePath(d, QG.config.nodeRadius, modifier)[0];
        })
        .attr("y", function (d) {
            return utils.calcTextEdgePath(d, QG.config.nodeRadius, modifier)[1];
        })
        .attr("text-anchor", "middle");

    // -- update
    var aux = text.data(data, function (d) {
        return d.name;
    }).attr("x", function (d) {
        return utils.calcTextEdgePath(d, QG.config.nodeRadius, modifier)[0];
    })
        .attr("y", function (d) {
            return utils.calcTextEdgePath(d, QG.config.nodeRadius, modifier)[1];
        })
        .html(function (d) {
            var string = "";
            var x = utils.calcTextEdgePath(d, QG.config.nodeRadius, modifier)[0].toString();
            d.key_op_value.forEach(function (d) {
                string += "<tspan x=" + x + " dy=\"1.2em\">" + d[0] + d[1] + d[2] + "<\/tspan>";
            });
            return string;
        });
    // -- exit
    text.data(data, function (d) {
        return d.name;
    }).exit()
        .remove();
};

module.exports = QueryGraph;

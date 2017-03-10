var d3 = require("../external/d3.min.v4.js"),
    utils = require("./utils.js"),
    json_config = require("../config/config.js");

function QueryGraph(query_interface_selection, reactor) {

    var QG = this;

    /* Loads the config file */
    QG.config = json_config.QUERY_SYSTEM;

    /* Binds events to the reactor */
    QG.reactor = reactor;
    QG.reactor.addEventListener('update_graph', this.updateGraph.bind(this));
    QG.reactor.addEventListener('constraint_added', this.getElement.bind(this));
    QG.reactor.addEventListener('outcome_added', this.getGraph.bind(this));
    QG.reactor.addEventListener('global_added', this.getGraph.bind(this));
    QG.reactor.addEventListener('matching_changed', this.changeMatching.bind(this));

    /* Initializes the query graph model */
    QG.idct = 0;
    QG.graph = {};
    QG.graph.nodes = [];
    QG.graph.edges = [];
    QG.selectedSvgID = -1;
    QG.graph.future_nodes = 0;
    QG.graph.prediction_attr = "None";
    QG.graph.id_attr = "None";
    QG.graph.outcome_key_op_value = [];
    QG.graph.outcome_display_value = [];
    QG.graph.global_key_op_value = [];
    QG.graph.global_display_value = [];
    QG.aspect = [0, 0, QG.config.svgWidth, QG.config.svgHeight];
    QG.graph.matching = QG.config.matchingDefault();

    /* Initializes the svg */
    QG.svg = query_interface_selection.append("svg")
        .attr("viewBox", QG.aspect[0] + " " + QG.aspect[1] + " " + QG.aspect[2] + " " + QG.aspect[3])
        .attr("preserveAspectRatio", "xMinYMin meet"); // svg

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

    QG.svg.on("mousedown", function (d) {
        QueryGraph.prototype.svgMouseDown.call(QG);
    });

    d3.select(window).on("keydown", function () {
        if (d3.event.shiftKey) {
            QG.svgKeyDown.call(QG);
        }
    });

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

    QG.addNode([QG.aspect[2] / 2, QG.aspect[3] / 2]);
}

QueryGraph.prototype.addNode = function (coordinates) {
    var QG = this;
    var node = new utils.Node(coordinates, QG.idct);
    QG.graph.nodes.push(node);
    QG.idct += 1;
    QG.updateGraph();
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
                QG.addEdge(p_selected[0], n_selected[0], "undirected");
            }
            else {
                QG.addEdge(p_selected[0], n_selected[0], "directed");
            }
        }
    }
    else {
        QG.replaceSelected(svg_element);
    }
};

QueryGraph.prototype.addEdge = function (src, dst, kind) {
    var QG = this;
    var edge = new utils.Edge(src, dst, QG.idct, kind);
    QG.graph.edges.push(edge);
    QG.idct += 1;
    QG.updateGraph();
};

QueryGraph.prototype.edgeMouseDown = function (svg_element) {
    var QG = this;
    d3.event.stopPropagation();
    QG.replaceSelected(svg_element);
};

QueryGraph.prototype.svgMouseDown = function () {
    var QG = this;
    if (d3.event.shiftKey) {
        var coordinates = d3.mouse(QG.svg.node());

        var tmp_x = coordinates[0],
            tmp_y = coordinates[1],
            radius = QG.config.nodeRadius,
            aspect = QG.aspect,
            nodes = QG.graph.nodes;

        var can_create = utils.canDo(tmp_x, tmp_y, radius, aspect, nodes);

        if (can_create) {
            QG.addNode(coordinates);
        }
    }
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
            QG.selectedSvgID = -1;
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
    QG.selectedSvgID = svg_id;

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

QueryGraph.prototype.getGraph = function () {
    var QG = this;
    return QG.graph;
};

QueryGraph.prototype.getElement = function () {
    var element = d3.select(".selected").data()[0];
    return element;
};

QueryGraph.prototype.changeMatching = function (new_matching) {
    var QG = this;
    QG.graph.matching = new_matching;
};

module.exports = QueryGraph;

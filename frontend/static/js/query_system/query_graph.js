var d3 = require("../external/d3.min.v4.js"),
    utils = require("./utils.js"),
    json_config = require("../config/config.js"),
    graph = require("./graph.js");

function GC(query_interface_selection, reactor) {

    var GQ = this;

    // -- Config
    GQ.config = json_config.QUERY_SYSTEM;

    GQ.graph = new graph.Graph();
    GQ.graph.setMatching(GQ.config.matchingDefault());


    GQ.aspect = [0, 0, screen.width * 0.7, screen.height * 0.6];

    // svg
    GQ.svg = query_interface_selection.append("svg")
        .attr("viewBox", GQ.aspect[0] + " " + GQ.aspect[1] + " " + GQ.aspect[2] + " " + GQ.aspect[3])
        .attr("preserveAspectRatio", "xMinYMin meet");

    GQ.svgG = GQ.svg.append("g").classed(GQ.config.graphClass, true);
    GQ.vis_nodes = GQ.svgG.append("g").classed(GQ.config.nodesClass, true);
    GQ.vis_edges = GQ.svgG.append("g").classed(GQ.config.edgesClass, true);
    GQ.vis_node_text = GQ.svgG.append("g").classed(GQ.config.innerTextNodeClass, true);
    GQ.vis_edge_text = GQ.svgG.append("g").classed(GQ.config.innerTextEdgeClass, true);
    GQ.vis_node_c_text = GQ.svgG.append("g").classed(GQ.config.outerTextNodeClass, true);
    GQ.vis_edge_c_text = GQ.svgG.append("g").classed(GQ.config.outerTextEdgeClass, true);

    // marker
    var defs = GQ.svg.append('svg:defs');
    defs.append('svg:marker')
        .attr('id', 'end-arrow').attr('viewBox', '0 -5 10 10')
        .attr('refX', 8.5).attr('markerWidth', 3.5)
        .attr('markerHeight', 3.5).attr('orient', 'auto')
        .append('svg:path').attr('d', 'M0,-5L10,0L0,5');

    // ** Effects
    // mouse down on
    GQ.svg.on("mousedown", function (d) {
        GC.prototype.svgMouseDown.call(GQ);
    });
    // key down on window
    d3.select(window).on("keydown", function () {
        if (d3.event.shiftKey) {
            GQ.svgKeyDown.call(GQ);
        }
    });
    // drag
    GQ.drag = d3.drag().on("drag", function (d) {

        var tmp_x = d.x + d3.event.dx,
            tmp_y = d.y + d3.event.dy,
            radius = GQ.config.nodeRadius,
            aspect = GQ.aspect,
            nodes = GQ.graph.nodes,
            node = d;

        var can_move = utils.canDo(tmp_x, tmp_y, radius, aspect, nodes, node);

        if (can_move) {
            d.x += d3.event.dx;
            d.y += d3.event.dy;
            GQ.updateGraph();
        }
    });


    GQ.reactor = reactor;
    GQ.reactor.addEventListener('update_graph', this.updateGraph.bind(this));
    GQ.reactor.addEventListener('constraint_added', this.getElement.bind(this));
    GQ.reactor.addEventListener('outcome_added', this.getGraph.bind(this));
    GQ.reactor.addEventListener('global_added', this.getGraph.bind(this));
    GQ.reactor.addEventListener('matching_changed', this.changeMatching.bind(this));
}

GC.prototype.nodeMouseDown = function (svg_element) {
    var GQ = this;
    d3.event.stopPropagation();
    var p_selected = d3.select(".selected").data();

    if (d3.event.shiftKey && p_selected.length != 0) {
        var n_selected = d3.select(svg_element).data();

        var aux = GQ.graph.edges.filter(function (a) {
            return ((a.source == p_selected[0].name) &&
                (a.destination == n_selected[0].name)) ||
                ((a.source == n_selected[0].name) &&
                (a.destination == p_selected[0].name))
        });

        if (aux.length == 0 && p_selected[0].name != n_selected[0].name) {
            if (d3.event.ctrlKey) {
                GQ.graph.addEdge(p_selected[0], n_selected[0], "undirected");
                GQ.updateGraph();
            }
            else {
                GQ.graph.addEdge(p_selected[0], n_selected[0], "directed");
                GQ.updateGraph();
            }
        }
    }
    else {
        GQ.replaceSelected(svg_element);
    }
};

GC.prototype.edgeMouseDown = function (svg_element) {
    var GQ = this;
    d3.event.stopPropagation();
    GQ.replaceSelected(svg_element);
};

// - SVG Behaviour
GC.prototype.svgMouseDown = function () {
    var GQ = this;
    if (d3.event.shiftKey) {
        var coordinates = d3.mouse(GQ.svg.node());

        var tmp_x = coordinates[0],
            tmp_y = coordinates[1],
            radius = GQ.config.nodeRadius,
            aspect = GQ.aspect,
            nodes = GQ.graph.nodes;

        var can_create = utils.canDo(tmp_x, tmp_y, radius, aspect, nodes);

        if (can_create) {
            GQ.graph.addNode(coordinates);
            GQ.updateGraph();
        }
    }
};

GC.prototype.svgKeyDown = function () {
    var GQ = this;
    var nodes = GQ.graph.nodes;
    var edges = GQ.graph.edges;

    switch (d3.event.keyCode) {
        case GQ.config.delete:
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

            GQ.graph.nodes = nodes;
            GQ.graph.edges = edges;
            GQ.graph.selectedSvgID = -1;
            GQ.updateGraph();
            GQ.reactor.dispatchEvent("selected_node_changed", undefined);

    }
};

// - General Behaviour
GC.prototype.replaceSelected = function (svg_element) {
    var GQ = this;
    var svg_d = d3.select(svg_element).data()[0];
    var svg_id = svg_d.id;
    d3.select(".selected").classed("selected", false);
    d3.select(svg_element).classed("selected", true);
    GQ.selectedSvgID = svg_id;

    GQ.reactor.dispatchEvent("selected_node_changed", svg_d);
};

GC.prototype.updateGraph = function () {

    var GQ = this;

    // This is for debugging
    console.log(GQ.graph);

    // -- Nodes --
    var nodes = GQ.svg
        .select("g." + GQ.config.nodesClass)
        .selectAll("g." + GQ.config.nodeClass);
    var data = GQ.graph.nodes;
    // - enter
    var aux = nodes.data(data, function (d) {
        return d.name;
    }).enter()
        .append("g")
        .classed(GQ.config.nodeClass, true)
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .on("mousedown", function (d) {
            GQ.nodeMouseDown(this)
        })
        .call(GQ.drag);
    aux.append("circle")
        .attr("r", String(GQ.config.nodeRadius));

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
    var text = GQ.svg
        .select("g." + GQ.config.innerTextNodeClass)
        .selectAll("text");
    var data = GQ.graph.nodes;
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
    text.data(data, function (d) {
        return d.name;
    }).attr("x", function (d) {
        return d.x
    }).attr("y", function (d) {
        return d.y
    }).text(function (d) {
        var isStart = true;
        var isEnd = true;

        GQ.graph.edges.forEach(function (edge) {
            if (d.name == edge.destination) {
                isStart = false;
            }
            if (d.name == edge.source) {
                isEnd = false;
            }
        });

        if (isStart && isEnd) return ' ';
        else if (isStart) return 'start';
        else if (isEnd) return 'end';
        else return ' ';

    });
    // -- exit
    text.data(data, function (d) {
        return d.name;
    }).exit()
        .remove();

    // -- OutText/Nodes --
    var text = GQ.svg
        .select("g." + GQ.config.outerTextNodeClass)
        .selectAll("text");
    var data = GQ.graph.nodes;
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
    var edges = GQ.svg
        .select("g." + GQ.config.edgesClass)
        .selectAll("g." + GQ.config.edgeClass);
    var data = GQ.graph.edges;
    // - enter
    var aux = edges.data(data, function (d) {
        return d.name;
    }).enter()
        .append("g")
        .classed(GQ.config.edgeClass, true)
        .on("mousedown", function (d) {
            GQ.edgeMouseDown(this)
        });
    aux.append("path")
        .style('marker-end', function (d) {
            if (d.kind == "directed") {
                return 'url(#end-arrow)'
            }
            else return 'none';
        })
        .attr("d", function (d) {
            return utils.calcEdgePath(d, GQ.config.nodeRadius);
        })
        .classed("link", true);
    // - update
    edges.data(data, function (d) {
        return d.name;
    })
        .selectAll("path")
        .attr("d", function (d) {
            return utils.calcEdgePath(d, GQ.config.nodeRadius);
        });
    // - exit
    edges.data(data, function (d) {
        return d.name;
    })
        .exit()
        .remove();

    // -- OutText/Edges --
    var text = GQ.svg
        .select("g." + GQ.config.outerTextEdgeClass)
        .selectAll("text");
    var data = GQ.graph.edges;
    var modifier = 15;
    // -- enter
    var aux = text.data(data, function (d) {
        return d.name;
    }).enter()
        .append("text")
        .attr("x", function (d) {
            return utils.calcTextEdgePath(d, GQ.config.nodeRadius, modifier)[0];
        })
        .attr("y", function (d) {
            return utils.calcTextEdgePath(d, GQ.config.nodeRadius, modifier)[1];
        })
        .attr("text-anchor", "middle");

    // -- update
    var aux = text.data(data, function (d) {
        return d.name;
    }).attr("x", function (d) {
        return utils.calcTextEdgePath(d, GQ.config.nodeRadius, modifier)[0];
    })
        .attr("y", function (d) {
            return utils.calcTextEdgePath(d, GQ.config.nodeRadius, modifier)[1];
        })
        .html(function (d) {
            var string = "";
            var x = utils.calcTextEdgePath(d, GQ.config.nodeRadius, modifier)[0].toString();
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

GC.prototype.getGraph = function () {
    var GQ = this;
    return GQ.graph;
};

GC.prototype.getElement = function () {
    var element = d3.select(".selected").data()[0];
    return element;
};

GC.prototype.changeMatching = function (new_matching) {
    var GQ = this;
    GQ.graph.matching = new_matching;
};

module.exports = GC;

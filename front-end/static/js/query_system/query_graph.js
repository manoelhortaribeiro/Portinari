var d3 = require("../external/d3.min.v4.js"),
    utils = require("./utils.js"),
    json_config = require("../config.js");


function GC(query_interface_selection, reactor) {

    var thisGraph = this;

    // -- Config
    thisGraph.idct = 0;
    thisGraph.aspect = [0, 0, 1600, 600];
    thisGraph.selectedSvgID = -1;
    thisGraph.reactor = reactor;
    thisGraph.reactor.addEventListener('constraint_added', this.updateGraph.bind(this));
    thisGraph.reactor.addEventListener('outcome_added', this.getGraph.bind(this));
    thisGraph.config = json_config.QUERY_SYSTEM;

    // -- Model
    thisGraph.graph = {};
    thisGraph.graph.nodes = [];
    thisGraph.graph.edges = [];
    thisGraph.graph.future_nodes = 0;
    thisGraph.graph.prediction_attr = "None";
    thisGraph.graph.id_attr = "None";
    thisGraph.graph.outcome_key_op_value = []
    thisGraph.graph.outcome_display_value = []


    // -- View
    // svg
    thisGraph.svg = query_interface_selection.append("svg")
        .attr("viewBox", thisGraph.aspect[0] + " " +
            thisGraph.aspect[1] + " " +
            thisGraph.aspect[2] + " " +
            thisGraph.aspect[3])
        .attr("preserveAspectRatio", "xMinYMin meet");

    // graph
    thisGraph.svgG = thisGraph.svg.append("g")
        .classed(thisGraph.config.graphClass, true);
    // nodes
    thisGraph.vis_nodes = thisGraph.svgG.append("g")
        .classed(thisGraph.config.nodesClass, true);
    // edges
    thisGraph.vis_edges = thisGraph.svgG.append("g")
        .classed(thisGraph.config.edgesClass, true);
    // node text
    thisGraph.vis_node_text = thisGraph.svgG.append("g")
        .classed(thisGraph.config.innerTextNodeClass, true);
    // edge text
    thisGraph.vis_edge_text = thisGraph.svgG.append("g")
        .classed(thisGraph.config.innerTextEdgeClass, true);
    // node constraint text
    thisGraph.vis_node_c_text = thisGraph.svgG.append("g")
        .classed(thisGraph.config.outerTextNodeClass, true);
    // edge constraint text
    thisGraph.vis_edge_c_text = thisGraph.svgG.append("g")
        .classed(thisGraph.config.outerTextEdgeClass, true);
    // marker
    var defs = thisGraph.svg.append('svg:defs');
    defs.append('svg:marker')
        .attr('id', 'end-arrow').attr('viewBox', '0 -5 10 10')
        .attr('refX', 8.5).attr('markerWidth', 3.5)
        .attr('markerHeight', 3.5).attr('orient', 'auto')
        .append('svg:path').attr('d', 'M0,-5L10,0L0,5');

    // ** Effects
    // mouse down on
    thisGraph.svg.on("mousedown", function (d) {
        GC.prototype.svgMouseDown.call(thisGraph);
    });
    // key down on window
    d3.select(window).on("keydown", function () {
        if (d3.event.shiftKey) {
            thisGraph.svgKeyDown.call(thisGraph);
        }
    });
    // drag
    thisGraph.drag = d3.drag().on("drag", function (d) {

        var tmp_x = d.x + d3.event.dx,
            tmp_y = d.y + d3.event.dy,
            radius = thisGraph.config.nodeRadius,
            aspect = thisGraph.aspect,
            nodes = thisGraph.graph.nodes,
            node = d;

        var can_move = utils.canDo(tmp_x, tmp_y, radius, aspect, nodes, node);

        if (can_move) {
            d.x += d3.event.dx;
            d.y += d3.event.dy;
            thisGraph.updateGraph();
        }
    });
}


//- Node behaviour -
GC.prototype.addNode = function (coordinates) {
    var thisGraph = this;
    var node = new utils.Node(coordinates, thisGraph.idct);
    thisGraph.graph.nodes.push(node);
    thisGraph.idct += 1;
    thisGraph.updateGraph();
};

GC.prototype.nodeMouseDown = function (svg_element) {
    var thisGraph = this;
    d3.event.stopPropagation();
    var p_selected = d3.select(".selected").data();

    if (d3.event.shiftKey && p_selected.length != 0) {
        var n_selected = d3.select(svg_element).data();

        var aux = thisGraph.graph.edges.filter(function (a) {
            return ((a.source == p_selected[0].name) &&
                (a.destination == n_selected[0].name)) ||
                ((a.source == n_selected[0].name) &&
                (a.destination == p_selected[0].name))
        });

        if (aux.length == 0) {
            if (d3.event.ctrlKey) {
                console.log("adsfaad");
                thisGraph.addEdge(p_selected[0], n_selected[0], "undirected");
            }
            else {
                thisGraph.addEdge(p_selected[0], n_selected[0], "directed");
            }
        }
    }
    else {
        thisGraph.replaceSelected(svg_element);
    }
};

// - Edge behaviour -
GC.prototype.addEdge = function (src, dst, kind) {
    var thisGraph = this;
    var edge = new utils.Edge(src, dst, thisGraph.idct, kind);
    thisGraph.graph.edges.push(edge);
    thisGraph.idct += 1;
    thisGraph.updateGraph();
};

GC.prototype.edgeMouseDown = function (svg_element) {
    var thisGraph = this;
    d3.event.stopPropagation();
    thisGraph.replaceSelected(svg_element);
};

// - SVG Behaviour
GC.prototype.svgMouseDown = function () {
    var thisGraph = this;
    if (d3.event.shiftKey) {
        var coordinates = d3.mouse(thisGraph.svg.node());

        var tmp_x = coordinates[0],
            tmp_y = coordinates[1],
            radius = thisGraph.config.nodeRadius,
            aspect = thisGraph.aspect,
            nodes = thisGraph.graph.nodes;

        var can_create = utils.canDo(tmp_x, tmp_y, radius, aspect, nodes);

        if (can_create) {
            thisGraph.addNode(coordinates);
        }
    }
};

GC.prototype.svgKeyDown = function () {
    var thisGraph = this;
    var nodes = thisGraph.graph.nodes;
    var edges = thisGraph.graph.edges;

    switch (d3.event.keyCode) {
        case thisGraph.config.delete:
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

            thisGraph.graph.nodes = nodes;
            thisGraph.graph.edges = edges;
            thisGraph.selectedSvgID = -1;
            thisGraph.updateGraph();
            thisGraph.reactor.dispatchEvent("selected_node_changed", undefined);

    }
};

// - General Behaviour
GC.prototype.replaceSelected = function (svg_element) {
    var thisGraph = this;
    var svg_d = d3.select(svg_element).data()[0];
    var svg_id = svg_d.id;
    d3.select(".selected").classed("selected", false);
    d3.select(svg_element).classed("selected", true);
    thisGraph.selectedSvgID = svg_id;

    thisGraph.reactor.dispatchEvent("selected_node_changed", svg_d);
};

GC.prototype.updateGraph = function () {

    var thisGraph = this;

    // -- Nodes --
    var nodes = thisGraph.svg
        .select("g." + thisGraph.config.nodesClass)
        .selectAll("g." + thisGraph.config.nodeClass);
    var data = thisGraph.graph.nodes;
    // - enter
    var aux = nodes.data(data, function (d) {
        return d.name;
    }).enter()
        .append("g")
        .classed(thisGraph.config.nodeClass, true)
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .on("mousedown", function (d) {
            thisGraph.nodeMouseDown(this)
        })
        .call(thisGraph.drag);
    aux.append("circle")
        .attr("r", String(thisGraph.config.nodeRadius));

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
    var text = thisGraph.svg
        .select("g." + thisGraph.config.innerTextNodeClass)
        .selectAll("text");
    var data = thisGraph.graph.nodes;
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
            return d.name;
        });
    // -- update
    text.data(data, function (d) {
        return d.name;
    }).attr("x", function (d) {
        return d.x
    })
        .attr("y", function (d) {
            return d.y
        });
    // -- exit
    text.data(data, function (d) {
        return d.name;
    }).exit()
        .remove();

    // -- OutText/Nodes --
    var text = thisGraph.svg
        .select("g." + thisGraph.config.outerTextNodeClass)
        .selectAll("text");
    var data = thisGraph.graph.nodes;
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
    var edges = thisGraph.svg
        .select("g." + thisGraph.config.edgesClass)
        .selectAll("g." + thisGraph.config.edgeClass);
    var data = thisGraph.graph.edges;
    // - enter
    var aux = edges.data(data, function (d) {
        return d.name;
    }).enter()
        .append("g")
        .classed(thisGraph.config.edgeClass, true)
        .on("mousedown", function (d) {
            thisGraph.edgeMouseDown(this)
        });
    aux.append("path")
        .style('marker-end', function (d) {
            if (d.kind == "directed") {
                return 'url(#end-arrow)'
            }
            else return 'none';
        })
        .attr("d", function (d) {
            return utils.calcEdgePath(d, thisGraph.config.nodeRadius);
        })
        .classed("link", true);
    // - update
    edges.data(data, function (d) {
        return d.name;
    })
        .selectAll("path")
        .attr("d", function (d) {
            return utils.calcEdgePath(d, thisGraph.config.nodeRadius);
        });
    // - exit
    edges.data(data, function (d) {
        return d.name;
    })
        .exit()
        .remove();


    // -- InText/Edges--
    var text = thisGraph.svg
        .select("g." + thisGraph.config.innerTextEdgeClass)
        .selectAll("text");
    var data = thisGraph.graph.edges;
    var modifier = -10;
    // -- enter
    var aux = text.data(data, function (d) {
        return d.name;
    }).enter()
        .append("text")
        .attr("x", function (d) {
            return utils.calcTextEdgePath(d, thisGraph.config.nodeRadius, modifier)[0];
        })
        .attr("y", function (d) {
            return utils.calcTextEdgePath(d, thisGraph.config.nodeRadius, modifier)[1];
        })
        .attr("text-anchor", "middle")
        .text(function (d) {
            return " " + d.name + " ";
        });
    // -- update
    text.data(data, function (d) {
        return d.name;
    }).attr("x", function (d) {
        return utils.calcTextEdgePath(d, thisGraph.config.nodeRadius, modifier)[0];
    })
        .attr("y", function (d) {
            return utils.calcTextEdgePath(d, thisGraph.config.nodeRadius, modifier)[1];
        });
    // -- exit
    text.data(data, function (d) {
        return d.name;
    }).exit()
        .remove();


    // -- OutText/Edges --
    var text = thisGraph.svg
        .select("g." + thisGraph.config.outerTextEdgeClass)
        .selectAll("text");
    var data = thisGraph.graph.edges;
    var modifier = 15;
    // -- enter
    var aux = text.data(data, function (d) {
        return d.name;
    }).enter()
        .append("text")
        .attr("x", function (d) {
            return utils.calcTextEdgePath(d, thisGraph.config.nodeRadius, modifier)[0];
        })
        .attr("y", function (d) {
            return utils.calcTextEdgePath(d, thisGraph.config.nodeRadius, modifier)[1];
        })
        .attr("text-anchor", "middle");

    // -- update
    var aux = text.data(data, function (d) {
        return d.name;
    }).attr("x", function (d) {
        return utils.calcTextEdgePath(d, thisGraph.config.nodeRadius, modifier)[0];
    })
        .attr("y", function (d) {
            return utils.calcTextEdgePath(d, thisGraph.config.nodeRadius, modifier)[1];
        })
        .html(function (d) {
            var string = "";
            var x = utils.calcTextEdgePath(d, thisGraph.config.nodeRadius, modifier)[0].toString();
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
    var thisGraph = this;
    return thisGraph.graph;
}

module.exports = GC;

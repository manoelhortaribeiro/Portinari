/*---------------------------- ----------------------------  ---------------------------- ----------------------------*/
/*---------------------------- ----------------------------  ---------------------------- ----------------------------*/
/*                                      / ---------------------------- \                                              */
/*                                      | AUTHOR: MANOEL HORTA RIBEIRO |                                              */
/*                                      \ ---------------------------- /                                              */
/*                                                                                                                    */
/*                                                                                                                    */
/*---------------------------- ----------------------------  ---------------------------- ----------------------------*/
/*---------------------------- ----------------------------  ---------------------------- ----------------------------*/

var json_config = require("../config/config.js"),
    d3 = require("../external/d3.min.v4.js"),
    utils = require("./utils.js");

function GC(query_interface_selection, reactor) {

    var QG = this;

    // Loads the config file
    QG.config = json_config.QUERY_SYSTEM;

    // Binds events to the reactor
    QG.reactor = reactor;
    QG.reactor.addEventListener('update_graph', this.updateGraph.bind(this));
    QG.reactor.addEventListener('constraint_added', this.getElement.bind(this));
    QG.reactor.addEventListener('outcome_added', this.getGraph.bind(this));
    QG.reactor.addEventListener('global_added', this.getGraph.bind(this));
    QG.reactor.addEventListener('matching_changed', this.changeMatching.bind(this));

    // Initial settings for the aspect and svg-related stuff
    QG.height = QG.config.svgHeight;
    QG.width = QG.config.svgWidth;
    QG.aspect = [0, 0, QG.width, QG.height];

    // Variables to adjust the tiles
    QG.horizontal_fixed_points = 1;
    QG.vertical_fixed_points = 1;
    QG.levels = [];

    // Array containing selected nodes
    QG.selectedSvgID = [];

    // Initializes the query graph model
    QG.idct = 0;
    QG.graph = {};
    QG.graph.nodes = [];
    QG.graph.edges = [];
    QG.graph.future_nodes = 0;
    QG.graph.prediction_attr = "None";
    QG.graph.id_attr = "None";
    QG.graph.outcome_key_op_value = [];
    QG.graph.outcome_display_value = [];
    QG.graph.global_key_op_value = [];
    QG.graph.global_display_value = [];
    QG.graph.matching = QG.config.matchingDefault();

    // Initializes svg compartments
    QG.initialize_svg(query_interface_selection);

    // Initializes root node
    QG.addNode();

    // Initializes graph
    QG.updateGraph();
}

GC.prototype.initialize_svg = function (query_interface_selection) {
    /* This method initializes the svg auxiliary parts of the Query Graph
      @params: query_interface_selection - */

    var QG = this;

    QG.svg = query_interface_selection.append("svg")
        .attr("viewBox", QG.aspect[0] + " " + QG.aspect[1] + " " + QG.aspect[2] + " " + QG.aspect[3])
        .attr("preserveAspectRatio", "xMinYMin meet"); // svg

    QG.svgG = QG.svg.append("g").classed(QG.config.graphClass, true);     // graph

    QG.svgG.append("g").classed(QG.config.nodesClass, true);    // nodes

    QG.svgG.append("g").classed(QG.config.edgesClass, true);     // edges

    QG.svgG.append("g").classed(QG.config.innerTextNodeClass, true);    // node text

    QG.svgG.append("g").classed(QG.config.innerTextEdgeClass, true);    // edge text

    QG.svgG.append("g").classed(QG.config.outerTextNodeClass, true);    // node constraint text

    QG.svgG.append("g").classed(QG.config.outerTextEdgeClass, true);    // edge constraint text

    var defs = QG.svg.append('svg:defs');
    defs.append('svg:marker')
        .attr('id', 'end-arrow').attr('viewBox', '0 -5 10 10')
        .attr('refX', 8.5).attr('markerWidth', 3.5)
        .attr('markerHeight', 3.5).attr('orient', 'auto')
        .append('svg:path').attr('d', 'M0,-5L10,0L0,5');    // marker

    d3.select(window).on("keydown", function () {
        if (d3.event.shiftKey) {
            QG.svgKeyDown.call(QG);
        }
    });    // key down on window

};

GC.prototype.distributeNodes = function () {
    /* This method distributes the nodes in the svg. It gets the horizontal_fixed_points and the vertical_fixed_points
     using the levels variable, and then positions all the nodes on its respective tick.
     @params: None
     @return: Nothing */

    var QG = this;

    QG.horizontal_fixed_points = QG.levels.length;
    QG.vertical_fixed_points = Math.max.apply(null, QG.levels);

    var nodes_level = utils.getNodesByLevel(QG.graph.nodes);
    var ticks = utils.getTicks(QG.width, QG.height, QG.horizontal_fixed_points, QG.vertical_fixed_points);

    for (var level = 0; level < QG.horizontal_fixed_points; level++) {
        var nodes_to_distribute = nodes_level[level];
        var start_position = Math.floor((QG.vertical_fixed_points - nodes_to_distribute.length) / 2);

        for (var pos = start_position; pos < QG.vertical_fixed_points; pos++) {
            if (nodes_to_distribute.length == 0)
                break;
            var tick = ticks[[level, pos]];
            var node = nodes_to_distribute.pop();
            node.x = tick.x;
            node.y = tick.y;
        }
    }
};

GC.prototype.addNode = function (parent, coordinates) {
    /* This creates a node given a parent and a set of coordinates. It can be done without parents or coordinates. It
     also handles the increase of the level.
     @params: parent - parent node
     coordinates - [x, y] array
     @return: recently created node */

    var QG = this;

    // Get coordinate values
    coordinates = ((coordinates == undefined) ? [0, 0] : coordinates);

    // Create nodes
    var node = new utils.Node(coordinates, QG.idct, parent);

    // Add edges
    if (parent != undefined) QG.addEdge(parent, node, "directed");

    // Internal book keeping
    QG.graph.nodes.push(node);

    // Increases index
    QG.idct += 1;

    // Pushes node to level
    if (node.level == QG.levels.length) QG.levels.push(1);
    else QG.levels[node.level]++;

    return node;
};

GC.prototype.nodeMouseDown = function (svg_element) {
    var QG = this;
    d3.event.stopPropagation();
    var node = d3.select(svg_element)
    if(node.classed("selected") == true) node.classed("selected", false);
    else node.classed("selected", true);
};

// - Edge behaviour -
GC.prototype.addEdge = function (src, dst, kind) {
    var QG = this;
    var edge = new utils.Edge(src, dst, QG.idct, kind);
    QG.graph.edges.push(edge);
    QG.idct += 1;
    QG.updateGraph();
};

GC.prototype.edgeMouseDown = function (svg_element) {
    var QG = this;
    d3.event.stopPropagation();
    d3.select(svg_element).classed("selected", true)
};


GC.prototype.svgKeyDown = function () {

    var QG = this;

    var selected = d3.select(".selected").data()[0];
    var sel_id = selected.id;


    switch (d3.event.keyCode) {

        case QG.config.delete:

            // Doesn't let you delete the root
            if (selected.level == 0)
                break;

            // Gets node to be removed
            var removed = utils.getNodeById(QG.graph.nodes, sel_id);

            // Gets descendants of the node to be removed
            var descendants = utils.getDescendantsID(QG.nodes, removed);

            // Remove all descendants
            QG.graph.nodes = QG.graph.nodes.filter(function (node) {
                return !node.id in descendants;
            });

            // Remove all edges involving descendants
            QG.graph.edges = QG.graph.edges.filter(function (edge) {
                return (!edge.src.id in descendants) && (!edge.dst.id in descendants);
            });


            QG.updateGraph();
            break;
        //QG.reactor.dispatchEvent("selected_node_changed", QG.selectedSvgID);

        case QG.config.create:
            console.log(selected);
            var parent = utils.getNodeById(QG.graph.nodes, sel_id);
            var added = QG.addNode(parent);


            QG.updateGraph();
            break;
        //QG.reactor.dispatchEvent("selected_node_changed", QG.selectedSvgID);

    }
};


GC.prototype.updateGraph = function () {

    var QG = this;

    console.log(QG.selectedSvgID);


    //this.replaceSelected(utils.getNodeById(this.selectedSvgID));

    console.log(QG.graph.nodes);

    QG.distributeNodes();

    // -- Nodes --
    var nodes = QG.svg
        .select("g." + QG.config.nodesClass)
        .selectAll("g." + QG.config.nodeClass);

    var nodes_data = nodes.data();


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
    aux.append("circle")
        .attr("r", String(utils.getNodeRadius(QG.levels, QG.width, QG.height, QG.config.nodeRadius)));

    // - update
    nodes.data(data, function (d) {
            return d.name;
        })
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .attr("r", String(utils.getNodeRadius(QG.levels, QG.width, QG.height, QG.config.nodeRadius)));
    ;
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

        QG.graph.edges.forEach(function (edge) {
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

GC.prototype.getGraph = function () {
    var QG = this;
    return QG.graph;
};

GC.prototype.getElement = function () {
    var element = d3.select(".selected").data()[0];
    return element;
};

GC.prototype.changeMatching = function (new_matching) {
    var QG = this;
    this.graph.matching = new_matching;
};

module.exports = GC;

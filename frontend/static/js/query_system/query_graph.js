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

    // loads the config file
    this.config = json_config.QUERY_SYSTEM;

    // binds events to the reactor
    this.reactor = reactor;
    this.reactor.addEventListener('update_graph', this.updateGraph.bind(this));
    this.reactor.addEventListener('constraint_added', this.getElement.bind(this));
    this.reactor.addEventListener('outcome_added', this.getGraph.bind(this));
    this.reactor.addEventListener('global_added', this.getGraph.bind(this));
    this.reactor.addEventListener('matching_changed', this.changeMatching.bind(this));

    // initial settings for the aspect and svg-related stuff
    this.height = 500;
    this.width = 1500;
    this.aspect = [0, 0, this.width, this.height];
    this.selectedSvgID = -1;
    this.horizontal_fixed_points = 1;
    this.vertical_fixed_points = 1;
    this.levels = [];

    // initializes the query graph model
    this.idct = 0;
    this.graph = {};
    this.graph.nodes = [];
    this.graph.edges = [];
    this.graph.future_nodes = 0;
    this.graph.prediction_attr = "None";
    this.graph.id_attr = "None";
    this.graph.outcome_key_op_value = [];
    this.graph.outcome_display_value = [];
    this.graph.global_key_op_value = [];
    this.graph.global_display_value = [];
    this.graph.matching = this.config.matchingDefault();

    // initializes svg compartments
    this.initialize_svg(query_interface_selection);

    // initializes root node
     this.addNode(undefined, [this.width / 2, this.height / 2]);

    // updates graph
    this.updateGraph();
}

GC.prototype.initialize_svg = function (query_interface_selection) {

    // svg
    this.svg = query_interface_selection.append("svg")
        .attr("viewBox", this.aspect[0] + " " + this.aspect[1] + " " + this.aspect[2] + " " + this.aspect[3])
        .attr("preserveAspectRatio", "xMinYMin meet");


    // graph
    this.svgG = this.svg.append("g").classed(this.config.graphClass, true);

    // nodes
    this.svgG.append("g").classed(this.config.nodesClass, true);

    // edges
    this.svgG.append("g").classed(this.config.edgesClass, true);

    // node text
    this.svgG.append("g").classed(this.config.innerTextNodeClass, true);

    // edge text
    this.svgG.append("g").classed(this.config.innerTextEdgeClass, true);

    // node constraint text
    this.svgG.append("g").classed(this.config.outerTextNodeClass, true);

    // edge constraint text
    this.svgG.append("g").classed(this.config.outerTextEdgeClass, true);

    // marker
    var defs = this.svg.append('svg:defs');
    defs.append('svg:marker')
        .attr('id', 'end-arrow').attr('viewBox', '0 -5 10 10')
        .attr('refX', 8.5).attr('markerWidth', 3.5)
        .attr('markerHeight', 3.5).attr('orient', 'auto')
        .append('svg:path').attr('d', 'M0,-5L10,0L0,5');

    // -- Effects


    // key down on window
    d3.select(window).on("keydown", function () {
        if (d3.event.shiftKey) {
            this.svgKeyDown.call(this);
        }
    });

};

//- Node behaviour -


GC.prototype.distributeNodes = function () {

    var this
    = this;

    this.horizontal_fixed_points = this.levels.length;
    this.vertical_fixed_points = Math.max.apply(null, this.levels);

    var nodes_level = utils.getNodesByLevel(this.graph.nodes);

    var ticks = utils.getTicks(this.width, this.height,
        this.horizontal_fixed_points,
        this.vertical_fixed_points);

    console.log("ticks", ticks);


    for (var level = 0; level < this.horizontal_fixed_points; level++) {
        var nodes_to_distribute = nodes_level[level];

        var start_position = (this.vertical_fixed_points - nodes_to_distribute.length) / 2;
        console.log("start pos", start_position);

        start_position = Math.floor(start_position)
        console.log("start pos", start_position);

        for (var pos = start_position; pos < this.vertical_fixed_points; pos++) {
            if (nodes_to_distribute.length == 0)
                break;
            var tick = ticks[[level, pos]];
            console.log("tick", tick);
            var node = nodes_to_distribute.pop();
            console.log("node", node);
            node.x = tick.x;
            node.y = tick.y;

        }
    }
};


GC.prototype.addNode = function (parent, coordinates) {

    if (coordinates == undefined) {
        coordinates = [0, 0];
    }

    var node = new utils.Node(coordinates, this.idct, parent);

    // Add edges
    if (parent != undefined)
        this.addEdge(parent, node, "directed");

    // Internal book keeping
    this.graph.nodes.push(node);
    this.idct += 1;
    if (node.level == this.levels.length)
        this.levels.push(1);
    else
        this.levels[node.level]++;

    return node;
};

GC.prototype.nodeMouseDown = function (svg_element) {
    d3.event.stopPropagation();
    this.replaceSelected(svg_element);
};

// - Edge behaviour -
GC.prototype.addEdge = function (src, dst, kind) {
    var this
    = this;
    var edge = new utils.Edge(src, dst, this.idct, kind);
    this.graph.edges.push(edge);
    this.idct += 1;
    this.updateGraph();
};

GC.prototype.edgeMouseDown = function (svg_element) {
    d3.event.stopPropagation();
    this.replaceSelected(svg_element);
};


GC.prototype.svgKeyDown = function () {

    var selected = d3.select(".selected").data()[0];
    var sel_id = selected.id;


    switch (d3.event.keyCode) {
        case this.config.delete:

            // Doesn't let you delete the root
            if (selected.level == 0)
                break;

            // Gets node to be removed
            var removed = utils.getNodeById(this.graph.nodes, sel_id);

            // Gets descendants of the node to be removed
            var descendants = utils.getDescendantsID(this.nodes, removed);

            // Remove all descendants
            this.graph.nodes = this.graph.nodes.filter(function (node) {
                return !node.id in descendants;
            });

            // Remove all edges involving descendants
            this.graph.edges = this.graph.edges.filter(function (edge) {
                return (!edge.src.id in descendants) && (!edge.dst.id in descendants);
            });

            // Selection goes to the parent
            this.selectedSvgID = selected.parent.id;

            this.updateGraph();
            break;
        //this.reactor.dispatchEvent("selected_node_changed", this.selectedSvgID);

        case this.config.create:
            console.log(selected);
            var parent = utils.getNodeById(this.graph.nodes, sel_id);
            var added = this.addNode(parent);

            this.selectedSvgID = added.id;

            this.updateGraph();
            break;
        //this.reactor.dispatchEvent("selected_node_changed", this.selectedSvgID);

    }
};

// - General Behaviour
GC.prototype.replaceSelected = function (svg_element) {
    var this
    = this;
    var svg_d = d3.select(svg_element).data()[0];
    var svg_id = svg_d.id;
    d3.select(".selected").classed("selected", false);
    d3.select(svg_element).classed("selected", true);
    this.selectedSvgID = svg_id;
    this.reactor.dispatchEvent("selected_node_changed", svg_d);
};


GC.prototype.updateGraph = function () {

    var this
    = this;


    replaceSelected(this.selectedSvgID);

    console.log(this.graph.nodes);

    this.distributeNodes();

    // -- Nodes --
    var nodes = this.svg
        .select("g." + this.config.nodesClass)
        .selectAll("g." + this.config.nodeClass);
    var data = this.graph.nodes;
    // - enter
    var aux = nodes.data(data, function (d) {
        return d.name;
    }).enter()
        .append("g")
        .classed(this.config.nodeClass, true)
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .on("mousedown", function (d) {
            this.nodeMouseDown(this)
        })
        .call(this.drag);
    aux.append("circle")
        .attr("r", String(utils.getNodeRadius(this.levels, this.width, this.height, this.config.nodeRadius)));

    // - update
    nodes.data(data, function (d) {
            return d.name;
        })
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .attr("r", String(utils.getNodeRadius(this.levels, this.width, this.height, this.config.nodeRadius)));
    ;
    // - exit
    nodes.data(data, function (d) {
            return d.name;
        })
        .exit()
        .remove();

    // -- InText/Nodes--
    var text = this.svg
        .select("g." + this.config.innerTextNodeClass)
        .selectAll("text");
    var data = this.graph.nodes;
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

        this.graph.edges.forEach(function (edge) {
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
    var text = this.svg
        .select("g." + this.config.outerTextNodeClass)
        .selectAll("text");
    var data = this.graph.nodes;
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
    var edges = this.svg
        .select("g." + this.config.edgesClass)
        .selectAll("g." + this.config.edgeClass);
    var data = this.graph.edges;
    // - enter
    var aux = edges.data(data, function (d) {
        return d.name;
    }).enter()
        .append("g")
        .classed(this.config.edgeClass, true)
        .on("mousedown", function (d) {
            this.edgeMouseDown(this)
        });
    aux.append("path")
        .style('marker-end', function (d) {
            if (d.kind == "directed") {
                return 'url(#end-arrow)'
            }
            else return 'none';
        })
        .attr("d", function (d) {
            return utils.calcEdgePath(d, this.config.nodeRadius);
        })
        .classed("link", true);
    // - update
    edges.data(data, function (d) {
            return d.name;
        })
        .selectAll("path")
        .attr("d", function (d) {
            return utils.calcEdgePath(d, this.config.nodeRadius);
        });
    // - exit
    edges.data(data, function (d) {
            return d.name;
        })
        .exit()
        .remove();

    // -- OutText/Edges --
    var text = this.svg
        .select("g." + this.config.outerTextEdgeClass)
        .selectAll("text");
    var data = this.graph.edges;
    var modifier = 15;
    // -- enter
    var aux = text.data(data, function (d) {
        return d.name;
    }).enter()
        .append("text")
        .attr("x", function (d) {
            return utils.calcTextEdgePath(d, this.config.nodeRadius, modifier)[0];
        })
        .attr("y", function (d) {
            return utils.calcTextEdgePath(d, this.config.nodeRadius, modifier)[1];
        })
        .attr("text-anchor", "middle");

    // -- update
    var aux = text.data(data, function (d) {
        return d.name;
    }).attr("x", function (d) {
            return utils.calcTextEdgePath(d, this.config.nodeRadius, modifier)[0];
        })
        .attr("y", function (d) {
            return utils.calcTextEdgePath(d, this.config.nodeRadius, modifier)[1];
        })
        .html(function (d) {
            var string = "";
            var x = utils.calcTextEdgePath(d, this.config.nodeRadius, modifier)[0].toString();
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
    return this.graph;
};

GC.prototype.getElement = function () {
    var element = d3.select(".selected").data()[0];
    return element;
};

GC.prototype.changeMatching = function (new_matching) {
    this.graph.matching = new_matching;
};

module.exports = GC;

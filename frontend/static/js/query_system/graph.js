var utils = require("./utils.js");

function Graph(){
    /* Graph constructor */
    this.idct = 0; this.nodes = []; this.edges = [];
    this.outcome_key_op_value = []; this.outcome_display_value = [];
    this.global_key_op_value = []; this.global_display_value = [];
    this.matching = "None"; this.selectedSvgID = -1;
}

Graph.prototype.addNode = function (coordinates) {
    var G = this;
    var node = new Node(coordinates, G.idct);
    G.nodes.push(node); G.idct += 1;
};

Graph.prototype.addEdge = function (src, dst, kind) {
    var G = this;
    var edge = new Edge(src, dst, G.idct, kind);
    G.edges.push(edge); G.idct += 1;
};

function Node(coor, id, node_class) {
    /* Node constructor */
    // Class name, id and id name
    this.className = node_class; this.name = "n" + id; this.id = id;
    // Constraints and display values
    this.key_op_value = []; this.display_value = [];
    // Coordinates of the node
    this.x = coor[0]; this.y = coor[1];
}

function Edge(src, dst, id, kind, edge_class) {
    /* Edge constructor */
    // Class name, id and id name
    this.className = edge_class; this.name = "e" + id; this.id = id;
    // Constraints and display values
    this.key_op_value = []; this.display_value = [];
    // Source and destination names
    this.source = src.name; this.destination = dst.name;
    // Pointers to source and destination nodes
    this.src = src; this.dst = dst;
    // Kind of edge, directed or undirected
    this.kind = kind;
}


Graph.prototype.setMatching = function(matching){
    var G = this;
    G.matching = matching;
};

module.exports = {
    Node: Node,
    Edge: Edge,
    Graph: Graph
};

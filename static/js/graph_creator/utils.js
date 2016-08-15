var json_config = require("../config.js");

function internalCalc(d,consts){
    var vx = d.dst.x - d.src.x;
    var vy = d.dst.y - d.src.y;
    var norm = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
    vx = vx / norm;
    vy = vy / norm;
    var pos_xs = d.src.x + vx * consts;
    var pos_ys = d.src.y + vy * consts;
    var pos_xd = d.dst.x - vx * consts;
    var pos_yd = d.dst.y - vy * consts;
    return [pos_xd, pos_xs, pos_yd, pos_ys];
}

function calcTextEdgePath(d, consts, mod) {
    var result = internalCalc(d, consts);
    return [(result[0] + result[1])/2, (result[2] + result[3])/2 + mod];
}

function calcEdgePath(d, consts) {
    var result = internalCalc(d, consts);
    return "M" + result[1] + " " + result[3] + " L" + result[0] + " " + result[2];
}

function Node(coordinates, id) {
    this.className = "Node";
    this.name = "n" + id;
    this.label = "Event";
    this.key_op_value = [];
    this.display_value = [];
    this.x = coordinates[0];
    this.y = coordinates[1];
    this.id = id;
}

function Edge(src, dst, id) {
    var thisEdge = this;
    this.className = "Edge";
    this.name = "e" + id;
    this.label = "";
    this.source = src.name;
    this.destination = dst.name;
    this.key_op_value = [];
    this.display_value = [];
    this.src = src;
    this.dst = dst;
    this.id = id;
}

module.exports = {
    Node: Node,
    Edge: Edge,
    calcEdgePath: calcEdgePath,
    calcTextEdgePath: calcTextEdgePath
};
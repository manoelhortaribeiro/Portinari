var json_config = require("../config.js");

function canDo(tmp_x, tmp_y, radius, aspect, nodes, node) {

    var can = true;

    if (radius + tmp_x > aspect[2] ||
        tmp_x - radius < aspect[0] ||
        radius + tmp_y > aspect[3] ||
        tmp_y - radius < aspect[1]) {
        can = false;
    }

    nodes.forEach(function (n) {
        var dist = Math.sqrt(Math.pow(tmp_x - n.x, 2) + Math.pow(tmp_y - n.y, 2));
        console.log(dist);

        if (dist <= 2 * radius && (typeof node == "undefined" || node.id != n.id)) {
            can = false;
        }
    });

    return can;
}

function internalCalc(d, consts) {
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
    return [(result[0] + result[1]) / 2, (result[2] + result[3]) / 2 + mod];
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

function Edge(src, dst, id, kind) {
    var thisEdge = this;
    this.className = "Edge";
    this.name = "e" + id;
    this.label = "";
    this.source = src.name;
    this.destination = dst.name;
    this.key_op_value = [];
    this.display_value = [];
    this.kind = kind;
    this.src = src;
    this.dst = dst;
    this.id = id;
}

module.exports = {
    Node: Node,
    Edge: Edge,
    calcEdgePath: calcEdgePath,
    calcTextEdgePath: calcTextEdgePath,
    canDo: canDo
};

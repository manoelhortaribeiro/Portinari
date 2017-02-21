var conf = require("../config/config.js");

function canDo(tmp_x, tmp_y, r, aspect, nodes, node) {
    /* Checks if you can create a node in the specific location given the coordinates */
    var can = true;

    // if it is on the borders, then false
    if (r + tmp_x > aspect[2] || tmp_x - r < aspect[0] || r + tmp_y > aspect[3] || tmp_y - r < aspect[1]) can = false;

    // else if it is too close to another node, then also false!
    nodes.forEach(function (n) {
        var dist = Math.sqrt(Math.pow(tmp_x - n.x, 2) + Math.pow(tmp_y - n.y, 2));
        if (dist <= 2 * r && (typeof node == "undefined" || node.id != n.id)) can = false;
    });

    // else, can is true!
    return can;
}

function _internalCalc(d, consts) {
    /* Calculates the edge in the weird SVG way */

    var vx = d.dst.x - d.src.x, vy = d.dst.y - d.src.y,
        norm = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));

    vx = vx / norm;
    vy = vy / norm;

    var pos_xs = d.src.x + vx * consts, pos_ys = d.src.y + vy * consts,
        pos_xd = d.dst.x - vx * consts, pos_yd = d.dst.y - vy * consts;

    return [pos_xd, pos_xs, pos_yd, pos_ys];
}

function calcTextEdgePath(d, consts, mod) {
    /* Gives the edge description for the d3 thingy */

    var result = _internalCalc(d, consts);
    return [(result[0] + result[1]) / 2, (result[2] + result[3]) / 2 + mod];
}

function calcEdgePath(d, consts) {
    /* Gives the edge description for the SVG thingy */
    var result = _internalCalc(d, consts);
    return "M" + result[1] + " " + result[3] + " L" + result[0] + " " + result[2];
}

function Node(coordinates, id, parent, name) {
    /* Node constructor */
    // Class name, id and id name
    this.className = conf.QUERY_SYSTEM.nodeClass;
    if (name != undefined)
        this.name = "n" + id;
    else
        this.name = name;
    this.id = id;
    // Constraints and display values
    this.key_op_value = [];
    this.display_value = [];
    // Coordinates of the node
    this.x = coordinates[0];
    this.y = coordinates[1];
    // Parent node and level in the tree
    this.parent = parent;
    // Initializes empty children array
    this.children = [];
    // Pushes itself to its parent children
    if (parent != undefined) {
        this.parent.children.push(this);
        this.level = this.parent.level + 1;
    }
    else {
        this.level = 0;
    }
}

function getNodeById(nodes, sel_id) {

    var node = nodes.filter(function (a) {
        return a.id == sel_id
    });

    if (node.length == 0)
        throw "Tried to select id that does not belong to any node;";

    if (node.length > 1)
        throw "Same id belongs to multiple nodes;";

    if (node.length == 1)
        return node[0];
}

function getNodesByLevel(nodes) {
    var nodes_sorted = {};
    for (var i = 0; i < nodes.length; i++)
        if (nodes[i].level in nodes_sorted)
            nodes_sorted[nodes[i].level].push(nodes[i]);
        else
            nodes_sorted[nodes[i].level] = [nodes[i]];

    var keys = Object.keys(nodes_sorted);
    for (var i = 0; i < keys.length; i++)
        nodes_sorted[i] = nodes_sorted[keys[i]].sort(function (a, b) {
            if (a.parent == undefined && b.parent == undefined) {
                return a.id - b.id;
            }
            else {
                return a.parent.id - b.parent.id;
            }
        })

    return nodes_sorted;
}

function getNodeRadius (levels, width, height, radius){
    var number = Math.max(Math.max.apply(null, levels), levels.length);
    var size = Math.min(width, height);
    return 45;//(size/number)*radius;
}


function Edge(src, dst, id, kind) {
    /* Edge constructor */
    // Class name, id and id name
    this.className = conf.QUERY_SYSTEM.edgeClass;
    this.name = "e" + id;
    this.id = id;
    // Constraints and display values
    this.key_op_value = [];
    this.display_value = [];
    // Source and destination names
    this.source = src.name;
    this.destination = dst.name;
    // Pointers to source and destination nodes
    this.src = src;
    this.dst = dst;
    // Kind of edge, directed or undirected
    this.kind = kind;
}



function getTicks(width, height, horizontal_fixed_points, vertical_fixed_points) {
    var ticks = {};
    for (var hfp = 0; hfp < horizontal_fixed_points; hfp++) {
        for (var vfp = 0; vfp < vertical_fixed_points; vfp++) {
            ticks[[hfp, vfp]] = (
                {
                    "x": width * ((hfp + 0.5)/ horizontal_fixed_points),
                    "y": height * ((vfp + 0.5)/ vertical_fixed_points)
                })
        }
    }
    return ticks;
}


module.exports = {
    getNodeRadius: getNodeRadius,
    getNodeById: getNodeById,
    getNodesByLevel: getNodesByLevel,
    Node: Node,
    Edge: Edge,
    calcEdgePath: calcEdgePath,
    calcTextEdgePath: calcTextEdgePath,
    canDo: canDo,
    getTicks: getTicks
};

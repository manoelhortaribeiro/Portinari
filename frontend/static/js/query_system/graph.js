var utils = require("./utils.js");

function Graph(){
    var G = this;
    
    G.nodes = [];
    G.edges = [];
    G.selectedSvgID = -1;
    G.outcome_key_op_value = [];
    G.outcome_display_value = [];
    G.global_key_op_value = [];
    G.global_display_value = [];
    G.matching = "None";

    return G;
}

Graph.prototype.setMatching = function(matching){
    var G = this;
    G.matching = matching;
};



module.exports = Graph;
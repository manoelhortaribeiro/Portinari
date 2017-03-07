var d3 = require("../external/d3.min.v4.js");


function make_visible(loader_d, content_d) {

    d3.select(loader_d)
        .transition()
        .delay(1000)
        .style("display", "none");

    d3.select(content_d)
        .classed("active", true)
        .transition()
        .delay(1000)
        .duration(1000)
        .style("opacity", 1);
}


module.exports = {
    makeVisible: make_visible
};

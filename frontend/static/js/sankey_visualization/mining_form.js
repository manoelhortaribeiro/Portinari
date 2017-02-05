var d3 = require("../external/d3.min.v4.js"),
    json_config = require("../config/config.js");


function MiningForm(mining_form, reactor) {

    var thisForm = this;

    thisForm.mining_form = svg;
    thisForm.config = json_config.QUERY_FORM;

    var dataInput = cohort_form.append("form");


    thisForm.svg = svg.append("svg")
        .attr("viewBox", thisForm.aspect[0] + " " +
            thisForm.aspect[1] + " " +
            thisForm.aspect[2] + " " +
            thisForm.aspect[3])
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("visibility", "hidden");


    thisForm.start = 0;
    thisForm.queryNumber = 1;

    thisForm.reactor = reactor;
    thisForm.reactor.addEventListener('query_successful', thisForm.updateResult.bind(this));
}
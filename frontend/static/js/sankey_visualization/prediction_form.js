var d3 = require("../external/d3.min.v4.js"),
    $ = require("../external/jquery.min.js"),
    json_config = require("../config/config.js"),
    Utils = require("../util/util.js");

function PredictionForm(cohort_form, graph, reactor) {

    // ** Config
    var thisForm = this;
    thisForm.graph = graph;
    thisForm.reactor = reactor;
    thisForm.config = json_config.QUERY_FORM;

    var dataInput = cohort_form.append("form");

    //- builds form! -
    dataInput .attr("id", "query-cohort");

    dataInput.append("input")
        .classed("styled_form", true)
        .attr("type", "submit")
        .attr("value", "Get Cohort");

    $("#query-cohort").bind("submit", function (event) {

        var posted_data = {
            'nodes': JSON.stringify(thisForm.graph.nodes),
            'edges': JSON.stringify(thisForm.graph.edges),
            'outcomes': JSON.stringify(thisForm.graph.outcome_key_op_value),
            'globals': JSON.stringify(thisForm.graph.global_key_op_value),
            'matching': JSON.stringify(thisForm.graph.matching),
            'datasets': JSON.stringify(thisForm.config.filename()),
            'prediction_attr': JSON.stringify([]),
            'future_nodes': JSON.stringify([]),
            'begin_date': JSON.stringify([]),
            'end_date': JSON.stringify([]),
            'id': JSON.stringify(thisForm.config.id()),
            'type': JSON.stringify("cohort")
        };

        console.log(posted_data);

        Utils.toggleIfVisible("#expand-query-button", "#query-system");

        $.ajax({
            type: 'POST',
            url: "http://localhost:5000/",
            data: posted_data,
            success: function (data) {
                var graph = JSON.parse(data);
                thisForm.reactor.dispatchEvent("query_successful", graph);
            },
            async: true
        });

        event.preventDefault();
    });
}

module.exports = PredictionForm;

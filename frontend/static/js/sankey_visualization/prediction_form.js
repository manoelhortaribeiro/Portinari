var d3 = require("../external/d3.min.v4.js"),
    $ = require("../external/jquery.min.js"),
    json_config = require("../config/config.js"),
    Utils = require("../util/util.js");

function PredictionForm(form_get_cohort,
                        nodes_info_cohort_selection,
                        get_patterns_cohort,
                        show_patterns_cohort,
                        graph,
                        reactor) {
    // ** Config
    var thisForm = this;
    thisForm.graph = graph;
    thisForm.reactor = reactor;
    thisForm.config = json_config.QUERY_FORM;

    make_simple_form(thisForm,
        form_get_cohort,
        thisForm.config.visualizationOptions(),
        get_outcome_cohort,
        "query-cohort",
        "Obtain new cohort");

    make_simple_form(thisForm,
        get_patterns_cohort,
        thisForm.config.miningAlgorithms(),
        get_patterns,
        "get-patterns-cohort",
        "Get patterns");
}


function make_simple_form(thisForm, form, options, submit_f, id_v, submit) {

    var dataInput = form.append("form");

    dataInput.attr("id", id_v);

    var select_attr = dataInput.append("select")
        .attr("id", "attr_name_" + id_v)
        .attr("name", "attribute");

    options.forEach(function (op) {
        select_attr.append("option")
            .attr("value", op.name)
            .attr("type", op.type)
            .text(op.display);
    });

    dataInput.append("input")
        .classed("styled_form", true)
        .attr("type", "submit")
        .attr("value", submit);

    $("#" + id_v).bind("submit", function (event) {
        submit_f(thisForm);
        event.preventDefault();
    });
}

function get_outcome_cohort(thisForm) {

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

}

function get_patterns(thisForm) {

    // TO FILL
}


module.exports = PredictionForm;

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
    thisForm.nodes = {};
    thisForm.reactor = reactor;
    thisForm.config = json_config.QUERY_FORM;

    thisForm.node_info_cohort_selection = nodes_info_cohort_selection;

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

    thisForm.reactor.addEventListener('cohort_node_selected', thisForm.addNodes.bind(this));
    thisForm.reactor.addEventListener('cohort_node_unselected', thisForm.removeNodes.bind(this));
}

PredictionForm.prototype.addNodes = function (d) {
    var thisForm = this;
    thisForm.nodes[d.identifier] = d;
    console.log(thisForm.nodes);
    thisForm.updateNodesInfo();
};


PredictionForm.prototype.removeNodes = function (d) {
    var thisForm = this;
    delete thisForm.nodes[d.identifier];
    console.log(thisForm.nodes);
    thisForm.updateNodesInfo();
};

PredictionForm.prototype.updateNodesInfo = function () {
    var thisForm = this;
    var formatRR = d3.format(",.2f");
    var format = d3.format(",.0f");


    var values = $.map(thisForm.nodes, function (value, key) {
        return value
    });

    console.log(values);

    var list = thisForm.node_info_cohort_selection.select("ul");

    list.selectAll("li").remove();

    list.selectAll("li")
        .data(values)
        .enter()
        .append("li")
        .text(function (d) {
            console.log(d);
            console.log(this);
            return d.name + " - Entities: " + format(d.value) + " - Relative Risk: " + formatRR(d.rr);
        });
};


function make_simple_form(thisForm, form, options, submit_f, id_v, submit) {

    var dataInput = form.append("form");

    dataInput.attr("id", id_v);

    var select_attr = dataInput.append("select")
        .classed("styled_form", true)
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

    var keys = $.map(thisForm.nodes, function (value, key) {
        return key
    });


    var posted_data = {
        'nodes': JSON.stringify(keys)
    };


    $.ajax({
        type: 'POST',
        url: "http://localhost:5000/minecohort/",
        data: posted_data,
        success: function (data) {
            console.log("data");
        },
        async: true
    });

}

module.exports = PredictionForm;

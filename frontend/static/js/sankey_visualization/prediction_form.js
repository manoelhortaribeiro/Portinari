var d3 = require("../external/d3.min.v4.js"),
    $ = require("../external/jquery.min.js"),
    json_config = require("../config/config.js"),
    Utils = require("../util/util.js");

function PredictionForm(future_form_selection, graph, reactor) {

    // ** Config
    var thisForm = this;
    thisForm.graph = graph;
    thisForm.reactor = reactor;
    thisForm.config = json_config.QUERY_FORM;

    // ** Model
    thisForm.futureNodes = [1, 2, 3, 4, 5];

    var values = [];
    thisForm.config.outcomeAttributes().forEach(function (attr) {
        values.push([attr.name, attr.display]);
    });

    var dataInput = future_form_selection.append("form");

    //- builds form! -
    dataInput.classed("triggerquery", true)
        .attr("id", "queryval");
    var select_attr = dataInput.append("select")
        .classed("styled_form", true)
        .attr("name", "attribute");

    values.forEach(function (value) {
        select_attr.append("option")
            .attr("value", value[0])
            .text(value[1]);
    });

    var future_nodes = dataInput.append("select")
        .classed("styled_form", true)
        .attr("name", "operator");

    thisForm.futureNodes.forEach(function (op) {
        future_nodes.append("option")
            .attr("value", op)
            .text(op);
    });

    dataInput.append("input")
        .classed("styled_form", true)
        .attr("name", "begin_date")
        .attr("type", "text")
        .attr("placeholder", "Start");

    dataInput.append("input")
        .classed("styled_form", true)
        .attr("name", "end_date")
        .attr("type", "text")
        .attr("placeholder", "End");

    dataInput.append("input")
        .classed("styled_form", true)
        .attr("type", "submit");

    $(".triggerquery").bind("submit", function (event) {
        var data = $("#queryval").serializeArray();

        var attr = [data[0].value, data[1].value, data[2].value, data[3].value];

        var posted_data = {
            'nodes': JSON.stringify(thisForm.graph.nodes),
            'edges': JSON.stringify(thisForm.graph.edges),
            'outcomes': JSON.stringify(thisForm.graph.outcome_key_op_value),
            'globals': JSON.stringify(thisForm.graph.global_key_op_value),
            'matching': JSON.stringify(thisForm.graph.matching),
            'datasets': JSON.stringify(thisForm.config.filename()),
            'prediction_attr': JSON.stringify(attr[0]),
            'future_nodes': JSON.stringify(attr[1]),
            'begin_date': JSON.stringify(attr[2]),
            'end_date': JSON.stringify(attr[3]),
            'id': JSON.stringify(thisForm.config.id())
        };

        console.log(posted_data);

        Utils.toggleIfVisible("#expand-query-button");

        $.ajax({
            type: 'POST',
            url: "http://localhost:5000/",
            data: posted_data,
            success: function (data) {
            },
            async: true
        });

        event.preventDefault();
    });
}

module.exports = PredictionForm;

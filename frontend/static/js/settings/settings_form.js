
var d3 = require("../external/d3.min.v4.js"),
    $ = require("../external/jquery.min.js"),
    json_config = require("../config/config.js");

function SettingsForm(matching, dataset, reactor) {

    var thisForm = this;

    thisForm.config = json_config.SETTINGS;
    thisForm.reactor = reactor;

     thisForm.dsc = dataset;
     thisForm.dataset = dataset.append("form");
     var attributes = thisForm.config.datasets();
     make_form_dataset(thisForm.dataset, thisForm.dsc, "dataset", attributes, thisForm);


     thisForm.mtc = matching;
     thisForm.matching = matching.append("form");
     var attributes = thisForm.config.matching();
     make_form_matching(thisForm.matching, thisForm.mtc, "matching", attributes, thisForm);

}

function make_form_matching(form, current, name, attributes, thisForm) {
    // form
    form.classed("query_" + name, true)
        .attr("id", "new_" + name);

    // ** FORM Pt1. attr_name **
    var select_attr = form.append("select")
        .attr("id", "attr_name_" + name)
        .attr("name", "attribute");

    attributes.forEach(function (op) {

        if (thisForm.config.filename() == op.name) {
            select_attr.append("option")
                .attr("value", op.name)
                .attr("selected", "selected")
                .text(op.display);
        }
        else {
            select_attr.append("option")
                .attr("value", op.name)
                .text(op.display);
        }
    });

    form.append("input")
        .attr("id", "submit_query_form_" + name)
        .attr("type", "submit")
        .attr("value", ">>");

    $(".query_" + name).bind("submit", function (event) {
        event.preventDefault();
        var data = $("#new_" + name).serializeArray();
        thisForm.reactor.dispatchEvent("matching_changed", data[0].value );
    });
}

function make_form_dataset(form, current, name, attributes, thisForm) {
    // form
    form.classed("query_" + name, true)
        .attr("id", "new_" + name);

    // ** FORM Pt1. attr_name **
    var select_attr = form.append("select")
        .attr("id", "attr_name_" + name)
        .attr("name", "attribute");

    attributes.forEach(function (op) {

        if (thisForm.config.filename() == op.name) {
            select_attr.append("option")
                .attr("value", op.name)
                .attr("selected", "selected")
                .text(op.display);
        }
        else {
            select_attr.append("option")
                .attr("value", op.name)
                .text(op.display);
        }
    });

    form.append("input")
        .attr("id", "submit_query_form_" + name)
        .attr("type", "submit")
        .attr("value", ">>");

    $(".query_" + name).bind("submit", function (event) {
        event.preventDefault();
        var data = $("#new_" + name).serializeArray();
        json_config.QUERY_SYSTEM.changeDataset(data[0].value);
        thisForm.updateForm(undefined)
    });
}

module.exports = SettingsForm;
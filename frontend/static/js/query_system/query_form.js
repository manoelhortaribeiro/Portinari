var json_config = require("../config/config.js"),
    d3 = require("../external/d3.min.v4.js"),
    $ = require("../external/jquery.min.js");

function FormHandler(qif, qic, qgif, qgic, qcf, qcc, dsc, mtc, reactor) {

    var thisForm = this;

    // -- Config
    thisForm.config = json_config.QUERY_SYSTEM;
    thisForm.reactor = reactor;
    thisForm.reactor.addEventListener('selected_node_changed', this.updateForm.bind(this));

    // -- Model

    // dataset choice form
    thisForm.dsc = dsc;
    thisForm.dataset = dsc.append("form");
    var attributes = thisForm.config.datasets();
    make_form_dataset(thisForm.dataset, thisForm.dsc, "dataset", attributes, thisForm);

    // matching choice form
    thisForm.mtc = mtc;
    thisForm.matching = mtc.append("form");
    var attributes = thisForm.config.matching();
    make_form_matching(thisForm.matching, thisForm.mtc, "matching", attributes, thisForm);

    // local constraints forms
    thisForm.qif = qif;
    thisForm.qif.append("p").text("Select a node or edge to add constraints");
    thisForm.qic = qic;
    thisForm.qic.append("p").text("Select a node or edge to see its constraints");
    thisForm.form = qif.append("form");

    //global constraints forms
    thisForm.qgif = qgif;
    thisForm.qgic = qgic;
    thisForm.qgic.append("p").text("Global attributes to be inspected will appear here");
    thisForm.global = qgif.append("form");
    //get the attributes
    var attributes = thisForm.config.globalAttributes();
    make_form(thisForm.global, thisForm.qgic, "globals", attributes, thisForm, global_form_callback);

    // outcome forms
    thisForm.qcf = qcf;
    thisForm.qcc = qcc;
    thisForm.qcc.append("p").text("Outcomes to be inspected will appear here");
    thisForm.outcome = qcf.append("form");
    // get the attributes
    var attributes = thisForm.config.outcomeAttributes();
    make_form(thisForm.outcome, thisForm.qcc, "outcomes", attributes, thisForm, outcome_form_callback);

}

FormHandler.prototype.updateForm = function (element) {

    var thisForm = this;

    // removes everything in the form
    thisForm.form.selectAll("*").remove();
    thisForm.qif.selectAll("p").remove();
    thisForm.qic.selectAll("p").remove();
    thisForm.qic.select("ul").select("li").remove();

    // in case someone just deleted a node, returns
    if (element == undefined) {
        if (thisForm.qic.select("p").empty()) thisForm.qic.append("p").text("Select a node or edge to see its constraints");
        thisForm.qic.select("ul").selectAll("li").remove();
        thisForm.qif.append("p").text("Select a node or edge to add constraints");
        return;
    }

    // displays all constraints of the element that was selected above the form
    updateConstraints(thisForm, thisForm.qic, element);

    // get the attributes
    var attributes;
    if (element.className == thisForm.config.nodeClass) attributes = thisForm.config.nodeAttributes();
    else attributes = thisForm.config.edgeAttributes();

    make_form(thisForm.form, thisForm.qic, "constraints", attributes, thisForm, constraints_form_callback);


    if (thisForm.qic.select("ul").select("li").empty()) {
        console.log("-- empty ul");
        thisForm.qic.append("p").text("Select a node or edge to see its constraints");
    }
};

function make_form_matching(form, current, name, attributes, thisForm) {
    // form
    form.classed("query_" + name, true)
        .attr("id", "new_" + name);

    // ** FORM Pt1. attr_name **
    var select_attr = form.append("select")
        .classed("styled_form", true)
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
        .classed("styled_form", true)
        .attr("id", "submit_query_form_" + name)
        .attr("type", "submit");

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
        .classed("styled_form", true)
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
        .classed("styled_form", true)
        .attr("id", "submit_query_form_" + name)
        .attr("type", "submit");

    $(".query_" + name).bind("submit", function (event) {
        event.preventDefault();
        var data = $("#new_" + name).serializeArray();
        json_config.QUERY_SYSTEM.changeDataset(data[0].value);
        thisForm.updateForm(undefined)
    });
}

function make_form(form, current, name, attributes, thisForm, callback) {
    // form
    form.classed("query_" + name, true)
        .attr("id", "new_" + name);

    // ** FORM Pt1. attr_name **
    var select_attr = form.append("select")
        .classed("styled_form", true)
        .attr("id", "attr_name_" + name)
        .attr("name", "attribute");

    select_attr.append("option")
        .classed("styled_form", true)
        .classed("disabled", true)
        .classed("hidden", true)
        .attr("style", true)
        .text("Select Attribute");

    attributes.forEach(function (op) {
        select_attr.append("option")
            .attr("value", op.name)
            .attr("type", op.type)
            .text(op.display);
    });

    // Dynamic Fields
    $("#attr_name_" + name).change(function () {

        // cleans rest of the form
        d3.select("#oper_field_" + name).remove();
        d3.select("#value_field_" + name).remove();
        d3.select("#submit_query_form_" + name).remove();

        var sel = $("#attr_name_" + name).val();
        var type_name = d3.select("#attr_name_" + name + " [value=" + sel + "]").attr("type");
        var types = thisForm.config.types()[type_name];

        // ** FORM Pt2. oper_field **
        var select_oper = form.append("select")
            .classed("styled_form", true)
            .attr("id", "oper_field_" + name)
            .attr("name", "operator");

        types.constraints.forEach(function (op) {
            select_oper.append("option").attr("value", op[0]).text(op[1]);
        });


        // ** FORM Pt3 value_field **

        thisForm.config.typeFormHandling(type_name, form, name, types);

        form.append("input")
            .classed("styled_form", true)
            .attr("id", "submit_query_form_" + name)
            .attr("type", "submit");

    });

    $(".query_" + name).unbind();

    $(".query_" + name).bind("submit", function (event) {

        event.preventDefault();

        var sel = $("#attr_name_" + name).val();
        var type_name = d3.select("#attr_name_" + name + " [value=" + sel + "]").attr("type");
        thisForm.config.typeValueHandling(type_name, name, sel);

        var attr = thisForm.config.typeValueHandling(type_name, name, sel);

        var disp = attr_getter("#attr_name_" + name, "#oper_field_" + name, "#value_field_" + name);

        callback(attr, disp, current, thisForm)

    });
}

function global_form_callback(attr, disp, current, thisForm) {

    var element = thisForm.reactor.dispatchEvent("global_added")[0];

    element.global_key_op_value.push(attr);
    element.global_display_value.push(disp);
    current.selectAll("p").remove();
    var list = current.select("ul");

    list.selectAll("li").remove();

    list.selectAll("li")
        .data(element.global_display_value)
        .enter()
        .append("li")
        .text(function (d, i) {
            return d;
        })
        .on("click", function () {
            var value = d3.select(this).data()[0];
            var graph = element;
            var index = graph.global_key_op_value.indexOf(value);
            graph.global_key_op_value.splice(index, 1);
            graph.global_display_value.splice(index, 1);
            d3.select(this).remove();
            if (graph.global_display_value.length == 0) {
                thisForm.qgic.append("p").text("Global attributes to be inspected will appear here");
            }
        });
    thisForm.reactor.dispatchEvent("update_graph");
}

function outcome_form_callback(attr, disp, current, thisForm) {

    var element = thisForm.reactor.dispatchEvent("outcome_added")[0];

    element.outcome_key_op_value.push(attr);
    element.outcome_display_value.push(disp);
    current.selectAll("p").remove();
    var list = current.select("ul");

    list.selectAll("li").remove();

    list.selectAll("li")
        .data(element.outcome_display_value)
        .enter()
        .append("li")
        .text(function (d, i) {
            return d;
        })
        .on("click", function () {
            var value = d3.select(this).data()[0];
            var graph = element;
            var index = graph.outcome_display_value.indexOf(value);
            graph.outcome_key_op_value.splice(index, 1);
            graph.outcome_display_value.splice(index, 1);
            d3.select(this).remove();

            if (graph.outcome_display_value.length == 0) {
                thisForm.qcc.append("p").text("Outcomes to be inspected will appear here");
            }

        });
    thisForm.reactor.dispatchEvent("update_graph");
}

function constraints_form_callback(attr, disp, current, thisForm) {
    var element = thisForm.reactor.dispatchEvent("constraint_added")[0];
    element.key_op_value.push(attr);
    element.display_value.push(disp);
    current.selectAll("p").remove();
    updateConstraints(thisForm, current, element);
    thisForm.reactor.dispatchEvent("update_graph");
}

function updateConstraints(form, current, element) {

    var list = current.select("ul");

    list.selectAll("li").remove();

    list.selectAll("li")
        .data(element.display_value)
        .enter()
        .append("li")
        .text(function (d, i) {
            return d;
        })
        .on("click", function () {
            var value = d3.select(this).data()[0];
            var node = d3.select(".selected").data()[0];
            var index = node.display_value.indexOf(value);
            node.key_op_value.splice(index, 1);
            node.display_value.splice(index, 1);
            d3.select(this).remove();
            if (form.qic.select("ul").select("li").empty())
                form.qic.append("p").text("Select a node or edge to see its constraints");

            form.reactor.dispatchEvent("constraint_added");
            form.reactor.dispatchEvent("update_graph");
        });
}

function attr_getter(id, oper, val) {

    var aux = $(id).val();
    var id_text = d3.select(id + " [value='" + aux + "']").text();
    var type_name = d3.select(id + " [value=" + aux + "]").attr("type");

    aux = $(oper).val();
    var oper_text = d3.select(oper + " [value='" + aux + "']").text();

    if (type_name == "Month" || type_name == "Number" || type_name == "TimeInterval")
        return id_text + " " + oper_text + " " + $(val).val();

    aux = $(val).val();
    var value_text = d3.select(val + " [value='" + aux + "']").text();

    return id_text + " " + oper_text + " " + value_text;
}

module.exports = FormHandler;

var d3 = require("../external/d3.min.v4.js"),
    $ = require("../external/jquery.min.js"),
    json_config = require("../config.js");

function FormHandler(query_interface_form, query_interface_current, reactor) {

    var thisForm = this;

    // ** Config
    thisForm.config = json_config.VIEW_QUERY_FORM;
    thisForm.reactor = reactor;
    thisForm.reactor.addEventListener('selected_node_changed', this.updateForm.bind(this));

    // ** Model
    thisForm.qif = query_interface_form;
    thisForm.qif.append("p").text("select a node or edge to add constraints");
    thisForm.qic = query_interface_current;
    thisForm.qic.append("p").text("select a node to see its constraints");

    thisForm.form = query_interface_form.append("form");
}

FormHandler.prototype.updateForm = function (element) {

    var thisForm = this;

    // removes everything in the form
    thisForm.form.selectAll("*").remove();
    thisForm.qif.select("p").remove();
    // in case someone just deleted a node, returns

    if (element == undefined) {
        thisForm.qif.append("p").text("select a node or edge to add constraints");
        thisForm.qic.append("p").text("select a node to see its constraints");
        thisForm.qic.select("ul").selectAll("li").remove();
        return;
    }

    // displays all constraints of the element that was selected above the form
    updateConstraints(thisForm, element);

    // get the attributes
    var attributes = thisForm.config[element.className];

    // form
    thisForm.form.classed("query_form", true)
        .attr("id", "new_constraint");

    // ** FORM Pt1. attr_name **
    var select_attr = thisForm.form.append("select")
        .classed("styled_form", true)
        .attr("id", "attr_name")
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

    $("#attr_name").change(function () {

        // cleans rest of the form
        d3.select("#oper_field").remove();
        d3.select("#value_field").remove();
        d3.select("#submit_query_form").remove();

        var sel = $("#attr_name").val();
        var type_name = d3.select("#attr_name [value=" + sel + "]").attr("type");
        var types = thisForm.config.types[type_name];

        // ** FORM Pt2. oper_field **
        var select_oper = thisForm.form.append("select")
            .classed("styled_form", true)
            .attr("id", "oper_field")
            .attr("name", "operator");

        types.operators.forEach(function (op) {
            select_oper.append("option").attr("value", op[0]).text(op[1]);
        });


        // ** FORM Pt3 value_field **

        var select_value = thisForm.form;

        console.log(type_name);

        switch (type_name) {
            case "number":
                select_value.append("input")
                    .classed("styled_form", true)
                    .attr("id", "value_field")
                    .attr("name", "value")
                    .attr("type", "text")
                    .attr("placeholder", "Value");
                break;

            case "month":
                select_value.append("input")
                    .classed("styled_form", true)
                    .attr("id", "value_field")
                    .attr("name", "value")
                    .attr("type", "text")
                    .attr("placeholder", "Value");
                break;

            default:
                select_value = select_value.append("select")
                    .classed("styled_form", true)
                    .attr("id", "value_field")
                    .attr("name", "value");

                select_value.append("option")
                    .classed("styled_form", true)
                    .classed("disabled", true)
                    .classed("hidden", true)
                    .attr("style", true)
                    .attr("value", "Value");

                types.values.forEach(function (op) {
                    select_value.append("option")
                        .attr("value", op[0])
                        .text(op[1]);
                });
        }

        thisForm.form.append("input")
            .classed("styled_form", true)
            .attr("id", "submit_query_form")
            .attr("type", "submit");

    });

    $(".query_form").unbind();

    $(".query_form").bind("submit", function (event) {
        event.preventDefault();

        var element = d3.select(".selected").data()[0];
        var data = $("#new_constraint").serializeArray();
        var attr = [data[0].value, data[1].value, data[2].value];
        var disp = attr_getter("#attr_name", "#oper_field", "#value_field");


        element.key_op_value.push(attr);
        element.display_value.push(disp);

        thisForm.qic.select("p").remove();


        updateConstraints(thisForm, element);

        thisForm.reactor.dispatchEvent("constraint_added");

    });
};

function attr_getter(id, oper, val) {
    var aux = $(id).val();
    var id_text = d3.select(id + " [value='" + aux + "']").text();

    var type_name = d3.select(id + " [value=" + aux + "]").attr("type");

    aux = $(oper).val();
    var oper_text = d3.select(oper + " [value='" + aux + "']").text();

    if (type_name == "month" || type_name == "number") {
        return id_text + " " + oper_text + " " + $(val).val();
    }

    aux = $(val).val();
    var value_text = d3.select(val + " [value='" + aux + "']").text();

    return id_text + " " + oper_text + " " + value_text;
}

function updateConstraints(form, element) {

    var list = form.qic.select("ul");

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
            form.reactor.dispatchEvent("constraint_added");
        });
}

module.exports = FormHandler;

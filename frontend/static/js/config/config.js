var pace = require("../external/pace.js"),
    $ = require("../external/jquery.min.js"),
    d3 = require("../external/d3.min.v4.js");
    require("../external/date.js");


pace.start({elements: {
    selectors: ['.active']
  }});


function DBI() {
    var thisDatabaseInfo = this;
    thisDatabaseInfo.filename = "base";
    thisDatabaseInfo.conf_file = null;
}

DBI.prototype.getFilename = function () {
    return this.filename;
};

DBI.prototype.changeDataSet = function (new_name) {
    var thisDatabaseInfo = this;
    console.log(thisDatabaseInfo.conf_file);
    thisDatabaseInfo.getDataSet();
};

DBI.prototype.getDataSet = function (callback, flg) {
    var thisDatabaseInfo = this;
    var request = {'name': thisDatabaseInfo.filename};
    $.ajax({
        type: 'POST',
        url: "http://localhost:5000/config/",
        data: request,
        success: function (data) {
            if (flg == undefined) {
                thisDatabaseInfo.conf_file = JSON.parse(data);
                thisDatabaseInfo.filename = thisDatabaseInfo.conf_file["default_dataset"];
                thisDatabaseInfo.matching_default = thisDatabaseInfo.conf_file["default_matching"];
                thisDatabaseInfo.getDataSet(callback, true);
                pace.stop();

            }
            else {
                thisDatabaseInfo.conf_file = JSON.parse(data);
                pace.stop();
                callback();

            }

        },
        error:  function() {
            thisDatabaseInfo.getDataSet(callback, flg);
        },
        async: true
    });
};

DBI.prototype.outcome_attributes = function () {
    return this.conf_file['outcome_attributes'];
};

DBI.prototype.global_attributes = function () {
    return this.conf_file['global_attributes'];
};

DBI.prototype.node_attributes = function () {
    return this.conf_file['node_attributes'];
};

DBI.prototype.edge_attributes = function () {
    return this.conf_file['edge_attributes'];
};

DBI.prototype.types = function () {
    return this.conf_file['types']
};

DBI.prototype.id = function () {
    return this.conf_file['id_attribute']
};

DBI.prototype.datasets = function () {
    return this.conf_file['datasets']
};

DBI.prototype.matching = function () {
    return this.conf_file['matching_options']
};

DBI.prototype.visualization = function () {
    return this.conf_file['visualization_options']
};

DBI.prototype.mining_algorithms = function () {
    return this.conf_file['mining_algorithms']
};

DBI.prototype.matchingDefault = function () {
    return this.matching_default;
};

DBI.prototype.typeValueHandling = function (type_name, name, sel) {
    var data = $("#new_" + name).serializeArray();
    var attr = [data[0].value, data[1].value, data[2].value];
    var type_name = d3.select("#attr_name_" + name + " [value=" + sel + "]").attr("type");

    switch (type_name) {
        case "Month":
            attr[2] = String((Date.parseExact(attr[2], "yyyy-MM-dd").set({day: 15}) / 1000 | 0) / 2628000 | 0);
            break;
        default:
            break;
    }

    return attr;
};

DBI.prototype.typeFormHandling = function (type_name, select_value, name, types) {
    switch (type_name) {
        case "Number":
            select_value.append("input")
                .classed("styled_form", true)
                .attr("id", "value_field_" + name)
                .attr("name", "value")
                .attr("type", "text")
                .attr("placeholder", "Value");
            break;

        case "Month":
            select_value.append("input")
                .classed("styled_form", true)
                .attr("id", "value_field_" + name)
                .attr("name", "value")
                .attr("type", "date")
                .attr("placeholder", "month");
            break;

        case "TimeInterval":
            select_value.append("input")
                .classed("styled_form", true)
                .attr("id", "value_field_" + name)
                .attr("name", "value")
                .attr("type", "text")
                .attr("placeholder", "Value");
            break;

        default:
            select_value = select_value.append("select")
                .classed("styled_form", true)
                .attr("id", "value_field_" + name)
                .attr("name", "value");

            select_value.append("option")
                .classed("styled_form", true)
                .classed("disabled", true)
                .classed("hidden", true)
                .attr("style", true)
                .attr("value", "Value");

            var keys = Object.keys(types.values);
            var keys_values = keys.map(function (v) {
                return [v, types.values[v]];
            });
            keys_values.forEach(function (op) {
                select_value.append("option")
                    .attr("value", op[0])
                    .text(op[1]);
            });
    }
};

var databaseinfo = new DBI();

module.exports = {

    getDataSet: databaseinfo.getDataSet.bind(databaseinfo),

    QUERY_SYSTEM: {
        /*Stuff adjustable in the front end*/
        innerTextNodeClass: "InTextN",
        innerTextEdgeClass: "InTextE",
        outerTextNodeClass: "OuTextN",
        outerTextEdgeClass: "OuTextE",
        outerTextClass: "OutText",
        graphClass: "Graph",
        nodeClass: "Node",
        nodesClass: "Nodes",
        edgeClass: "Edge",
        edgesClass: "Edges",
        nodeRadius: 45,
        rectangleWidth: 40,
        delete: 68,

        /*Stuff adjustable in the back end*/
        datasets: databaseinfo.datasets.bind(databaseinfo),
        matching: databaseinfo.matching.bind(databaseinfo),
        matchingDefault: databaseinfo.matchingDefault.bind(databaseinfo),
        changeDataset: databaseinfo.changeDataSet.bind(databaseinfo),
        outcomeAttributes: databaseinfo.outcome_attributes.bind(databaseinfo),
        globalAttributes: databaseinfo.global_attributes.bind(databaseinfo),
        nodeAttributes: databaseinfo.node_attributes.bind(databaseinfo),
        edgeAttributes: databaseinfo.edge_attributes.bind(databaseinfo),
        types: databaseinfo.types.bind(databaseinfo),
        filename: databaseinfo.getFilename.bind(databaseinfo),

        /*Helpers*/
        typeValueHandling: databaseinfo.typeValueHandling,
        typeFormHandling: databaseinfo.typeFormHandling
    },

    QUERY_FORM: {
        /*Stuff adjustable in the back end*/
        outcomeAttributes: databaseinfo.outcome_attributes.bind(databaseinfo),
        visualizationOptions: databaseinfo.visualization.bind(databaseinfo),
        miningAlgorithms: databaseinfo.mining_algorithms.bind(databaseinfo),
        filename: databaseinfo.getFilename.bind(databaseinfo),
        id: databaseinfo.id.bind(databaseinfo)
    }
};
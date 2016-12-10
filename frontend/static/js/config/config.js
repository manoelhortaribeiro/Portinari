var $ = require("../external/jquery.min.js");

function DBI() {
    var thisDatabaseInfo = this;
    thisDatabaseInfo.filename = "base";
    thisDatabaseInfo.conf_file = null;
    thisDatabaseInfo.getDataSet();
    thisDatabaseInfo.filename = thisDatabaseInfo.conf_file["default_dataset"];
    thisDatabaseInfo.matching_default =thisDatabaseInfo.conf_file["default_matching"];
    thisDatabaseInfo.getDataSet();
}

DBI.prototype.getFilename = function (){
    return this.filename;
};

DBI.prototype.changeDataSet = function (new_name) {
    var thisDatabaseInfo = this;
    console.log(thisDatabaseInfo.conf_file);
    thisDatabaseInfo.filename = new_name;
    thisDatabaseInfo.getDataSet()
};

DBI.prototype.getDataSet = function () {
    var thisDatabaseInfo = this;
    var request = {'name': thisDatabaseInfo.filename};
    $.ajax({
        type: 'POST',
        url: "http://localhost:5000/config/",
        data: request,
        success: function (data) {
            thisDatabaseInfo.conf_file = JSON.parse(data);
        },
        async: false
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

DBI.prototype.matchingDefault = function () {
    return this.matching_default;
};


var databaseinfo = new DBI();

module.exports = {

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
        matching:  databaseinfo.matching.bind(databaseinfo),
        matchingDefault:  databaseinfo.matchingDefault.bind(databaseinfo),
        changeDataset: databaseinfo.changeDataSet.bind(databaseinfo),
        outcomeAttributes: databaseinfo.outcome_attributes.bind(databaseinfo),
        globalAttributes: databaseinfo.global_attributes.bind(databaseinfo),
        nodeAttributes: databaseinfo.node_attributes.bind(databaseinfo),
        edgeAttributes: databaseinfo.edge_attributes.bind(databaseinfo),
        types: databaseinfo.types.bind(databaseinfo),
        filename: databaseinfo.getFilename.bind(databaseinfo)
    },

    QUERY_FORM: {
        /*Stuff adjustable in the back end*/
        filename: databaseinfo.getFilename.bind(databaseinfo),
        outcomeAttributes: databaseinfo.outcome_attributes.bind(databaseinfo),
        id: databaseinfo.id.bind(databaseinfo)
    }
};
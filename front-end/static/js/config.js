var databaseinfo = require("./databaseinfo.json");




module.exports = {

    QUERY_SYSTEM: {
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
        rectangleWidth:40,
        delete: 68,
        nodeAttributes: databaseinfo.node_attributes,
        edgeAttributes: databaseinfo.edge_attributes,
        types: databaseinfo.types
    },

    VIEW_QUERY_FORM: {

        //"Node": node_attributes,

        //"Edge": edge_attributes,

        //types: constraints

    }



};
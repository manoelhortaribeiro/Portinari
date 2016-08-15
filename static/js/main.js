var d3 = require("./external/d3.min.v4.js"),
    QueryForm = require("./graph_creator/query_form.js"),
    QueryGraph = require("./graph_creator/query_graph.js"),
    PredictionForm = require("./graph_creator/prediction_form.js"),
    PredictionGraph = require("./graph_creator/prediction_graph.js"),
    Reactor = require("./external/reactor.js"),
    $ = require("./external/jquery.min.js");

$("#expand-button").click(function() {
    $(".content").slideToggle(200);
});




// Creates reactor pattern and register events
var reactor = new Reactor();
reactor.registerEvent('selected_node_changed');
reactor.registerEvent('query_successful');
reactor.registerEvent('constraint_added');

// Create needed selections
var query_graph_selection = d3.select("#query-interface-graph");
var query_form_selection = d3.select("#query-interface-form");
var query_current_selection = d3.select("#query-interface-current");
var future_form_selection = d3.select("#form-future-nodes");
var prediction_graph_selection1 = d3.select("#query-results1");
var prediction_graph_selection2 = d3.select("#query-results2");

// Creates query graph interface
var query_graph = new QueryGraph(query_graph_selection, reactor);

// Creates query form interface
var query_form = new QueryForm(query_form_selection, query_current_selection, reactor);

// Creates prediction form interface
var prediction_form = new PredictionForm(future_form_selection, query_graph.graph, reactor);

// Append the svg canvas to the page
var prediction_graph = new PredictionGraph(prediction_graph_selection1, prediction_graph_selection2, reactor);

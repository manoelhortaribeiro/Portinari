/* ----------------------------- */
/* ---  Initialization Stuff --- */
/* ----------------------------- */

// Import modules
var d3 = require("./external/d3.min.v4.js"),
    Reactor = require("./external/reactor.js"),
    config = require("./config/config.js");

// Creates reactor
var reactor = new Reactor();

/* ------------------------ */
/* ---  Interface Stuff --- */
/* ------------------------ */

// Import modules
var Utils = require("./util/util.js");

// Configures query button
Utils.toggleButton("#expand-query-button", ".content_query", "Query");

/* --------------------- */
/* ---  Query System --- */
/* --------------------- */

/* ---Internal Query System Events--- */
reactor.registerEvent('selected_node_changed');
reactor.registerEvent('constraint_added');
reactor.registerEvent('outcome_added');
reactor.registerEvent('global_added');
reactor.registerEvent('update_graph');
reactor.registerEvent('matching_changed');

/* ---------------------------------- */

// Creates needed selections
var query_graph_selection = d3.select("#query-interface-graph"),
    query_local_form_selection = d3.select("#query-local-interface-form"),
    query_local_current_selection = d3.select("#query-local-interface-current"),
    query_global_form_selection = d3.select("#query-global-interface-form"),
    query_global_current_selection = d3.select("#query-global-interface-current"),
    outcomes_form_selection = d3.select("#query-outcomes-form"),
    outcomes_current_selection = d3.select("#query-outcomes-current"),
    dataset_choice = d3.select("#dataset-choice"),
    matching_choice = d3.select("#matching-choice");

// Import modules
var QueryForm = require("./query_system/query_form.js"),
    QueryGraph = require("./query_system/query_graph.js");

// Creates query graph interface
var query_graph = new QueryGraph(query_graph_selection, reactor);

// Creates query form interface
var query_form = new QueryForm(query_local_form_selection, query_local_current_selection,
    query_global_form_selection, query_global_current_selection,
    outcomes_form_selection, outcomes_current_selection,
    dataset_choice, matching_choice, reactor);

/* ------------------------------------ */
/* ---  Corhort Inspection System  --- */
/* ----------------------------------- */

/* ---Internal Query System Events--- */
reactor.registerEvent('query_successful');
reactor.registerEvent('cohort_sankey_selected');
reactor.registerEvent('cohort_sankey_unselected');
/* ---------------------------------- */

// Creates needed selections
var future_form_selection = d3.select("#form-get-cohort");

// Import modules
var PredictionForm = require("./sankey_visualization/prediction_form.js"),
    PredictionGraph = require("./sankey_visualization/prediction_graph.js");

// Creates prediction form interface
var prediction_form = new PredictionForm(future_form_selection, query_graph.graph, reactor);

var cohort_result = d3.select("#cohort-result");
// Append the svg canvas to the page
var prediction_graph = new PredictionGraph(cohort_result, reactor);

var config = require("./config/config.js"),
    pace = require("./external/pace.js");

config.getDataSet(buildPortinari);

function buildPortinari() {

    /* ----------------------------- */
    /* ---  Initialization Stuff --- */
    /* ----------------------------- */

    var d3 = require("./external/d3.min.v4.js"),
        Reactor = require("./external/reactor.js");

    var Utils = require("./util/util.js");

    var reactor = new Reactor();

    /* --------------------- */
    /* ---  Query System --- */
    /* --------------------- */

    var QueryForm = require("./query_system/query_form.js"),
    QueryGraph = require("./query_system/query_graph.js");

    /* ---Internal Query System Events--- */
    reactor.registerEvent('selected_node_changed');
    reactor.registerEvent('constraint_added');
    reactor.registerEvent('outcome_added');
    reactor.registerEvent('global_added');
    reactor.registerEvent('update_graph');
    reactor.registerEvent('matching_changed');

    /* ---Internal Query System Selections--- */
    var query_graph_selection = d3.select("#query-interface-graph"),
        query_local_form_selection = d3.select("#query-local-interface-form"),
        query_local_current_selection = d3.select("#query-local-interface-current"),
        query_global_form_selection = d3.select("#query-global-interface-form"),
        query_global_current_selection = d3.select("#query-global-interface-current"),
        outcomes_form_selection = d3.select("#query-outcomes-form"),
        outcomes_current_selection = d3.select("#query-outcomes-current");

    /* ---Creates query graph interface--- */
    var query_graph = new QueryGraph(query_graph_selection, reactor);

    /* ---Creates query form interface--- */
    var query_form = new QueryForm(
        query_local_form_selection,
        query_local_current_selection,
        query_global_form_selection,
        query_global_current_selection,
        outcomes_form_selection,
        outcomes_current_selection,
        reactor);

    /* ------------------------------------ */
    /* ---  Cohort Inspection System  --- */
    /* ----------------------------------- */

    var PredictionForm = require("./sankey_visualization/prediction_form.js"),
        PredictionGraph = require("./sankey_visualization/prediction_graph.js");

    /* ---Internal Query System Events--- */
    reactor.registerEvent('query_successful');
    reactor.registerEvent('cohort_node_selected');
    reactor.registerEvent('cohort_node_unselected');
    /* ---------------------------------- */

    // Creates needed selections
    var form_get_cohort = d3.select("#form-get-cohort"),
        nodes_info_cohort_selection = d3.select("#nodes-info-cohort"),
        get_patterns_cohort = d3.select("#get-patterns-cohort"),
        show_patterns_cohort = d3.select("#show-patterns-cohort"),
        cohort_result = d3.select("#cohort-result");


    // Creates prediction form interface
    var prediction_form = new PredictionForm(
        form_get_cohort,
        nodes_info_cohort_selection,
        get_patterns_cohort,
        show_patterns_cohort,
        query_graph.graph, reactor);

    // Append the svg canvas to the page
    var prediction_graph = new PredictionGraph(
        cohort_result,
        reactor);

    /* ------------------------------------ */
    /* ---           Settings           --- */
    /* ----------------------------------- */

    var SettingsForm = require("./settings/settings_form.js");

    // Creates needed selections
    var dataset_choice = d3.select("#dataset-choice"),
        matching_choice = d3.select("#matching-choice");

    var settings_form = new SettingsForm(matching_choice, dataset_choice, reactor);


    Utils.makeVisible("#loader_d", "#content_d");
}

var display = {

    "-2": {text: "Origin", color: "#00ffff"},
    "-1": {text: "Nothing", color: "#00cccc"},
    "11": {text: "HPV+", color: "#cc0066"},
    "12": {text: "HPV-", color: "#ff80bf"},
    "13": {text: "HPV?", color: "#5c8a8a"},
    "15": {text: "Cyt: Normal", color: "#d6e0f5"},
    "16": {text: "Cyt: Low-grade", color: "#2d59b9"},
    "18": {text: "Cyt: High-grade", color: "#234590"},
    "19": {text: "Cyt: AGUS/ACIS", color: "#0f1e3e"},
    "23": {text: "Cyt: Metastasis", color: "#5353c6"},
    "25": {text: "Hist: Normal", color: "#3939ac"},
    "31": {text: "Hist: High-Grade", color: "#2d2d86"},
    "33": {text: "Hist: Irregular", color: "#5c8a8a"},
    "36": {text: "Cancer", color: "#19194d"}
};



var diagnosis1 = [
    ["11", "HPV: Positive"],
    ["12", "HPV: Negative"],
    ["13", "HPV: Unsatisfactory"],
    ["15", "Cyt: Normal"],
    ["16", "Cyt: Low-grade"],
    ["18", "Cyt: High-grade"],
    ["19", "Cyt: AGUS/ACIS"],
    ["23", "Cyt: Metastasis"],
    ["25", "Hist: Normal"],
    ["31", "Hist: High-Grade"],
    ["33", "Hist: Irregular"],
    ["36", "Cancer"]
];

var region = [
    ["1", "South-East"],
    ["2", "Middle"],
    ["3", "West"],
    ["4", "North"],
    ["9", "Unknown"]
];

var stage = [
    ["100", "Stage 1"],
    ["110", "Stage 1a"],
    ["111", "Stage 1a1"],
    ["112", "Stage 1a22"],
    ["120", "Stage 1b"],
    ["200", "Stage 2"],
    ["210", "Stage 2a"],
    ["220", "Stage 2b2"],
    ["300", "Stage 3"],
    ["310", "Stage 3a"],
    ["320", "Stage 3b"],
    ["400", "Stage 4"],
    ["410", "Stage 4a"],
    ["420", "Stage 4b"],
    ["900", "Unknown stage"],
    ["999", "Unspecified stage"]
];

var type = [
    ["cyt", "Cytological Smear"],
    ["hist", "Histological Sample"],
    ["hpv", "HPV Test"],
    ["cancer", "Cancer Diagnosis"]
];

var node_attributes = [
        {name: "age", display: "Age", type: "month"},
        {name: "birthdate", display: "Birthdate", type: "month"},
        {name: "censordate", display: "Censor Date", type: "month"},
        {name: "diagnosisdate", display: "Diagnosis Date", type: "month"},
        {name: "diagnosis1", display: "Diagnosis", type: "diagnosis1"},
        {name: "diagnosis2", display: "Morphology Code", type: "number"},
        {name: "lab_nr", display: "Laboratory Number", type: "number"},
        {name: "reg", display: "Region", type: "region"},
        {name: "stage", display: "Stage", type: "stage"},
        {name: "type", display: "Type of Exam", type: "type"}
    ];

var query_attributes = [
        {name: "diagnosis1", display: "Diagnosis", type: "diagnosis1"},
    ];

var edge_attributes = [
        {name: "sincelast", display: "Time Interval", type: "number"},
        {name: "type", display: "Exam Interval", type: "number"}
    ];

var constraints = {
    "month": {
        operators: [[">", "bigger"], ["<", "smaller"]],
        values: "month"
    },
    "diagnosis1": {
        operators: [["==", "is"], ["<>", "is not"]],
        values: diagnosis1
    },
    "region": {
        operators: [["==", "is"], ["<>", "is not"]],
        values: region
    },
    "stage": {
        operators: [["==", "is"], ["<>", "is not"]],
        values: stage
    },
    "type": {
        operators: [["==", "is"], ["<>", "is not"]],
        values: type
    },
    "number": {
        operators: [[">", "bigger"], ["<", "smaller"], ["==", "is"]],
        values: "number"
    }
};

module.exports = {

    VIEW_QUERY_GRAPH: {
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
        delete: 68
    },

    VIEW_QUERY_FORM: {

        "Node": node_attributes,

        "Edge": edge_attributes,

        types: constraints

    },

    VIEW_PREDICTION_FORM: {
        "Node": query_attributes
    },


    VIEW_PREDICTION_GRAPH: {
        display: display
    },

    "ID": "ID"


};
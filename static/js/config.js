var display = {
    "-2": {text: "Origin", color: "#00ffff"},
    "-1": {text: "Nothing", color: "#00cccc"},
    "0": {text: "HPV+", color: "#cc0066"},
    "1": {text: "HPV-", color: "#ff80bf"},
    "9": {text: "HPV?", color: "#5c8a8a"},
    "11": {text: "Cyt: Normal", color: "#d6e0f5"},
    "12": {text: "Cyt: ASC-US", color: "#98b1e6"},
    "13": {text: "Cyt: LSIL", color: "#6f92dc"},
    "14": {text: "Cyt: ASC-H", color: "#4673d2"},
    "15": {text: "Cyt: AGUS/ACIS", color: "#2d59b9"},
    "16": {text: "Cyt: HSIL", color: "#234590"},
    "17": {text: "Cyt: Cancer", color: "#193167"},
    "18": {text: "Cyt: Metastasis", color: "#0f1e3e"},
    "10": {text: "Cyt/Hist?", color: "#5c8a8a"},
    "20": {text: "Hist: Benign", color: "#5353c6"},
    "21": {text: "Hist: Polyp", color: "#3939ac"},
    "22": {text: "Hist: Benign w/ a", color: "#2d2d86"},
    "30": {text: "Hist: Unsure B.", color: "#5c8a8a"},
    "31": {text: "Hist: CIN1", color: "#19194d"},
    "32": {text: "Hist: CIN2", color: "#131339"},
    "33": {text: "Hist: CIN3", color: "#0d0d26"},
    "34": {text: "Hist: Irregular", color: "#3d0099"},
    "99": {text: "Hist: Unknown", color: "#330080"},
    "35": {text: "Hist: ACIS", color: "#330080"},
    "41": {text: "Cancer: SCC", color: "#336600"},
    "42": {text: "Adenocarcinoma", color: "#264d00"},
    "43": {text: "Cancer: Other", color: "#1a3300"}
};

var diagnosis1 = [
    ["0", "HPV: Positive"],
    ["1", "HPV: Negative"],
    ["9", "HPV: Unsatisfactory"],
    ["11", "Cyt: Normal"],
    ["12", "Cyt: ASC-US"],
    ["13", "Cyt: LSIL"],
    ["14", "Cyt: ASC-H"],
    ["15", "Cyt: AGUS/ACIS"],
    ["16", "Cyt: HSIL"],
    ["17", "Cyt: Cancer"],
    ["18", "Cyt: Metastasis"],
    ["10", "Cyt/Hist: Unsatisfactory"],
    ["20", "Hist: Benign"],
    ["21", "Hist: Polyp"],
    ["22", "Hist: Beningn without atypia"],
    ["30", "Hist: Unsure B."],
    ["31", "Hist: CIN1"],
    ["32", "Hist: CIN2"],
    ["33", "Hist: CIN3"],
    ["34", "Hist: Irregular"],
    ["35", "Hist: ACIS"],
    ["99", "Hist: Unknown Morphology"],
    ["41", "Canc: Squamous cell carcinoma"],
    ["42", "Adenocarcinoma"],
    ["43", "Canc: Other Cancers"]
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
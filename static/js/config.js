var display = {
    '-3': {'text': 'Other', 'color': '#294F6D'},
    '-2': {'text': 'Origin', 'color': '#123652'},
    '-1': {'text': 'Did Not Return', 'color': '#042037'},
    '0': {'text': 'HPV Negative', 'color': '#D46A6A'},
    '1': {'text': 'HPV Positive', 'color': '#8015'},
    '2': {'text': 'HPV Unsatisfactory', 'color': '#FFAAAA'},
    '3': {'text': 'Cytology Normal', 'color': '#D49A6A'},
    '4': {'text': 'Cytology Low-Grade', 'color': '#804515'},
    '5': {'text': 'Cytology High-Grade', 'color': '#552700'},
    '6': {'text': 'Histology Benign', 'color': '#407F7F'},
    '7': {'text': 'Histology Low-Grade', 'color': '#0D4D4D'},
    '8': {'text': 'Histology High-Grade', 'color': '#003333'},
    '9': {'text': 'Cancer', 'color': '#2D882D'}
};

var diagnosis1 = [
        ['0', 'HPV Negative'],
        ['1', 'HPV Positive'],
        ['2', 'HPV Unsatisfactory'],
        ['3', 'Cytology Normal'],
        ['4', 'Cytology Low-grade'],
        ['5', 'Cytology High-grade'],
        ['6', 'Histology Benign'],
        ['7', 'Histology Low-grade'],
        ['8', 'Histology High-grade'],
        ['9', 'Cancer']
    ];

var node_attributes = [
    {name: "age", display: "Age", type: "number"},
    {name: "birthdate", display: "Birthdate", type: "number"},
    {name: "diagnosisdate", display: "Diagnosis Date", type: "number"},
    {name: "diagnosis1", display: "Diagnosis", type: "diagnosis1"}
];

var query_attributes = [
    {name: "diagnosis1", display: "Diagnosis", type: "diagnosis1"}
];

var edge_attributes = [
    {name: "sincelast", display: "Time Interval", type: "number"},
    {name: "type", display: "Exam Interval", type: "number"}
];

var constraints = {
    "diagnosis1": {
        operators: [["==", "is"], ["<>", "is not"]],
        values: diagnosis1
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
        nodeRadius: 30,
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
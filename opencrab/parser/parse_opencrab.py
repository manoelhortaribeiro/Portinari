import csv

# TODO: document this script better

def write_nodes_and_rels(path, nodes, edges, node_values, edge_values):

    nodes_writer = csv.writer(open(path + 'events.csv', 'w'))
    edges_writer = csv.writer(open(path + 'nexts.csv', 'w'))

    node_values_names = []
    edge_values_names = []

    for i1, i2, i3 in node_values:
        node_values_names.append(i1 + i2)

    for i1, i2, i3 in edge_values:
        edge_values_names.append(i1 + i2)

    nodes_writer.writerow(["NodeID:id(Event)", ":LABEL"] + node_values_names)
    edges_writer.writerow([":START_ID(Event)", ":END_ID(Event)", ":TYPE"] + edge_values_names)
    count = 0

    for patient, links in zip(nodes, edges):
        tmp = []

        flag = True

        for event in patient:

            labels = "Event"

            if flag:
                labels += ";First"
                flag = False

            tmp.append(count)
            nodes_writer.writerow([count, labels] + event)
            count += 1

        for i in range(len(tmp)):
            for j in range(i+1, len(tmp)):

                acc = 0
                for val in links[i:j]:
                    acc += int(val[0])

                edges_writer.writerow([tmp[i], tmp[j], "Next"+str(j-i), acc])


def parse_opencrab(path_src, path_out, id_value,
                   event_date, start_date, end_date,
                   node_values, edge_values):
    # Open the file
    file = open(path_src, 'r')
    csvfile = csv.DictReader(file)

    # Initialize auxiliary values
    f_nodes = []
    f_edges = []
    id_v = None

    count = 0

    for row in csvfile:

        if event_date is not None:
            if int(row[event_date]) < start_date or int(row[event_date]) > end_date:
                continue

        count += 1

        if id_v is not None and count % 50000 == 0:
                print(id_v)

        tmp_nodes = []
        tmp_edges = []

        if id_v is not None and id_v != int(row[id_value]):
            f_nodes.append(nodes)
            f_edges.append(edges)

        # First case: id_v not initialized
        if id_v is None or id_v != int(row[id_value]):
            nodes = []
            edges = []
            id_v = int(row[id_value])

            for i in node_values:
                tmp_nodes.append(row[i[0]])
            nodes.append(tmp_nodes)
        else:
            for i in node_values:
                tmp_nodes.append(row[i[0]])
            nodes.append(tmp_nodes)

            for i in edge_values:
                tmp_edges.append(row[i[0]])
            edges.append(tmp_edges)

    write_nodes_and_rels(path_out, f_nodes, f_edges, node_values, edge_values)

parse_opencrab("./processed_data/opencrabunix.csv", "../data/output/", id_value="ID",
               event_date="diagnosisdate", start_date=10957, end_date=14610,
               node_values=[("ID", ":int", int),
                            ("birthdate", ":int", int),
                            ("diagnosisnumber", ":int", int),
                            ("censordate", ":int", int),
                            ("type", "", str),
                            ("diagnosis1", ":int", int),
                            ("diagnosis2", ":int", int),
                            ("stage", ":int", int),
                            ("lab_nr", ":int", int),
                            ("diagnosisdate", ":int", int),
                            ("age", ":int", int)],
               edge_values=[("sincelast", ":int", int)])

import csv


def write_nodes_and_rels(path, nodes, edges, node_values, edge_values):

    nodes_writer, edges_writer = csv.writer(open(path + 'events.csv', 'w')), csv.writer(open(path + 'nexts.csv', 'w'))
    node_values_names, edge_values_names = [], []

    for i1, i2, i3 in node_values:
        node_values_names.append(i1 + i2)

    for i1, i2, i3 in edge_values:
        edge_values_names.append(i1 + i2)

    nodes_writer.writerow(["NodeID:id(Event)", ":LABEL"] + node_values_names)
    edges_writer.writerow([":START_ID(Event)", ":END_ID(Event)", ":TYPE"] + edge_values_names)
    count = 0

    for patient, links in zip(nodes, edges):

        tmp, flag = [], True


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
                    acc += int(val[0])

                edges_writer.writerow([tmp[i], tmp[j], "Next"+str(j-i), acc])


def parse_opencrab(path_src, path_out, id_value, node_values, edge_values):

    # Open the file
    csvfile = csv.DictReader(open(path_src, 'r'))
    f_nodes, f_edges, id_v, count = [], [], None, 0

    for row in csvfile:

        tmp_nodes, tmp_edges, count = [], [], count + 1

        if id_v is not None and id_v != int(row[id_value]):
            f_nodes.append(nodes)
            f_edges.append(edges)

        # First case: id_v not initialized
        if id_v is None or id_v != int(row[id_value]):

            nodes, edges, id_v = [], [], int(row[id_value])

            for i in node_values:
                if len(row[i[0]]) != 0:
                    tmp_nodes.append(i[2](row[i[0]]))
                else:
                    tmp_nodes.append(row[i[0]])
            nodes.append(tmp_nodes)
        else:
            for i in node_values:
                if len(row[i[0]]) != 0:
                    tmp_nodes.append(i[2](row[i[0]]))
                else:
                    tmp_nodes.append(row[i[0]])
            nodes.append(tmp_nodes)

            for i in edge_values:
                if len(row[i[0]]) != 0:
                    tmp_edges.append(i[2](row[i[0]]))
                else:
                    tmp_edges.append(row[i[0]])
            edges.append(tmp_edges)

    write_nodes_and_rels(path_out, f_nodes, f_edges, node_values, edge_values)


def treat_float(a):
    tmp = a.find('.')
    return int(a) if tmp == -1 else int(a[:tmp])


if __name__ == "__main__":

    parse_opencrab("../raw_data/sample.csv",
                   "../output/",
                   id_value="ID",
                   node_values=[("ID", ":int", treat_float),
                                ("birthdate", ":int", treat_float),
                                ("diagnosis1", ":int", treat_float),
                                ("diagnosisdate", ":int", treat_float),
                                ("age", ":int", treat_float)],
                   edge_values=[("sincelast", ":int", treat_float)])

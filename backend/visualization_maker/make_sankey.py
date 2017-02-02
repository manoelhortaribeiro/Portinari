from json import dumps


def new_sankey(individuals, graph, paths, config, rr):
    sankey = {"nodes": [], "links": []}
    acc, mapping = 1, {}

    # Adds no-return node
    sankey["nodes"].append({"node": 0, "name": "None", "identifier": config["nan"]})

    for path in paths:
        for node in path:
            if node not in mapping:
                print(graph.get_node_desc(node))
                sankey["nodes"].append({"node": acc,
                                        "name": graph.get_node_desc(node),
                                        "identifier": node,
                                        "rr": rr[node]})
                mapping[node] = acc
                acc += 1

    ind_number = {}
    for path in paths:
        for n in path[:-1]:
            ind_number[n] = len(individuals[n])

    for path in paths:
        for n1, n2 in zip(path[:-1], path[1:]):
            v_n1 = len(individuals[n1])
            v_n2 = len(individuals[n2])

            print(mapping[n1], mapping[n1], v_n1)
            print(mapping[n1], mapping[n2], v_n2)

            sankey["links"].append({"source": mapping[n1],
                                    "target": mapping[n2],
                                    "value": v_n2,
                                    "name": graph.get_edge_desc(n1,n2)})
            ind_number[n1] -= v_n2

    for path in paths:
        for n in path[:-1]:
            if ind_number[n] == 0:
                print("non.null:", n)
            if ind_number[n] > 0:
                sankey["links"].append({"source": mapping[n], "target": 0, "value": ind_number[n]})

    return dumps(sankey)

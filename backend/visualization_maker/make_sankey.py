from json import dumps

def new_sankey(individuals, paths):
    sankey = {"nodes": [], "links": []}
    iterated = []

    for path in paths:
        for node in path:
            if node not in iterated:
                sankey["nodes"].append({"node": node, "name": str(node)})
                iterated.append(node)

    for path in paths:
        for n1, n2 in zip(path[:-1], path[1:]):
            v_n1 = len(individuals[n1])
            v_n2 = len(individuals[n2])

            print(v_n1)
            print(n1)
            print(v_n2)

            sankey["links"].append({"source": n1, "target": n2, "value": v_n2})

    return dumps(sankey)

class Graph:
    calculated_paths = []

    def __init__(self, nodes, edges):
        self.nodes = dict()
        self.edges = dict()
        self.edges_aux = dict()

        for node in nodes:
            self.nodes[node['id']] = (node, [], [])  # out, in

        for edge in edges:
            self.edges[edge['id']] = edge
            self.edges_aux[(edge['src']['id'], edge['dst']['id'])] = edge
            self.nodes[edge['src']['id']][1].append(edge['id'])  # out
            self.nodes[edge['dst']['id']][2].append(edge['id'])  # in

    def make_maximal_paths(self):

        initial_nodes = []
        for i in self.nodes.keys():
            if len(self.nodes[i][2]) == 0:
                initial_nodes.append(i)

        for initial_node in initial_nodes:
            Graph.get_all_paths(initial_node, self.nodes, self.edges)

        paths = list(Graph.calculated_paths)
        Graph.calculated_paths = []
        return paths

    def get_node(self, number):
        return self.nodes[number][0]

    def get_edge(self, number1, number2):
        return self.edges_aux[(number1, number2)]

    @staticmethod
    def get_all_paths(current_node, nodes, edges, acc=[]):

        nacc = list(acc)
        nacc.append(current_node)
        edges_out = nodes[current_node][1]

        if len(edges_out) == 0:
            Graph.calculated_paths.append(nacc)
            return

        for edge in edges_out:
            Graph.get_all_paths(edges[edge]['dst']['id'], nodes, edges, nacc)


def parse_sequence(nodes, edges, pred_attr, future_nodes, id_attr, begin_date, end_date):
    graph = Graph(nodes, edges)

    paths = graph.make_maximal_paths()

    query = ""

    for path in paths:

        for step in path:
            node = graph.get_node(step)
            has_eq_const = False
            query += "MATCH ( {0}:{1} {{".format(node['name'], node['label'])
            for const in node['key_op_value']:
                if const[1] == '==':
                    query += " {0}:{1} ,".format(const[0], const[2])
                    has_eq_const = True
            query = query[:-1]
            if has_eq_const:
                query += "}"
            query += ")\n"

        for step1, step2 in zip(path[:-1], path[1:]):
            node1 = graph.get_node(step1)
            node2 = graph.get_node(step2)
            edge = graph.get_edge(step1, step2)

            next = ""
            for key in edge['key_op_value']:
                if key[0] == 'type' and key[1] == '==':
                    next = ":Next" + key[2]

            query += "MATCH ({0})-[{1}{2}]->({3})\n".format(node1['name'], edge['name'], next, node2['name'])

        for step in path:
            node = graph.get_node(step)
            name = node['name']
            for const in node['key_op_value']:
                if const[1] != "==":
                    query += "WHERE "
                    query += "{0}.{1} {2} {3}\n".format(name, const[0], const[1], const[2])

        for step1, step2 in zip(path[:-1], path[1:]):
            edge = graph.get_edge(step1, step2)
            name = edge['name']
            for const in edge['key_op_value']:
                if const[0] != "type":
                    query += "WHERE "
                    query += "{0}.{1} {2} {3}\n".format(name, const[0], const[1], const[2])

        last_spec_node = nodes.pop(-1)['name']

        range_future_nodes = list(range(int(future_nodes)))

        first_fut_node = "ft{0}".format(range_future_nodes[0])
        query += "MATCH ({0})-[first_future:Next1]->({1})\n".format(last_spec_node, first_fut_node)
        query += "WHERE first_future.sincelast >= {0} AND first_future.sincelast <= {1}\n".format(begin_date, end_date)
        for i, j in zip(range_future_nodes[:-1], range_future_nodes[1:]):
            query += "OPTIONAL MATCH (ft{0})-[:Next1]->(ft{1})\n".format(i, j)

        query += "RETURN COUNT(distinct {0}.{1}) as c0, -2 as p0,".format(last_spec_node, id_attr)

        for i in range_future_nodes:
            query += " ft{0}.{1} as p{3}, COUNT(distinct ft{0}.{2}) as c{3},".format(i, pred_attr, id_attr, i + 1)
        query = query[:-1] + "\n"

        query += "UNION\n"

    return query[:-6]


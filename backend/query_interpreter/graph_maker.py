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
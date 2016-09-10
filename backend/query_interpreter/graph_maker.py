class Graph:
    # Auxiliary global variable that will be used in the method to get all maximal paths.
    calculated_paths = []

    def __init__(self, nodes, edges):
        """ This creates a new graph based on nodes and edges.

        Nodes are placed into a dictionary in the form:
        * (self.nodes = ) node_id: ({node content}, [id of out edges], [id of in edges])

        Edges are placed into two dictionaries in the form:
        * (self.edges = ) edge_id: {edge content}
        * (self.edges_aux = ) (source node_id, destination node_id): {edge content}

        :param nodes: list of hashes that contain an id field.
        :param edges: list of hashes that contain information about two nodes. """

        self.nodes, self.edges, self.edges_aux = dict(), dict(), dict()

        for node in nodes:
            self.nodes[node['id']] = (node, [], [])  # out, in

        for edge in edges:
            self.edges[edge['id']] = edge
            self.edges_aux[(edge['src']['id'], edge['dst']['id'])] = edge
            self.nodes[edge['src']['id']][1].append(edge['id'])  # out
            self.nodes[edge['dst']['id']][2].append(edge['id'])  # in

    def get_node(self, number):
        """ This is an accessor to get a node based on its unique id.
        :param number: id of the node.
        :return: the node itself. """

        return self.nodes[number][0]

    def get_edge(self, number1, number2):
        """ This is an accessor to get an edge based the unique ids of its source or dest nodes.
        :param number1: id of the source node.
        :param number2: id of the destination node.
        :return: the edge itself. """

        return self.edges_aux[(number1, number2)]

    def make_maximal_paths(self):
        """ This function returns a list of the maximal paths of the graph.
        :return: list containing the indexes of the maximal paths. """

        initial_nodes = []
        for i in self.nodes.keys():
            if len(self.nodes[i][2]) == 0:
                initial_nodes.append(i)

        for initial_node in initial_nodes:
            Graph.get_all_paths(initial_node, self.nodes, self.edges)

        paths = list(Graph.calculated_paths)
        Graph.calculated_paths = []
        return paths

    @staticmethod
    def get_all_paths(current_node, nodes, edges, acc=[], switch_last=False):
        """ This function gets all paths possible starting from the given node. It also implements the undirected edge
        feature, where a undirected edge: (a)--(b) is equivalent to orderings a,b and b,a.
        :param current_node: current node to be inspected.
        :param nodes: hash containing all nodes.
        :param edges: hash containing all edges.
        :param acc: accumulator.
        :param switch_last: if we should switch the current node with the last in the accumulator or not.
        :return: it saves the paths in the graph global variable.
        """

        nacc = list(acc)
        nacc.append(current_node)
        edges_out = nodes[current_node][1]

        if switch_last:
            nacc[-1], nacc[-2] = nacc[-2], nacc[-1]

        if len(edges_out) == 0:
            Graph.calculated_paths.append(nacc)
            return

        for edge in edges_out:
            if edges[edge]['kind'] == 'directed':
                Graph.get_all_paths(edges[edge]['dst']['id'], nodes, edges, nacc)
            else:
                Graph.get_all_paths(edges[edge]['dst']['id'], nodes, edges, nacc)
                Graph.get_all_paths(edges[edge]['dst']['id'], nodes, edges, nacc, switch_last=True)

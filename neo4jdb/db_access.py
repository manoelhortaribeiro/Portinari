from py2neo import Graph
from py2neo.packages.httpstream import http


class Neo4jDatabase:
    """ This class defines the access to the Neo4jDatabase. """

    def __init__(self, password):
        """
        This constructor simply creates a instance of a graph using the py2neo database.
        :param password: password for the given database.
        :return: Nothing.
        """
        http.socket_timeout = 5000
        self.graph = Graph(password=password)

    def make_query(self, query):
        """
        This functions simply executes a query in the database with was initialized.
        :param query: string containing the query in Cypher language.
        :return: The result for the query. Usually a cursor.
        """
        return self.graph.run(query)

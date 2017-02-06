from backend.mining.simple_mining_set import SimpleMiningSet
import unittest
import pandas
from backend.mining.genmax import generate_initial
from backend.mining.pattern import Pattern


class TestMining(unittest.TestCase):

    @staticmethod
    def hand_made_dataset():
        array = [[1, 1, 0],
                 [1, 1, 1],
                 [0, 0, 0],
                 [0, 0, 0],
                 [0, 0, 1],
                 [1, 0, 0],
                 [1, 1, 1],
                 [0, 1, 1],
                 [0, 1, 1],
                 [0, 1, 0]]
        df = pandas.DataFrame(array, columns=list('ABC'))
        return SimpleMiningSet(df)

    def test_generate_initial(self):

        data_set = TestMining.hand_made_dataset()
        p1 = Pattern(['A'], [1])
        p2 = Pattern(['B'], [0])
        p3 = Pattern(['A'], [0])
        p4 = Pattern(['B'], [1])

        self.assertTrue(p1 not in generate_initial(data_set, 5))
        self.assertTrue(p2 not in generate_initial(data_set, 5))
        self.assertTrue(p3 in generate_initial(data_set, 6))
        self.assertTrue(p4 in generate_initial(data_set, 6))




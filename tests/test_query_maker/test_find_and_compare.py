from backend.query_maker.find_and_compare import match_time_sequence
import unittest


class TestFindAndCompare(unittest.TestCase):

    def test_simple_matches(self):
        f = match_time_sequence

        print(">> backend.query_maker.find_and_compare.match_time_sequence (1):")

        _str = "t0d11t0d10t0d15"
        _dia, _tim, _exm = [11, 10, 15], [(0, 0), (0, 0)], [(0, 100), (0, 100)]
        self.assertEqual(f(_str, _dia, _tim, _exm), (True, []))

        print("--> n skip, n time, n exam, n future - OK")

        _str = "t0d11t0d10t0d15t0d10t0d15"
        _dia, _tim, _exm = [11, 10, 15], [(0, 0), (0, 0)], [(0, 100), (0, 100)]
        self.assertEqual(f(_str, _dia, _tim, _exm), (True, [10, 15]))

        print("--> n skip, n time, n exam, y future - OK")

        _str = "t200d11t150d10t100d15"
        _dia, _tim, _exm = [11, 10, 15], [(125, 150), (100, 125)], [(1, 1), (1, 1)]
        self.assertEqual(f(_str, _dia, _tim, _exm), (True, []))

        print("--> n skip, y time, y exam, n future - OK")

        _str = "t200d11t150d10t100d15t200d11t122d11t15d10t111d15t1d1"
        _dia, _tim, _exm = [11, 10, 15], [(125, 149), (100, 125)], [(1, 2), (1, 1)]
        self.assertEqual(f(_str, _dia, _tim, _exm), (True, [1]))

        print("--> n skip, y time, y exam, y future - OK")

        _str = "t200d11t10d20t150d10t100d15"
        _dia, _tim, _exm = [11, 10, 15], [(125, 200), (100, 125)], [(2, 2), (1, 30)]
        self.assertEqual(f(_str, _dia, _tim, _exm), (True, []))

        print("--> y skip, y time, y exam, n future - OK")

        _str = "t200d11t10d20t150d10t100d15t0d15t1230d5"
        _dia, _tim, _exm = [11, 10, 15], [(125, 200), (100, 125)], [(2, 2), (1, 30)]
        self.assertEqual(f(_str, _dia, _tim, _exm), (True, [15, 5]))

        print("--> y skip, y time, y exam, y future - OK")

    def test_pathological_case(self):
        f = match_time_sequence

        print(">> backend.query_maker.find_and_compare.match_time_sequence: (2)")
        _str = "t10d11t10d10"*10
        _dia, _tim, _exm = [10, 11, 15], [(0, 10000000), (0, 10000000)], [(0, 100), (0, 100)]
        self.assertEqual(f(_str, _dia, _tim, _exm), (False, []))

        _str = "t10d11t10d10"*10
        _dia, _tim, _exm = [10, 11, 15], [(0, 20), (0, 20)], [(0, 100), (0, 100)]
        self.assertEqual(f(_str, _dia, _tim, _exm), (False, []))

        print("--> pathological case - OK")

    def test_unspecified_sequence(self):
        f = match_time_sequence

        print(">> backend.query_maker.find_and_compare.match_time_sequence (3):")

        _str = "t0d11t0d10t0d15t0d10"
        _dia, _tim, _exm = [11, -1, -1], [(0, 0), (0, 0)], [(0, 100), (0, 100)]
        self.assertEqual(f(_str, _dia, _tim, _exm), (True, [10]))

        _str = "t0d11t0d10t0d15t0d10"
        _dia, _tim, _exm = [11, -1, -1], [(0, 0), (0, 0)], [(0, 100), (0, 100)]
        self.assertEqual(f(_str, _dia, _tim, _exm), (True, [10]))

        _str = "t0d10t0d10t0d10t0d10t0d11t0d11"
        _dia, _tim, _exm = [10, -1, -1, 11], [(0, 0), (0, 0), (0, 0)], [(0, 100), (0, 100), (0, 100)]
        self.assertEqual(f(_str, _dia, _tim, _exm), (True, [11]))

        print("--> unspecified case - OK")

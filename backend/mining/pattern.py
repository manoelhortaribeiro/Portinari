import itertools


class Pattern:
    """
    This class represents a pattern, that is a set of attributes with a specific value.
    """

    def __init__(self, attributes, values, description=None):
        """
        Initializes a new pattern instance.
        :param attributes: list of attributes.
        :param values: list of values.
        """
        self.attributes = attributes
        self.values = values
        self.other = {}
        self.size = len(attributes)
        self.description = description

    def __repr__(self):
        """
        Gets string describing the pattern.
        :return: string.
        """
        s = "("
        for x, y in list(zip(self.attributes, self.values)):
            s += str(x) + ":" + str(y)
            s += " "
        s = s[:-1]
        if "sup" in self.other:
            s += " | sup:" + str(self.other["sup"])
        if "excitingness" in self.other:
            s += " | exc:" + str(self.other["excitingness"])[:4]
        s += ")"

        return s

    def __eq__(self, other):
        """
        Checks equality between two patterns.
        :param other: other pattern.
        :return: Whether the patterns are equal.
        """
        return self.attributes == other.attributes and self.values == other.values

    def __ne__(self, other):
        """
        Checks inequality between two patterns.
        :param other: other pattern.
        :return: Whether the patterns are unequal.
        """
        return not self.__eq__(other)

    def get_tuples(self):
        """
        Returns the attributes and values in form of a list of tuples:
        [(attr,value1), ... , (attrN,valueN)]
        :return: list of tuples with attr name and values.
        """
        return list(zip(*[self.attributes, self.values]))

    def unique_attributes(self):
        """
        Check if the attributes of the pattern are unique.
        :return: Whether the attributes of the pattern are unique.
        """

        return len(self.attributes) == len(set(self.attributes))

    def add(self, string, value):
        """
        Adds key/value tuple to the other hash,
        :param string: name of the measurement.
        :param value: value of the measurement.
        :return: Nothing
        """

        self.other[string] = value

    def get(self, string):
        """
        Gets a measurement of the pattern, this is defined by the dataset.
        :param string: name of the measurement desired.
        :return: the desired measurement.
        """

        return self.other[string]

    def get_nm_subpattern(self, index):
        """
        Gets the subpattern obtained by popping the attribute and the value on the i-th index
        :param index:
        :return:
        """

        tmp = Pattern(list(self.attributes), list(self.values))
        tmp.attributes.pop(index)
        tmp.values.pop(index)
        return tmp

    def get_all_nm_subpattern(self):
        """
        Get all sub-patterns of size n-1.
        :return: list containing the sub-patterns.
        """
        tmp = []
        for i in range(self.size):
            tmp.append(self.get_nm_subpattern(i))
        return tmp

    def is_sub_pattern(self, possible_super_pattern):

        self_zipped = list(zip(self.attributes, self.values))
        other_zipped = list(zip(possible_super_pattern.attributes, possible_super_pattern.values))

        for element in self_zipped:
            if element not in other_zipped:
                return False
        if possible_super_pattern.size >= self.size:
            return True
        else:
            return False

    @staticmethod
    def sort_on(patterns, measurement):
        return sorted(patterns, key=lambda x: x.other[measurement])

    @staticmethod
    def combine(pattern1, pattern2):
        """
        Combine two patterns: (A,1)(B,2)(C,3), (A,1)(B,2)(D,4) => (A,1)(B,2)(C,3)(D,4)
        :param pattern1: first pattern.
        :param pattern2: second pattern.
        :return: third combined pattern.
        """
        attr = pattern1.attributes[:-1] + [pattern1.attributes[-1]] + [pattern2.attributes[-1]]
        val = pattern1.values[:-1] + [pattern1.values[-1]] + [pattern2.values[-1]]
        return Pattern(attr, val)

    @staticmethod
    def generate_npn(n_pattern_set):
        """
        Generates n+1 pattern set.
        :param n_pattern_set: previous set.
        :return: new set.
        """

        np_pattern_set = []

        for p, q in itertools.combinations(n_pattern_set, 2):

            tmp = Pattern.combine(p, q)

            # Ignores repeated attributes
            if not tmp.unique_attributes():
                continue

            # Gets all sub-patterns
            all_nm = tmp.get_all_nm_subpattern()

            # Appends if all patterns of size n in the n+1 pattern are in the n-pattern set
            if all(x in n_pattern_set for x in all_nm):
                if tmp not in np_pattern_set:
                    np_pattern_set.append(tmp)

        return np_pattern_set

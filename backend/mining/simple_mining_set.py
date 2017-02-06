import pandas


class SimpleMiningSet:
    """
    This class represents the dataset that is used to calculate the support (and other stuff) for specific patterns.
    """

    def __init__(self, src, description=None):
        """
        Initializes a new dataset instance. The input dataframe or CSV should be of the type:

        TransactionID,Attr0,Attr1, ... ,AttrN
              0      , v00 , v01 , ... , v0N
              1      , v10 , v11 , ... , v1N
             ...     , ... , ... , ... , ...
              M      , vM0 , vM1 , ... , vMN

        Notice that the values cannot be empty if you input the dataframe (as there is no NaN in pandas int table), you
        should fill them before using this.

        The description is defined as follows:

         {"Attr0":
            {"Detailed Attr0":
                    {"possibleValue0":"Detailed possibleValue0", 
                     "possibleValue1":"Detailed possibleValue1"}
            }
        }

        :param src: src can be either a pandas dataframe or a the path to a csv file.
        :param description: dictionary providing information for each attribute, such as {Attr1: {"Detailed name":}}
        """

        self.description = description

        if type(src) is pandas.DataFrame:
            self.data = src
        else:
            raise ValueError('src should be of type pandas.DataFrame')

    def calculate_measures(self, pattern):
        """
        Calculates support as "sup".
        Get the values of a certain column.
        :param pattern: pattern to be used.
        :return: nothing.
        """
        pattern.add("sup", self._get_sup(pattern))


    def get_values_column(self, name):
        """
        Get the values of a certain column.
        :param name: name of the column.
        :return: values.
        """
        return self.data[name]

    def _get_sup(self, pattern, comparator="=="):
        """
        Gets the support of the instances which are == or != to the pattern

        :param pattern: pattern to be matched.
        :param comparator: "==" or "!=".
        :return: (support of positive instances, support of negative instances)
        """

        query_in = ""
        if comparator == "==":
            linker = "&"
        elif comparator == "!=":
            linker = "|"
        else:
            raise ValueError("comparator should be either '!=' or '=='")

        for a, v in zip(pattern.attributes, pattern.values):
            query_in += str(a) + comparator + str(v) + linker
        query_in = query_in[:-1]

        sup = len(self.data.query(query_in))

        return sup

    def columns(self):
        """
        This method returns the columns of the dataframe.
        :return: This method returns the columns of the dataframe.
        """
        return self.data.columns.values.tolist()

    def attributes(self):
        """
        This method returns the array of the attributes as a numpy array.
        :return: Array of predictors as numpy array.
        """
        return self.data[self.columns()].values


    # def _get_sup(self, pattern, comparator="=="):
    #     """
    #     Gets the support of the instances which are == or != to the pattern
    #
    #     :param pattern: pattern to be matched.
    #     :param comparator: "==" or "!=".
    #     :return: (support of positive instances, support of negative instances)
    #     """
    #
    #     query_in = ""
    #     if comparator == "==":
    #         linker = "&"
    #     elif comparator == "!=":
    #         linker = "|"
    #     else:
    #         raise ValueError("comparator should be either '!=' or '=='")
    #
    #     for a, v in zip(pattern.attributes, pattern.values):
    #         query_in += str(a) + comparator + str(v) + linker
    #     query_in = query_in[:-1]
    #
    #     unique_in = self.data.query(query_in)
    #     sup_x_d = unique_in.query(str(self.label) + "==" + str(self.positive)).count().values[0]
    #     sup_x_n = unique_in.query(str(self.label) + "==" + str(self.negative)).count().values[0]
    #
    #     return sup_x_d, sup_x_n
    #
    # def calculate_measures(self, pattern):
    #     """
    #     Calculates several measurements for a given pattern such as:
    #     -- local_sup = sup_e_d / (sup_e_d + sup_n_d)
    #     -- sup_e_d = instances where the pattern matched and the label was positive
    #     -- sup_e_n = instances where the pattern matched and the label was negative
    #     -- sup_n_d = instances where the pattern didn't match and the label was positive
    #     -- sup_n_n = instances where the pattern didn't match and the label was negative
    #     -- relative_risk = (sup_e_d/(sup_e_d + sup_e_n)) / (sup_n_d/(sup_n_d + sup_n_n))
    #     -- odds_ratio = (sup_e_d / sup_n_d) / (sup_e_n / sup_n_n)
    #     And store them in the pattern.
    #
    #     :param pattern: Pattern to be matched.
    #     :return: Nothing
    #     """
    #
    #     sup_e_d, sup_e_n = self._get_sup(pattern, "==")
    #     sup_n_d, sup_n_n = self._get_sup(pattern, "!=")
    #
    #     pattern.add("local_sup", sup_e_d / (sup_e_d + sup_n_d))
    #     pattern.add("sup_e_d", sup_e_d)
    #     pattern.add("sup_e_n", sup_e_n)
    #     pattern.add("sup_n_d", sup_n_d)
    #     pattern.add("sup_n_n", sup_n_n)
    #     pattern.add("relative_risk", (sup_e_d / (sup_e_d + sup_e_n)) / (sup_n_d / (sup_n_d + sup_n_n)))
    #     pattern.add("odds_ratio", (sup_e_d / sup_n_d) / (sup_e_n / sup_n_n))
    #
    # def columns(self):
    #     val = self.data.columns.values.tolist()
    #     val.remove(self.label)
    #     return val
    #
    # def get_values_column(self, name):
    #     return self.data[name]
    #
    # def print_pattern_set(self, pattern_set, order_by="relative_risk"):
    #
    #     pattern_set.sort(key=lambda x: x.get(order_by), reverse=True)
    #
    #     i = 0
    #
    #     for pattern in pattern_set:
    #
    #         print("Pattern {0}, RR:{1}, OR:{2}".format(i, round(pattern.get('relative_risk'), 2),
    #                                                    round(pattern.get('odds_ratio'), 2)))
    #
    #         if self.description is not None:
    #             for attribute, value in zip(pattern.attributes, pattern.values):
    #                 print(" - {0} = {1}".format(self.description[attribute][0], self.description[attribute][1][value]))
    #
    #         i += 1
    #
    # def target(self):
    #     """
    #     This method returns the array of the labels as a numpy array
    #     :return:
    #     """
    #     return self.data[self.label].values
    #
    # def predictor(self):
    #     """
    #     This method returns the array of the predictor variables as a numpy array.
    #     :return: Array of predictors as numpy array.
    #     """
    #     return self.data[self.columns()].values
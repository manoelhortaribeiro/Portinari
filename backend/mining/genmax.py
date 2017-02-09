from backend.mining.pattern import Pattern
import itertools


def generate(n_pattern_set):
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

        # TODO: check if this is right
        # Appends if all patterns of size n in the n+1 pattern are in the n-pattern set
        if all(x in n_pattern_set for x in all_nm):
            if tmp not in np_pattern_set:
                np_pattern_set.append(tmp)

    return np_pattern_set


def generate_initial(dataset, min_support):
    """
    This gets a dataset and generates the initial frequent pattern set.
    :param dataset: SimpleMiningSet object.
    :param min_support: minimum relative support.
    :return: return the initial risk pattern set and the initial frequent pattern set.
    """

    # Set the initial set to empty
    risk_pattern_set, n_pattern_set = [], []

    # Generates 1-Pattern set
    for row in dataset.columns():

        # Gets unique values for each attribute in the dataset
        unique_values = dataset.get_values_column(row).unique()
        patterns = unique_values

        for pattern in patterns:

            # Creates 1-Pattern
            tmp = Pattern([row], [pattern])

            # Prunes based on /local_sup/ and /relative_risk/
            if dataset.get_sup(tmp) >= min_support:
                n_pattern_set.append(tmp)

    return n_pattern_set


def prune(tmp, n_pattern_set, min_sup):
    """
    Prunes the pattern set based on local support, and on the anti-monotone property and the closure property of the
    local support.
    :param tmp: not pruned n+1 pattern set
    :param n_pattern_set: previous n pattern set.
    :param min_sup: minimum support.
    :return: pruned n+1 pattern set
    """
    np_pattern_set = []

    sup_pruned = list(filter(lambda x: x.get("local_sup") > min_sup, tmp))

    for p in sup_pruned:
        all_nm = p.get_all_nm_subpattern()
        in_n_pattern = list(filter(lambda x: x in all_nm, n_pattern_set))

        will_prune = False
        for sp in in_n_pattern:
            if p.get("sup_e_d") + p.get("sup_e_n") == sp.get("sup_e_d") + sp.get("sup_e_n") \
                    or p.get("sup_e_n") == sp.get("sup_e_n"):
                will_prune = True
                break

        if not will_prune:
            np_pattern_set.append(p)

    return np_pattern_set


def genmax(dataset, min_support, verbose=False):
    """
    This is the algorithm described in the paper:
     'Mining Risk Patterns in Medical Data', Jiuyong Li et. al
    :param dataset: Dataset class.
    :param min_support: Minimum support for the algorithm.
    :param verbose: if True, prints stuff.
    :return: Set of optimal risk patterns.
    """

    # Generate 1-pattern set
    risk_pattern_set, n_pattern_set = generate_initial(dataset, min_support)

    if verbose:
        print("")
        print("1-Pattern set:      ", n_pattern_set)

    while True:

        # Generates n-Pattern set
        tmp = generate(n_pattern_set)

        if verbose:
            print("Candidates:         ", tmp)
            print("")

        # Prune n-Pattern set
        n_pattern_set = prune(tmp, n_pattern_set, min_support)


        if verbose:
            print("n-Pattern set:      ", n_pattern_set)
            print("Risk Pattern set:   ", risk_pattern_set)

        if len(n_pattern_set) == 0:
            break

    return risk_pattern_set
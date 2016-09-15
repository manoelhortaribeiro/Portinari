from query_interpreter.graph_maker import Graph
import numpy as np
import config


def apply_matching(x):
    print(x['StringRep'])


def get_constraint(key_values, name, operator, not_found_return):
    for constraint in key_values:
        if constraint[0] == name and constraint[1] == operator:
            return constraint[2]
    return not_found_return


def get_query_matching_values(graph, paths):
    diags, times, exams = [], [], []

    for path in paths:
        is_first = True

        diag, time, exam = [], [], []

        for node1, node2 in zip(path[:-1], path[1:]):
            jnode1, jnode2 = graph.get_node(node1), graph.get_node(node2)
            # gets the first diagnosis
            if is_first:
                diagnosis = get_constraint(jnode1['key_op_value'], 'Diagnosis', '==', config.no_indexed_event)
                diag.append(int(diagnosis))
                is_first = False

            # gets the i-th diagnosis
            diagnosis = get_constraint(jnode2['key_op_value'], 'Diagnosis', '==', config.no_indexed_event)
            diag.append(int(diagnosis))

            jedge = graph.get_edge(node1, node2)

            # gets the (i-1th,i-th) exams bound
            exam_lb = get_constraint(jedge['key_op_value'], 'ExamType', '>', config.event_min)
            exam_ub = get_constraint(jedge['key_op_value'], 'ExamType', '<', config.event_max)
            exam.append((int(exam_lb), int(exam_ub)))

            # gets the (i-1th,i-th) time bound
            time_lb = get_constraint(jedge['key_op_value'], 'TimeSinceLast', '>', config.time_min)
            time_ub = get_constraint(jedge['key_op_value'], 'TimeSinceLast', '<', config.time_max)
            time.append((int(time_lb), int(time_ub)))

        diags.append(diag), times.append(time), exams.append(exam)

    print(diags, times, exams)
    return True


def filter_by_attributes(graph, paths, individuals_table, exams_table):
    # Filter by attributes
    individuals = None

    for path in paths:
        for node in path:
            json_node = graph.get_node(node)
            for constraint in json_node['key_op_value']:
                if constraint[0] == 'Diagnosis' and constraint[1] == '==':
                    tmp = exams_table.query("Diagnosis == " + constraint[2]).PatientID
                    if individuals is None:
                        individuals = tmp
                    else:
                        individuals = np.intersect1d(tmp, individuals)

    return individuals_table[individuals_table['PatientID'].isin(individuals)]


def get_individuals(nodes, edges, individuals_table, exams_table):
    # First creates the graph and the desired paths
    graph = Graph(nodes, edges)
    paths = graph.make_maximal_paths()

    # Get query matching string
    matching_string = get_query_matching_values(graph, paths)

    # Filter by attributes
    patients_of_interest = filter_by_attributes(graph, paths, individuals_table, exams_table)

    # pandas.DataFrame(patients_of_interest).apply(apply_matching, axis=1)

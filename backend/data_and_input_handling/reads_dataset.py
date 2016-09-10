import pandas


def reads_dataset(event_name, event_description, individuals_name, individuals_description):
    e_table = pandas.read_csv(event_name, sep=',', index_col=False, dtype=event_description, engine='c')
    i_table = pandas.read_csv(individuals_name, sep=',', index_col=False, dtype=individuals_description, engine='c')
    return e_table, i_table

import numpy as np

# Data and description for the event dataset
event_table_name = './data/exams_table.csv'
event_table_description = {'PatientID': np.uint32, 'DiagnosisDate': str,
                           'DiagnosisNbr': np.uint8, 'ExamType': str,
                           'Diagnosis': np.uint8, 'MorphologyCode': str,
                           'Stage': str, 'LaboratoryNbr': np.uint8,
                           'Region': np.uint8, 'TimeSinceLast': np.int16}

# Data and description for the table dataset
individuals_table_name = './data/patients_table.csv'
individuals_table_description = {'Birthdate': str, 'CensorDate': str,
                                 'PatientID': np.uint32, 'StringRep': str}

# Default value for no indexed events
no_indexed_event = -1

# Lower and upper bounds for the time
time_min, time_max = 0, 10000000

# Lower and upper bounds for the number of exams
event_min, event_max = 0, 50
import numpy as np

event_table_name = './data/exams_table.csv'
event_table_description = {'PatientID': np.uint32,
                           'DiagnosisDate': str,
                           'DiagnosisNbr': np.uint8,
                           'ExamType': str,
                           'Diagnosis': np.uint8,
                           'MorphologyCode': str,
                           'Stage': str,
                           'LaboratoryNbr': np.uint8,
                           'Region': np.uint8,
                           'TimeSinceLast': np.int16}

individuals_table_name = './data/patients_table.csv'
individuals_table_description = {'Birthdate': str,
                                 'CensorDate': str,
                                 'PatientID': np.uint32,
                                 'StringRep': str}

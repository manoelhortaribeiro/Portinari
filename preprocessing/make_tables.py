import pandas


def f(x):
    print('->', map(str, x['diagnosis1'].values))
    print('->', x['birthdate'].head(1).values[0])
    return pandas.Series(dict(PatientID=x['ID'].head(1).values[0],
                              Birthdate=x['birthdate'].head(1).values[0],
                              CensorDate=x['censordate'].head(1).values[0],
                              StringRep="{%s}" % ', '.join(map(str, x['diagnosis1'].values))
                            ))

tst = pandas.Series()

tst.mode()


number_threads = 5
df = pandas.read_csv('opencrab_processed_sample.csv')
patient_attributes = ['ID', 'birthdate', 'censordate']
patients_table_raw = df.groupby(['ID']).apply(f)

print(patients_table_raw.values)

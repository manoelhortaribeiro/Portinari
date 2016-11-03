import pandas

df = pandas.read_csv("count_exams_per_patient.csv")

df = df.groupby(['ID']).max()

df = df.reset_index()


print("Total: ", len(df))
print("Max number of exams in the same month was 1:    ", len(df.query("Count == 1")), " ~ ",
      round(len(df.query("Count == 1"))/len(df)*100,2), "%")

print("Max number of exams in the same month was 2:     ", len(df.query("Count == 2")), " ~  ",
      round(len(df.query("Count == 2"))/len(df)*100,2), "%")

print("Max number of exams in the same month was 3:      ", len(df.query("Count == 3")), " ~  ",
      round(len(df.query("Count == 3"))/len(df)*100,2), "%")

print("Max number of exams in the same month was bt 4:    ", len(df.query("Count >= 4")), " ~  ",
      round(len(df.query("Count >= 4"))/len(df)*100,2), "%")
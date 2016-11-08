import pandas

diagnosis1 = {0: 11,  1: 12,  9: 13, 10: 14, 11: 15, 12: 16, 13: 17, 14: 18, 15: 19, 16: 21, 17: 22, 18: 23, 10: 24,
              20: 25, 21: 26, 22: 27, 30: 28, 31: 29, 32: 31, 33: 32, 34: 33, 35: 34, 99: 35, 41: 36, 42: 37, 43: 38}

df = pandas.read_csv("./opencrab.csv")

table = df.values


for row in range(len(table)):
    table[row][5] = diagnosis1[table[row][5]]

df2 = pandas.DataFrame(table, columns=df.columns)

df2.to_csv('./opencrab_d.csv', index=False)

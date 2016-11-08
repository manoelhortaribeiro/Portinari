import pandas as pd
import random

display = {
    "-2": "Origin",
    "-1": "Nothing",
    "11": "HPV+",
    "12": "HPV-",
    "13": "HPV?",
    "15": "Cyt: Normal",
    "16": "Cyt: Low-grade",
    "18": "Cyt: High-grade",
    "19": "Cyt: AGUS/ACIS",
    "23": "Cyt: Metastasis",
    "25": "Hist: Normal",
    "31": "Hist: High-Grade",
    "33": "Hist: Irregular",
    "36": "Cancer"
}

comb = pd.read_csv('./combinations.csv')

val_list = []

for i in comb.values:
    val_list.append(str(i[0]).split('0'))

list_result = []
dict_result = {}
r = lambda: random.randint(0, 255)

for i in val_list:

    tmp = []
    for j in i:
        tmp.append(display[j])

    key = '0'.join(i)
    item = '\n'.join(tmp)

    list_result.append([key, item])
    dict_result[key] = {'text': item,'color': '#%02X%02X%02X' % (r(), r(), r()) }

print(list_result)
print(dict_result)

import numpy as np
import regex
import functools
import timeit
import sys


def recursive(_time, _diagnosis, time, diagnosis, exams_range, acc_time=0, acc_exams=0, first=True, p=0):
    if len(time) == 0:  # case 1: pattern ended, returns true
        return True, p

    if len(_time) == 0:  # case 2: string ended, returns false
        return False, p

    try:  # case 3: if first pattern element cannot be found, returns false
        start = _diagnosis.index(diagnosis[0])
        if not (exams_range[0][0] + acc_exams <= start + 1 <= exams_range[0][1] + acc_exams):
            return False, p

    except ValueError:
        return False, p

    # Sets success to false, sums the time skipped
    success, sum_time = (False, p), sum(_time[0:start + 1])
    total = sum_time + acc_time

    time_constraint = (time[0][0] <= total <= time[0][1])

    if time_constraint or first:  # If the time is right, or first, "enter"
        # print('> in')
        success = recursive(_time[start + 1:], _diagnosis[start + 1:],
                            time[1:], diagnosis[1:], exams_range[1:],
                            first=False, p=p + start + 1)

    if not success[0]:  # If it doesn't work, "outs"
        if first:  # If its the first, "outs" with acc=0 and first=True
            success = recursive(_time[start + 1:], _diagnosis[start + 1:], time, diagnosis, exams_range,
                                p=p + start + 1)
        else:  # If it is not, "outs" with acc=sum_time + acc, acc_exams +=1 and first=False
            success = recursive(_time[start + 1:], _diagnosis[start + 1:],
                                time, diagnosis, exams_range,
                                acc_exams=acc_exams + 1, acc_time=total, first=False, p=p + start + 1)

    return success


def match_time_sequence(string, diagnosis, time, exams_range):
    # appends 0 to the beginning of the time
    time = [(-sys.maxsize, sys.maxsize)] + time
    exams_range = [(-sys.maxsize, sys.maxsize)] + exams_range

    # splits both and separates the string
    split = regex.split('d|t', string)[1:]
    _time, _diagnosis = list(map(np.uint32, split[0:][::2])), list(map(np.uint8, split[1:][::2]))

    # print(_time, _diagnosis, exams_range)

    result = recursive(_time, _diagnosis, time, diagnosis, exams_range)

    # print(result[0], result[1], _diagnosis)

    return result[0], _diagnosis[result[1]:]


def check_exam_range(diagnosis_row, i, exams_range, diagnosis):
    back_range = (max(i - (exams_range[1] - exams_range[0] + 1), 0), max(i - exams_range[0] + 1, 0))
    if diagnosis in diagnosis_row[back_range[0]:back_range[1]]:
        return True
    else:
        return False


def check_time_range(diagnosis_row, i, time_range, _time_range, diagnosis):

    time_range_cum = np.cumsum(_time_range)
    lower_bound = time_range_cum - (time_range[0])
    upper_bound = time_range_cum - (time_range[1])
    interval = zip(lower_bound, upper_bound)
    print(list(interval))

    for up, low in interval:
        print(diagnosis in diagnosis_row[(low < time_range_cum) & ( time_range_cum > up)])


    interval = zip(lower_bound, upper_bound)
    print(list(interval))


    return True


def match_time_sequence_dynamic(string, diagnosis, time, exams_range):
    # appends 0 to the beginning of the time
    time = time + [(-100000, 100000)]
    exams_range = exams_range + [(-1000000, 1000000)]

    # splits both and separates the string
    split = regex.split('d|t', string)[1:]
    _time, _diagnosis = np.array(list(map(np.int32, split[0:][::2]))), np.array(list(map(np.uint16, split[1:][::2])))

    matrix = np.zeros((len(diagnosis), len(_diagnosis)), dtype=bool)

    for idx, row in enumerate(matrix):
        for idy, element in enumerate(row):
            if (idx == 0 or matrix[idx][idy - 1] is True) and diagnosis[idx] == _diagnosis[idy]:
                matrix[idx][idy] = True
            #if check_exam_range(_diagnosis, idy, exams_range[idx], diagnosis[idx]):
            #    matrix[idx][idy] = True

f = match_time_sequence_dynamic
g = match_time_sequence
print(">> backend.query_maker.find_and_compare.match_time_sequence: (2)")
_str =_str = "t0d13t123d12t61d13t457d11t424d11t700d11t426d11t823d11t699d11t793d11t487d20t0d11t396d11t89d20t580d11t1126d11t1035d11"

 #"t0d1t0d2t20d3t20d1d15d2d10d3d5d4"
_dia, _tim, _exm = [13, 11, 13], [(365, 1100), (365, 1100)], [(1, 4), (2, 4)]
partial = functools.partial(g, _str, _dia, _tim, _exm)
partial_d = functools.partial(f, _str, _dia, _tim, _exm)

print(timeit.timeit(partial, number=1000))
print(timeit.timeit(partial_d, number=1000))
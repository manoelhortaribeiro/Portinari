import csv
import datetime
import time


def to_unix(s):
    """
    This function receives either a date time in the format %d.%m.%Y or an empty string. In the first case it converts
    the timestamp to a unix time, whereas in the second it returns an empty string.
    :param s: Date string or empty string.
    :return: Number of days in the unix time or empty string.
    """
    day_ms = 86400
    return "" if s == "" else int(int(time.mktime(datetime.datetime.strptime(s, "%d.%m.%Y").timetuple())) / day_ms)


def pre_process(path, dest):
    """
    This function receives a path to an existing csv file and for an output csv file, which may exist or not.
    It calculates the time in between diagnosis taken by the same individual, adding a row called "sincelast" has the time
    in days since the individual's last diagnosis.
    :param path: Path to origin csv file.
    :param dest: Path to destination csv file.
    :return: Nothing
    """

    # Open files
    input_file, output_file = open(path, 'r'), open(dest, 'w')
    csv_in = csv.DictReader(input_file)
    csv_out = csv.DictWriter(output_file, csv_in.fieldnames + ["sincelast"])

    p_row_id, p_diag_date = -1, -1  # Silly control variables

    csv_out.writeheader()

    for row in csv_in:

        # Skips records without birth dates ( due to a bug in the dataset )
        if row["birthdate"] == "":
            continue

        # Calculates time in days since last diagnosis
        row["sincelast"] = to_unix(row["diagnosisdate"]) - to_unix(p_diag_date) if row["ID"] == p_row_id else 0

        p_diag_date, p_row_id = row["diagnosisdate"], row["ID"]  # Gets data for this row for the future iteration

        csv_out.writerow(row)


if __name__ == "__main__":
    pre_process("opencrab.csv", "opencrab_processed.csv")

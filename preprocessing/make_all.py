# # ---------------------------- # # # # #
# # AUTHOR: MANOEL HORTA RIBEIRO # # # # #
# # ---------------------------- # # # # #
# This script does the whole preprocessing of the two files. It has a lot of handwritten information on it. Basically it


from preprocessing.format_rows import rename, pre_process, merge_groups_parallel
from preprocessing.make_tables import make_tables_parallel
import json
import os


def make_all(config, int_steps=True):

    raw_dir = config["directory"]
    name = config["name"]

    # paths
    original_path = raw_dir + name
    changed_diagnosis = raw_dir + "change_diag_" + name
    preprocessed = raw_dir + "pre_" + name
    grouped = raw_dir + "pre_group_" + name
    entity_dest = raw_dir + "entity_" + name
    event_dest = raw_dir + "events_" + name

    # change diagnosis
    rename(path=original_path, dest=changed_diagnosis, config=config)

    # # pre-process the tables
    pre_process(path=changed_diagnosis, dest=preprocessed, config=config)

    # # group different diagnosis, drop rows
    merge_groups_parallel(path=preprocessed, dest=grouped, config=config)

    # # makes tables
    make_tables_parallel(source=grouped, patient_dest=entity_dest, exams_dest=event_dest, config=config)

    if int_steps is False:
        os.remove(changed_diagnosis)
        os.remove(preprocessed)
        os.remove(grouped)

if __name__ == "__main__":

    mixed_config = json.loads(open("./data/surveys/survey_both.json", "r").read())

    make_all(mixed_config)


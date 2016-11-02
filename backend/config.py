import numpy as np

# Default value for no indexed events
no_indexed_event = -1

# Lower and upper bounds for the time
time_min, time_max = 0, 10000000

# Lower and upper bounds for the number of exams
event_min, event_max = 0, 50

config_frontend = {"default": "./data/opencrab.json", "mock": "./data/mock.json"}

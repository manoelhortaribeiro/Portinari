#!/bin/bash

DATA=../output/

neo4j-import -Xms2G -Xmx4G \
--into $DATA/$1 \
--nodes $DATA/events.csv \
--relationships $DATA/nexts.csv \
--stacktrace \
--ignore-empty-strings true

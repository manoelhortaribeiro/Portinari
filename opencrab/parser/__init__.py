"""
This package contains a preprocessor that changes minor things in the data, such as making the timestamp
become a unix time integer (actually in days). It changes the raw data from

| opencrab
    | data
        | raw_data

Into better data that will be converted into a graph db in:

| opencrab
    | data
        | processed_data

It also has a parser that allows someone to transform the data in:

| opencrab
    | data
        | processed_data

Into nodes and relationships in:

| opencrab
    | data
        | output

Afterwards you can run the bashmagic.sh script to create the actual neo4j-database.
"""
__author__ = "Manoel Horta Ribeiro"

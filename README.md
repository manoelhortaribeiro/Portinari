## Portinari v0.1

Prototypical version of a screening data visualization tool for knowledge discovery. 

It uses Flask for the front-end and *Neo4j* as its database. The data from the cancer registry and its exportation tools are unfortunately not public, however a small sample of fake data is provided. To import the data, you first need to produce a dataset with only integers and floats:


    ID    diagnosisdate    diagnosis1    birthdate    age     sincelast
    1         271.6            3           -5.2       27.9       0.0
    1         284.6            4           -5.2       29.0      13.0
    1         287.6            3           -5.2       29.2       2.0
    
    
It is essential that you have an "ID value", then you can use the parser, to make it amenable to the neo4j importer, you can simply call something like:


    parse_opencrab("../raw_data/sample.csv",
                   "../output/",
                   id_value="ID",
                   node_values=[("ID", ":int", treat_float),
                                ("birthdate", ":int", treat_float),
                                ("diagnosis1", ":int", treat_float),
                                ("diagnosisdate", ":int", treat_float),
                                ("age", ":int", treat_float)],
                   edge_values=[("sincelast", ":int", treat_float)])

Where *treat_float* could be any function to make the value an integer, or to change the value in any way. Notice that the edge values betwee the first and second event should be stored on the second event:

    ID = 1
                       sincelast = 13.0               sincelast = 2.0
           (Event1) --------------------> (Event2) --------------------> (Event3) 
    diagnosisdate = 271.6           diagnosisdate = 284.6          diagnosisdate = 287.6
       diagnosis1 = 3                  diagnosis1 = 4                 diagnosis1 = 3
      birthdate = -5.2                birthdate = -5.2               birthdate = -5.2
         age = 27.9                     age = 29.0                     age = 29.2
        
  
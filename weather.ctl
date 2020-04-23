load data 
infile '/Users/matthew/Downloads/Safe-Roads-master/weather.csv' "str '\n'"
append
into table TIMEENTRY
fields terminated by ','
OPTIONALLY ENCLOSED BY '"' AND '"'
trailing nullcols
           ( TIME CHAR(20),
             CITY CHAR(20),
             HUMIDITY,
             PRESSURE,
             TEMPERATURE,
             WINDDIRECTION,
             WINDSPEED,
             DESCRIPTION CHAR(30)
           )

-- ALTER SESSION SET NLS_DATE_FORMAT = 'YYYY-MM-DD--HH24';
CREATE SCHEMA AUTHORIZATION sfrd
    CREATE TABLE City (
        city_name VARCHAR2(30),
        longitude NUMBER(15, 10),
        latitude NUMBER(15, 10),
        country VARCHAR2(30),
        CONSTRAINT city_pk PRIMARY KEY (city_name)
    )
    CREATE TABLE Accident (
        id VARCHAR(5),
        city VARCHAR2(40),
        time DATE,
        end_time DATE,
        tmc NUMBER(10),
        severity NUMBER(1),
        description VARCHAR2(255),
        CONSTRAINT accident_pk PRIMARY KEY (id),
        CONSTRAINT accident_fk FOREIGN KEY (city) REFERENCES City(city_name)
    )
    CREATE TABLE Weather (
        time DATE,
        city VARCHAR2(40),
        weather_description VARCHAR2(255),
        humidity NUMBER(3),
        pressure NUMBER(5),
        temperature NUMBER(10, 5),
        wind_direction NUMBER(3),
        wind_speed NUMBER(2),
        CONSTRAINT weather_pk PRIMARY KEY (time, city),
        CONSTRAINT weather_fk FOREIGN KEY (city) REFERENCES City(city_name)
    );

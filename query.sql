-- select the weather attributes of the most dangerous city
SELECT city, AVG(temperature), AVG(humidity)
FROM Weather
WHERE city IN (
    SELECT avg_sv.city
    FROM (
        SELECT city, AVG(severity) sev
        FROM Accident
        GROUP BY city
    ) avg_sv
    WHERE avg_sv.sev >= ALL(
        SELECT AVG(severity)
        FROM Accident
        WHERE city IN (
            SELECT DISTINCT city
            FROM Weather
        )
        GROUP BY city
    )
)
GROUP BY city;

-- select the weather attributes of the least dangerous city


-- Obtains average weather features for all accidents grouped by cities and days
SELECT AVG(feats.tmp) temp_avg, AVG(feats.tmpdiff) temp_range, AVG(feats.hu) humidity, AVG(feats.pr) pressure, AVG(feats.ws) wind_speed, AVG(feats.severity) severity
FROM ( 
    SELECT Acc.city city, EXTRACT(year from Acc.time) Year, EXTRACT(month from Acc.time) Month, EXTRACT(day from Acc.time) Day, Acc.severity severity, Wte.tmp tmp, Wte.tmpdiff tmpdiff, Wte.hu hu, Wte.pr pr, Wte.ws ws
    FROM Accident_Test Acc JOIN (
        SELECT city, EXTRACT(year from time) year, EXTRACT(month from time) month, EXTRACT(day from time) day, AVG(temperature) tmp, MAX(temperature) - MIN(temperature) tmpdiff, AVG(humidity) hu, AVG(pressure) pr, AVG(wind_speed) ws
        FROM Weather_test
        GROUP BY city, EXTRACT(year from time), EXTRACT(month from time), EXTRACT(day from time)
    ) Wte ON Acc.city = Wte.city AND EXTRACT(year from Acc.time) = Wte.year AND EXTRACT(month from Acc.time) = Wte.month AND EXTRACT(day from Acc.time) = Wte.day
) feats
GROUP BY feats.City, feats.Year, feats.Month, feats.Day;


SELECT AVG(feats.tmp) temp_avg, AVG(feats.tmpdiff) temp_range, AVG(feats.hu) humidity, AVG(feats.pr) pressure, AVG(feats.ws) wind_speed, AVG(feats.severity) severity
FROM ( 
    SELECT Acc.city city, EXTRACT(year from Acc.time) Year, EXTRACT(month from Acc.time) Month, EXTRACT(day from Acc.time) Day, Acc.severity severity, Wte.tmp tmp, Wte.tmpdiff tmpdiff, Wte.hu hu, Wte.pr pr, Wte.ws ws
    FROM Accident Acc JOIN (
        SELECT city, EXTRACT(year from time) year, EXTRACT(month from time) month, EXTRACT(day from time) day, AVG(temperature) tmp, MAX(temperature) - MIN(temperature) tmpdiff, AVG(humidity) hu, AVG(pressure) pr, AVG(wind_speed) ws
        FROM Weather
        GROUP BY city, EXTRACT(year from time), EXTRACT(month from time), EXTRACT(day from time)
    ) Wte ON Acc.city = Wte.city AND EXTRACT(year from Acc.time) = Wte.year AND EXTRACT(month from Acc.time) = Wte.month AND EXTRACT(day from Acc.time) = Wte.day
) feats
GROUP BY feats.City, feats.Year, feats.Month, feats.Day;

-- ALTER TABLE Weather
-- MODIFY city VARCHAR2(15);

SELECT AVG(feats.tmp) temp_avg, AVG(feats.tmpdiff) temp_range, AVG(feats.hu) humidity, AVG(feats.pr) pressure, AVG(feats.ws) wind_speed, AVG(feats.severity) severity
FROM ( 
    SELECT Acc.city city, TRUNC(Acc.time) time, Acc.severity severity, Wte.tmp tmp, Wte.tmpdiff tmpdiff, Wte.hu hu, Wte.pr pr, Wte.ws ws
    FROM Accident Acc JOIN (
        SELECT city, TRUNC(time) time, AVG(temperature) tmp, MAX(temperature) - MIN(temperature) tmpdiff, AVG(humidity) hu, AVG(pressure) pr, AVG(wind_speed) ws
        FROM Weather
        GROUP BY city, TRUNC(time)
    ) Wte ON Acc.city = Wte.city AND TRUNC(Acc.time) = Wte.time
) feats
GROUP BY feats.City, feats.time;

SELECT AVG(feats.tmp) temp_avg, AVG(feats.tmpdiff) temp_range, AVG(feats.hu) humidity, AVG(feats.pr) pressure, AVG(feats.ws) wind_speed, AVG(feats.severity) severity
FROM ( 
    SELECT Acc.city city, TRUNC(Acc.time) time, Acc.severity severity, Wte.tmp tmp, Wte.tmpdiff tmpdiff, Wte.hu hu, Wte.pr pr, Wte.ws ws
    FROM (SELECT * FROM Accident WHERE city='Dallas') Acc JOIN (
        SELECT city, TRUNC(time) time, AVG(temperature) tmp, MAX(temperature) - MIN(temperature) tmpdiff, AVG(humidity) hu, AVG(pressure) pr, AVG(wind_speed) ws
        FROM Weather
        WHERE city='Dallas'
        GROUP BY city, TRUNC(time)
    ) Wte ON Acc.city = Wte.city AND TRUNC(Acc.time) = Wte.time
) feats
GROUP BY feats.City, feats.time;
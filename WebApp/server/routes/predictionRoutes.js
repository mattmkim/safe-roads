module.exports = function(database) {
    var response = {};

    // query for obtaining predictions
    response.getPredictionQuery = async function(req, res) {
        let query = `SELECT AVG(feats.tmp) temp_avg, AVG(feats.tmpdiff) temp_range, AVG(feats.hu) humidity, AVG(feats.pr) pressure, AVG(feats.ws) wind_speed, AVG(feats.severity) severity
        FROM ( 
            SELECT Acc.city city, TRUNC(Acc.time) time, Acc.severity severity, Wte.tmp tmp, Wte.tmpdiff tmpdiff, Wte.hu hu, Wte.pr pr, Wte.ws ws
            FROM Accident Acc JOIN (
                SELECT city, TRUNC(time) time, AVG(temperature) tmp, MAX(temperature) - MIN(temperature) tmpdiff, AVG(humidity) hu, AVG(pressure) pr, AVG(wind_speed) ws
                FROM Weather
                GROUP BY city, TRUNC(time)
            ) Wte ON Acc.city = Wte.city AND TRUNC(Acc.time) = Wte.time
        ) feats
        GROUP BY feats.City, feats.time;`;
        const response = await database.execute(query);
        res.send(response);
    };

    // query for obtaining features of a user-specified city
    response.getPredictionQueryCity = async function(req, res) {
        var city = req.params.city;
        let query = `SELECT AVG(feats.tmp) temp_avg, AVG(feats.tmpdiff) temp_range, AVG(feats.hu) humidity, AVG(feats.pr) pressure, AVG(feats.ws) wind_speed, AVG(feats.severity) severity
        FROM ( 
            SELECT Acc.city city, TRUNC(Acc.time) time, Acc.severity severity, Wte.tmp tmp, Wte.tmpdiff tmpdiff, Wte.hu hu, Wte.pr pr, Wte.ws ws
            FROM (SELECT * FROM Accident WHERE city='${city}') Acc JOIN (
                SELECT city, TRUNC(time) time, AVG(temperature) tmp, MAX(temperature) - MIN(temperature) tmpdiff, AVG(humidity) hu, AVG(pressure) pr, AVG(wind_speed) ws
                FROM Weather
                WHERE city='${city}'
                GROUP BY city, TRUNC(time)
            ) Wte ON Acc.city = Wte.city AND TRUNC(Acc.time) = Wte.time
        ) feats
        GROUP BY feats.City, feats.time;`;
        const response = await database.execute(query);
        res.send(response);
    };

    response.getWeatherAccidentDeviations = async function(req, res) {
        console.log("called weather accident deviations. I.e query number 1 ");
        let query = `WITH severity (city, deviation) AS (SELECT acc_av.city as city, acc_av.average as deviation
            FROM (
            SELECT city, AVG(severity) as average 
            FROM Accident a
            GROUP BY city 
            ) acc_av
            ), 
            rain (city, deviation) AS (
            SELECT city_av.city as city, city_av.average as deviation
            FROM (
            SELECT city, AVG(humidity) as average 
            FROM Weather
            GROUP BY city
            ) city_av), 
            severityAverage(average) AS (SELECT AVG(severity) as average
              FROM Accident),
            humidityAverage(average) AS (SELECT AVG(humidity) as average
                 FROM Weather) 
            SELECT rain.city AS city, rain.deviation - humidityAverage.average AS rainDeviation, severity.deviation - severityAverage.average AS serverityDeviation
            FROM rain
            JOIN severity
            ON rain.city = severity.city
            CROSS JOIN severityAverage
            CROSS JOIN humidityAverage        
            `
        const response = await database.execute(query);
        res.send(response)
    }

    response.getPredictionKill = async function(req, res) {
        console.log("killing");
        const response = await database.close();
        res.send(response);
    }

    return response;
}

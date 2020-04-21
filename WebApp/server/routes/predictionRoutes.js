module.exports = function(database) {
    var response = {};

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
        res.send(response)
    }

    response.getPredictionKill = async function(req, res) {
        console.log("killing");
        const response = await database.close();
        res.send(response);
    }

    return response;
}
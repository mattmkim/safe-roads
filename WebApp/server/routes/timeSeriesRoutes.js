module.exports = function(database) {
    var response = {};

    response.getTimeSeriesQuery = async function(req, res) {
        let query = 
        `SELECT DISTINCT city
        FROM Weather
        ORDER BY city`;
        const response = await database.execute(query);
        res.send(response)
    }

    response.getTimeSeriesQueryCity = async function(req, res) {
        var city = req.params.city;
        console.log(city);
        let query = `
        SELECT A.year AS year, A.month AS month, AVG(A.severity) AS avg_severity, COUNT(*) AS num_accidents
        FROM ( 
            SELECT AccidentCity.city AS city, EXTRACT(year from AccidentCity.time) AS year, EXTRACT(month from AccidentCity.time) AS month, EXTRACT(day from AccidentCity.time) AS day, AccidentCity.severity AS severity
            FROM (SELECT * FROM Accident WHERE city='${city}') AccidentCity 
        ) A
        GROUP BY A.year, A.month
        ORDER BY A.year, A.month
        `;
        const response = await database.execute(query);
        res.send(response)
    }

    response.getTimeSeriesKill = async function(req, res) {
        console.log("killing");
        const response = await database.close();
        res.send(response);
    }

    return response;
}
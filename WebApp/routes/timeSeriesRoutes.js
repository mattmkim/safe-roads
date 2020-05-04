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
        WITH Temp AS (
            SELECT A.year AS year, A.month AS month, (12*A.year + A.month) AS id, (12*A.year + A.month) AS time, AVG(A.severity) AS avg_severity, COUNT(*) AS num_accidents
            FROM ( 
                SELECT AccidentCity.city AS city, EXTRACT(year from AccidentCity.time) AS year, EXTRACT(month from AccidentCity.time) AS month, EXTRACT(day from AccidentCity.time) AS day, AccidentCity.severity AS severity
                FROM (SELECT * FROM Accident WHERE city='${city}') AccidentCity 
            ) A
            GROUP BY A.year, A.month
            ORDER BY A.year, A.month
        )
        SELECT (FLOOR(Temp.time/12)) AS year, MOD(Temp.time,12) AS month, Temp.id AS id, Temp.time AS time, Temp.avg_severity AS severity, Temp.num_accidents AS accidents, Temp.avg_severity AS cum_severity, Temp.num_accidents AS cum_accidents
        FROM Temp
        `;
        // SELECT (Cumulative.time1/12) AS year, (Cumulative.time1%12) AS month, Cumulative.id AS id, Cumulative.time1 AS time, SUM(Cumulative.avg_severity1) AS cum_severity, SUM(Cumulative.num_accidents1) AS cum_accidents
        // FROM (
        //     SELECT Temp1.id AS id, Temp1.time AS time1, Temp2.time AS time2, Temp1.avg_severity AS avg_severity1, Temp2.avg_severity AS avg_severity2, Temp1.num_accidents AS num_accidents1, Temp2.num_accidents AS num_accidents2
        //     FROM Temp Temp1 JOIN Temp Temp2
        //     ON Temp1.id=Temp2.id AND Temp1.time>=Temp2.time
        // ) Cumulative
        // GROUP BY Cumulative.time1, Cumulative.time2
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
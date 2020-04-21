module.exports = function(database) {
    var response = {};

    // query for obtaining predictions
    response.getCityQuery = async function(req, res) {
        let query = 
        `SELECT DISTINCT(city)
        FROM Weather
        ORDER BY city;`;
        const response = await database.execute(query);
        res.send(response)
    }

    response.getCityKill = async function(req, res) {
        console.log("killing");
        const response = await database.close();
        res.send(response);
    }

    return response;
}
module.exports = function(database) {
    var response = {}
    response.getQuintileForCity = async function (req, res) {
        const cities = req.body.cities;
        var cityString = '(';
        cities.forEach((value) => {
            cityString += "'" + value.label + "', "
        });
        cityString = cityString.substring(0, cityString.length - 2);
        cityString += ")"
        console.log(cityString);
        const query = `WITH f(city, freq) AS ( 
            SELECT city, COUNT(*) as freq
            FROM Accident a
            GROUP BY city)
        SELECT ranks.city, ranks.rank 
        FROM 
        (SELECT city, FLOOR(1 + 5 * (row_number() OVER (ORDER BY freq) -1)/COUNT(*) OVER ()) AS rank
        FROM 
         f
        ) ranks
        WHERE ranks.city in ${cityString}`
        const response = await database.execute(query);
        res.send(response)     
    }
    return response

};
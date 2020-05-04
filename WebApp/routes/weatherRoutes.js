const request = require('request')

module.exports = function() {
    var response = {}
    response.getLiveWeatherUpdates = function (req, res) {
        console.log("getting live weather updates for " + req.body.city);
        let apiKey = 'f2c54155e73d34e51a0503c0c8d686e1';
        let city = req.body.city || 'San Francisco';
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        request(url, function (err, resp, body) {
            if(err) {
                console.log("Error with live data" + err);
                res.end();
            } else {
                console.log("successfully got live weather updates");
                res.json(body);
            }
        });
    }
    return response;
}


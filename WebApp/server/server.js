// if this file goes crazy, run killall node in a separate terminal to force save
var express = require('express');
var app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./oracle-db');
database.initialization();
var mongoose = require("mongoose");
var uri = "mongodb+srv://mattkim:minwoo123@cluster0-un1ah.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(uri);
mongoose.connection.on('connected', function() {
    console.log("connected to mongo db instance");
});

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//define models
var User = require('./models/user');

// various routes files for various call back functions 
var authRoutes = require('./routes/mongo/authroutes')(User);
var routes = require('./routes/testRoutes.js')(database);
var routes_city = require('./routes/cityRoutes.js')(database);
var predictionRoutes = require('./routes/predictionRoutes')(database);
var searchShowRoutes = require('./routes/searchShowRoutes')(database);
var timeSeriesRoutes = require('./routes/timeSeriesRoutes')(database);

// route handling
app.post('/api/checklogin/', authRoutes.check_login);
app.post('/api/signup/', authRoutes.signup);
app.post('/api/deleteprofile/', authRoutes.delete_profile);
app.get('/api/test', routes.getTestQuery);
app.get('/api/testKill', routes.getTestKill);
app.get('/api/city', routes_city.getCityQuery);
app.get('/api/cityKill', routes_city.getCityKill);
app.get('/api/prediction', predictionRoutes.getPredictionQuery);
app.get('/api/prediction/:city', predictionRoutes.getPredictionQueryCity);
app.get('/api/predictionKill', predictionRoutes.getPredictionKill);
app.get('/api/getWeatherAccidentDeviations', predictionRoutes.getWeatherAccidentDeviations);
app.post('/api/getQuintilesForCity', searchShowRoutes.getQuintileForCity);
app.post('/api/getSharedCodes', searchShowRoutes.getSharedCodes);
app.get('/api/timeSeries', timeSeriesRoutes.getTimeSeriesQuery);
app.get('/api/timeSeries/:city', timeSeriesRoutes.getTimeSeriesQueryCity);
app.get('/api/timeSeriesKill', timeSeriesRoutes.getTimeSeriesKill);
app.post('/api/testTimeSeries', predictionRoutes.runPredictionModel);

const listener = app.listen(5000);
// incase control c is not working some weird stuff
process.on('SIGINT', () => {
  listener.close(() => {
      process.exit(0)
  })
})
// Models
console.log('Server running on port 5000');
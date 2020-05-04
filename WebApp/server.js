// if this file goes crazy, run killall node in a separate terminal to force save
var express = require('express');
var app = express();
const cors = require('cors');

const path = require('path');
require('dotenv').config({ path: '.env' });
const port = process.env.PORT || 5000;

const bodyParser = require('body-parser');
const database = require('./oracle-db');
database.initialization();


var mongoose = require("mongoose");
var uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
mongoose.connection.on('connected', function() {
    console.log("connected to mongo db instance");
});

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.json());

//define models
var User = require('./models/user');

// various routes files for various call back functions 
var authRoutes = require('./routes/mongo/authroutes')(User);
var routes = require('./routes/testRoutes.js')(database);
var routes_city = require('./routes/cityRoutes.js')(database);
var predictionRoutes = require('./routes/predictionRoutes')(database);
var searchShowRoutes = require('./routes/searchShowRoutes')(database);
var timeSeriesRoutes = require('./routes/timeSeriesRoutes')(database);
var weatherRoutes = require('./routes/weatherRoutes')();

// route handling
app.post('/api/checklogin/', authRoutes.check_login);
app.post('/api/signup/', authRoutes.signup);
app.post('/api/deleteprofile/', authRoutes.delete_profile);
app.post('/api/updatecity/', authRoutes.update_city);
app.post('/api/getfavcity', authRoutes.get_fav_city);
app.get('/api/test', routes.getTestQuery);
app.get('/api/testKill', routes.getTestKill);
app.get('/api/city', routes_city.getCityQuery);
app.get('/api/cityKill', routes_city.getCityKill);
app.get('/api/prediction/:city', predictionRoutes.getPredictionQueryCity);
app.get('/api/predictionKill', predictionRoutes.getPredictionKill);
app.get('/api/getWeatherAccidentDeviations', predictionRoutes.getWeatherAccidentDeviations);
app.post('/api/getQuintilesForCity', searchShowRoutes.getQuintileForCity);
app.post('/api/getSharedCodes', searchShowRoutes.getSharedCodes);
app.get('/api/timeSeries', timeSeriesRoutes.getTimeSeriesQuery);
app.get('/api/timeSeries/:city', timeSeriesRoutes.getTimeSeriesQueryCity);
app.get('/api/timeSeriesKill', timeSeriesRoutes.getTimeSeriesKill);
app.post('/api/testTimeSeries', predictionRoutes.runPredictionModel);
app.post('/api/testRegressionDeviations', predictionRoutes.getWeatherAccidentRegressions);
app.post('/api/testLiveWeather', weatherRoutes.getLiveWeatherUpdates);

// const listener = app.listen(5000);
// // incase control c is not working some weird stuff
// process.on('SIGINT', () => {
//   listener.close(() => {
//       process.exit(0)
//   })
// })

// other app.use middleware : Static file declaration
app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
// if this file goes crazy, run killall node in a separate terminal to force save
var express = require('express');
var app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./oracle-db');
database.initialization();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// various routes files for various call back functions 
var routes = require('./routes/testRoutes')(database);

// route handling
app.get('/api/test', routes.getTestQuery);
app.get('/api/testKill', routes.getTestKill);

const listener = app.listen(5000);
// incase control c is not working some weird stuff
process.on('SIGINT', () => {
  listener.close(() => {
      process.exit(0)
  })
})
// Models
console.log('Server running on port 5000');
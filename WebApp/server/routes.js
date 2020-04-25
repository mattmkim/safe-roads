const oracledb = require('oracledb');
async function runRoutes() {
await oracledb.createPool({
    user: 'danieljkim',
    password: '12341234',
    connectionString: '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=saferoads-db.cey57dak54ay.us-east-1.rds.amazonaws.com)(PORT=1521))(CONNECT_DATA=(SID=SFROADDB)))'
});
const connection = await oracledb.getConnection();
return connection
}

const connection = runRoutes();
require('./routes/testRoutes.js')(app, connection);
require('./routes/cityRoutes.js')(app, connection);
require('./routes/predictionRoutes.js')(app, connection);
require('./routes/timeSeriesRoutes.js')(app, connection);
// const database = require('./oracle-db');
// try {
//     console.log('Initializing database module');
//     database.initialization(); 
   
//   } catch (err) {
//     console.error(err);
//     process.exit(1); // Non-zero failure code
//     }
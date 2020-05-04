const oracledb = require('oracledb');

async function initialization() {
    await oracledb.createPool({
        user: 'danieljkim',
        password: '12341234',
        connectionString: '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=saferoads-db.cey57dak54ay.us-east-1.rds.amazonaws.com)(PORT=1521))(CONNECT_DATA=(SID=SFROADDB)))'
    });
}

module.exports.initialization = initialization;

 
function simpleExecute(statement, binds = [], opts = {}) {
    return new Promise(async (resolve, reject) => {
      let conn;
   
      opts.outFormat = oracledb.OBJECT;
      opts.autoCommit = true;
   
      try {
        conn = await oracledb.getConnection();

        const result = await conn.execute(statement, binds, opts);
   
        resolve(result);
      } catch (err) {
        reject(err);
      } finally {
        if (conn) { // conn assignment worked, need to close
          try {
            console.log("closing");
            await conn.close();
            console.log("closed");
          } catch (err) {
            console.log(err);
          }
        }
      }
    });
  }

module.exports.execute = simpleExecute

async function close() {
    await oracledb.getPool().close();
  }
   
  module.exports.close = close;
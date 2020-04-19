
// initialize db
module.exports = function(database) {
    var response = {}

    response.getTestQuery = async function(req, res) {
        console.log("called test query");
        let query = `SELECT table_name from user_tables`
        const response = await database.execute(query);
        res.send(response)
    }

    response.getTestKill = async function(req, res) {
        console.log("killing");
        const response = await database.close();
        res.send(response);
    }

    return response;


}


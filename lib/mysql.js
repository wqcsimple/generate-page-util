/**
 * @author whis admin@wwhis.com
 * @Created 10/21/17
 */


let mysqlClient = null;

function client() {
    if (mysqlClient === null) {
        mysqlClient = require("knex")({
            client: 'mysql',
            connection: {
                host: "",
                user: "",
                password: "",
                database: ""
            },
            pool: {min: 0, max: 100}
        });
    }

    return mysqlClient;
}


let mysql = {
    client: client
};

module.exports = mysql;
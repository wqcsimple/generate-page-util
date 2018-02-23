/**
 * @author whis admin@wwhis.com
 * @Created 2/23/18
 */
const generateModel = require('../index');

let dbConfig = {
    host: "db",
    user: "root",
    password: "7",
    database: "data_collection",
    table: "admin",
    writePath: `${__dirname}/ejs`
};

generateModel(dbConfig);

/**
 * @author whis admin@wwhis.com
 * @Created 2/23/18
 */
const generateModel = require('../index').generateModel;

let dbConfig = {
    host: "db",
    user: "root",
    password: "7",
    database: "yeneiren",
    table: "message",
    writePath: `${__dirname}/ejs`
};

generateModel(dbConfig);

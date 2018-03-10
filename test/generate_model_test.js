/**
 * @author whis admin@wwhis.com
 * @Created 2/23/18
 */
const generateModel = require('../index').generateModel;

let dbConfig = {
    host: "db",
    user: "root",
    password: "7",
    database: "pinjia_shop",
    table: "project_target_data",
    writePath: `${__dirname}/ejs`
};

generateModel(dbConfig);

/**
 * @author whis admin@wwhis.com
 * @Created 2/23/18
 */
const generateModel = require('../index').generateModel;

let dbConfig = {
    host: "db",
    user: "root",
    password: "7",
    database: "hb-api",
    table: ['goods_brand'],
    writePath: `${__dirname}/ejs`
};

generateModel(dbConfig);



// let a = '1';
// let b = ['1'];
//
// console.log(typeof  a)
// console.log(Array.isArray(b))

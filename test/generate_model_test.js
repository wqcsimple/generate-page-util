/**
 * @author whis admin@wwhis.com
 * @Created 2/23/18
 */
const generateModel = require('../index').generateModel

// let dbConfig = {
//     host: "db",
//     user: "root",
//     password: "7",
//     database: "supervision_api",
//     table: ['case_call_log'],
//     writePath: `${__dirname}/ejs`
// };

let dbConfig = {
  host: '106.14.135.129',
  user: 'dev',
  password: 'rDbKU6Qy4XhwKpKl',
  database: 'cook_robot',
  table: ['account'],
  writePath: `${__dirname}/ejs`
}

generateModel(dbConfig)

// let a = '1';
// let b = ['1'];
//
// console.log(typeof  a)
// console.log(Array.isArray(b))

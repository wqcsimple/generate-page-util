/**
 * @author whis admin@wwhis.com
 * @Created 2/23/18
 */
const generateTable = require('../index').generateTable;

let config = {
    host: "db",
    user: "root",
    password: "7",
    database: "test",
    tables: [
        {
            tableName: "user",
            tableComment: "用户表",
            columns: [
                {col: "name", type: "varchar", length: "99", default: "", comment: "姓名"},
                {col: "age", type: "int", length: "11", default: "0", comment: "年龄"},
                {col: "type", type: "bigint", length: "11", default: "0", comment: "类型"},
                {col: "amount", type: "decimal", length: "11", default: "0", comment: "金额"},
                {col: "content", type: "text", length: "", default: "", comment: "金额"},
                {col: "money", type: "double", length: "", default: "", comment: "钱"},
            ]
        }
    ]
};

generateTable(config);


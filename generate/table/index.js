const Log = require('../../lib/logger');
const Sequelize = require('sequelize');

function generateTable(config) {
    if (!config) {
        Log.e("db config is not set");
        return false;
    }
    if (typeof config !== 'object') {
        Log.e('options must be a object.');
        return false;
    }
    
    let dbConfig = {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
    };
    
    let tableList = config.tables;
    if (!tableList || tableList.length <= 0) {
        Log.e('no create Table');
        return false;
    }
    
    let mysql = mysqlFun.init(dbConfig);
    
    for (let i = 0; i < tableList.length; i++) {
        let table = tableList[i];
        let tableName = table.tableName;
        let tableComment = table.tableComment;
    
        let columns = table.columns;
    
        let columnsSql = [];
        columns.map(item => {
            let colName = item.col;
            let colType = item.type.toUpperCase();
            let colLength = mysqlFun.type2Length(colType, item.length);
            let colDefault = mysqlFun.type2Default(colType, item.default);
            let colComment = item.comment;
            
            let colStr = mysqlFun.assembleSql(colName, colType, colLength, colDefault, colComment);
            columnsSql.push(colStr)
        });
        
        let cleanSql = `DROP TABLE IF EXISTS \`${tableName}\``;
        
        let sql = `
        CREATE TABLE \`${tableName}\` (
  \`id\` bigint(20) NOT NULL AUTO_INCREMENT,
  ${columnsSql.join(",")},
  \`weight\` tinyint(2) NOT NULL DEFAULT '0',
  \`create_time\` bigint(20) NOT NULL DEFAULT '0',
  \`update_time\` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='${tableComment}';`;
    
        // Log.i(sql);
        
        mysql.query(cleanSql).then(res => {
            Log.i(res);
            return mysql.query(sql);
        }).then(res => {
            Log.i(res);
        })
    }
    
}

let mysqlFun = {
    init: function (dbConfig) {
        return new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
            host: dbConfig.host,
            dialect: "mysql",
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
        })
    },
    type2Length: function (type, length) {
        switch (type) {
            case "INT":
                return 10;
            case "BIGINT":
                return 20;
            case "TINYINT":
                return "0";
            case "VARCHAR":
                return length;
            case "DOUBLE":
                return "10,2";
            case "DECIMAL":
                return "10,2";
            case "TEXT":
                return "";
            default:
                return "";
        }
    },
    type2Default: function (type) {
        switch (type) {
            case "INT":
                return "0";
            case "BIGINT":
                return "0";
            case "TINYINT":
                return "0";
            case "VARCHAR":
                return "";
            case "DOUBLE":
                return "0";
            case "DECIMAL":
                return "0.00";
            case "TEXT":
                return "NULL";
            default:
                return "";
        }
    },
    assembleSql: function (colName, colType, colLength, colDefault, colComment) {
        if (colType === "VARCHAR") {
            return `\`${colName}\` ${colType}(${colLength}) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '${colDefault}' COMMENT '${colComment}'`
        }
        if (colType === "INT" || colType === "BIGINT" || colType === "TINYINT") {
            return `\`${colName}\` ${colType}(${colLength}) NOT NULL DEFAULT '${colDefault}' COMMENT '${colComment}'`;
        }
        if (colType === "TEXT") {
            return `\`${colName}\` ${colType} COLLATE utf8mb4_general_ci COMMENT '${colComment}'`;
        }
        if (colType === "DECIMAL" || colType === "DOUBLE") {
            return `\`${colName}\` ${colType}(${colLength}) NOT NULL DEFAULT '${colDefault}' COMMENT '${colComment}'`;
        }
    }
};

module.exports = generateTable;

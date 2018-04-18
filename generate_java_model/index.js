/**
 * @author whis admin@wwhis.com
 * @Created 2/23/18
 */
const Log = require('../lib/logger');
const Util = require('../lib/util');
const fs   = require('fs');
const mkdirp    = require('mkdirp');
const Sequelize = require('sequelize');

let globalDbCfg = {
    host: "",
    user: "",
    password: "",
    database: "",
    table: "",
    port: 3306
};

function generateModel(dbConfig) {
    if (!dbConfig) {
        Log.e("db config is not set");
        return false;
    }

    if (typeof dbConfig !== 'object') {
        Log.e('options must be a object.');
        return false;
    }

    let cfg = {
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database,
        table: dbConfig.table,
        writePath: dbConfig.writePath
    };

    cfg.port = dbConfig.port || 3306;

    globalDbCfg = Object.assign(globalDbCfg, cfg);

    Log.i("db config ", globalDbCfg);

    let data = {
        tableName: modelFun.getTableName(),
        modelName: modelFun.getModelName()
    };

    modelFun.getFieldString().then(fieldString => {
        data.fieldString = fieldString;

        return modelFun.getFieldArrList();
    })
        .then(res => {
            data.fieldList = res;

            Log.i(data);

            let templatePath = `${__dirname}/../asset/java_template/model.ejs`;
            return Util.renderTemplate(templatePath, data)
        })
        .then(renderData => {

            if (!fs.existsSync(globalDbCfg.writePath)) {
                mkdirp.sync(globalDbCfg.writePath)
            }

            Util.writeFile(`${globalDbCfg.writePath}/${data.modelName}.kt`, renderData, {mode: 0o755})
        })
        .catch(err => {
            Log.e(err)
        })
}









let modelFun = {

    getTableName: function () {
        return globalDbCfg.table;
    },

    getModelName: function () {
        return modelFun.formatModelName(globalDbCfg.table);
    },

    getFieldString: function () {
        let mysqlConnection = mysqlFun.init();
        return mysqlConnection.query(`select
    concat('"', COLUMN_NAME ,'"') as col
from
    information_schema.COLUMNS
where
    TABLE_SCHEMA = "${globalDbCfg.database}"
and
    TABLE_NAME = "${globalDbCfg.table}"`, {type: Sequelize.QueryTypes.SELECT})
            .then(result => {

                let fieldArr = [];
                result.map(item => {
                    fieldArr.push(item['col'])
                });

                return fieldArr.join(', ');
            })
    },

    getFieldArrList: function () {
        let mysqlConnection = mysqlFun.init();

        return mysqlConnection.query(`
            select COLUMN_NAME as cn, DATA_TYPE as dt 
            from information_schema.COLUMNS 
            where TABLE_SCHEMA = "${globalDbCfg.database}" and TABLE_NAME = "${globalDbCfg.table}"`, {type: Sequelize.QueryTypes.SELECT})
            .then(resList => {

                let dataList = [];
                resList.map(item => {
                    let obj = {
                        jsonName: item['cn'],
                        modelName: modelFun.formatJsonModelName(item['cn']),
                        dataType: modelFun.formatDataType(item['dt']),
                        dataTypeValue: modelFun.formatDataTypeDeFaultValue(modelFun.formatDataType(item['dt']))
                    };

                    dataList.push(obj)
                });

                return dataList;
            })
    },

    formatDataType: function (dataType) {
        let typeList = {
            "varchar": 'String',
            "int": 'Int',
            "bigint": "Long",
            "double": 'Double',
            "text": "String",
            "longtext": "String",
        };

        return typeList[dataType]
    },

    formatDataTypeDeFaultValue: function (dataType) {
        let valueList = {
            "String": '""',
            "Int": "0",
            "Long": "0L",
            "Double": "0.0"
        };
        return valueList[dataType]
    },

    formatModelName: function (modelName) {
        let arr = modelName.split('_');

        arr.map((item, index) => {
            arr[index] = Util.firstUpperCase(item);
        });

        return arr.join("");
    },

    formatJsonModelName: function (modelName) {
        let arr = modelName.split('_');
        if (arr.length <= 1) {
            return arr.join('');
        } else {
            for (let i = 1; i < arr.length; i++) {
                arr[i] = Util.firstUpperCase(arr[i])
            }
        }

        return arr.join('');
    }

};

let mysqlClient = null;
let mysqlFun = {
    init: function () {
        if (mysqlClient == null) {
            mysqlClient = new Sequelize(globalDbCfg.database, globalDbCfg.user, globalDbCfg.password, {
                host: globalDbCfg.host,
                dialect: "mysql",
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                },
            })
        }

        return mysqlClient;
    }
};

module.exports = generateModel;

/**
 * @author whis admin@wwhis.com
 * @Created 2/23/18
 */
const Log = require('../../lib/logger')
const Util = require('../../lib/util')
const fs = require('fs')
const mkdirp = require('mkdirp')
const Sequelize = require('sequelize')
const colors = require('colors')

// colors config
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  success: 'green',
  error: 'red'
})

let globalDbCfg = {
  host: '',
  user: '',
  password: '',
  database: '',
  table: '',
  port: 3306
}

function generateModel(dbConfig) {
  if (!dbConfig) {
    Log.e('db config is not set')
    return false
  }

  if (typeof dbConfig !== 'object') {
    Log.e('options must be a object.')
    return false
  }

  let cfg = {
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    table: dbConfig.table,
    writePath: dbConfig.writePath
  }

  cfg.port = dbConfig.port || 3306

  globalDbCfg = Object.assign(globalDbCfg, cfg)

  let table = globalDbCfg.table
  if (typeof table === 'string') {
    globalDbCfg.table = [globalDbCfg.table]
  }

  Log.i('db config %s', globalDbCfg)

  let {writePath} = globalDbCfg;

  let {path: modelPath, templatePath: modelTemplateEjs} = modelFun.genFilePath(writePath, 'model')
  let {path: flyModelPath, templatePath: flyModelTemplateEjs} = modelFun.genFilePath(writePath, 'flymodel')
  let {path: voPath, templatePath: voTemplateEjs} = modelFun.genFilePath(writePath, 'vo')
  let {path: poPath, templatePath: poTemplateEjs} = modelFun.genFilePath(writePath, 'po')
  let {path: listPoPath, templatePath: listPoTemplateEjs} = modelFun.genFilePath(writePath, 'listpo')
  let {path: controllerPath, templatePath: controllerTemplateEjs} = modelFun.genFilePath(writePath, 'controller')
  let {path: servicePath, templatePath: serviceTemplateEjs} = modelFun.genFilePath(writePath, 'service')
  let {path: mapperPath, templatePath: mapperTemplateEjs} = modelFun.genFilePath(writePath, 'mapper')
  let {path: sqlProviderPath, templatePath: sqlProviderTemplateEjs} = modelFun.genFilePath(writePath, 'sqlprovider')

  let toRemovePathList = [modelPath, voPath, poPath, controllerPath, servicePath, mapperPath, sqlProviderPath]

  for (const path of toRemovePathList) {
    Util.rmdirSync(path)
    modelFun.checkFilePathExists(path)
  }

  let promiseArr = []
  for (let i in globalDbCfg.table) {
    let table = globalDbCfg.table[i]

    let data = {
      tableName: modelFun.getTableName(table),
      modelName: modelFun.getModelName(table),
      mapperName: modelFun.getMapperName(table),
      sqlProviderName: modelFun.getSqlProviderName(table),
      serviceName: modelFun.getServiceName(table),
      controllerName: modelFun.getControllerName(table),
      controllerPath: modelFun.getControllerPath(table),
      functionName: modelFun.getFunctionName(table)
    }

    let dataPromise = modelFun
      .getTableComment(table).then(tableComment => {
        data.tableComment = tableComment
        return modelFun.getFieldString(table)
      }).then(fieldString => {
        data.fieldString = fieldString
        return modelFun.getFieldArrList(table)
      }).then(res => {
        data.fieldList = res
        return data
      })

    let modelPromise = dataPromise.then(() => {
      return Util.renderTemplate(modelTemplateEjs, data)
    }).then(renderData => {
      return Util.writeFile(`${modelPath}/${data.modelName}.kt`, renderData, {mode: 0o755})
    }).then(res => {
      Log.i('================ Gen model Success ==================== '.success, table)
      return true;
    })

    let flyModelPromise = dataPromise.then(() => {
      data.voFieldList = modelFun.filterFieldArrayList(['createTime', 'updateTime', 'weight', 'isDel', 'createDate', 'updateDate'], data.fieldList);
      return Util.renderTemplate(flyModelTemplateEjs, data)
    }).then(renderData => {
      return Util.writeFile(`${modelPath}/${data.modelName}.kt.bak`, renderData, {mode: 0o755})
    }).then(res => {
      Log.i('================ Gen model Success ==================== '.success, table)
      return true;
    })

    let voPromise = dataPromise.then(() => {
      data.voFieldList = modelFun.filterFieldArrayList(['updateTime', 'weight'], data.fieldList);
      return Util.renderTemplate(voTemplateEjs, data)
    }).then(renderData => {
      return Util.writeFile(`${voPath}/${data.modelName}VO.kt`, renderData, {mode: 0o755})
    }).then(res => {
      Log.i('================ Gen VO Success ==================== '.success, table)
      return true;
    })

    let poPromise = dataPromise.then(() => {
      data.poFieldList = modelFun.filterFieldArrayList(['createTime', 'updateTime', 'weight'], data.fieldList);
      return Util.renderTemplate(poTemplateEjs, data)
    }).then(renderData => {
      return Util.writeFile(`${poPath}/${data.modelName}SavePO.kt`, renderData, {mode: 0o755})
    }).then(res => {
      Log.i('================ Gen VO Success ==================== '.success, table)
      return true;
    })

    let listPromise = dataPromise.then(() => {
      data.poFieldList = modelFun.filterFieldArrayList(['createTime', 'updateTime', 'weight'], data.fieldList);
      return Util.renderTemplate(listPoTemplateEjs, data)
    }).then(renderData => {
      return Util.writeFile(`${poPath}/${data.modelName}ListPO.kt`, renderData, {mode: 0o755})
    }).then(res => {
      Log.i('================ Gen VO Success ==================== '.success, table)
      return true;
    })

    let mapperPromise = dataPromise.then(() => {
      return Util.renderTemplate(mapperTemplateEjs, data)
    }).then(renderData => {
      return Util.writeFile(`${mapperPath}/${data.mapperName}.kt`, renderData, {mode: 0o755})
    }).then(res => {
      Log.i('================ Gen Mapper Success ==================== '.success, table)
      return true;
    })

    let sqlProviderPromise = dataPromise.then(() => {
      return Util.renderTemplate(sqlProviderTemplateEjs, data)
    }).then(renderData => {
      return Util.writeFile(`${sqlProviderPath}/${data.sqlProviderName}.kt`, renderData, {mode: 0o755})
    }).then(res => {
      Log.i('================ Gen SqlProvider Success ==================== '.success, table)
      return true;
    })

    let servicePromise = dataPromise.then(() => {
      return Util.renderTemplate(serviceTemplateEjs, data)
    }).then(renderData => {
      return Util.writeFile(`${servicePath}/${data.serviceName}.kt`, renderData, {mode: 0o755})
    }).then(res => {
      Log.i('================ Gen Service Success ==================== '.success, table)
      return true;
    })

    let controllerPromise = dataPromise.then(() => {
      return Util.renderTemplate(controllerTemplateEjs, data)
    }).then(renderData => {
      return Util.writeFile(`${controllerPath}/${data.controllerName}.kt`, renderData, {mode: 0o755})
    }).then(res => {
      Log.i('================ Gen Controller Success ==================== '.success, table)
      return true
    })

    promiseArr.push(modelPromise, flyModelPromise, voPromise, poPromise, listPromise, mapperPromise, sqlProviderPromise, servicePromise, controllerPromise)
  }

  // Promise.all(promiseArr).then((result) => {
  //   console.info(result)
  //   Log.i('------ End ------'.help)
  // }).catch((err) => {
  //   Log.e(err)
  // })

}

let modelFun = {
  getTableName: function (table) {
    return table.toLocaleLowerCase()
  },

  getModelName: function (table) {
    return modelFun.formatModelName(table)
  },

  getMapperName: function (table) {
    return modelFun.formatModelName(table) + 'Mapper'
  },

  getSqlProviderName: function (table) {
    return modelFun.formatModelName(table) + 'SqlProvider'
  },

  getServiceName: function (table) {
    return modelFun.formatModelName(table) + 'Service'
  },

  getControllerName: function (table) {
    return modelFun.formatModelName(table) + 'Controller'
  },

  getControllerPath: function (table) {
    let arr = table.split('_')

    return arr.join('-')
  },

  getFunctionName: function (modelName) {
    let arr = modelName.split('_')

    arr.map((item, index) => {
      if (index === 0) {
        arr[index] = item.toLowerCase()
      } else {
        arr[index] = Util.firstUpperCase(item)
      }
    })

    return arr.join('')
  },

  getTableComment: function (table) {
    let mysqlConnection = mysqlFun.init()
    return mysqlConnection.query(`SELECT TABLE_COMMENT as col FROM information_schema.TABLES
WHERE
    TABLE_SCHEMA = "${globalDbCfg.database}"
and
    TABLE_NAME = "${table}"`, {type: Sequelize.QueryTypes.SELECT})
      .then(result => {

        let fieldArr = []
        result.map(item => {
          fieldArr.push(item['col'])
        })

        return fieldArr.join(', ')
      })
  },

  getFieldString: function (table) {
    let mysqlConnection = mysqlFun.init()
    return mysqlConnection.query(`select
    concat('"', COLUMN_NAME ,'"') as col
from
    information_schema.COLUMNS
where
    TABLE_SCHEMA = "${globalDbCfg.database}"
and
    TABLE_NAME = "${table}" ORDER BY ORDINAL_POSITION ASC`, {type: Sequelize.QueryTypes.SELECT})
      .then(result => {

        let fieldArr = []
        result.map(item => {
          fieldArr.push(item['col'])
        })

        return fieldArr.join(', ')
      })
  },

  getFieldArrList: function (table) {
    let mysqlConnection = mysqlFun.init()

    return mysqlConnection.query(`
            SELECT COLUMN_NAME as cn, DATA_TYPE as dt, column_comment as cc
            FROM information_schema.COLUMNS
            WHERE TABLE_SCHEMA = "${globalDbCfg.database}" and TABLE_NAME = "${table}" ORDER BY ORDINAL_POSITION ASC `, {type: Sequelize.QueryTypes.SELECT})
      .then(resList => {

        let dataList = []
        resList.map(item => {
          let obj = {
            jsonName: item['cn'],
            modelName: modelFun.formatJsonModelName(item['cn']),
            dataType: modelFun.formatDataType(item['dt']),
            dataTypeValue: modelFun.formatDataTypeDeFaultValue(modelFun.formatDataType(item['dt'])),
            comment: item['cc']
          }

          dataList.push(obj)
        })

        return dataList
      })
  },

  filterFieldArrayList: function (filterVal, fieldArr) {
    let rst = [];
    fieldArr.map(v => {
      if (!Util.inArray(v['modelName'], filterVal)) {
        return rst.push(v);
      }
    })
    return rst;
  },

  formatDataType: function (dataType) {
    let typeList = {
      'varchar': 'String',
      'int': 'Int',
      'tinyint': 'Int',
      'bigint': 'Long',
      'double': 'Double',
      'text': 'String',
      'longtext': 'String',
      'datetime': 'Date?'
    }
    return typeList[dataType]
  },

  formatDataTypeDeFaultValue: function (dataType) {
    let valueList = {
      'String': '""',
      'Int': '0',
      'Long': '0L',
      'Double': '0.0',
      'Date?': 'null'
    }
    return valueList[dataType]
  },

  formatModelName: function (modelName) {
    let arr = modelName.split('_')

    arr.map((item, index) => {
      arr[index] = Util.firstUpperCase(item)
    })

    return arr.join('')
  },

  formatJsonModelName: function (modelName) {
    let arr = modelName.split('_')
    if (arr.length <= 1) {
      return arr.join('')
    } else {
      for (let i = 1; i < arr.length; i++) {
        arr[i] = Util.firstUpperCase(arr[i])
      }
    }

    return arr.join('')
  },

  genFilePath: function (writePath, pathName) {
    let path = `${writePath}/${pathName}`
    let templatePath = `${__dirname}/../../asset/java_template/${pathName}.ejs`
    return {path, templatePath}
  },

  checkFilePathExists: function (path) {
    if (!fs.existsSync(path)) {
      mkdirp.sync(path)
    }
  }

}

let mysqlClient = null
let mysqlFun = {
  init: function () {
    if (mysqlClient == null) {
      mysqlClient = new Sequelize(globalDbCfg.database, globalDbCfg.user, globalDbCfg.password, {
        host: globalDbCfg.host,
        dialect: 'mysql',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      })
    }

    return mysqlClient
  }
}

module.exports = generateModel

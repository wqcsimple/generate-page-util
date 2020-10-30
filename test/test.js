const Util = require('../lib/util')

let arr = [
    {
        jsonName: 'id',
        modelName: 'id',
        dataType: 'Long',
        dataTypeValue: '0L',
        comment: ''
    },
    {
        jsonName: 'username',
        modelName: 'username',
        dataType: 'String',
        dataTypeValue: '""',
        comment: ''
    },
    {
        jsonName: 'password',
        modelName: 'password',
        dataType: 'String',
        dataTypeValue: '""',
        comment: ''
    },
    {
        jsonName: 'weight',
        modelName: 'weight',
        dataType: 'Int',
        dataTypeValue: '0',
        comment: ''
    },
    {
        jsonName: 'create_time',
        modelName: 'createTime',
        dataType: 'Long',
        dataTypeValue: '0L',
        comment: ''
    },
    {
        jsonName: 'update_time',
        modelName: 'updateTime',
        dataType: 'Long',
        dataTypeValue: '0L',
        comment: ''
    }
]

let filterVal = ['updateTime', 'createTime', 'weight']

let rst = [];
arr.map(v => {
    if (!Util.inArray(v['modelName'], filterVal)) {
        return rst.push(v);
    }
})

console.log(rst)


/**
 * @author whis admin@wwhis.com
 * @Created 11/30/18
 */
const Log = require('../lib/logger');
const request = require("request");

let tagList = [];

function get(url) {
    return new Promise((resolve, reject) => {
        request({
            method: "GET",
            uri: url,
            gzip: true
        }, function (error, response, body) {
            if (error != null) {
                reject(error)
            }

            resolve(body)
        })
    })
}

function generateApi(url) {
    if (!url) {
        Log.e("db config is not set");
        return false;
    }

    get(url)
        .then(res => {
            if (!res) {
                Log.e("response data is error");
            } else {
                let swaggerJson = JSON.parse(res);
                processTags(swaggerJson.tags);

                let paths = swaggerJson.paths;
                processPaths(paths)
            }
        })
        .catch(err => {
        })
}

function processTags(tags) {
    let length = tags.length;
    for (let i = 0; i < length; i++) {
        let tag = tags[i];

        let controllerName = filterController(tag.description);
        let obj = {
            name: tag.name,
            controller: controllerName,
            apiList: []
        };
        tagList.push(obj)
    }
}

function processPaths(paths) {
    Object.keys(paths).forEach(key => {
        let url = key;
        let requestMethods = paths[key];
        let obj = {
            name: "",
            url: url,
            method: '',
            summary: "",
            params: "",
        };
        Object.keys(requestMethods).forEach(method => {
            obj.method = method.toUpperCase();

            let pathInfo = requestMethods[method];
            obj.summary = pathInfo['summary'];
            obj.name = filterOperationId(pathInfo['operationId']);

            let paramArr = [];
            pathInfo['parameters'].map(p => {
                paramArr.push("'" + p.name + "'")
            });

            obj.params = paramArr.join(",");
        });

        console.log(obj)
    })
}

function filterController(controller) {
    let arr = controller.split(" ");
    let result = "";
    if (arr.length > 0) {
        arr.forEach(it => {
            if (it != 'Controller') {
                result += it;
            }
        })
    }
    return result
}

function filterOperationId(operationId) {
    return operationId.substring(0, operationId.indexOf("Using"))
}

module.exports = generateApi;

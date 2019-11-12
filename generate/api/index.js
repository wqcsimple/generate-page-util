/**
 * @author whis admin@wwhis.com
 * @Created 11/30/18
 */
const Log = require('../../lib/logger');
const Util = require('../../lib/util');
const fs   = require('fs');
const mkdirp    = require('mkdirp');
const request = require("request");

let globalCfg = {
    url: "",
    prefix: "",
    writePath: "",
};
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

function generateApi(config) {
    if (!config) {
        Log.e("db config is not set");
        return false;
    }

    if (typeof config !== 'object') {
        Log.e('options must be a object.');
        return false;
    }

    globalCfg = Object.assign(globalCfg, config);

    if (!globalCfg.url) {
        Log.e("url is not set");
        return false;
    }

    get(globalCfg.url)
        .then(res => {
            if (!res) {
                Log.e("response data is error");
                throw "response data is error";
            }

            let swaggerJson = JSON.parse(res);
            processTags(swaggerJson.tags);

            let paths = swaggerJson.paths;
            processPaths(paths);

            let templatePath = `${__dirname}/../../asset/js_api_template/api.ejs`;
            return Util.renderTemplate(templatePath, {tagList: tagList})
        })
        .then(renderData => {
            if (!fs.existsSync(globalCfg.writePath)) {
                mkdirp.sync(globalCfg.writePath)
            }

            return Util.writeFile(`${globalCfg.writePath}/api.js`, renderData, {mode: 0o755});
        })
        .then(res => {
            Log.i("================ Gen api Success ==================== ".success);
        })
        .catch(err => {
            console.error(err)
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
        if (url.indexOf(globalCfg.prefix) != 0) {
            return;
        }
        let requestMethods = paths[key];
        let obj = {
            name: "",
            url: Util.trim(url, '/'),
            method: "",
            summary: "",
            params: "",
            tags: [],
        };

        Object.keys(requestMethods).forEach(method => {
            obj.method = method.toUpperCase();

            let pathInfo = requestMethods[method];
            obj.summary = pathInfo['summary'];
            obj.name = filterOperationId(pathInfo['operationId']);

            if (pathInfo['parameters']) {
                let paramArr = [];
                pathInfo['parameters'].map(p => {
                    paramArr.push(`"${p.name}"`)
                });

                obj.params = paramArr.join(", ");
            }
            obj.tags = pathInfo.tags;

            for (let tag of tagList) {
                if (obj.tags.indexOf(tag.name) >= 0) {
                    tag.apiList.push(obj)
                }
            }
        });
    });
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
